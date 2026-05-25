"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { BookOpen, ClipboardList, GraduationCap, Users } from "lucide-react";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Card } from "@/components/ui/card";
import { ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { questionsApi, testsApi, usersApi, vocabularyApi } from "@/lib/api";

export default function AdminDashboardPage() {
  const users = useQuery({ queryKey: ["admin-users"], queryFn: usersApi.list });
  const vocabulary = useQuery({ queryKey: ["vocabulary"], queryFn: vocabularyApi.list });
  const questions = useQuery({ queryKey: ["questions"], queryFn: questionsApi.list });
  const tests = useQuery({ queryKey: ["tests"], queryFn: testsApi.list });

  const cards = [
    { label: "使用者", value: users.data?.length, icon: Users, href: "/admin" },
    { label: "單字", value: vocabulary.data?.length, icon: BookOpen, href: "/admin/vocabulary" },
    { label: "題目", value: questions.data?.length, icon: ClipboardList, href: "/admin/questions" },
    { label: "測驗", value: tests.data?.length, icon: GraduationCap, href: "/admin/tests" },
  ];

  return (
    <AuthGuard role="ADMIN">
      <AppShell admin>
        <PageHeading eyebrow="Admin Dashboard" title="後台管理總覽" description="管理內容資料、題庫、測驗與規則模板題目。" />
        {(users.isLoading || vocabulary.isLoading || questions.isLoading || tests.isLoading) && <LoadingSkeleton lines={4} />}
        {(users.isError || vocabulary.isError || questions.isError || tests.isError) && <ErrorState />}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.label} href={item.href}>
                <Card className="transition hover:border-cyan-300/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">{item.label}</p>
                      <p className="mt-2 text-3xl font-semibold text-slate-50">{item.value ?? "-"}</p>
                    </div>
                    <div className="rounded-lg bg-cyan-300/12 p-3 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </AppShell>
    </AuthGuard>
  );
}
