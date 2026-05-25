"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { EmptyState, ErrorState } from "@/components/ui/state";
import { contentApi } from "@/lib/api";
import type { GeneratedQuestion } from "@/types/api";

export default function AdminGeneratedQuestionsPage() {
  const [topic, setTopic] = useState("介系詞");
  const [items, setItems] = useState<GeneratedQuestion[]>([]);
  const generate = useMutation({
    mutationFn: () => contentApi.generateQuestions({ topic, difficulty: "BEGINNER", count: 6 }),
    onSuccess: setItems,
  });

  return (
    <AuthGuard role="ADMIN">
      <AppShell admin>
        <PageHeading eyebrow="Template Questions" title="規則題目產生器" description="使用固定 TOEIC Part 5 模板產生可預測、低成本、可離線的練習題。" />
        <Card className="mb-6">
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <Input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="生成主題，例如介系詞、商務單字" />
            <Button onClick={() => generate.mutate()} disabled={generate.isPending}>{generate.isPending ? "生成中..." : "生成題目草稿"}</Button>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            支援 prepositions、tense、conjunctions、word forms、vocabulary、conditionals、passive voice。產生結果不會呼叫外部模型。
          </p>
        </Card>
        {generate.isError && <ErrorState />}
        {!items.length && !generate.isPending && <EmptyState title="尚無題目草稿" description="輸入主題並產生題目後，可在此檢視模板輸出。" />}
        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((item) => (
            <Card key={item.id}>
              <div className="flex flex-wrap gap-2"><Badge>{item.toeicPart}</Badge><Badge>{item.difficulty}</Badge><Badge>{item.topic}</Badge></div>
              <h2 className="mt-4 font-semibold text-slate-50">{item.prompt}</h2>
              <div className="mt-4 space-y-2">
                {item.options.map((option) => (
                  <div key={option.label} className="rounded-md border border-border bg-slate-950/35 px-3 py-2 text-sm text-slate-300">
                    {option.label}. {option.text}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-cyan-100">正解：{item.correctAnswer}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.explanationZhTW}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.explanationVi}</p>
            </Card>
          ))}
        </div>
      </AppShell>
    </AuthGuard>
  );
}
