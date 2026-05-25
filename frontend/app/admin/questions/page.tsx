"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { Textarea } from "@/components/ui/textarea";
import { questionsApi } from "@/lib/api";

export default function AdminQuestionsPage() {
  const questions = useQuery({ queryKey: ["questions"], queryFn: questionsApi.list });
  const [form, setForm] = useState({
    prompt: "",
    explanation: "",
    options: ["", "", "", ""],
    correct: "A",
  });
  const create = useMutation({
    mutationFn: () =>
      questionsApi.create({
        type: "GRAMMAR",
        toeicPart: "PART5",
        difficulty: "BEGINNER",
        prompt: form.prompt,
        explanation: form.explanation,
        tags: ["admin-created"],
        options: form.options.map((text, index) => {
          const label = String.fromCharCode(65 + index);
          return { label, text, isCorrect: label === form.correct };
        }),
      }),
    onSuccess: () => {
      setForm({ prompt: "", explanation: "", options: ["", "", "", ""], correct: "A" });
      questions.refetch();
    },
  });
  const remove = useMutation({ mutationFn: questionsApi.remove, onSuccess: () => questions.refetch() });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    create.mutate();
  };

  return (
    <AuthGuard role="ADMIN">
      <AppShell admin>
        <PageHeading eyebrow="Admin Questions" title="題庫管理" description="建立 Part 5 題目與四個選項；目前表單聚焦作品集示範的文法題流程。" />
        <div className="grid gap-6 xl:grid-cols-[28rem_1fr]">
          <Card>
            <h2 className="font-semibold text-slate-50">新增 Part 5 題目</h2>
            <form className="mt-4 space-y-3" onSubmit={submit}>
              <Textarea value={form.prompt} onChange={(e) => setForm({ ...form, prompt: e.target.value })} placeholder="題目內容" required />
              {form.options.map((option, index) => (
                <Input
                  key={index}
                  value={option}
                  onChange={(e) => setForm({ ...form, options: form.options.map((value, i) => (i === index ? e.target.value : value)) })}
                  placeholder={`${String.fromCharCode(65 + index)} 選項`}
                  required
                />
              ))}
              <select className="h-10 w-full rounded-md border border-border bg-slate-950/60 px-3 text-sm" value={form.correct} onChange={(e) => setForm({ ...form, correct: e.target.value })}>
                {["A", "B", "C", "D"].map((label) => <option key={label}>{label}</option>)}
              </select>
              <Textarea value={form.explanation} onChange={(e) => setForm({ ...form, explanation: e.target.value })} placeholder="題目解析" />
              <Button className="w-full" disabled={create.isPending}>{create.isPending ? "新增中..." : "新增題目"}</Button>
            </form>
          </Card>
          <div className="space-y-3">
            {questions.isLoading && <LoadingSkeleton lines={6} />}
            {questions.isError && <ErrorState />}
            {questions.data?.length === 0 && <EmptyState title="尚無題目" description="新增第一題 TOEIC 題目。" />}
            {questions.data?.map((question) => (
              <Card key={question.id}>
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <div className="mb-2 flex gap-2"><Badge>{question.toeicPart}</Badge><Badge>{question.type}</Badge></div>
                    <h3 className="font-semibold text-slate-50">{question.prompt}</h3>
                    <p className="mt-2 text-sm text-slate-400">{question.options.map((option) => `${option.label}.${option.text}`).join(" / ")}</p>
                  </div>
                  <Button variant="danger" onClick={() => remove.mutate(question.id)} disabled={remove.isPending}>刪除</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
