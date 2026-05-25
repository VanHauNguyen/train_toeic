import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AttemptStatus, MistakeType, Question, QuestionOption, TestAttempt, ToeicPart, UserAnswer } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AddQuestionToTestDto, CreateTestDto, SubmitAttemptDto, UpdateTestDto } from './dto';

@Injectable()
export class TestsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.test.findMany({
      where: { isPublished: true },
      include: { questions: { include: { question: true }, orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  findOne(id: string) {
    return this.prisma.test.findUniqueOrThrow({
      where: { id },
      include: { questions: { include: { question: { include: { options: true } } }, orderBy: { order: 'asc' } } },
    });
  }

  create(dto: CreateTestDto) {
    return this.prisma.test.create({ data: dto });
  }

  update(id: string, dto: UpdateTestDto) {
    return this.prisma.test.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.test.delete({ where: { id } });
  }

  addQuestion(testId: string, dto: AddQuestionToTestDto) {
    return this.prisma.testQuestion.create({ data: { testId, ...dto } });
  }

  async startAttempt(testId: string, userId: string) {
    const [test, user] = await Promise.all([
      this.prisma.test.findUnique({
        where: { id: testId },
        include: { questions: true },
      }),
      this.prisma.user.findUnique({ where: { id: userId }, select: { id: true } }),
    ]);
    if (!user) throw new UnauthorizedException('Authenticated user no longer exists');
    if (!test) throw new NotFoundException('Test not found');
    if (!test.isPublished) throw new NotFoundException('Test not found');
    if (!test.questions.length) throw new BadRequestException('Cannot start a test without questions');
    return this.prisma.testAttempt.create({
      data: { testId, userId, totalQuestions: test.questions.length },
    });
  }

  async submitAttempt(attemptId: string, userId: string, dto: SubmitAttemptDto) {
    const attempt = await this.prisma.testAttempt.findUnique({
      where: { id: attemptId },
      include: {
        test: {
          include: {
            questions: {
              include: { question: { include: { options: true } } },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
    if (!attempt) throw new NotFoundException('Attempt not found');
    if (attempt.userId !== userId) throw new ForbiddenException('Cannot submit another user attempt');
    if (attempt.status !== AttemptStatus.IN_PROGRESS) throw new BadRequestException('Attempt is not in progress');

    const answersByQuestionId = new Map(dto.answers.map((answer) => [answer.questionId, answer.selectedOptionId]));
    const testQuestionIds = new Set(attempt.test.questions.map((item) => item.questionId));
    const extraQuestion = dto.answers.find((answer) => !testQuestionIds.has(answer.questionId));
    if (extraQuestion) throw new BadRequestException(`Question ${extraQuestion.questionId} does not belong to this test`);

    const missingQuestion = attempt.test.questions.find((item) => !answersByQuestionId.has(item.questionId));
    if (missingQuestion) throw new BadRequestException('Please answer every question before submitting');

    const answerRows = attempt.test.questions.map((item) => {
      const selectedOptionId = answersByQuestionId.get(item.questionId);
      const selected = item.question.options.find((option) => option.id === selectedOptionId);
      if (!selected) throw new BadRequestException(`Selected option does not belong to question ${item.questionId}`);
      return {
        attemptId,
        userId,
        questionId: item.questionId,
        selectedOptionId: selected.id,
        isCorrect: selected.isCorrect,
      };
    });
    const correctCount = answerRows.filter((answer) => answer.isCorrect).length;
    const totalQuestions = attempt.test.questions.length;
    const score = totalQuestions === 0 ? 0 : Math.round((correctCount / totalQuestions) * 100);

    await this.prisma.$transaction(async (tx) => {
      await tx.userAnswer.deleteMany({ where: { attemptId } });
      await tx.userAnswer.createMany({ data: answerRows });
      await tx.testAttempt.update({
        where: { id: attemptId },
        data: {
          status: AttemptStatus.COMPLETED,
          score,
          totalQuestions,
          correctCount,
          completedAt: new Date(),
        },
      });
    });
    return this.result(attemptId, userId);
  }

  async result(attemptId: string, userId: string) {
    const attempt = await this.getOwnedCompletedAttempt(attemptId, userId);
    const weakToeicParts = this.weakToeicParts(attempt.answers);
    return {
      attemptId: attempt.id,
      testId: attempt.testId,
      testTitle: attempt.test.title,
      status: attempt.status,
      score: attempt.score ?? 0,
      correctCount: attempt.correctCount,
      totalCount: attempt.totalQuestions,
      correctRate: attempt.totalQuestions ? Number(((attempt.correctCount / attempt.totalQuestions) * 100).toFixed(1)) : 0,
      weakToeicParts,
      startedAt: attempt.startedAt,
      completedAt: attempt.completedAt,
    };
  }

  async review(attemptId: string, userId: string) {
    const attempt = await this.getOwnedCompletedAttempt(attemptId, userId);
    return {
      attemptId: attempt.id,
      testTitle: attempt.test.title,
      items: attempt.test.questions.map((testQuestion) => {
        const answer = attempt.answers.find((item) => item.questionId === testQuestion.questionId);
        const correctAnswer = testQuestion.question.options.find((option) => option.isCorrect);
        return {
          order: testQuestion.order,
          question: testQuestion.question,
          selectedAnswer: answer?.selectedOption ?? null,
          correctAnswer,
          isCorrect: Boolean(answer?.isCorrect),
          englishExplanation: testQuestion.question.explanation,
          explanationZhTW: testQuestion.question.explanationZhTW ?? testQuestion.question.explanation,
          explanationVi: testQuestion.question.explanationVi,
          toeicPart: testQuestion.question.toeicPart,
          mistakeTypeSuggestion: answer?.isCorrect ? null : this.suggestMistakeType(testQuestion.question),
        };
      }),
    };
  }

  private async getOwnedCompletedAttempt(attemptId: string, userId: string) {
    const attempt = await this.prisma.testAttempt.findUnique({
      where: { id: attemptId },
      include: {
        answers: { include: { selectedOption: true, question: true } },
        test: {
          include: {
            questions: {
              include: { question: { include: { options: { orderBy: { label: 'asc' } } } } },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
    if (!attempt) throw new NotFoundException('Attempt not found');
    if (attempt.userId !== userId) throw new ForbiddenException('Cannot access another user attempt');
    if (attempt.status !== AttemptStatus.COMPLETED) throw new BadRequestException('Attempt has not been completed');
    return attempt;
  }

  private weakToeicParts(answers: (UserAnswer & { question: Question })[]) {
    const stats = new Map<ToeicPart, { total: number; correct: number }>();
    for (const answer of answers) {
      const stat = stats.get(answer.question.toeicPart) ?? { total: 0, correct: 0 };
      stat.total += 1;
      if (answer.isCorrect) stat.correct += 1;
      stats.set(answer.question.toeicPart, stat);
    }
    return [...stats.entries()]
      .map(([part, stat]) => ({ part, correctRate: stat.total ? stat.correct / stat.total : 0 }))
      .sort((a, b) => a.correctRate - b.correctRate)
      .filter((item) => item.correctRate < 0.8)
      .map((item) => item.part);
  }

  private suggestMistakeType(question: Question & { options?: QuestionOption[] }) {
    const tags = question.tags.join(' ').toLowerCase();
    if (question.toeicPart === ToeicPart.PART7) return MistakeType.READING;
    if (tags.includes('vocabulary') || tags.includes('word') || tags.includes('collocation')) return MistakeType.VOCABULARY;
    return MistakeType.GRAMMAR;
  }
}
