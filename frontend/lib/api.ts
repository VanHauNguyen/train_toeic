import axios from "axios";
import { clearStoredAuth, getStoredToken } from "@/store/auth-store";
import type {
  AuthResponse,
  Dashboard,
  GeneratedQuestion,
  Question,
  ReviewPlan,
  SkillProfile,
  Test,
  TestAttempt,
  TestResult,
  TestReview,
  ToeicLesson,
  User,
  UserAnswer,
  UserLanguage,
  Vocabulary,
} from "@/types/api";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001",
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) clearStoredAuth();
    return Promise.reject(error);
  },
);

export const authApi = {
  login: (payload: { email: string; password: string }) =>
    api.post<AuthResponse>("/auth/login", payload).then((res) => res.data),
  register: (payload: { email: string; password: string; name?: string }) =>
    api.post<AuthResponse>("/auth/register", payload).then((res) => res.data),
  me: () => api.get<User>("/auth/me").then((res) => res.data),
};

export const usersApi = {
  list: () => api.get<User[]>("/users").then((res) => res.data),
  me: () => api.get<User>("/users/me").then((res) => res.data),
  updateMe: (payload: { preferredLanguage?: UserLanguage }) => api.patch<User>("/users/me", payload).then((res) => res.data),
};

export const vocabularyApi = {
  list: () => api.get<Vocabulary[]>("/vocabulary").then((res) => res.data),
  get: (id: string) => api.get<Vocabulary>(`/vocabulary/${id}`).then((res) => res.data),
  create: (payload: Partial<Vocabulary>) => api.post<Vocabulary>("/vocabulary", payload).then((res) => res.data),
  update: (id: string, payload: Partial<Vocabulary>) =>
    api.patch<Vocabulary>(`/vocabulary/${id}`, payload).then((res) => res.data),
  remove: (id: string) => api.delete(`/vocabulary/${id}`).then((res) => res.data),
};

export const questionsApi = {
  list: () => api.get<Question[]>("/questions").then((res) => res.data),
  get: (id: string) => api.get<Question>(`/questions/${id}`).then((res) => res.data),
  create: (payload: {
    type?: string;
    toeicPart?: string;
    prompt?: string;
    passage?: string;
    explanation?: string;
    difficulty?: string;
    tags?: string[];
    options?: { label: string; text: string; isCorrect: boolean }[];
  }) => api.post<Question>("/questions", payload).then((res) => res.data),
  update: (id: string, payload: {
    type?: string;
    toeicPart?: string;
    prompt?: string;
    passage?: string;
    explanation?: string;
    difficulty?: string;
    tags?: string[];
    options?: { label: string; text: string; isCorrect: boolean }[];
  }) =>
    api.patch<Question>(`/questions/${id}`, payload).then((res) => res.data),
  remove: (id: string) => api.delete(`/questions/${id}`).then((res) => res.data),
};

export const testsApi = {
  list: () => api.get<Test[]>("/tests").then((res) => res.data),
  get: (id: string) => api.get<Test>(`/tests/${id}`).then((res) => res.data),
  create: (payload: Partial<Test>) => api.post<Test>("/tests", payload).then((res) => res.data),
  update: (id: string, payload: Partial<Test>) => api.patch<Test>(`/tests/${id}`, payload).then((res) => res.data),
  remove: (id: string) => api.delete(`/tests/${id}`).then((res) => res.data),
  addQuestion: (id: string, payload: { questionId: string; order: number; points?: number }) =>
    api.post(`/tests/${id}/questions`, payload).then((res) => res.data),
  startAttempt: (id: string) => api.post<TestAttempt>(`/tests/${id}/attempts`).then((res) => res.data),
  submitAttempt: (attemptId: string, answers: UserAnswer[]) =>
    api.post<TestResult>(`/tests/attempts/${attemptId}/submit`, { answers }).then((res) => res.data),
  result: (attemptId: string) => api.get<TestResult>(`/tests/attempts/${attemptId}/result`).then((res) => res.data),
  review: (attemptId: string) => api.get<TestReview>(`/tests/attempts/${attemptId}/review`).then((res) => res.data),
};

export const dashboardApi = {
  me: () => api.get<Dashboard>("/dashboard/me").then((res) => res.data),
};

export const skillProfileApi = {
  me: () => api.get<SkillProfile>("/skill-profile/me").then((res) => res.data),
  update: (payload: Partial<SkillProfile>) => api.patch<SkillProfile>("/skill-profile/me", payload).then((res) => res.data),
};

export const contentApi = {
  lessons: (params?: { part?: string; level?: string }) => api.get<ToeicLesson[]>("/api/lessons", { params }).then((res) => res.data),
  lesson: (id: string) => api.get<ToeicLesson>(`/api/lessons/${id}`).then((res) => res.data),
  vocabulary: (params?: { tag?: string; category?: string; level?: string }) =>
    api.get<Vocabulary[]>("/api/vocabulary", { params }).then((res) => res.data),
  review: () => api.get<ReviewPlan>("/api/review").then((res) => res.data),
  generateQuestions: (payload: { topic: string; difficulty: string; count: number }) =>
    api.post<GeneratedQuestion[]>("/api/questions/generate", payload).then((res) => res.data),
};
