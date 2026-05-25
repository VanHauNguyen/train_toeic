import { CefrLevel, ContentSource, SkillLevel } from '@prisma/client';
export declare class CreateVocabularyDto {
    word: string;
    meaningZhTW?: string;
    meaningVi?: string;
    meaningZhTw?: string;
    partOfSpeech?: string;
    example?: string;
    exampleZhTW?: string;
    exampleVi?: string;
    exampleZhTw?: string;
    tags?: string[];
    toeicCategory?: string;
    cefrLevel?: CefrLevel;
    frequencyScore?: number;
    synonyms?: string[];
    antonyms?: string[];
    collocations?: string[];
    source?: ContentSource;
    sourceRef?: string;
    level?: SkillLevel;
}
export declare class UpdateVocabularyDto extends CreateVocabularyDto {
}
