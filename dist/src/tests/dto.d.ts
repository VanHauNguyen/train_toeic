export declare class CreateTestDto {
    title: string;
    description?: string;
    isPublished?: boolean;
    timeLimitMin?: number;
}
export declare class UpdateTestDto extends CreateTestDto {
}
export declare class AddQuestionToTestDto {
    questionId: string;
    order: number;
    points?: number;
}
export declare class AnswerDto {
    questionId: string;
    selectedOptionId?: string;
}
export declare class SubmitAttemptDto {
    answers: AnswerDto[];
}
