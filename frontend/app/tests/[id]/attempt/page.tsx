"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { cn } from "@/lib/utils";
import { testsApi } from "@/lib/api";

export default function TestAttemptPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const test = useQuery({ queryKey: ["test", params.id], queryFn: () => testsApi.get(params.id) });
  const start = useMutation({ mutationFn: () => testsApi.startAttempt(params.id), onSuccess: (data) => setAttemptId(data.id) });
  const submit = useMutation({
    mutationFn: () =>
      testsApi.submitAttempt(
        attemptId!,
        Object.entries(answers).map(([questionId, selectedOptionId]) => ({ questionId, selectedOptionId })),
      ),
    onSuccess: (data) => router.push(`/tests/attempts/${data.attemptId}/result`),
  });
  const questions = test.data?.questions ?? [];
  const item = questions[current];
  const progress = useMemo(() => `${Object.keys(answers).length}/${questions.length}`, [answers, questions.length]);

  return (
    <AuthGuard>
      <AppShell>
        <PageHeading eyebrow="Test Attempt" title={test.data?.title ?? "測驗作答"} description={`已作答 ${progress} 題。提交後會計算成績並更新儀表板。`} />
        {test.isLoading && <LoadingSkeleton lines={5} />}
        {test.isError && <ErrorState />}
        {test.data && !attemptId && (
          <Card className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-slate-50">準備開始測驗</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">系統會建立一筆作答紀錄。完成後請提交答案以計算分數。</p>
            <Button className="mt-6" onClick={() => start.mutate()} disabled={start.isPending}>
              {start.isPending ? "建立作答中..." : "開始作答"}
            </Button>
          </Card>
        )}
        {item && attemptId && (
          <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
            <Card>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge>第 {item.order} 題</Badge>
                <Badge>{item.question.toeicPart}</Badge>
                <Badge>{item.question.type}</Badge>
              </div>
              <p className="text-lg leading-8 text-slate-50">{item.question.prompt}</p>
              <div className="mt-6 space-y-3">
                {item.question.options.map((option) => {
                  const selected = answers[item.question.id] === option.id;
                  return (
                    <button
                      key={option.id}
                      className={cn(
                        "w-full rounded-lg border border-border bg-slate-950/35 p-4 text-left text-sm transition hover:border-cyan-300/50",
                        selected && "border-cyan-300 bg-cyan-300/12 text-cyan-50",
                      )}
                      onClick={() => setAnswers((value) => ({ ...value, [item.question.id]: option.id }))}
                    >
                      <span className="mr-2 font-semibold text-cyan-200">{option.label}.</span>
                      {option.text}
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="secondary" disabled={current === 0} onClick={() => setCurrent((value) => value - 1)}>
                  上一題
                </Button>
                {current < questions.length - 1 ? (
                  <Button onClick={() => setCurrent((value) => value + 1)}>下一題</Button>
                ) : (
                  <Button disabled={!attemptId || submit.isPending || Object.keys(answers).length !== questions.length} onClick={() => submit.mutate()}>
                    {submit.isPending ? "提交中..." : "提交測驗"}
                  </Button>
                )}
              </div>
            </Card>
            <Card>
              <h2 className="font-semibold text-slate-50">題目導航</h2>
              <div className="mt-4 grid grid-cols-5 gap-2 lg:grid-cols-4">
                {questions.map((question, index) => (
                  <button
                    key={question.id}
                    onClick={() => setCurrent(index)}
                    className={cn(
                      "h-10 rounded-md border border-border text-sm",
                      current === index && "border-cyan-300 text-cyan-100",
                      answers[question.question.id] && "bg-cyan-300/12",
                    )}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        )}
      </AppShell>
    </AuthGuard>
  );
}
