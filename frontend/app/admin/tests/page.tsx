"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { questionsApi, testsApi } from "@/lib/api";

export default function AdminTestsPage() {
  const tests = useQuery({ queryKey: ["tests"], queryFn: testsApi.list });
  const questions = useQuery({ queryKey: ["questions"], queryFn: questionsApi.list });
  const [form, setForm] = useState({ title: "", description: "", timeLimitMin: 10 });
  const [link, setLink] = useState({ testId: "", questionId: "", order: 1 });
  const create = useMutation({
    mutationFn: () => testsApi.create({ ...form, isPublished: true }),
    onSuccess: () => {
      setForm({ title: "", description: "", timeLimitMin: 10 });
      tests.refetch();
    },
  });
  const addQuestion = useMutation({ mutationFn: () => testsApi.addQuestion(link.testId, { questionId: link.questionId, order: link.order, points: 1 }), onSuccess: () => tests.refetch() });
  const remove = useMutation({ mutationFn: testsApi.remove, onSuccess: () => tests.refetch() });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    create.mutate();
  };

  return (
    <AuthGuard role="ADMIN">
      <AppShell admin>
        <PageHeading eyebrow="Admin Tests" title="測驗管理" description="建立測驗並將題庫題目加入測驗。" />
        <div className="grid gap-6 xl:grid-cols-[26rem_1fr]">
          <div className="space-y-6">
            <Card>
              <h2 className="font-semibold text-slate-50">新增測驗</h2>
              <form className="mt-4 space-y-3" onSubmit={submit}>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="測驗名稱" required />
                <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="測驗說明" />
                <Input type="number" value={form.timeLimitMin} onChange={(e) => setForm({ ...form, timeLimitMin: Number(e.target.value) })} placeholder="時間限制" />
                <Button className="w-full" disabled={create.isPending}>{create.isPending ? "新增中..." : "新增測驗"}</Button>
              </form>
            </Card>
            <Card>
              <h2 className="font-semibold text-slate-50">加入題目</h2>
              <div className="mt-4 space-y-3">
                <select className="h-10 w-full rounded-md border border-border bg-slate-950/60 px-3 text-sm" value={link.testId} onChange={(e) => setLink({ ...link, testId: e.target.value })}>
                  <option value="">選擇測驗</option>
                  {tests.data?.map((test) => <option key={test.id} value={test.id}>{test.title}</option>)}
                </select>
                <select className="h-10 w-full rounded-md border border-border bg-slate-950/60 px-3 text-sm" value={link.questionId} onChange={(e) => setLink({ ...link, questionId: e.target.value })}>
                  <option value="">選擇題目</option>
                  {questions.data?.map((question) => <option key={question.id} value={question.id}>{question.prompt.slice(0, 45)}</option>)}
                </select>
                <Input type="number" value={link.order} onChange={(e) => setLink({ ...link, order: Number(e.target.value) })} />
                <Button className="w-full" onClick={() => addQuestion.mutate()} disabled={!link.testId || !link.questionId || addQuestion.isPending}>加入測驗</Button>
              </div>
            </Card>
          </div>
          <div className="space-y-3">
            {tests.isLoading && <LoadingSkeleton lines={5} />}
            {tests.isError && <ErrorState />}
            {tests.data?.length === 0 && <EmptyState title="尚無測驗" description="新增第一份 TOEIC 練習測驗。" />}
            {tests.data?.map((test) => (
              <Card key={test.id} className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h3 className="font-semibold text-slate-50">{test.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{test.questions?.length ?? 0} 題 · {test.timeLimitMin ?? "不限"} 分鐘</p>
                </div>
                <Button variant="danger" onClick={() => remove.mutate(test.id)} disabled={remove.isPending}>刪除</Button>
              </Card>
            ))}
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
