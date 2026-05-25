"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { testsApi } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function TestReviewPage() {
  const params = useParams<{ attemptId: string }>();
  const review = useQuery({ queryKey: ["test-review", params.attemptId], queryFn: () => testsApi.review(params.attemptId) });

  return (
    <AuthGuard>
      <AppShell>
        {review.isLoading && <LoadingSkeleton lines={6} />}
        {review.isError && <ErrorState />}
        {review.data && (
          <>
            <PageHeading
              eyebrow="Review"
              title={review.data.testTitle}
              description="逐題檢查答案、解析與錯誤類型。所有解析都來自題庫與固定規則，可離線重複使用。"
            />
            <div className="space-y-4">
              {review.data.items.map((item) => {
                return (
                  <Card key={item.question.id} className={cn(!item.isCorrect && "border-rose-300/35")}>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge>第 {item.order} 題</Badge>
                      <Badge>{item.toeicPart}</Badge>
                      <Badge className={item.isCorrect ? "border-emerald-300/40 bg-emerald-400/10 text-emerald-100" : "border-rose-300/40 bg-rose-400/10 text-rose-100"}>
                        {item.isCorrect ? "答對" : "答錯"}
                      </Badge>
                      {item.mistakeTypeSuggestion && <Badge>{item.mistakeTypeSuggestion}</Badge>}
                    </div>
                    {item.question.passage && (
                      <p className="mt-4 rounded-md border border-border bg-slate-950/35 p-3 text-sm leading-6 text-slate-300">
                        {item.question.passage}
                      </p>
                    )}
                    <h2 className="mt-4 text-lg font-semibold leading-8 text-slate-50">{item.question.prompt}</h2>
                    <div className="mt-4 grid gap-2 md:grid-cols-2">
                      {item.question.options.map((option) => (
                        <div
                          key={option.id}
                          className={cn(
                            "rounded-md border border-border bg-slate-950/35 px-3 py-2 text-sm text-slate-300",
                            option.id === item.correctAnswer?.id && "border-emerald-300/50 bg-emerald-400/10 text-emerald-100",
                            option.id === item.selectedAnswer?.id && !item.isCorrect && "border-rose-300/50 bg-rose-400/10 text-rose-100",
                          )}
                        >
                          <span className="font-semibold">{option.label}.</span> {option.text}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 grid gap-3 lg:grid-cols-3">
                      <div className="rounded-md border border-border bg-slate-950/35 p-3 text-sm leading-6 text-slate-300">
                        <div className="mb-1 font-medium text-slate-100">English</div>
                        {item.englishExplanation ?? "No English explanation."}
                      </div>
                      <div className="rounded-md border border-border bg-slate-950/35 p-3 text-sm leading-6 text-cyan-100">
                        <div className="mb-1 font-medium text-slate-100">繁體中文</div>
                        {item.explanationZhTW ?? "尚無繁中解析。"}
                      </div>
                      <div className="rounded-md border border-border bg-slate-950/35 p-3 text-sm leading-6 text-emerald-100">
                        <div className="mb-1 font-medium text-slate-100">Tiếng Việt</div>
                        {item.explanationVi ?? "Chưa có giải thích tiếng Việt."}
                      </div>
                    </div>
                    {!item.isCorrect && item.selectedAnswer && (
                      <div className="mt-4 rounded-md border border-amber-300/30 bg-amber-300/10 p-3 text-sm leading-6 text-amber-50">
                        <div className="font-semibold">複習提示</div>
                        <p className="mt-1">先看正確選項，再回到空格前後找文法或語意線索。把錯因寫成一句話，下一次會更容易避開同樣陷阱。</p>
                        <p className="mt-1">Meo on tap: xem dap an dung, roi nhin truoc/sau cho trong de tim dau hieu ngu phap hoac nghia.</p>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </AppShell>
    </AuthGuard>
  );
}
