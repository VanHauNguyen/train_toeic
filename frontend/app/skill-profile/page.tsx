"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { AuthGuard } from "@/components/layout/auth-guard";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/layout/page-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ErrorState, LoadingSkeleton } from "@/components/ui/state";
import { skillProfileApi } from "@/lib/api";
import type { SkillLevel, ToeicPart } from "@/types/api";

const levels: SkillLevel[] = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
const parts: ToeicPart[] = ["PART1", "PART2", "PART3", "PART4", "PART5", "PART6", "PART7"];

export default function SkillProfilePage() {
  const profile = useQuery({ queryKey: ["skill-profile"], queryFn: skillProfileApi.me });
  const [form, setForm] = useState({
    estimatedLevel: "BEGINNER" as SkillLevel,
    vocabularyLevel: "BEGINNER" as SkillLevel,
    grammarLevel: "BEGINNER" as SkillLevel,
    listeningLevel: "BEGINNER" as SkillLevel,
    readingLevel: "BEGINNER" as SkillLevel,
    weakParts: [] as ToeicPart[],
    strongParts: [] as ToeicPart[],
  });
  const update = useMutation({ mutationFn: () => skillProfileApi.update(form), onSuccess: () => profile.refetch() });

  useEffect(() => {
    if (profile.data) setForm(profile.data);
  }, [profile.data]);

  const togglePart = (field: "weakParts" | "strongParts", part: ToeicPart) => {
    setForm((value) => ({
      ...value,
      [field]: value[field].includes(part) ? value[field].filter((item) => item !== part) : [...value[field], part],
    }));
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    update.mutate();
  };

  return (
    <AuthGuard>
      <AppShell>
        <PageHeading eyebrow="Skill Profile" title="能力檔案" description="維護程度、強項與弱項，讓讀書計畫更貼近你的需求。" />
        {profile.isLoading && <LoadingSkeleton lines={5} />}
        {profile.isError && <ErrorState />}
        {profile.data && (
          <form onSubmit={submit} className="grid gap-6 lg:grid-cols-2">
            <Card>
              <h2 className="font-semibold text-slate-50">程度設定</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {[
                  ["estimatedLevel", "整體程度"],
                  ["vocabularyLevel", "單字程度"],
                  ["grammarLevel", "文法程度"],
                  ["listeningLevel", "聽力程度"],
                  ["readingLevel", "閱讀程度"],
                ].map(([key, label]) => (
                  <label key={key} className="text-sm text-slate-300">
                    {label}
                    <select
                      className="mt-2 h-10 w-full rounded-md border border-border bg-slate-950/60 px-3 text-sm"
                      value={form[key as keyof typeof form] as string}
                      onChange={(event) => setForm((value) => ({ ...value, [key]: event.target.value as SkillLevel }))}
                    >
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            </Card>
            <Card>
              <h2 className="font-semibold text-slate-50">TOEIC Part 強弱項</h2>
              <div className="mt-5 space-y-5">
                {[
                  ["weakParts", "需要加強"],
                  ["strongParts", "相對擅長"],
                ].map(([field, label]) => (
                  <div key={field}>
                    <p className="mb-2 text-sm text-slate-300">{label}</p>
                    <div className="flex flex-wrap gap-2">
                      {parts.map((part) => (
                        <button
                          key={`${field}-${part}`}
                          type="button"
                          onClick={() => togglePart(field as "weakParts" | "strongParts", part)}
                          className={`rounded-md border px-3 py-2 text-sm ${
                            form[field as "weakParts" | "strongParts"].includes(part)
                              ? "border-cyan-300 bg-cyan-300/12 text-cyan-100"
                              : "border-border text-slate-300"
                          }`}
                        >
                          {part}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-6" disabled={update.isPending}>
                {update.isPending ? "儲存中..." : "儲存能力檔案"}
              </Button>
            </Card>
          </form>
        )}
      </AppShell>
    </AuthGuard>
  );
}
