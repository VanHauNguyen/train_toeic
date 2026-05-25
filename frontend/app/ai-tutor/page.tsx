"use client";

import { useQuery } from "@tanstack/react-query";
import { BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { contentApi } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

export default function AiTutorPage() {
  const { locale, t } = useI18n();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const lessons = useQuery({ queryKey: ["lessons"], queryFn: () => contentApi.lessons({ level: "BEGINNER" }) });

  return (
    <AuthGuard>
      <AppShell>
        <PageHeading
          eyebrow="Guided Lessons"
          title={t("aiTutorTitle")}
          description="短、清楚、可重複的 TOEIC 課程。內容由本機資料提供，不需要即時模型。"
        />
        {lessons.isLoading && <LoadingSkeleton lines={5} />}
        {lessons.isError && <ErrorState title="課程載入失敗" description="請確認後端服務已啟動。" />}
        {!lessons.isLoading && !lessons.data?.length && <EmptyState title="尚無課程" description="請執行 seed 或確認靜態內容檔案。" />}
        <div className="grid gap-4 lg:grid-cols-2">
          {lessons.data?.map((lesson) => (
            <Card key={lesson.id}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{lesson.part}</Badge>
                <Badge>{lesson.level}</Badge>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-50">{lesson.title}</h2>
              <p className="mt-1 text-sm text-cyan-100">{lesson.subtitle} · {lesson.estimatedMinutes} 分鐘</p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div className="rounded-md border border-border bg-slate-950/35 p-3 text-sm leading-6 text-cyan-100">
                  <div className="font-semibold text-slate-100">學習目標</div>
                  {lesson.learningGoalZhTW}
                </div>
                <div className="rounded-md border border-border bg-slate-950/35 p-3 text-sm leading-6 text-emerald-100">
                  <div className="font-semibold text-slate-100">Mục tiêu</div>
                  {lesson.learningGoalVi}
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {locale === "vi" ? lesson.explanationVi : lesson.explanationZhTW}
              </p>
              <div className="mt-4 space-y-2">
                {lesson.examples.slice(0, 3).map((example) => (
                  <div key={example.english} className="rounded-md border border-border bg-slate-950/35 p-3 text-sm leading-6">
                    <div className="font-medium text-slate-50">{example.english}</div>
                    <div className="mt-1 grid gap-2 md:grid-cols-2">
                      <p className="text-cyan-100">{example.meaningZhTW}<br /><span className="text-slate-400">{example.grammarNoteZhTW}</span></p>
                      <p className="text-emerald-100">{example.meaningVi}<br /><span className="text-slate-400">{example.grammarNoteVi}</span></p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-md border border-border bg-slate-950/35 p-3">
                <div className="flex items-center gap-2 text-sm font-medium text-cyan-100">
                  <BookOpen className="h-4 w-4" />
                  {lesson.grammarPoint}
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  {lesson.tips.slice(0, 2).map((tip) => (
                    <li key={tip.zhTW} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" />
                      <span>{locale === "vi" ? tip.vi : tip.zhTW}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-md border border-amber-300/30 bg-amber-300/10 p-3">
                  <h3 className="text-sm font-semibold text-amber-100">常見錯誤</h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-300">
                    {lesson.commonMistakes.slice(0, 2).map((item) => <li key={item.mistake}>{item.fixZhTW}<br /><span className="text-emerald-100">{item.fixVi}</span></li>)}
                  </ul>
                </div>
                <div className="rounded-md border border-rose-300/30 bg-rose-300/10 p-3">
                  <h3 className="text-sm font-semibold text-rose-100">TOEIC 陷阱</h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-300">
                    {lesson.toeicTraps.slice(0, 2).map((item) => <li key={item.trapZhTW}>{item.trapZhTW}<br /><span className="text-emerald-100">{item.trapVi}</span></li>)}
                  </ul>
                </div>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {lesson.vocabulary.slice(0, 4).map((word) => (
                  <div key={word.word} className="rounded-md border border-border bg-slate-950/35 p-3 text-sm">
                    <div className="font-semibold text-slate-50">{word.word} <span className="text-xs text-slate-400">{word.partOfSpeech}</span></div>
                    <p className="mt-1 text-cyan-100">{word.meaningZhTW}</p>
                    <p className="text-emerald-100">{word.meaningVi}</p>
                  </div>
                ))}
              </div>
              {lesson.miniPractice[0] && (
                <div className="mt-4 rounded-md border border-border bg-slate-950/35 p-3">
                  <h3 className="text-sm font-semibold text-slate-50">迷你練習</h3>
                  <p className="mt-2 text-sm text-slate-200">{lesson.miniPractice[0].question}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {lesson.miniPractice[0].options.map((option) => {
                      const key = `${lesson.id}:${lesson.miniPractice[0].id}`;
                      const selected = answers[key];
                      const answered = Boolean(selected);
                      const correct = option.label === lesson.miniPractice[0].correctAnswer;
                      return (
                        <button
                          key={option.label}
                          onClick={() => setAnswers((value) => ({ ...value, [key]: option.label }))}
                          className={`rounded-md border px-3 py-2 text-left text-sm ${
                            answered && correct ? "border-emerald-300/50 bg-emerald-300/10 text-emerald-100" : "border-border bg-slate-950/35 text-slate-300"
                          }`}
                        >
                          {option.label}. {option.text}
                        </button>
                      );
                    })}
                  </div>
                  {answers[`${lesson.id}:${lesson.miniPractice[0].id}`] && (
                    <div className="mt-3 grid gap-2 md:grid-cols-2 text-sm leading-6">
                      <p className="rounded-md border border-border p-3 text-cyan-100">{lesson.miniPractice[0].explanationZhTW}</p>
                      <p className="rounded-md border border-border p-3 text-emerald-100">{lesson.miniPractice[0].explanationVi}</p>
                    </div>
                  )}
                </div>
              )}
              <div className="mt-5 flex gap-2">
                <Link href="/grammar-practice">
                  <Button>開始練習</Button>
                </Link>
                <Link href="/vocabulary">
                  <Button variant="secondary">複習單字</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </AppShell>
    </AuthGuard>
  );
}
