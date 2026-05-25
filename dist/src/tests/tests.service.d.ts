import { PrismaService } from '../prisma/prisma.service';
import { AddQuestionToTestDto, CreateTestDto, SubmitAttemptDto, UpdateTestDto } from './dto';
export declare class TestsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        questions: ({
            question: {
                tags: string[];
                difficulty: import(".prisma/client").$Enums.SkillLevel;
                type: import(".prisma/client").$Enums.QuestionType;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                toeicPart: import(".prisma/client").$Enums.ToeicPart;
                prompt: string;
                questionTextZhTW: string | null;
                questionTextVi: string | null;
                passage: string | null;
                passageZhTW: string | null;
                passageVi: string | null;
                explanation: string | null;
                explanationZhTW: string | null;
                explanationVi: string | null;
                source: import(".prisma/client").$Enums.ContentSource;
                sourceRef: string | null;
                approvalStatus: import(".prisma/client").$Enums.ApprovalStatus;
                duplicateKey: string | null;
                audioFileId: string | null;
            };
        } & {
            id: string;
            testId: string;
            questionId: string;
            order: number;
            points: number;
        })[];
    } & {
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        timeLimitMin: number | null;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TestClient<{
        questions: ({
            question: {
                options: {
                    id: string;
                    createdAt: Date;
                    questionId: string;
                    isCorrect: boolean;
                    label: string;
                    text: string;
                    textZhTW: string | null;
                    textVi: string | null;
                }[];
            } & {
                tags: string[];
                difficulty: import(".prisma/client").$Enums.SkillLevel;
                type: import(".prisma/client").$Enums.QuestionType;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                toeicPart: import(".prisma/client").$Enums.ToeicPart;
                prompt: string;
                questionTextZhTW: string | null;
                questionTextVi: string | null;
                passage: string | null;
                passageZhTW: string | null;
                passageVi: string | null;
                explanation: string | null;
                explanationZhTW: string | null;
                explanationVi: string | null;
                source: import(".prisma/client").$Enums.ContentSource;
                sourceRef: string | null;
                approvalStatus: import(".prisma/client").$Enums.ApprovalStatus;
                duplicateKey: string | null;
                audioFileId: string | null;
            };
        } & {
            id: string;
            testId: string;
            questionId: string;
            order: number;
            points: number;
        })[];
    } & {
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        timeLimitMin: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    create(dto: CreateTestDto): import(".prisma/client").Prisma.Prisma__TestClient<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        timeLimitMin: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateTestDto): import(".prisma/client").Prisma.Prisma__TestClient<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        timeLimitMin: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TestClient<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isPublished: boolean;
        timeLimitMin: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    addQuestion(testId: string, dto: AddQuestionToTestDto): import(".prisma/client").Prisma.Prisma__TestQuestionClient<{
        id: string;
        testId: string;
        questionId: string;
        order: number;
        points: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    startAttempt(testId: string, userId: string): Promise<{
        id: string;
        testId: string;
        userId: string;
        status: import(".prisma/client").$Enums.AttemptStatus;
        score: number | null;
        totalQuestions: number;
        correctCount: number;
        startedAt: Date;
        completedAt: Date | null;
    }>;
    submitAttempt(attemptId: string, userId: string, dto: SubmitAttemptDto): Promise<{
        attemptId: string;
        testId: string;
        testTitle: string;
        status: import(".prisma/client").$Enums.AttemptStatus;
        score: number;
        correctCount: number;
        totalCount: number;
        correctRate: number;
        weakToeicParts: import(".prisma/client").$Enums.ToeicPart[];
        startedAt: Date;
        completedAt: Date | null;
    }>;
    result(attemptId: string, userId: string): Promise<{
        attemptId: string;
        testId: string;
        testTitle: string;
        status: import(".prisma/client").$Enums.AttemptStatus;
        score: number;
        correctCount: number;
        totalCount: number;
        correctRate: number;
        weakToeicParts: import(".prisma/client").$Enums.ToeicPart[];
        startedAt: Date;
        completedAt: Date | null;
    }>;
    review(attemptId: string, userId: string): Promise<{
        attemptId: string;
        testTitle: string;
        items: {
            order: number;
            question: {
                options: {
                    id: string;
                    createdAt: Date;
                    questionId: string;
                    isCorrect: boolean;
                    label: string;
                    text: string;
                    textZhTW: string | null;
                    textVi: string | null;
                }[];
            } & {
                tags: string[];
                difficulty: import(".prisma/client").$Enums.SkillLevel;
                type: import(".prisma/client").$Enums.QuestionType;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                toeicPart: import(".prisma/client").$Enums.ToeicPart;
                prompt: string;
                questionTextZhTW: string | null;
                questionTextVi: string | null;
                passage: string | null;
                passageZhTW: string | null;
                passageVi: string | null;
                explanation: string | null;
                explanationZhTW: string | null;
                explanationVi: string | null;
                source: import(".prisma/client").$Enums.ContentSource;
                sourceRef: string | null;
                approvalStatus: import(".prisma/client").$Enums.ApprovalStatus;
                duplicateKey: string | null;
                audioFileId: string | null;
            };
            selectedAnswer: {
                id: string;
                createdAt: Date;
                questionId: string;
                isCorrect: boolean;
                label: string;
                text: string;
                textZhTW: string | null;
                textVi: string | null;
            } | null;
            correctAnswer: {
                id: string;
                createdAt: Date;
                questionId: string;
                isCorrect: boolean;
                label: string;
                text: string;
                textZhTW: string | null;
                textVi: string | null;
            } | undefined;
            isCorrect: boolean;
            englishExplanation: string | null;
            explanationZhTW: string | null;
            explanationVi: string | null;
            toeicPart: import(".prisma/client").$Enums.ToeicPart;
            mistakeTypeSuggestion: "READING" | "GRAMMAR" | "VOCABULARY" | null;
        }[];
    }>;
    private getOwnedCompletedAttempt;
    private weakToeicParts;
    private suggestMistakeType;
}
