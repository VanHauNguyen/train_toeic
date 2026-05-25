import { PrismaClient, QuestionType, SkillLevel, ToeicPart, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { TOEIC_LESSONS } from '../src/content/data/lessons';
import { TOEIC_VOCABULARY } from '../src/content/data/vocabulary';

const prisma = new PrismaClient();

type SeedQuestion = {
  type: QuestionType;
  toeicPart: ToeicPart;
  prompt: string;
  passage?: string;
  explanation: string;
  explanationZhTW: string;
  explanationVi: string;
  options: [string, string, string, string];
  correct: 'A' | 'B' | 'C' | 'D';
  tags: string[];
  difficulty?: SkillLevel;
};

const part5: SeedQuestion[] = [
  ['The quarterly report must be submitted _____ Friday afternoon.', ['by', 'with', 'during', 'among'], 'A', 'deadline'],
  ['Ms. Chen is responsible _____ organizing the client meeting.', ['for', 'to', 'about', 'at'], 'A', 'collocation'],
  ['The new printer is more _____ than the old model.', ['efficient', 'efficiency', 'efficiently', 'efficiencies'], 'A', 'word form'],
  ['All employees _____ attend the safety training next week.', ['must', 'during', 'because', 'yet'], 'A', 'modal'],
  ['The manager asked the team to complete the task as _____ as possible.', ['quickly', 'quick', 'quicken', 'quickness'], 'A', 'adverb'],
  ['The shipment was delayed _____ the heavy rain.', ['because of', 'despite', 'although', 'instead'], 'A', 'preposition'],
  ['Please contact the front desk if you need _____ assistance.', ['additional', 'addition', 'additionally', 'add'], 'A', 'word form'],
  ['The conference room _____ for two hours this morning.', ['was reserved', 'reserved', 'reserving', 'reserve'], 'A', 'passive voice'],
  ['Employees should submit travel expenses _____ the end of the month.', ['before', 'unless', 'between', 'onto'], 'A', 'preposition'],
  ['The company has decided _____ its customer service hours.', ['to extend', 'extend', 'extended', 'extension'], 'A', 'infinitive'],
  ['The brochure provides _____ information about the new benefits.', ['detailed', 'detail', 'details', 'detailing'], 'A', 'word form'],
  ['Customers may return unused items _____ 30 days of purchase.', ['within', 'while', 'along', 'throughout'], 'A', 'preposition'],
  ['The training session was canceled _____ low attendance.', ['due to', 'although', 'however', 'instead of'], 'A', 'cause'],
  ['Our accounting department processes invoices _____ than before.', ['faster', 'fast', 'fastest', 'fasten'], 'A', 'comparative'],
  ['The technician checked the equipment _____ leaving the site.', ['before', 'because', 'unless', 'despite'], 'A', 'preposition'],
  ['The sales figures were _____ higher than expected.', ['significantly', 'significant', 'significance', 'signify'], 'A', 'adverb'],
  ['The hotel offers a discount to guests _____ stay more than three nights.', ['who', 'which', 'where', 'whose'], 'A', 'relative pronoun'],
  ['Please ensure that all files are stored _____ in the shared folder.', ['securely', 'secure', 'security', 'secured'], 'A', 'adverb'],
  ['The director will review the proposal _____ it is sent to the client.', ['before', 'during', 'among', 'beside'], 'A', 'sequence'],
  ['The new policy applies to all employees, _____ their department.', ['regardless of', 'because', 'even', 'through'], 'A', 'phrase'],
].map(([prompt, options, correct, tag]) => ({
  type: QuestionType.GRAMMAR,
  toeicPart: ToeicPart.PART5,
  prompt: prompt as string,
  explanation: `The correct answer is "${(options as string[])[(correct as string).charCodeAt(0) - 65]}". Focus on ${tag}.`,
  explanationZhTW: `正解是 ${(correct as string)}。本題重點是 ${tag}，需根據空格前後的文法功能判斷。`,
  explanationVi: `Đáp án đúng là ${(correct as string)}. Câu này cần chú ý ${tag} và quan hệ ngữ pháp quanh chỗ trống.`,
  options: options as [string, string, string, string],
  correct: correct as 'A' | 'B' | 'C' | 'D',
  tags: [tag as string, 'part5'],
  difficulty: SkillLevel.BEGINNER,
}));

const part6Passage =
  'To all staff: The office supply room will be reorganized this Friday. Please return any borrowed equipment and label personal materials before 5 P.M. The administration team will discard unmarked items.';

const part6: SeedQuestion[] = [
  ['The supply room will be reorganized _____ Friday.', ['this', 'these', 'those', 'them'], 'A', 'determiner'],
  ['Employees should return any equipment they have _____.', ['borrowed', 'borrowing', 'borrow', 'borrows'], 'A', 'verb form'],
  ['Unmarked items will be _____ by the administration team.', ['discarded', 'discard', 'discarding', 'discards'], 'A', 'passive voice'],
  ['Please label personal materials _____ 5 P.M.', ['before', 'among', 'despite', 'onto'], 'A', 'deadline'],
  ['The notice is mainly about changes to the _____.', ['supply room', 'parking lot', 'cafeteria menu', 'travel policy'], 'A', 'main idea'],
  ['To all customers: Our downtown branch will extend its hours next month to better serve clients after work.', ['extend', 'reduce', 'cancel', 'replace'], 'A', 'vocabulary'],
  ['The new hours are intended to serve clients _____ work.', ['after', 'across', 'under', 'despite'], 'A', 'preposition'],
  ['Customers are advised to check the website for the _____ schedule.', ['updated', 'updates', 'updating', 'update'], 'A', 'word form'],
  ['This announcement is most likely from a _____.', ['bank', 'factory worker', 'restaurant customer', 'shipping driver'], 'A', 'inference'],
  ['The branch will change its hours _____.', ['next month', 'last week', 'yesterday', 'two years ago'], 'A', 'detail'],
].map(([prompt, options, correct, tag], index) => ({
  type: QuestionType.READING,
  toeicPart: ToeicPart.PART6,
  prompt: prompt as string,
  passage: index < 5 ? part6Passage : 'Customer Notice: Starting next month, the downtown branch will remain open until 7 P.M. on weekdays. Please visit our website for the updated schedule.',
  explanation: `The correct answer is "${(options as string[])[0]}". Use the surrounding sentence and passage context.`,
  explanationZhTW: `正解是 ${correct}。Part 6 需要同時看句子文法與前後文，判斷 ${tag}。`,
  explanationVi: `Đáp án đúng là ${correct}. Part 6 cần đọc ngữ cảnh trước sau để xác định ${tag}.`,
  options: options as [string, string, string, string],
  correct: correct as 'A' | 'B' | 'C' | 'D',
  tags: [tag as string, 'part6'],
  difficulty: SkillLevel.INTERMEDIATE,
}));

const part7: SeedQuestion[] = [
  ['What is the purpose of the email?', ['To confirm a delivery date', 'To apply for a job', 'To request a refund', 'To cancel a meeting'], 'A', 'purpose'],
  ['When will the shipment arrive?', ['On Tuesday', 'On Friday', 'Next month', 'This afternoon'], 'A', 'detail'],
  ['What should the recipient do?', ['Reply to confirm availability', 'Pay an invoice immediately', 'Reserve a conference room', 'Update a password'], 'A', 'action'],
  ['Where will the workshop be held?', ['In Room 402', 'At the airport', 'In the cafeteria', 'At a hotel'], 'A', 'detail'],
  ['Who is the notice intended for?', ['Employees attending training', 'New customers', 'Job applicants', 'Building visitors only'], 'A', 'audience'],
  ['What is mentioned about registration?', ['It closes on Thursday', 'It is not required', 'It costs $200', 'It begins next year'], 'A', 'detail'],
  ['Why was the meeting moved?', ['The original room is unavailable', 'The client canceled', 'The report is finished', 'The manager is traveling'], 'A', 'reason'],
  ['What does the sender ask Mark to bring?', ['Updated sales charts', 'A laptop charger', 'Travel receipts', 'A signed contract'], 'A', 'detail'],
  ['What is suggested about the product?', ['It has recently been improved', 'It is no longer sold', 'It is only available online', 'It requires assembly'], 'A', 'inference'],
  ['What can customers receive this week?', ['Free installation', 'A parking permit', 'A printed catalog', 'A job interview'], 'A', 'detail'],
].map(([prompt, options, correct, tag], index) => ({
  type: QuestionType.READING,
  toeicPart: ToeicPart.PART7,
  prompt: prompt as string,
  passage:
    index < 3
      ? 'Email: Hello Ms. Rivera, your office furniture shipment is scheduled to arrive on Tuesday morning. Please reply today to confirm that someone will be available to receive it.'
      : index < 6
        ? 'Notice: The software workshop will be held in Room 402 this Friday. Employees who plan to attend must register by Thursday at noon.'
        : index < 8
          ? 'Message: Mark, tomorrow meeting has been moved because the original conference room is unavailable. Please bring the updated sales charts.'
          : 'Advertisement: Our newest printer model has been improved for faster setup. Customers who purchase this week will receive free installation.',
  explanation: `The correct answer is A. The answer is stated or implied directly in the passage.`,
  explanationZhTW: `正解是 A。Part 7 要先定位題目關鍵字，再回文章找同義或直接資訊。本題線索與 ${tag} 有關。`,
  explanationVi: `Đáp án đúng là A. Part 7 nên tìm từ khóa trong câu hỏi rồi quay lại bài đọc để định vị thông tin liên quan đến ${tag}.`,
  options: options as [string, string, string, string],
  correct: correct as 'A' | 'B' | 'C' | 'D',
  tags: [tag as string, 'part7'],
  difficulty: SkillLevel.INTERMEDIATE,
}));

async function main() {
  await prisma.mistakeAnalysis.deleteMany();
  await prisma.userAnswer.deleteMany();
  await prisma.testAttempt.deleteMany();
  await prisma.testQuestion.deleteMany();
  await prisma.test.deleteMany();
  await prisma.questionOption.deleteMany();
  await prisma.question.deleteMany();
  await prisma.grammarLesson.deleteMany();
  await prisma.vocabulary.deleteMany();
  await prisma.userSkillProfile.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin',
      role: UserRole.ADMIN,
      passwordHash: await bcrypt.hash('Admin123456', 12),
      skillProfile: { create: { estimatedLevel: SkillLevel.ADVANCED, strongParts: [ToeicPart.PART5, ToeicPart.PART7] } },
    },
  });
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'Demo User',
      role: UserRole.USER,
      passwordHash: await bcrypt.hash('User123456', 12),
      skillProfile: {
        create: {
          estimatedLevel: SkillLevel.INTERMEDIATE,
          weakParts: [ToeicPart.PART5, ToeicPart.PART6],
          strongParts: [ToeicPart.PART2],
          vocabularyLevel: SkillLevel.INTERMEDIATE,
          grammarLevel: SkillLevel.BEGINNER,
          listeningLevel: SkillLevel.INTERMEDIATE,
          readingLevel: SkillLevel.BEGINNER,
        },
      },
    },
  });

  await prisma.vocabulary.createMany({
    data: TOEIC_VOCABULARY.map((item, index) => ({
      word: item.word,
      meaningZhTW: item.meaningZhTW,
      meaningVi: item.meaningVi,
      partOfSpeech: item.partOfSpeech,
      example: item.example,
      exampleZhTW: item.exampleMeaningZhTW,
      exampleVi: item.exampleMeaningVi,
      collocations: item.collocations,
      tags: item.tags,
      level: item.difficulty,
      toeicCategory: item.tags.find((tag) => tag !== 'toeic' && tag !== 'workplace') ?? 'workplace',
      frequencyScore: 100 - index,
    })),
    skipDuplicates: true,
  });

  await prisma.grammarLesson.createMany({
    data: TOEIC_LESSONS.map((lesson) => ({
      title: lesson.title,
      titleZhTW: lesson.subtitle,
      titleVi: lesson.learningGoalVi,
      content: lesson.explanationVi,
      contentZhTW: lesson.explanationZhTW,
      contentVi: lesson.explanationVi,
      level: lesson.level,
      tags: lesson.reviewTags,
    })),
    skipDuplicates: true,
  });

  const createdQuestions: { id: string; toeicPart: ToeicPart }[] = [];
  for (const item of [...part5, ...part6, ...part7]) {
    const question = await prisma.question.create({
      data: {
        type: item.type,
        toeicPart: item.toeicPart,
        prompt: item.prompt,
        questionTextZhTW: item.prompt,
        questionTextVi: item.prompt,
        passage: item.passage,
        passageZhTW: item.passage ? `請閱讀以下英文文章並回答問題：${item.passage}` : null,
        passageVi: item.passage ? `Hãy đọc đoạn văn tiếng Anh sau và trả lời câu hỏi: ${item.passage}` : null,
        explanation: item.explanation,
        explanationZhTW: item.explanationZhTW,
        explanationVi: item.explanationVi,
        difficulty: item.difficulty ?? SkillLevel.BEGINNER,
        tags: item.tags,
        options: {
          create: item.options.map((text, index) => {
            const label = String.fromCharCode(65 + index) as 'A' | 'B' | 'C' | 'D';
            return {
              label,
              text,
              textZhTW: text,
              textVi: text,
              isCorrect: label === item.correct,
            };
          }),
        },
      },
      include: { options: true },
    });
    createdQuestions.push(question);
  }

  const grammarQuestions = createdQuestions.filter((question) => question.toeicPart === ToeicPart.PART5);
  const readingQuestions = createdQuestions.filter(
    (question) => question.toeicPart === ToeicPart.PART6 || question.toeicPart === ToeicPart.PART7,
  );

  const miniTestQuestions = [...grammarQuestions.slice(0, 10), ...readingQuestions.slice(0, 10)];
  const tests = [
    { title: 'TOEIC Mini Test - 20 Questions', description: '20 題混合短測驗：Part 5、Part 6、Part 7。', timeLimitMin: 25, questions: miniTestQuestions },
    { title: 'TOEIC Reading Test - Part 6 and Part 7', description: '20 題閱讀測驗，包含短文填空與閱讀理解。', timeLimitMin: 35, questions: readingQuestions },
    { title: 'TOEIC Grammar Practice - Part 5', description: '20 題 Part 5 文法與單字練習。', timeLimitMin: 20, questions: grammarQuestions },
  ];

  for (const test of tests) {
    await prisma.test.create({
      data: {
        title: test.title,
        description: test.description,
        isPublished: true,
        timeLimitMin: test.timeLimitMin,
        questions: {
          create: test.questions.map((question, index) => ({
            questionId: question.id,
            order: index + 1,
            points: 1,
          })),
        },
      },
    });
  }

  console.log('Seed completed:', {
    admin: admin.email,
    user: user.email,
    vocabulary: TOEIC_VOCABULARY.length,
    part5: grammarQuestions.length,
    part6: createdQuestions.filter((question) => question.toeicPart === ToeicPart.PART6).length,
    part7: createdQuestions.filter((question) => question.toeicPart === ToeicPart.PART7).length,
    lessons: 7,
    tests: tests.map((test) => test.title),
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
