"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/profile");
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
      <p className="text-sm text-gray-500">Авторизация...</p>
    </main>
  );
}
