"use client";

import { useQuery } from "@tanstack/react-query";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { contentApi, dashboardApi } from "@/lib/api";

export default function MistakeAnalysisPage() {
  const dashboard = useQuery({ queryKey: ["dashboard"], queryFn: dashboardApi.me });
  const review = useQuery({ queryKey: ["review-plan"], queryFn: contentApi.review });
  const hasCompletedAttempt = Boolean(dashboard.data?.recentAttempts.length);

  return (
    <AuthGuard>
      <AppShell>
        <PageHeading eyebrow="Review" title="錯題複習" description="依照完成測驗，用固定規則整理弱點與 7 天練習方向。" />
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Card>
            <h2 className="font-semibold text-slate-50">選擇作答紀錄</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              只會列出已完成的測驗。複習建議由 /api/review 依照錯題規則產生，不會呼叫即時模型。
            </p>
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-medium text-slate-300">近期測驗</h3>
              {dashboard.isLoading && <LoadingSkeleton lines={3} />}
              {dashboard.isError && <ErrorState />}
              {dashboard.data && !hasCompletedAttempt && (
                <div className="rounded-md border border-amber-300/30 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
                  <div className="font-semibold">請先完成一次測驗</div>
                  <p className="mt-1">
                    請先完成一次測驗，系統才能整理錯題。 Vui lòng hoàn thành một bài thi trước để hệ thống tổng hợp lỗi sai.
                  </p>
                </div>
              )}
              {dashboard.data?.recentAttempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className="mb-2 w-full rounded-md border border-border bg-slate-950/35 px-3 py-2 text-left text-sm text-slate-300"
                >
                  {attempt.testTitle} · {attempt.score ?? 0} 分
                </div>
              ))}
            </div>
          </Card>
          <div className="space-y-4">
            {review.isLoading && <LoadingSkeleton lines={4} />}
            {review.isError && <ErrorState title="複習建議載入失敗" description="請確認登入狀態，並重新整理後再試一次。" />}
            {!hasCompletedAttempt && !dashboard.isLoading && (
              <EmptyState title="沒有已完成測驗" description="完成一回測驗後，這裡會顯示錯題整理與 7 天練習建議。" />
            )}
            {review.data && hasCompletedAttempt && (
              <>
                <Card>
                  <div className="flex flex-wrap gap-2">
                    {review.data.weakParts.map((part) => (
                      <Badge key={part}>{part}</Badge>
                    ))}
                    {review.data.weakTags.slice(0, 6).map((tag) => (
                      <Badge key={tag} className="border-amber-300/40 bg-amber-300/10 text-amber-100">{tag}</Badge>
                    ))}
                  </div>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <section>
                      <h2 className="font-semibold text-cyan-100">繁體中文</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{review.data.summaryZhTW}</p>
                    </section>
                    <section>
                      <h2 className="font-semibold text-emerald-100">Tiếng Việt</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{review.data.summaryVi}</p>
                    </section>
                  </div>
                </Card>

                <Card>
                  <h2 className="font-semibold text-slate-50">今日複習組</h2>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {review.data.dailyReviewSet.slice(0, 4).map((question) => (
                      <div key={question.id} className="rounded-md border border-border bg-slate-950/35 p-3 text-sm">
                        <div className="text-slate-200">{question.question}</div>
                        <p className="mt-2 text-cyan-100">正解：{question.correctAnswer}. {question.options.find((option) => option.label === question.correctAnswer)?.text}</p>
                        <p className="mt-1 text-emerald-100">{question.explanationVi}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h2 className="font-semibold text-slate-50">推薦文法與單字</h2>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {review.data.grammarPatternReview.slice(0, 3).map((lesson) => (
                      <div key={lesson.id} className="rounded-md border border-border bg-slate-950/35 p-3 text-sm leading-6">
                        <div className="font-medium text-cyan-100">{lesson.title}</div>
                        <p className="text-slate-300">{lesson.learningGoalZhTW}</p>
                        <p className="text-emerald-100">{lesson.learningGoalVi}</p>
                      </div>
                    ))}
                    {review.data.vocabularyReview.slice(0, 5).map((word) => (
                      <div key={word.id ?? word.word} className="rounded-md border border-border bg-slate-950/35 p-3 text-sm">
                        <span className="font-semibold text-slate-50">{word.word}</span>
                        <span className="ml-2 text-cyan-100">{word.meaningZhTW ?? word.meaningZhTw}</span>
                        <span className="ml-2 text-emerald-100">{word.meaningVi}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {review.data.actionPlan.map((day) => (
                    <Card key={day.day}>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-semibold text-slate-50">Day {day.day}</h3>
                        <Badge>{day.focus}</Badge>
                      </div>
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                        <li>{day.taskZhTW}</li>
                        <li>{day.taskVi}</li>
                      </ul>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
