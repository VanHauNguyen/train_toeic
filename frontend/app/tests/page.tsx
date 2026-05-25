"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Clock, ListChecks } from "lucide-react";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { testsApi } from "@/lib/api";

export default function TestsPage() {
  const tests = useQuery({ queryKey: ["tests"], queryFn: testsApi.list });

  return (
    <AuthGuard>
      <AppShell>
        <PageHeading eyebrow="Mock Tests" title="模擬測驗" description="選擇測驗後可檢視題目，開始作答並提交成績。" />
        {tests.isLoading && <LoadingSkeleton lines={5} />}
        {tests.isError && <ErrorState />}
        {tests.data?.length === 0 && <EmptyState title="尚無測驗" description="目前沒有可練習的測驗，請稍後再試。" />}
        <div className="grid gap-4 md:grid-cols-2">
          {tests.data?.map((test) => (
            <Card key={test.id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-50">{test.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{test.description ?? "TOEIC 練習測驗"}</p>
                </div>
                <Badge>{test.isPublished ? "已發布" : "草稿"}</Badge>
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-cyan-300" />
                  {test.questions?.length ?? 0} 題
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-cyan-300" />
                  {test.timeLimitMin ?? "不限"} 分鐘
                </span>
              </div>
              <div className="mt-6 flex gap-2">
                <Link href={`/tests/${test.id}`}>
                  <Button variant="secondary">查看詳情</Button>
                </Link>
                <Link href={`/tests/${test.id}/attempt`}>
                  <Button>開始測驗</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </AppShell>
    </AuthGuard>
  );
}
