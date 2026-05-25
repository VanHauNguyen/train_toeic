import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dto';
export declare class QuestionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(query?: Record<string, string | undefined>): Promise<{
        data: ({
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
        })[];
        meta: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }> | Prisma.PrismaPromise<({
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
    })[]>;
    findOne(id: string): Promise<{
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
    }>;
    create(dto: CreateQuestionDto): Prisma.Prisma__QuestionClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: string, dto: UpdateQuestionDto): Promise<{
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
    }>;
    remove(id: string): Prisma.Prisma__QuestionClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    private validateOptions;
    private duplicateKey;
}
