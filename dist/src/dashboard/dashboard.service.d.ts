import { PrismaService } from '../prisma/prisma.service';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    me(userId: string): Promise<{
        totalAttempts: number;
        averageScore: number;
        correctRate: number;
        weakToeicParts: string[];
        recentAttempts: {
            id: string;
            testTitle: string;
            score: number | null;
            completedAt: Date | null;
        }[];
        recommendedNextActions: string[];
    }>;
    adminAnalytics(): Promise<{
        totalQuestions: number;
        approvedQuestions: number;
        aiGeneratedQuestions: number;
        totalVocabulary: number;
        userAccuracyByToeicPart: {
            toeicPart: string;
            total: number;
            correctRate: number;
        }[];
        difficultQuestions: {
            missRate: number;
            questionId: string;
            prompt: string;
            toeicPart: string;
            missed: number;
            total: number;
        }[];
        commonlyMissedQuestions: {
            questionId: string;
            prompt: string;
            toeicPart: string;
            missed: number;
            total: number;
        }[];
    }>;
    private recommend;
}
