"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
let TestsService = class TestsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.test.findMany({
            where: { isPublished: true },
            include: { questions: { include: { question: true }, orderBy: { order: 'asc' } } },
            orderBy: { createdAt: 'asc' },
        });
    }
    findOne(id) {
        return this.prisma.test.findUniqueOrThrow({
            where: { id },
            include: { questions: { include: { question: { include: { options: true } } }, orderBy: { order: 'asc' } } },
        });
    }
    create(dto) {
        return this.prisma.test.create({ data: dto });
    }
    update(id, dto) {
        return this.prisma.test.update({ where: { id }, data: dto });
    }
    remove(id) {
        return this.prisma.test.delete({ where: { id } });
    }
    addQuestion(testId, dto) {
        return this.prisma.testQuestion.create({ data: { testId, ...dto } });
    }
    async startAttempt(testId, userId) {
        const [test, user] = await Promise.all([
            this.prisma.test.findUnique({
                where: { id: testId },
                include: { questions: true },
            }),
            this.prisma.user.findUnique({ where: { id: userId }, select: { id: true } }),
        ]);
        if (!user)
            throw new common_1.UnauthorizedException('Authenticated user no longer exists');
        if (!test)
            throw new common_1.NotFoundException('Test not found');
        if (!test.isPublished)
            throw new common_1.NotFoundException('Test not found');
        if (!test.questions.length)
            throw new common_1.BadRequestException('Cannot start a test without questions');
        return this.prisma.testAttempt.create({
            data: { testId, userId, totalQuestions: test.questions.length },
        });
    }
    async submitAttempt(attemptId, userId, dto) {
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
        if (!attempt)
            throw new common_1.NotFoundException('Attempt not found');
        if (attempt.userId !== userId)
            throw new common_1.ForbiddenException('Cannot submit another user attempt');
        if (attempt.status !== client_1.AttemptStatus.IN_PROGRESS)
            throw new common_1.BadRequestException('Attempt is not in progress');
        const answersByQuestionId = new Map(dto.answers.map((answer) => [answer.questionId, answer.selectedOptionId]));
        const testQuestionIds = new Set(attempt.test.questions.map((item) => item.questionId));
        const extraQuestion = dto.answers.find((answer) => !testQuestionIds.has(answer.questionId));
        if (extraQuestion)
            throw new common_1.BadRequestException(`Question ${extraQuestion.questionId} does not belong to this test`);
        const missingQuestion = attempt.test.questions.find((item) => !answersByQuestionId.has(item.questionId));
        if (missingQuestion)
            throw new common_1.BadRequestException('Please answer every question before submitting');
        const answerRows = attempt.test.questions.map((item) => {
            const selectedOptionId = answersByQuestionId.get(item.questionId);
            const selected = item.question.options.find((option) => option.id === selectedOptionId);
            if (!selected)
                throw new common_1.BadRequestException(`Selected option does not belong to question ${item.questionId}`);
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
                    status: client_1.AttemptStatus.COMPLETED,
                    score,
                    totalQuestions,
                    correctCount,
                    completedAt: new Date(),
                },
            });
        });
        return this.result(attemptId, userId);
    }
    async result(attemptId, userId) {
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
    async review(attemptId, userId) {
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
    async getOwnedCompletedAttempt(attemptId, userId) {
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
        if (!attempt)
            throw new common_1.NotFoundException('Attempt not found');
        if (attempt.userId !== userId)
            throw new common_1.ForbiddenException('Cannot access another user attempt');
        if (attempt.status !== client_1.AttemptStatus.COMPLETED)
            throw new common_1.BadRequestException('Attempt has not been completed');
        return attempt;
    }
    weakToeicParts(answers) {
        const stats = new Map();
        for (const answer of answers) {
            const stat = stats.get(answer.question.toeicPart) ?? { total: 0, correct: 0 };
            stat.total += 1;
            if (answer.isCorrect)
                stat.correct += 1;
            stats.set(answer.question.toeicPart, stat);
        }
        return [...stats.entries()]
            .map(([part, stat]) => ({ part, correctRate: stat.total ? stat.correct / stat.total : 0 }))
            .sort((a, b) => a.correctRate - b.correctRate)
            .filter((item) => item.correctRate < 0.8)
            .map((item) => item.part);
    }
    suggestMistakeType(question) {
        const tags = question.tags.join(' ').toLowerCase();
        if (question.toeicPart === client_1.ToeicPart.PART7)
            return client_1.MistakeType.READING;
        if (tags.includes('vocabulary') || tags.includes('word') || tags.includes('collocation'))
            return client_1.MistakeType.VOCABULARY;
        return client_1.MistakeType.GRAMMAR;
    }
};
exports.TestsService = TestsService;
exports.TestsService = TestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TestsService);
//# sourceMappingURL=tests.service.js.map