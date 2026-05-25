import { ContentImportService } from './content-import.service';
import { ImportQuestionJsonDto, ImportVocabularyCsvDto } from './dto';
export declare class ContentImportController {
    private readonly imports;
    constructor(imports: ContentImportService);
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
}
