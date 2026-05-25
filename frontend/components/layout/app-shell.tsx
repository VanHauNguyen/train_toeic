"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Brain,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Library,
  LogOut,
  Menu,
  ShieldCheck,
  Target,
  UserRoundCog,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/layout/language-switcher";

const learnerNav = [
  { href: "/dashboard", label: "學習總覽", icon: LayoutDashboard },
  { href: "/vocabulary", label: "單字庫", icon: Library },
  { href: "/grammar-practice", label: "文法練習", icon: BookOpen },
  { href: "/tests", label: "模擬測驗", icon: ClipboardList },
  { href: "/ai-tutor", label: "引導課程", icon: GraduationCap },
  { href: "/study-plan", label: "讀書計畫", icon: GraduationCap },
  { href: "/mistake-analysis", label: "錯題分析", icon: Target },
  { href: "/skill-profile", label: "能力檔案", icon: Brain },
];

const adminNav = [
  { href: "/admin", label: "管理總覽", icon: ShieldCheck },
  { href: "/admin/vocabulary", label: "單字管理", icon: BookOpen },
  { href: "/admin/questions", label: "題庫管理", icon: ClipboardList },
  { href: "/admin/tests", label: "測驗管理", icon: BarChart3 },
  { href: "/admin/generated-questions", label: "模板題目", icon: GraduationCap },
];

export function AppShell({ children, admin = false }: { children: React.ReactNode; admin?: boolean }) {
  const { t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navItems = admin ? adminNav : learnerNav;
  const navLabels: Record<string, string> = {
    "/dashboard": t("dashboard"),
    "/vocabulary": t("vocabulary"),
    "/grammar-practice": t("grammarPractice"),
    "/tests": t("tests"),
    "/ai-tutor": t("aiTutor"),
    "/study-plan": t("studyPlan"),
    "/mistake-analysis": t("mistakeAnalysis"),
    "/skill-profile": t("skillProfile"),
    "/admin": t("admin"),
    "/admin/vocabulary": t("vocabularyAdmin"),
    "/admin/questions": t("questionAdmin"),
    "/admin/tests": t("testAdmin"),
    "/admin/generated-questions": t("generatedQuestions"),
  };

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const sidebar = (
    <aside className="flex h-full w-72 flex-col border-r border-border bg-slate-950/70 px-4 py-5 backdrop-blur-xl">
      <Link href={admin ? "/admin" : "/dashboard"} className="mb-7 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-300 text-slate-950">
          <Brain className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-50">TOEIC TW</div>
          <div className="text-xs text-slate-400">{t("appSubtitle")}</div>
        </div>
      </Link>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-slate-300 transition",
                active && "bg-cyan-300/12 text-cyan-100 ring-1 ring-cyan-300/20",
                !active && "hover:bg-white/7 hover:text-slate-50",
              )}
            >
              <Icon className="h-4 w-4" />
              {navLabels[item.href] ?? item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto rounded-lg border border-border bg-slate-900/65 p-3">
        <div className="text-sm font-medium text-slate-100">{user?.name ?? t("learner")}</div>
        <div className="mt-1 truncate text-xs text-slate-400">{user?.email}</div>
        <Button variant="ghost" className="mt-3 w-full justify-start px-2" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          {t("logout")}
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen">
      <div className="soft-grid pointer-events-none fixed inset-0 opacity-40" />
      <div className="fixed inset-y-0 left-0 z-30 hidden lg:block">{sidebar}</div>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button className="absolute inset-0 bg-slate-950/70" onClick={() => setOpen(false)} aria-label="關閉選單" />
          <div className="absolute inset-y-0 left-0">{sidebar}</div>
        </div>
      )}
      <div className="relative z-10 lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-border bg-slate-950/62 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between">
            <button
              className="rounded-md border border-border p-2 text-slate-200 lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label="開啟選單"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div>
              <p className="text-xs text-cyan-200">{admin ? t("adminWorkspace") : t("learnerWorkspace")}</p>
              <h1 className="text-base font-semibold text-slate-50 sm:text-lg">
                {admin ? t("adminTitle") : t("learnerTitle")}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              {user?.role === "ADMIN" && (
                <Link
                  href={admin ? "/dashboard" : "/admin"}
                  className="rounded-md border border-border px-3 py-2 text-sm text-slate-200 hover:bg-white/8"
                >
                  {admin ? t("dashboard") : t("admin")}
                </Link>
              )}
            </div>
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
