"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { vocabularyApi } from "@/lib/api";

export default function VocabularyDetailPage() {
  const params = useParams<{ id: string }>();
  const vocabulary = useQuery({ queryKey: ["vocabulary", params.id], queryFn: () => vocabularyApi.get(params.id) });

  return (
    <AuthGuard>
      <AppShell>
        {vocabulary.isLoading && <LoadingSkeleton lines={5} />}
        {vocabulary.isError && <ErrorState />}
        {vocabulary.data && (
          <>
            <PageHeading
              eyebrow="Vocabulary"
              title={vocabulary.data.word}
              description="英文單字、繁體中文意思、越南文意思與 TOEIC 例句。"
            />
            <Card className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{vocabulary.data.level}</Badge>
                {vocabulary.data.partOfSpeech && <Badge>{vocabulary.data.partOfSpeech}</Badge>}
                {vocabulary.data.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-md border border-border bg-slate-950/35 p-4">
                  <div className="text-sm text-slate-400">繁體中文</div>
                  <p className="mt-2 text-xl font-semibold text-cyan-100">{vocabulary.data.meaningZhTW ?? vocabulary.data.meaningZhTw}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{vocabulary.data.exampleZhTW ?? vocabulary.data.exampleZhTw}</p>
                </div>
                <div className="rounded-md border border-border bg-slate-950/35 p-4">
                  <div className="text-sm text-slate-400">Tiếng Việt</div>
                  <p className="mt-2 text-xl font-semibold text-emerald-100">{vocabulary.data.meaningVi ?? "Chưa có nghĩa tiếng Việt"}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{vocabulary.data.exampleVi ?? "Chưa có ví dụ tiếng Việt"}</p>
                </div>
              </div>
              <div className="mt-5 rounded-md border border-border bg-slate-950/35 p-4">
                <div className="text-sm text-slate-400">TOEIC example</div>
                <p className="mt-2 text-lg leading-7 text-slate-50">{vocabulary.data.example}</p>
              </div>
            </Card>
          </>
        )}
      </AppShell>
    </AuthGuard>
  );
}
