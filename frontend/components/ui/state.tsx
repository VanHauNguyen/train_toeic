import { AlertCircle, Inbox } from "lucide-react";
import { Card } from "@/components/ui/card";

export function LoadingSkeleton({ lines = 4 }: { lines?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="h-16 animate-pulse rounded-lg border border-border bg-slate-800/45" />
      ))}
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <Card className="flex flex-col items-center justify-center py-12 text-center">
      <Inbox className="mb-3 h-9 w-9 text-cyan-300" />
      <h3 className="font-semibold text-slate-100">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-slate-400">{description}</p>
    </Card>
  );
}

export function ErrorState({ title = "資料載入失敗", description }: { title?: string; description?: string }) {
  return (
    <Card className="border-rose-400/30 bg-rose-950/20">
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 text-rose-300" />
        <div>
          <h3 className="font-semibold text-rose-100">{title}</h3>
          <p className="mt-1 text-sm text-rose-200/80">{description ?? "請確認後端服務與登入狀態後再試一次。"}</p>
        </div>
      </div>
    </Card>
  );
}
