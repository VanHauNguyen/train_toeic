export type UserRole = "USER" | "ADMIN";
export type UserLanguage = "EN" | "ZH_TW" | "VI";
export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type QuestionType = "LISTENING" | "READING" | "GRAMMAR" | "VOCABULARY";
export type ToeicPart = "PART1" | "PART2" | "PART3" | "PART4" | "PART5" | "PART6" | "PART7";
export type AttemptStatus = "IN_PROGRESS" | "COMPLETED";
export type MistakeType =
  | "GRAMMAR"
  | "VOCABULARY"
  | "LISTENING"
  | "READING"
  | "TRAP_OPTION"
  | "TIME_MANAGEMENT"
  | "UNKNOWN";

export type User = {
  id: string;
  email: string;
  name?: string | null;
  role: UserRole;
  preferredLanguage?: UserLanguage;
  createdAt?: string;
  skillProfile?: SkillProfile | null;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
};

export type Vocabulary = {
  id: string;
  word: string;
  meaningZhTW: string;
  meaningZhTw: string;
  meaningVi?: string | null;
  partOfSpeech?: string | null;
  example?: string | null;
  exampleZhTW?: string | null;
  exampleZhTw?: string | null;
  exampleVi?: string | null;
  tags: string[];
  level: SkillLevel;
};

export type QuestionOption = {
  id: string;
  questionId?: string;
  label: string;
  text: string;
  textZhTW?: string | null;
  textVi?: string | null;
  isCorrect: boolean;
};

export type Question = {
  id: string;
  type: QuestionType;
  toeicPart: ToeicPart;
  prompt: string;
  questionTextZhTW?: string | null;
  questionTextVi?: string | null;
  passage?: string | null;
  passageZhTW?: string | null;
  passageVi?: string | null;
  explanation?: string | null;
  explanationZhTW?: string | null;
  explanationVi?: string | null;
  difficulty: SkillLevel;
  tags: string[];
  options: QuestionOption[];
};

export type TestQuestion = {
  id: string;
  order: number;
  points: number;
  question: Question;
};

export type Test = {
  id: string;
  title: string;
  description?: string | null;
  isPublished: boolean;
  timeLimitMin?: number | null;
  questions: TestQuestion[];
};

export type TestAttempt = {
  id: string;
  testId: string;
  userId: string;
  status: AttemptStatus;
  score?: number | null;
  totalQuestions: number;
  correctCount: number;
  startedAt: string;
  completedAt?: string | null;
  answers?: UserAnswer[];
  test?: Test;
};

export type TestResult = {
  attemptId: string;
  testId: string;
  testTitle: string;
  status: AttemptStatus;
  score: number;
  correctCount: number;
  totalCount: number;
  correctRate: number;
  weakToeicParts: ToeicPart[];
  startedAt: string;
  completedAt?: string | null;
};

export type TestReviewItem = {
  order: number;
  question: Question;
  selectedAnswer?: QuestionOption | null;
  correctAnswer?: QuestionOption | null;
  isCorrect: boolean;
  englishExplanation?: string | null;
  explanationZhTW?: string | null;
  explanationVi?: string | null;
  toeicPart: ToeicPart;
  mistakeTypeSuggestion?: MistakeType | null;
};

export type TestReview = {
  attemptId: string;
  testTitle: string;
  items: TestReviewItem[];
};

export type UserAnswer = {
  id?: string;
  questionId: string;
  selectedOptionId?: string;
  isCorrect?: boolean;
};

export type Dashboard = {
  totalAttempts: number;
  averageScore: number;
  correctRate: number;
  weakToeicParts: ToeicPart[];
  recentAttempts: { id: string; testTitle: string; score: number | null; completedAt: string | null }[];
  recommendedNextActions: string[];
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
  keyPatterns: { pattern: string; meaningVi: string; meaningZhTW: string }[];
  commonMistakes: { mistake: string; fixVi: string; fixZhTW: string }[];
  toeicTraps: { trapVi: string; trapZhTW: string }[];
  examples: { english: string; meaningVi: string; meaningZhTW: string; grammarNoteVi: string; grammarNoteZhTW: string }[];
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
  tips: { zhTW: string; vi: string }[];
  miniPractice: LessonExercise[];
  exercises: LessonExercise[];
  answerKey: { question: number; answer: "A" | "B" | "C" | "D"; explanationZhTW: string; explanationVi: string }[];
  reviewTags: string[];
  nextLessonIds: string[];
};

export type LessonExercise = {
    id?: string;
    question: string;
    options: { label: "A" | "B" | "C" | "D"; text: string }[];
    correctAnswer: "A" | "B" | "C" | "D";
    explanationVi: string;
    explanationZhTW: string;
    difficulty: SkillLevel;
    tags: string[];
};

export type MistakeAnalysis = {
  id?: string;
  toeicPart: ToeicPart;
  mistakeType: MistakeType;
  topic?: string | null;
  summaryZhTw: string;
  suggestedImprovement: string;
};

export type MistakeAnalysisReport = {
  summaryZhTW: string;
  summaryVi: string;
  weakParts: ToeicPart[];
  mistakeTypes: MistakeType[];
  patterns: {
    titleZhTW: string;
    titleVi: string;
    evidence: string;
    suggestionZhTW: string;
    suggestionVi: string;
  }[];
  actionPlan: {
    day: number;
    taskZhTW: string;
    taskVi: string;
    focus: ToeicPart;
  }[];
};

export type SkillProfile = {
  id: string;
  estimatedLevel: SkillLevel;
  weakParts: ToeicPart[];
  strongParts: ToeicPart[];
  vocabularyLevel: SkillLevel;
  grammarLevel: SkillLevel;
  listeningLevel: SkillLevel;
  readingLevel: SkillLevel;
};

export type GeneratedQuestion = {
  id: string;
  toeicPart: ToeicPart;
  topic: string;
  difficulty: SkillLevel;
  question: string;
  prompt: string;
  options: { label: "A" | "B" | "C" | "D"; text: string }[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanationZhTW: string;
  explanationVi: string;
  tags: string[];
};

export type ReviewPlan = {
  summaryZhTW: string;
  summaryVi: string;
  weakParts: ToeicPart[];
  weakTags: string[];
  recentlyWrongQuestions: { questionId: string; prompt: string; toeicPart: ToeicPart; tags: string[] }[];
  dailyReviewSet: GeneratedQuestion[];
  vocabularyReview: {
    id?: string;
    word: string;
    meaningZhTW?: string;
    meaningZhTw?: string;
    meaningVi?: string | null;
    partOfSpeech?: string | null;
  }[];
  grammarPatternReview: { id: string; title: string; learningGoalVi: string; learningGoalZhTW: string; reviewTags: string[] }[];
  beginnerRecommendedReview: { lessonId: string; reasonVi: string; reasonZhTW: string }[];
  progressMetadata: { completedAttempts: number; wrongAnswerCount: number; generatedAt: string; source: string };
  actionPlan: { day: number; taskZhTW: string; taskVi: string; focus: ToeicPart }[];
};
