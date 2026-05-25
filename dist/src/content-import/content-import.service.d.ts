import { PrismaService } from '../prisma/prisma.service';
import { ImportQuestionJsonDto, ImportVocabularyCsvDto } from './dto';
export declare class ContentImportService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    importVocabularyCsv(dto: ImportVocabularyCsvDto): Promise<{
        importedCount: number;
        skippedCount: number;
        skipped: {
            word?: string;
            reason: string;
        }[];
        items: unknown[];
    }>;
    importQuestionJson(dto: ImportQuestionJsonDto): Promise<{
        importedCount: number;
        skippedCount: number;
        skipped: {
            prompt?: string;
            reason: string;
        }[];
        questions: unknown[];
    }>;
    private parseCsv;
    private parseCsvLine;
    private splitList;
    private duplicateKey;
    private optionalString;
    private enumValue;
}
