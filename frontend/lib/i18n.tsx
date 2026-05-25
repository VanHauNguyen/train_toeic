"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Locale = "en" | "zh-TW" | "vi";

const STORAGE_KEY = "toeic_locale";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  "zh-TW": "繁體中文",
  vi: "Tiếng Việt",
};

const messages = {
  en: {
    appSubtitle: "Multilingual TOEIC",
    learnerWorkspace: "Learning Workspace",
    adminWorkspace: "Admin Console",
    learnerTitle: "Offline-first TOEIC learning",
    adminTitle: "Admin center",
    dashboard: "Dashboard",
    vocabulary: "Vocabulary",
    tests: "Mock tests",
    aiTutor: "Guided lessons",
    grammarPractice: "Grammar practice",
    studyPlan: "Study plan",
    mistakeAnalysis: "Mistake analysis",
    skillProfile: "Skill profile",
    admin: "Admin",
    vocabularyAdmin: "Vocabulary admin",
    questionAdmin: "Question bank",
    testAdmin: "Test admin",
    generatedQuestions: "Template review",
    logout: "Log out",
    learner: "Learner",
    dashboardTitle: "Today",
    dashboardDescription: "Track test performance, weak TOEIC parts, and next actions.",
    completedTests: "Completed tests",
    averageScore: "Average score",
    correctRate: "Correct rate",
    weakParts: "Weak parts",
    recentScores: "Recent scores",
    nextActions: "Next actions",
    recentAnswers: "Recent attempts",
    test: "Test",
    score: "Score",
    completedAt: "Completed at",
    vocabularyTitle: "TOEIC vocabulary",
    vocabularyDescription: "Study English words with Traditional Chinese and Vietnamese meanings.",
    noVocabulary: "No vocabulary yet",
    noVocabularyDescription: "Ask an admin to add TOEIC vocabulary.",
    noExample: "No example yet",
    pronunciation: "Pronunciation",
    toeicExamples: "TOEIC examples",
    aiTutorTitle: "TOEIC guided lessons",
    aiTutorDescription: "Study short beginner-friendly lessons in Traditional Chinese and Vietnamese.",
    conversations: "Conversations",
    noConversations: "No conversations yet",
    startTutor: "Start guided lessons",
    startTutorDescription: "Try: 用繁體中文解釋, Giải thích bằng tiếng Việt, or Song ngữ Trung Việt.",
    tutorThinking: "Preparing a lesson...",
    tutorPlaceholder: "Type your TOEIC question...",
    bilingualMode: "Bilingual",
    bilingualLearning: "Bilingual learning",
    studyPlanTitle: "7-day personalized study plan",
    studyPlanDescription: "Built from recent tests, mistakes, and skill profile with deterministic rules.",
    regeneratePlan: "Refresh plan",
    generating: "Generating...",
    noPlan: "No study plan yet",
    noPlanDescription: "Generate a 7-day TOEIC study plan.",
  },
  "zh-TW": {
    appSubtitle: "多語 TOEIC",
    learnerWorkspace: "Learning Workspace",
    adminWorkspace: "Admin Console",
    learnerTitle: "離線優先 TOEIC 學習",
    adminTitle: "後台管理中心",
    dashboard: "學習總覽",
    vocabulary: "單字庫",
    tests: "模擬測驗",
    aiTutor: "引導課程",
    grammarPractice: "文法練習",
    studyPlan: "讀書計畫",
    mistakeAnalysis: "錯題分析",
    skillProfile: "能力檔案",
    admin: "管理總覽",
    vocabularyAdmin: "單字管理",
    questionAdmin: "題庫管理",
    testAdmin: "測驗管理",
    generatedQuestions: "模板題目",
    logout: "登出",
    learner: "學習者",
    dashboardTitle: "今日學習總覽",
    dashboardDescription: "追蹤模擬測驗表現、弱點題型與下一步學習建議。",
    completedTests: "完成測驗",
    averageScore: "平均分數",
    correctRate: "答對率",
    weakParts: "弱點題型",
    recentScores: "近期測驗分數",
    nextActions: "下一步建議",
    recentAnswers: "最近作答紀錄",
    test: "測驗",
    score: "分數",
    completedAt: "完成時間",
    vocabularyTitle: "TOEIC 單字庫",
    vocabularyDescription: "用繁體中文與越南文釋義建立 TOEIC 常用字彙基礎。",
    noVocabulary: "尚無單字",
    noVocabularyDescription: "請由管理員新增 TOEIC 單字資料。",
    noExample: "尚無例句",
    pronunciation: "發音",
    toeicExamples: "TOEIC 例句",
    aiTutorTitle: "TOEIC 引導課程",
    aiTutorDescription: "用繁體中文與越南文學習短小、清楚、低壓力的基礎課程。",
    conversations: "對話紀錄",
    noConversations: "尚無對話紀錄",
    startTutor: "開始引導課程",
    startTutorDescription: "例如：用繁體中文解釋、Giải thích bằng tiếng Việt、Song ngữ Trung Việt。",
    tutorThinking: "課程整理中...",
    tutorPlaceholder: "輸入你的 TOEIC 問題...",
    bilingualMode: "中越雙語",
    bilingualLearning: "雙語學習模式",
    studyPlanTitle: "7 天個人化讀書計畫",
    studyPlanDescription: "根據最近測驗、錯題與能力檔案，用固定規則建立讀書安排。",
    regeneratePlan: "更新計畫",
    generating: "產生中...",
    noPlan: "尚無讀書計畫",
    noPlanDescription: "產生一份 7 天 TOEIC 讀書計畫。",
  },
  vi: {
    appSubtitle: "TOEIC đa ngôn ngữ",
    learnerWorkspace: "Không gian học tập",
    adminWorkspace: "Trang quản trị",
    learnerTitle: "Học TOEIC ưu tiên ngoại tuyến",
    adminTitle: "Trung tâm quản trị",
    dashboard: "Tổng quan",
    vocabulary: "Từ vựng",
    tests: "Thi thử",
    aiTutor: "Bài học hướng dẫn",
    grammarPractice: "Luyện ngữ pháp",
    studyPlan: "Kế hoạch học",
    mistakeAnalysis: "Phân tích lỗi",
    skillProfile: "Hồ sơ năng lực",
    admin: "Quản trị",
    vocabularyAdmin: "Quản lý từ vựng",
    questionAdmin: "Ngân hàng câu hỏi",
    testAdmin: "Quản lý bài thi",
    generatedQuestions: "Câu hỏi mẫu",
    logout: "Đăng xuất",
    learner: "Người học",
    dashboardTitle: "Hôm nay",
    dashboardDescription: "Theo dõi kết quả thi thử, phần yếu và gợi ý học tiếp theo.",
    completedTests: "Bài đã làm",
    averageScore: "Điểm trung bình",
    correctRate: "Tỷ lệ đúng",
    weakParts: "Phần yếu",
    recentScores: "Điểm gần đây",
    nextActions: "Gợi ý tiếp theo",
    recentAnswers: "Lần làm gần đây",
    test: "Bài thi",
    score: "Điểm",
    completedAt: "Hoàn thành",
    vocabularyTitle: "Từ vựng TOEIC",
    vocabularyDescription: "Học từ tiếng Anh với nghĩa tiếng Trung phồn thể và tiếng Việt.",
    noVocabulary: "Chưa có từ vựng",
    noVocabularyDescription: "Vui lòng thêm dữ liệu từ vựng TOEIC trong trang quản trị.",
    noExample: "Chưa có ví dụ",
    pronunciation: "Phát âm",
    toeicExamples: "Ví dụ TOEIC",
    aiTutorTitle: "Bài học TOEIC hướng dẫn",
    aiTutorDescription: "Học các bài ngắn, dễ hiểu bằng tiếng Trung phồn thể và tiếng Việt.",
    conversations: "Lịch sử",
    noConversations: "Chưa có hội thoại",
    startTutor: "Bắt đầu bài học",
    startTutorDescription: "Ví dụ: 用繁體中文解釋, Giải thích bằng tiếng Việt, Song ngữ Trung Việt.",
    tutorThinking: "Dang chuan bi bai hoc...",
    tutorPlaceholder: "Nhập câu hỏi TOEIC...",
    bilingualMode: "Song ngữ",
    bilingualLearning: "Chế độ học song ngữ",
    studyPlanTitle: "Kế hoạch học cá nhân 7 ngày",
    studyPlanDescription: "Tao tu bai thi gan day, loi sai va ho so nang luc bang quy tac co dinh.",
    regeneratePlan: "Cap nhat ke hoach",
    generating: "Đang tạo...",
    noPlan: "Chưa có kế hoạch học",
    noPlanDescription: "Tạo kế hoạch học TOEIC trong 7 ngày.",
  },
} satisfies Record<Locale, Record<string, string>>;

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof typeof messages.en) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh-TW");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && stored in messages) setLocaleState(stored);
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => {
        localStorage.setItem(STORAGE_KEY, nextLocale);
        setLocaleState(nextLocale);
      },
      t: (key) => messages[locale][key] ?? messages["zh-TW"][key] ?? key,
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}
