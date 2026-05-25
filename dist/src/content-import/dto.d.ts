export declare class ImportVocabularyCsvDto {
    csv: string;
    sourceRef?: string;
}
export declare class ImportQuestionJsonDto {
    questions: Record<string, unknown>[];
    sourceRef?: string;
    approve?: boolean;
}
