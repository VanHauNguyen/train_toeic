"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSkeleton } from "@/components/ui/state";
import { useAuthStore } from "@/store/auth-store";
import type { UserRole } from "@/types/api";

export function AuthGuard({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: UserRole;
}) {
  const router = useRouter();
  const { token, user, hydrated } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return;
    if (!token) {
      router.replace("/login");
      return;
    }
    if (role && user?.role !== role) {
      router.replace("/dashboard");
    }
  }, [hydrated, role, router, token, user?.role]);

  if (!hydrated || !token || (role && user?.role !== role)) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <LoadingSkeleton lines={5} />
      </main>
    );
  }

  return children;
}
