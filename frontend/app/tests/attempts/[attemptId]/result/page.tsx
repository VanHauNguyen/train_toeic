"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { testsApi } from "@/lib/api";

export default function TestResultPage() {
  const params = useParams<{ attemptId: string }>();
  const result = useQuery({ queryKey: ["test-result", params.attemptId], queryFn: () => testsApi.result(params.attemptId) });

  return (
    <AuthGuard>
      <AppShell>
        {result.isLoading && <LoadingSkeleton lines={5} />}
        {result.isError && <ErrorState />}
        {result.data && (
          <>
            <PageHeading
              eyebrow="Result"
              title={result.data.testTitle}
              description="測驗已完成。查看成績、弱點題型，並進入錯題檢討。"
              actions={
                <div className="flex flex-wrap gap-2">
                  <Link href={`/tests/attempts/${result.data.attemptId}/review`}>
                    <Button>檢討答案</Button>
                  </Link>
                  <Link href="/study-plan">
                    <Button variant="secondary">查看複習計畫</Button>
                  </Link>
                </div>
              }
            />
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <p className="text-sm text-slate-400">分數</p>
                <p className="mt-2 text-4xl font-semibold text-cyan-100">{result.data.score}</p>
              </Card>
              <Card>
                <p className="text-sm text-slate-400">答對題數</p>
                <p className="mt-2 text-3xl font-semibold text-slate-50">
                  {result.data.correctCount}/{result.data.totalCount}
                </p>
              </Card>
              <Card>
                <p className="text-sm text-slate-400">答對率</p>
                <p className="mt-2 text-3xl font-semibold text-slate-50">{result.data.correctRate}%</p>
              </Card>
              <Card>
                <p className="text-sm text-slate-400">狀態</p>
                <Badge className="mt-3">{result.data.status}</Badge>
              </Card>
            </div>
            <Card className="mt-5">
              <h2 className="font-semibold text-slate-50">弱點題型</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {result.data.weakToeicParts.length ? (
                  result.data.weakToeicParts.map((part) => <Badge key={part}>{part}</Badge>)
                ) : (
                  <p className="text-sm text-slate-400">本次沒有明顯弱點，請進入檢討頁確認每題解析。</p>
                )}
              </div>
            </Card>
          </>
        )}
      </AppShell>
    </AuthGuard>
  );
}
