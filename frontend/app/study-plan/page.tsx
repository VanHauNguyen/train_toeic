"use client";

import { useQuery } from "@tanstack/react-query";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { contentApi, dashboardApi } from "@/lib/api";
import { useI18n } from "@/lib/i18n";

export default function StudyPlanPage() {
  const { locale, t } = useI18n();
  const review = useQuery({ queryKey: ["review-plan"], queryFn: contentApi.review });
  const dashboard = useQuery({ queryKey: ["dashboard"], queryFn: dashboardApi.me });
  const hasCompletedAttempt = Boolean(dashboard.data?.recentAttempts.length);

  return (
    <AuthGuard>
      <AppShell>
        <PageHeading
          eyebrow="Review Plan"
          title={t("studyPlanTitle")}
          description={t("studyPlanDescription")}
          actions={
            <Button onClick={() => review.refetch()} disabled={review.isFetching || dashboard.isLoading || !hasCompletedAttempt}>
              {review.isFetching ? "更新中..." : t("regeneratePlan")}
            </Button>
          }
        />
        {dashboard.isLoading && <LoadingSkeleton lines={2} />}
        {dashboard.data && !hasCompletedAttempt && (
          <div className="mb-5 rounded-md border border-amber-300/30 bg-amber-300/10 p-4 text-sm leading-6 text-amber-100">
            <div className="font-semibold">請先完成一次測驗</div>
            <p className="mt-1">
              請先完成一次測驗，系統才能依照錯題建立複習建議。 Vui lòng hoàn thành một bài thi trước để hệ thống tạo kế hoạch ôn tập.
            </p>
          </div>
        )}
        {review.isLoading && <LoadingSkeleton lines={5} />}
        {review.isError && <ErrorState title="複習計畫載入失敗" description="請確認登入狀態與後端服務後再試一次。" />}
        {!review.isLoading && !review.data && <EmptyState title={t("noPlan")} description={t("noPlanDescription")} />}
        {review.data && (
          <div className="space-y-5">
            <Card>
              <h2 className="text-2xl font-semibold text-slate-50">7 天 TOEIC 複習路線</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {locale === "vi" ? review.data.summaryVi : review.data.summaryZhTW}
              </p>
            </Card>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {review.data.actionPlan.map((day) => (
                <Card key={day.day}>
                  <Badge>Day {day.day}</Badge>
                  <h3 className="mt-3 text-lg font-semibold text-slate-50">{day.focus}</h3>
                  <div className="mt-4 space-y-2 text-sm text-slate-300">
                    <p className="rounded-md border border-border bg-slate-950/35 px-3 py-2">{day.taskZhTW}</p>
                    <p className="rounded-md border border-border bg-slate-950/35 px-3 py-2">{day.taskVi}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </AppShell>
    </AuthGuard>
  );
}
