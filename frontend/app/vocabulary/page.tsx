"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { vocabularyApi } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

export default function VocabularyPage() {
  const { t } = useI18n();
  const vocabulary = useQuery({ queryKey: ["vocabulary"], queryFn: vocabularyApi.list });

  return (
    <AuthGuard>
      <AppShell>
        <PageHeading eyebrow="Vocabulary" title={t("vocabularyTitle")} description={t("vocabularyDescription")} />
        {vocabulary.isLoading && <LoadingSkeleton lines={6} />}
        {vocabulary.isError && <ErrorState />}
        {vocabulary.data?.length === 0 && <EmptyState title={t("noVocabulary")} description={t("noVocabularyDescription")} />}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {vocabulary.data?.map((item) => (
            <Link key={item.id} href={`/vocabulary/${item.id}`}>
              <Card className="h-full transition hover:border-cyan-300/40">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-50">{item.word}</h2>
                  <p className="mt-1 text-cyan-100">{item.meaningZhTW ?? item.meaningZhTw}</p>
                  {item.meaningVi && <p className="mt-1 text-sm text-emerald-100">{item.meaningVi}</p>}
                </div>
                <Badge>{item.level}</Badge>
              </div>
              <p className="mt-3 text-sm text-slate-400">{item.partOfSpeech}</p>
              <div className="mt-3 min-h-20 space-y-2 text-sm leading-6 text-slate-300">
                <p>{item.example ?? t("noExample")}</p>
                {(item.exampleZhTW ?? item.exampleZhTw) && <p className="text-cyan-100">{item.exampleZhTW ?? item.exampleZhTw}</p>}
                {item.exampleVi && <p className="text-emerald-100">{item.exampleVi}</p>}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} className="border-slate-500/30 bg-slate-800/60 text-slate-300">
                    {tag}
                  </Badge>
                ))}
              </div>
              </Card>
            </Link>
          ))}
        </div>
      </AppShell>
    </AuthGuard>
  );
}
