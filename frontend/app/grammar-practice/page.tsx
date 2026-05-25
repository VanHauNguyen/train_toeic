"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { testsApi } from "@/lib/api";

export default function GrammarPracticePage() {
  const tests = useQuery({ queryKey: ["tests", "grammar-practice"], queryFn: testsApi.list });
  const grammarTests = tests.data?.filter((test) => test.title.toLowerCase().includes("grammar") || test.title.toLowerCase().includes("part 5")) ?? [];

  return (
    <AuthGuard>
      <AppShell>
        <PageHeading eyebrow="Grammar Practice" title="Part 5 文法練習" description="使用真實測驗流程練習 TOEIC Part 5 文法與單字題。" />
        {tests.isLoading && <LoadingSkeleton lines={4} />}
        {tests.isError && <ErrorState />}
        {!tests.isLoading && !grammarTests.length && <EmptyState title="尚無文法練習" description="請先執行 seed 建立 Grammar Practice 測驗。" />}
        <div className="grid gap-4 md:grid-cols-2">
          {grammarTests.map((test) => (
            <Card key={test.id}>
              <Badge>Part 5</Badge>
              <h2 className="mt-3 text-xl font-semibold text-slate-50">{test.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{test.description}</p>
              <p className="mt-4 text-sm text-slate-300">{test.questions.length} 題 · {test.timeLimitMin ?? "不限"} 分鐘</p>
              <div className="mt-5 flex gap-2">
                <Link href={`/tests/${test.id}`}>
                  <Button variant="secondary">查看題目</Button>
                </Link>
                <Link href={`/tests/${test.id}/attempt`}>
                  <Button>開始練習</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </AppShell>
    </AuthGuard>
  );
}
