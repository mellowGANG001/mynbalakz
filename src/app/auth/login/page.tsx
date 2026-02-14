"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isLocalTestingMode } from "@/lib/local-mode";

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#F8F8F8] section-shell" />}>
      <LoginPageContent />
    </Suspense>
  );
}

function LoginPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [phone, setPhone] = useState("+7");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const next = searchParams.get("next") ?? "/profile";
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("mynbala_pending_phone", phone);
      window.sessionStorage.setItem("mynbala_pending_next", next);
    }

    if (isLocalTestingMode) {
      setLoading(false);
      router.push(`/auth/verify?phone=${encodeURIComponent(phone)}&next=${encodeURIComponent(next)}`);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithOtp({
      phone,
      options: {
        shouldCreateUser: true,
        channel: "sms",
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    router.push(`/auth/verify?phone=${encodeURIComponent(phone)}&next=${encodeURIComponent(next)}`);
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] section-shell">
      <div className="max-w-md mx-auto px-4">
        <div className="surface-card p-8 md:p-10 space-y-6">
          <span className="chip">
            <Sparkles className="w-4 h-4" />
            Вход в MYNBALA
          </span>
          <h1 className="section-title text-4xl md:text-5xl">Авторизация</h1>
          <p className="section-subtitle">Введите номер телефона. Мы отправим одноразовый код подтверждения.</p>
          <a href="/" className="inline-flex text-sm font-semibold text-[var(--accent)] hover:underline">
            Вернуться на главную
          </a>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm font-bold text-[#1a1a1a]">
              Телефон
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[#7DD957]"
                placeholder="+7 700 000 00 00"
                autoComplete="tel"
                required
              />
            </label>

            {error ? <p className="text-sm text-red-500">{error}</p> : null}

            <button type="submit" className="btn-green w-full" disabled={loading}>
              {loading ? "Отправляем код..." : "Получить код"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
