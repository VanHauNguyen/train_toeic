import { SkillLevel } from '@prisma/client';
export type LocalVocabularyItem = {
    word: string;
    partOfSpeech: string;
    meaningVi: string;
    meaningZhTW: string;
    example: string;
    exampleMeaningVi: string;
    exampleMeaningZhTW: string;
    collocations: string[];
    difficulty: SkillLevel;
    tags: string[];
};
export declare const TOEIC_VOCABULARY: LocalVocabularyItem[];
