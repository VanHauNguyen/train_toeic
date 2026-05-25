import { SkillLevel, ToeicPart } from '@prisma/client';
export type LessonExample = {
    english: string;
    meaningVi: string;
    meaningZhTW: string;
    grammarNoteVi: string;
    grammarNoteZhTW: string;
};
export type LessonExercise = {
    id?: string;
    question: string;
    options: {
        label: 'A' | 'B' | 'C' | 'D';
        text: string;
    }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    explanationVi: string;
    explanationZhTW: string;
    difficulty: SkillLevel;
    tags: string[];
};
export type ToeicLesson = {
    id: string;
    title: string;
    subtitle: string;
    part: ToeicPart;
    level: SkillLevel;
    estimatedMinutes: number;
    learningGoalVi: string;
    learningGoalZhTW: string;
    explanationVi: string;
    explanationZhTW: string;
    keyPatterns: {
        pattern: string;
        meaningVi: string;
        meaningZhTW: string;
    }[];
    commonMistakes: {
        mistake: string;
        fixVi: string;
        fixZhTW: string;
    }[];
    toeicTraps: {
        trapVi: string;
        trapZhTW: string;
    }[];
    examples: LessonExample[];
    vocabulary: {
        word: string;
        partOfSpeech: string;
        meaningVi: string;
        meaningZhTW: string;
        example: string;
        exampleMeaningVi: string;
        exampleMeaningZhTW: string;
        collocations: string[];
    }[];
    grammarPoint: string;
    tips: {
        zhTW: string;
        vi: string;
    }[];
    miniPractice: LessonExercise[];
    exercises: LessonExercise[];
    answerKey: {
        question: number;
        answer: 'A' | 'B' | 'C' | 'D';
        explanationZhTW: string;
        explanationVi: string;
    }[];
    reviewTags: string[];
    nextLessonIds: string[];
};
export type GeneratedQuestion = {
    id: string;
    toeicPart: ToeicPart;
    topic: string;
    difficulty: SkillLevel;
    question: string;
    prompt: string;
    options: {
        label: 'A' | 'B' | 'C' | 'D';
        text: string;
    }[];
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    explanationZhTW: string;
    explanationVi: string;
    tags: string[];
};
