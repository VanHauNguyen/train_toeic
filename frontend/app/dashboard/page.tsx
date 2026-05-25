"use client";

import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BookOpen, Brain, ClipboardCheck, Target } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { dashboardApi } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import { formatDate, formatPercent } from "@/lib/utils";

export default function DashboardPage() {
  const { t } = useI18n();
  const dashboard = useQuery({ queryKey: ["dashboard"], queryFn: dashboardApi.me });

  return (
    <AuthGuard>
      <AppShell>
        <PageHeading
          eyebrow="Learning Dashboard"
          title={t("dashboardTitle")}
          description={t("dashboardDescription")}
        />
        {dashboard.isLoading && <LoadingSkeleton lines={5} />}
        {dashboard.isError && <ErrorState />}
        {dashboard.data && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: t("completedTests"), value: dashboard.data.totalAttempts, icon: ClipboardCheck },
                { label: t("averageScore"), value: dashboard.data.averageScore, icon: Target },
                { label: t("correctRate"), value: formatPercent(dashboard.data.correctRate), icon: Brain },
                { label: t("weakParts"), value: dashboard.data.weakToeicParts.length || 0, icon: BookOpen },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <Card>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-400">{item.label}</p>
                          <p className="mt-2 text-3xl font-semibold text-slate-50">{item.value}</p>
                        </div>
                        <div className="rounded-lg bg-cyan-300/12 p-3 text-cyan-200">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
              <Card>
                <CardTitle>{t("recentScores")}</CardTitle>
                <CardDescription>{t("dashboardDescription")}</CardDescription>
                <div className="mt-5 h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboard.data.recentAttempts.map((attempt) => ({ name: attempt.testTitle.slice(0, 12), score: attempt.score ?? 0 }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.16)" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(148,163,184,.22)", color: "#e5eefc" }} />
                      <Bar dataKey="score" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <Card>
                <CardTitle>{t("nextActions")}</CardTitle>
                <div className="mt-4 space-y-3">
                  {dashboard.data.weakToeicParts.map((part) => (
                    <Badge key={part}>{part}</Badge>
                  ))}
                  {dashboard.data.recommendedNextActions.map((action) => (
                    <div key={action} className="rounded-md border border-border bg-slate-950/35 p-3 text-sm leading-6 text-slate-300">
                      {action}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <Card>
              <CardTitle>{t("recentAnswers")}</CardTitle>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-slate-400">
                    <tr>
                      <th className="py-2">{t("test")}</th>
                      <th className="py-2">{t("score")}</th>
                      <th className="py-2">{t("completedAt")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.data.recentAttempts.map((attempt) => (
                      <tr key={attempt.id} className="border-t border-border">
                        <td className="py-3 text-slate-100">{attempt.testTitle}</td>
                        <td className="py-3 text-cyan-200">{attempt.score ?? 0}</td>
                        <td className="py-3 text-slate-400">{formatDate(attempt.completedAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </AppShell>
    </AuthGuard>
  );
}
