import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboard;
    constructor(dashboard: DashboardService);
    me(user: CurrentUserPayload): Promise<{
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
}
