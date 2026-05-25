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

export default function TestDetailPage() {
  const params = useParams<{ id: string }>();
  const test = useQuery({ queryKey: ["test", params.id], queryFn: () => testsApi.get(params.id) });

  return (
    <AuthGuard>
      <AppShell>
        {test.isLoading && <LoadingSkeleton lines={6} />}
        {test.isError && <ErrorState />}
        {test.data && (
          <>
            <PageHeading
              eyebrow="Test Detail"
              title={test.data.title}
              description={test.data.description ?? "檢視題目結構與測驗資訊。"}
              actions={
                <Link href={`/tests/${test.data.id}/attempt`}>
                  <Button>開始測驗</Button>
                </Link>
              }
            />
            <div className="space-y-4">
              {test.data.questions.map((item) => (
                <Card key={item.id}>
                  <div className="flex items-start gap-4">
                    <Badge>第 {item.order} 題</Badge>
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2">
                        <Badge>{item.question.toeicPart}</Badge>
                        <Badge>{item.question.type}</Badge>
                        <Badge>{item.question.difficulty}</Badge>
                      </div>
                      <p className="mt-3 text-slate-100">{item.question.prompt}</p>
                      <div className="mt-4 grid gap-2 md:grid-cols-2">
                        {item.question.options.map((option) => (
                          <div key={option.id} className="rounded-md border border-border bg-slate-950/35 px-3 py-2 text-sm text-slate-300">
                            {option.label}. {option.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </AppShell>
    </AuthGuard>
  );
}
