"use client";

import { Globe2 } from "lucide-react";
import { usersApi } from "@/lib/api";
import { localeLabels, type Locale, useI18n } from "@/lib/i18n";
import { useAuthStore } from "@/store/auth-store";

const locales: Locale[] = ["en", "zh-TW", "vi"];

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const { token, setUser } = useAuthStore();

  const changeLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    if (!token) return;
    const preferredLanguage = nextLocale === "vi" ? "VI" : nextLocale === "en" ? "EN" : "ZH_TW";
    usersApi.updateMe({ preferredLanguage }).then(setUser).catch(() => undefined);
  };

  return (
    <label className="flex items-center gap-2 rounded-md border border-border bg-slate-950/45 px-2 py-1.5 text-sm text-slate-200">
      <Globe2 className="h-4 w-4 text-cyan-200" />
      <select
        value={locale}
        onChange={(event) => changeLocale(event.target.value as Locale)}
        className="bg-transparent text-sm outline-none"
        aria-label="Language"
      >
        {locales.map((item) => (
          <option key={item} value={item} className="bg-slate-950 text-slate-100">
            {localeLabels[item]}
          </option>
        ))}
      </select>
    </label>
  );
}
