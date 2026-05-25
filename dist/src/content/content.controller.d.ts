import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ContentService } from './content.service';
export declare class ContentController {
    private readonly content;
    constructor(content: ContentService);
    lessons(query: {
        part?: string;
        level?: string;
    }): import("./content.types").ToeicLesson[];
    lesson(id: string): import("./content.types").ToeicLesson;
    generate(body: {
        topic?: string;
        difficulty?: string;
        count?: number;
    }): import("./content.types").GeneratedQuestion[];
    vocabulary(query: {
        tag?: string;
        category?: string;
        level?: string;
    }): import(".prisma/client").Prisma.PrismaPromise<{
        tags: string[];
        word: string;
        partOfSpeech: string | null;
        meaningVi: string | null;
        meaningZhTW: string;
        example: string | null;
        collocations: string[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        source: import(".prisma/client").$Enums.ContentSource;
        sourceRef: string | null;
        exampleZhTW: string | null;
        exampleVi: string | null;
        toeicCategory: string | null;
        cefrLevel: import(".prisma/client").$Enums.CefrLevel | null;
        frequencyScore: number;
        synonyms: string[];
        antonyms: string[];
        level: import(".prisma/client").$Enums.SkillLevel;
        nextReviewAt: Date | null;
        reviewCount: number;
        easeFactor: number;
    }[]>;
    review(user: CurrentUserPayload): Promise<{
        summaryZhTW: string;
        summaryVi: string;
        weakParts: import(".prisma/client").$Enums.ToeicPart[];
        weakTags: string[];
        recentlyWrongQuestions: {
            questionId: string;
            prompt: string;
            toeicPart: import(".prisma/client").$Enums.ToeicPart;
            tags: string[];
        }[];
        dailyReviewSet: import("./content.types").GeneratedQuestion[];
        vocabularyReview: import("./data/vocabulary").LocalVocabularyItem[];
        grammarPatternReview: {
            id: string;
            title: string;
            learningGoalVi: string;
            learningGoalZhTW: string;
            reviewTags: string[];
        }[];
        beginnerRecommendedReview: {
            lessonId: string;
            reasonVi: string;
            reasonZhTW: string;
        }[];
        progressMetadata: {
            completedAttempts: number;
            wrongAnswerCount: number;
            generatedAt: string;
            source: string;
        };
        actionPlan: {
            day: number;
            taskZhTW: string;
            taskVi: string;
            focus: import(".prisma/client").$Enums.ToeicPart;
        }[];
    }>;
}
