"use client";

import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Brain, ShieldCheck } from "lucide-react";
import { authApi } from "@/lib/api";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function AuthPanel({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [email, setEmail] = useState(mode === "login" ? "user@example.com" : "");
  const [password, setPassword] = useState(mode === "login" ? "User123456" : "");
  const [name, setName] = useState("");

  const mutation = useMutation({
    mutationFn: () =>
      mode === "login"
        ? authApi.login({ email, password })
        : authApi.register({ email, password, name: name || undefined }),
    onSuccess: (data) => {
      setAuth(data.accessToken, data.user);
      router.replace(data.user.role === "ADMIN" ? "/admin" : "/dashboard");
    },
  });

  const submit = (event: FormEvent) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-10">
      <div className="soft-grid absolute inset-0 opacity-50" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 grid w-full max-w-5xl gap-6 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <section className="flex flex-col justify-center">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-300 text-slate-950">
            <Brain className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-cyan-200">TOEIC Traditional Chinese Learning Platform</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-normal text-slate-50 sm:text-5xl">
            用短課程與重複練習建立 TOEIC 基礎
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
            整合題庫、模擬測驗、錯題複習、能力檔案與中越雙語課程，適合下班或下課後低壓力自學。
          </p>
          <div className="mt-7 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
            {["JWT 權限控管", "規則錯題複習", "7 天讀書計畫", "管理員題庫後台"].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-md border border-border bg-slate-900/45 px-3 py-2">
                <ShieldCheck className="h-4 w-4 text-cyan-300" />
                {item}
              </div>
            ))}
          </div>
        </section>
        <Card className="p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-slate-50">{mode === "login" ? "登入學習平台" : "建立學習帳號"}</h2>
          <p className="mt-2 text-sm text-slate-400">
            {mode === "login" ? "可使用種子帳號快速體驗學生或管理員流程。" : "註冊後會自動建立基本能力檔案。"}
          </p>
          <form className="mt-6 space-y-4" onSubmit={submit}>
            {mode === "register" && (
              <label className="block text-sm text-slate-300">
                顯示名稱
                <Input className="mt-2" value={name} onChange={(event) => setName(event.target.value)} placeholder="王小明" />
              </label>
            )}
            <label className="block text-sm text-slate-300">
              電子信箱
              <Input className="mt-2" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="user@example.com" />
            </label>
            <label className="block text-sm text-slate-300">
              密碼
              <Input
                className="mt-2"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="至少 8 個字元"
              />
            </label>
            {mutation.isError && (
              <div className="rounded-md border border-rose-400/30 bg-rose-950/30 px-3 py-2 text-sm text-rose-100">
                登入或註冊失敗，請確認後端服務、帳號密碼與網路狀態。
              </div>
            )}
            <Button className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? "處理中..." : mode === "login" ? "登入" : "註冊"}
            </Button>
          </form>
          <div className="mt-5 rounded-md border border-border bg-slate-950/35 p-3 text-xs leading-6 text-slate-400">
            <div>學生：user@example.com / User123456</div>
            <div>管理員：admin@example.com / Admin123456</div>
          </div>
          <p className="mt-5 text-sm text-slate-400">
            {mode === "login" ? "尚未有帳號？" : "已經有帳號？"}
            <Link className="ml-1 text-cyan-200 hover:text-cyan-100" href={mode === "login" ? "/register" : "/login"}>
              {mode === "login" ? "前往註冊" : "返回登入"}
            </Link>
          </p>
        </Card>
      </motion.div>
    </main>
  );
}
