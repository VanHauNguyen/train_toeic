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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async me(userId) {
        const attempts = await this.prisma.testAttempt.findMany({
            where: { userId, status: 'COMPLETED' },
            include: { test: true, answers: { include: { question: true } } },
            orderBy: { completedAt: 'desc' },
            take: 10,
        });
        const totalAttempts = attempts.length;
        const averageScore = totalAttempts
            ? Math.round(attempts.reduce((sum, attempt) => sum + (attempt.score ?? 0), 0) / totalAttempts)
            : 0;
        const totalAnswers = attempts.reduce((sum, attempt) => sum + attempt.answers.length, 0);
        const totalCorrect = attempts.reduce((sum, attempt) => sum + attempt.answers.filter((answer) => answer.isCorrect).length, 0);
        const correctRate = totalAnswers ? Number(((totalCorrect / totalAnswers) * 100).toFixed(1)) : 0;
        const partStats = new Map();
        const missedTags = new Map();
        for (const attempt of attempts) {
            for (const answer of attempt.answers) {
                const key = answer.question.toeicPart;
                const stat = partStats.get(key) ?? { total: 0, correct: 0 };
                stat.total += 1;
                if (answer.isCorrect)
                    stat.correct += 1;
                if (!answer.isCorrect) {
                    for (const tag of answer.question.tags)
                        missedTags.set(tag, (missedTags.get(tag) ?? 0) + 1);
                }
                partStats.set(key, stat);
            }
        }
        const weakToeicParts = [...partStats.entries()]
            .map(([part, stat]) => ({ part, correctRate: stat.total ? stat.correct / stat.total : 0 }))
            .sort((a, b) => a.correctRate - b.correctRate)
            .slice(0, 3)
            .map((item) => item.part);
        return {
            totalAttempts,
            averageScore,
            correctRate,
            weakToeicParts,
            recentAttempts: attempts.map((attempt) => ({
                id: attempt.id,
                testTitle: attempt.test.title,
                score: attempt.score,
                completedAt: attempt.completedAt,
            })),
            recommendedNextActions: this.recommend(weakToeicParts, correctRate, [...missedTags.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([tag]) => tag)),
        };
    }
    async adminAnalytics() {
        const [totalQuestions, approvedQuestions, aiGeneratedQuestions, totalVocabulary, attempts, difficultQuestions,] = await Promise.all([
            this.prisma.question.count(),
            this.prisma.question.count({ where: { approvalStatus: 'APPROVED' } }),
            this.prisma.aiGeneratedQuestion.count(),
            this.prisma.vocabulary.count(),
            this.prisma.testAttempt.findMany({
                where: { status: 'COMPLETED' },
                include: { answers: { include: { question: true } } },
            }),
            this.prisma.question.findMany({
                include: { userAnswers: true },
                take: 500,
            }),
        ]);
        const partStats = new Map();
        const missed = new Map();
        for (const attempt of attempts) {
            for (const answer of attempt.answers) {
                const stat = partStats.get(answer.question.toeicPart) ?? { total: 0, correct: 0 };
                stat.total += 1;
                if (answer.isCorrect)
                    stat.correct += 1;
                partStats.set(answer.question.toeicPart, stat);
            }
        }
        for (const question of difficultQuestions) {
            const total = question.userAnswers.length;
            const wrong = question.userAnswers.filter((answer) => !answer.isCorrect).length;
            if (total > 0 && wrong > 0)
                missed.set(question.id, { questionId: question.id, prompt: question.prompt, toeicPart: question.toeicPart, missed: wrong, total });
        }
        return {
            totalQuestions,
            approvedQuestions,
            aiGeneratedQuestions,
            totalVocabulary,
            userAccuracyByToeicPart: [...partStats.entries()].map(([toeicPart, stat]) => ({
                toeicPart,
                total: stat.total,
                correctRate: stat.total ? Number(((stat.correct / stat.total) * 100).toFixed(1)) : 0,
            })),
            difficultQuestions: [...missed.values()]
                .map((item) => ({ ...item, missRate: Number(((item.missed / item.total) * 100).toFixed(1)) }))
                .sort((a, b) => b.missRate - a.missRate)
                .slice(0, 10),
            commonlyMissedQuestions: [...missed.values()].sort((a, b) => b.missed - a.missed).slice(0, 10),
        };
    }
    recommend(weakToeicParts, correctRate, missedTags) {
        if (!weakToeicParts.length)
            return ['完成第一回模擬測驗，建立能力基準。'];
        const actions = weakToeicParts.map((part) => `加強 ${part} 題型，先複習錯題再做短練習。`);
        if (correctRate < 70)
            actions.push('每天安排 20 分鐘單字與文法基礎複習。');
        if (missedTags.length)
            actions.push(`針對常錯主題 ${missedTags.join('、')} 建立個人化練習。`);
        return actions;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map