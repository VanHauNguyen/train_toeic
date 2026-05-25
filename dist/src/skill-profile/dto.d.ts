import { SkillLevel, ToeicPart } from '@prisma/client';
export declare class UpdateUserSkillProfileDto {
    estimatedLevel?: SkillLevel;
    weakParts?: ToeicPart[];
    strongParts?: ToeicPart[];
    vocabularyLevel?: SkillLevel;
    grammarLevel?: SkillLevel;
    listeningLevel?: SkillLevel;
    readingLevel?: SkillLevel;
}
