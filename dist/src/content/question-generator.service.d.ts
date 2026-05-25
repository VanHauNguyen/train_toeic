import { GeneratedQuestion } from './content.types';
export declare class QuestionGeneratorService {
    generate(input: {
        topic?: string;
        difficulty?: string;
        count?: number;
    }): GeneratedQuestion[];
    private byDifficulty;
    private unique;
    private normalizeTopic;
    private normalizeDifficulty;
    private stableOffset;
}
