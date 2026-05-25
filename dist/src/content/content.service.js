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
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma/prisma.service");
const question_bank_1 = require("./data/question-bank");
const lessons_1 = require("./data/lessons");
const vocabulary_1 = require("./data/vocabulary");
const question_generator_service_1 = require("./question-generator.service");
let ContentService = class ContentService {
    constructor(prisma, generator) {
        this.prisma = prisma;
        this.generator = generator;
    }
    lessons(query = {}) {
        return lessons_1.TOEIC_LESSONS.filter((lesson) => {
            if (query.part && lesson.part !== query.part)
                return false;
            if (query.level && lesson.level !== query.level)
                return false;
            return true;
        });
    }
    lesson(id) {
        const lesson = lessons_1.TOEIC_LESSONS.find((item) => item.id === id);
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        return lesson;
    }
    generateQuestions(input) {
        return this.generator.generate(input);
    }
    vocabulary(query = {}) {
        const where = {};
        if (query.tag)
            where.tags = { has: query.tag };
        if (query.category)
            where.toeicCategory = query.category;
        if (query.level && Object.values(client_1.SkillLevel).includes(query.level))
            where.level = query.level;
        return this.prisma.vocabulary.findMany({ where, orderBy: [{ frequencyScore: 'desc' }, { word: 'asc' }] });
    }
    async review(userId) {
        const recentAttempts = await this.prisma.testAttempt.findMany({
            where: { userId, status: 'COMPLETED' },
            orderBy: { completedAt: 'desc' },
            take: 5,
            include: { answers: { include: { question: true } }, test: true },
        });
        const wrongAnswers = recentAttempts.flatMap((attempt) => attempt.answers.filter((answer) => !answer.isCorrect));
        const weakParts = [...new Set(wrongAnswers.map((answer) => answer.question.toeicPart))];
        const weakTags = [...new Set(wrongAnswers.flatMap((answer) => answer.question.tags))].filter(Boolean);
        const recommendedTags = weakTags.length ? weakTags : ['word forms', 'prepositions', 'tense'];
        const dailyReviewSet = question_bank_1.TOEIC_PART5_QUESTION_BANK.filter((question) => recommendedTags.some((tag) => question.tags.includes(tag) || question.topic === tag)).slice(0, 10);
        const vocabularyReview = vocabulary_1.TOEIC_VOCABULARY.filter((item) => item.tags.some((tag) => ['business-email', 'meeting', 'invoice-payment', 'customer-service'].includes(tag))).slice(0, 10);
        const grammarPatternReview = lessons_1.TOEIC_LESSONS.filter((lesson) => lesson.reviewTags.some((tag) => recommendedTags.includes(tag))).slice(0, 5);
        return {
            summaryZhTW: wrongAnswers.length
                ? `最近 ${recentAttempts.length} 次測驗有 ${wrongAnswers.length} 題需要複習。先從 ${weakParts.join('、') || 'Part 5'} 和 ${recommendedTags.slice(0, 3).join('、')} 開始，每天做 5 題短練習。`
                : '目前沒有明顯錯題。建議從 Part 5 基礎文法、商務 email 單字和短句練習開始，讓記憶穩定下來。',
            summaryVi: wrongAnswers.length
                ? `Trong ${recentAttempts.length} bài gần đây có ${wrongAnswers.length} câu cần ôn lại. Hãy bắt đầu với ${weakParts.join(', ') || 'Part 5'} và các thẻ ${recommendedTags.slice(0, 3).join(', ')}.`
                : 'Hiện chưa có lỗi sai rõ ràng. Hãy bắt đầu với ngữ pháp Part 5 cơ bản, từ vựng email công việc và 5 câu ngắn mỗi ngày.',
            weakParts,
            weakTags: recommendedTags,
            recentlyWrongQuestions: wrongAnswers.slice(0, 10).map((answer) => ({
                questionId: answer.questionId,
                prompt: answer.question.prompt,
                toeicPart: answer.question.toeicPart,
                tags: answer.question.tags,
            })),
            dailyReviewSet,
            vocabularyReview,
            grammarPatternReview: grammarPatternReview.map((lesson) => ({
                id: lesson.id,
                title: lesson.title,
                learningGoalVi: lesson.learningGoalVi,
                learningGoalZhTW: lesson.learningGoalZhTW,
                reviewTags: lesson.reviewTags,
            })),
            beginnerRecommendedReview: [
                { lessonId: 'grammar-subject-verb', reasonVi: 'Nền tảng để hiểu câu.', reasonZhTW: '這是看懂句子的基礎。' },
                { lessonId: 'grammar-word-classes', reasonVi: 'Giúp làm dạng word form dễ hơn.', reasonZhTW: '能幫助解字形題。' },
                { lessonId: 'grammar-prepositions-time', reasonVi: 'TOEIC Part 5 rất hay hỏi thời gian.', reasonZhTW: 'Part 5 很常考時間介系詞。' },
            ],
            progressMetadata: {
                completedAttempts: recentAttempts.length,
                wrongAnswerCount: wrongAnswers.length,
                generatedAt: new Date().toISOString(),
                source: 'deterministic-review-v1',
            },
            actionPlan: Array.from({ length: 7 }, (_, index) => ({
                day: index + 1,
                taskZhTW: index < 3 ? '完成 5 題 Part 5 基礎題，寫下錯題原因。' : index < 5 ? '複習 10 個商務單字並造 1 個短句。' : '做一篇短閱讀，先看題目再找關鍵字。',
                taskVi: index < 3 ? 'Làm 5 câu Part 5 cơ bản và ghi một lý do sai thật ngắn.' : index < 5 ? 'Ôn 10 từ vựng công việc và đặt 1 câu ngắn.' : 'Làm một bài đọc ngắn: xem câu hỏi trước rồi tìm từ khóa.',
                focus: weakParts[index % Math.max(weakParts.length, 1)] ?? client_1.ToeicPart.PART5,
            })),
        };
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        question_generator_service_1.QuestionGeneratorService])
], ContentService);
//# sourceMappingURL=content.service.js.map