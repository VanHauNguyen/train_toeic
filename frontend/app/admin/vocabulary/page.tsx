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
import { Textarea } from "@/components/ui/textarea";
import { vocabularyApi } from "@/lib/api";

export default function AdminVocabularyPage() {
  const vocabulary = useQuery({ queryKey: ["vocabulary"], queryFn: vocabularyApi.list });
  const [form, setForm] = useState({ word: "", meaningZhTW: "", meaningVi: "", partOfSpeech: "", example: "", exampleZhTW: "", exampleVi: "" });
  const create = useMutation({
    mutationFn: () => vocabularyApi.create({ ...form, tags: ["toeic"], level: "BEGINNER" }),
    onSuccess: () => {
      setForm({ word: "", meaningZhTW: "", meaningVi: "", partOfSpeech: "", example: "", exampleZhTW: "", exampleVi: "" });
      vocabulary.refetch();
    },
  });
  const remove = useMutation({ mutationFn: vocabularyApi.remove, onSuccess: () => vocabulary.refetch() });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    create.mutate();
  };

  return (
    <AuthGuard role="ADMIN">
      <AppShell admin>
        <PageHeading eyebrow="Admin Vocabulary" title="單字管理" description="新增與刪除 TOEIC 單字資料。" />
        <div className="grid gap-6 lg:grid-cols-[24rem_1fr]">
          <Card>
            <h2 className="font-semibold text-slate-50">新增單字</h2>
            <form className="mt-4 space-y-3" onSubmit={submit}>
              <Input value={form.word} onChange={(e) => setForm({ ...form, word: e.target.value })} placeholder="英文單字" required />
              <Input value={form.meaningZhTW} onChange={(e) => setForm({ ...form, meaningZhTW: e.target.value })} placeholder="繁中意思" required />
              <Input value={form.meaningVi} onChange={(e) => setForm({ ...form, meaningVi: e.target.value })} placeholder="越南文意思" />
              <Input value={form.partOfSpeech} onChange={(e) => setForm({ ...form, partOfSpeech: e.target.value })} placeholder="詞性，例如 n." />
              <Textarea value={form.example} onChange={(e) => setForm({ ...form, example: e.target.value })} placeholder="英文例句" />
              <Input value={form.exampleZhTW} onChange={(e) => setForm({ ...form, exampleZhTW: e.target.value })} placeholder="繁中例句" />
              <Input value={form.exampleVi} onChange={(e) => setForm({ ...form, exampleVi: e.target.value })} placeholder="越南文例句" />
              <Button className="w-full" disabled={create.isPending}>{create.isPending ? "新增中..." : "新增單字"}</Button>
            </form>
          </Card>
          <div className="space-y-3">
            {vocabulary.isLoading && <LoadingSkeleton lines={6} />}
            {vocabulary.isError && <ErrorState />}
            {vocabulary.data?.length === 0 && <EmptyState title="尚無單字" description="新增第一筆 TOEIC 單字。" />}
            {vocabulary.data?.map((item) => (
              <Card key={item.id} className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <h3 className="font-semibold text-slate-50">{item.word} · {item.meaningZhTW ?? item.meaningZhTw}</h3>
                  {item.meaningVi && <p className="mt-1 text-sm text-emerald-100">{item.meaningVi}</p>}
                  <p className="mt-1 text-sm text-slate-400">{item.example ?? "尚無例句"}</p>
                </div>
                <Button variant="danger" onClick={() => remove.mutate(item.id)} disabled={remove.isPending}>刪除</Button>
              </Card>
            ))}
          </div>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
