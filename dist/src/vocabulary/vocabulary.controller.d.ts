import { CreateVocabularyDto, UpdateVocabularyDto } from './dto';
import { VocabularyService } from './vocabulary.service';
export declare class VocabularyController {
    private readonly vocabulary;
    constructor(vocabulary: VocabularyService);
    findAll(query: Record<string, string | undefined>): Promise<{
        meaningZhTw: string;
        exampleZhTw: string | null;
        meaningZhTW: string;
        exampleZhTW: string | null;
    }[] | {
        data: {
            meaningZhTw: string;
            exampleZhTw: string | null;
            meaningZhTW: string;
            exampleZhTW: string | null;
        }[];
        meta: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        meaningZhTw: string;
        exampleZhTw: string | null;
        meaningZhTW: string;
        exampleZhTW: string | null;
    }>;
    create(dto: CreateVocabularyDto): Promise<{
        meaningZhTw: string;
        exampleZhTw: string | null;
        meaningZhTW: string;
        exampleZhTW: string | null;
    }>;
    update(id: string, dto: UpdateVocabularyDto): Promise<{
        meaningZhTw: string;
        exampleZhTw: string | null;
        meaningZhTW: string;
        exampleZhTW: string | null;
    }>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__VocabularyClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
