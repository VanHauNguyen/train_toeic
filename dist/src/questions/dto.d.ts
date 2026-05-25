import { ApprovalStatus, ContentSource, QuestionType, SkillLevel, ToeicPart } from '@prisma/client';
export declare class QuestionOptionDto {
    label: string;
    text: string;
    textZhTW?: string;
    textVi?: string;
    isCorrect: boolean;
}
export declare class CreateQuestionDto {
    type: QuestionType;
    toeicPart: ToeicPart;
    prompt: string;
    questionTextZhTW?: string;
    questionTextVi?: string;
    passage?: string;
    passageZhTW?: string;
    passageVi?: string;
    explanation?: string;
    explanationZhTW?: string;
    explanationVi?: string;
    difficulty?: SkillLevel;
    tags?: string[];
    source?: ContentSource;
    approvalStatus?: ApprovalStatus;
    sourceRef?: string;
    duplicateKey?: string;
    audioFileId?: string;
    options: QuestionOptionDto[];
}
export declare class UpdateQuestionDto extends CreateQuestionDto {
}
