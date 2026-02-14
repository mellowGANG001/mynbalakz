"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isLocalTestingMode, setLocalUser } from "@/lib/local-mode";

export default function VerifyPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#F8F8F8] section-shell" />}>
      <VerifyPageContent />
    </Suspense>
  );
}

function VerifyPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const queryPhone = searchParams.get("phone") ?? "";
  const queryNext = searchParams.get("next") ?? "/profile";
  const storedPhone = typeof window !== "undefined" ? window.sessionStorage.getItem("mynbala_pending_phone") ?? "" : "";
  const storedNext = typeof window !== "undefined" ? window.sessionStorage.getItem("mynbala_pending_next") ?? "" : "";
  const phone = queryPhone || storedPhone;
  const next = queryNext || storedNext || "/profile";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    if (isLocalTestingMode) {
      if (code.trim().length < 4) {
        setLoading(false);
        setError("Введите 4-6 цифр для локального входа.");
        return;
      }

      const normalizedPhone = phone || "+7 700 000 00 00";
      const localUserId = `local-${normalizedPhone.replace(/[^\d]/g, "").slice(-10) || "user"}`;
      setLocalUser({ id: localUserId, phone: normalizedPhone });
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem("mynbala_pending_phone");
        window.sessionStorage.removeItem("mynbala_pending_next");
      }
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("mynbala-local-auth-changed"));
      }
      setLoading(false);
      router.push(next);
      return;
    }

    if (!phone) {
      setLoading(false);
      setError("Номер телефона не найден. Вернитесь на шаг входа.");
      return;
    }

    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      phone,
      token: code,
      type: "sms",
    });

    if (verifyError || !data.user) {
      setLoading(false);
      setError(verifyError?.message ?? "Не удалось подтвердить код.");
      return;
    }

    const userId = data.user.id;

    await Promise.all([
      supabase.from("users").upsert(
        {
          id: userId,
          phone,
          first_name: "",
          last_name: "",
        },
        { onConflict: "id" }
      ),
      supabase.from("login_history").insert({
        user_id: userId,
        success: true,
        login_method: "phone_otp",
      }),
    ]);

    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("mynbala_pending_phone");
      window.sessionStorage.removeItem("mynbala_pending_next");
    }
    setLoading(false);
    router.push(next);
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] section-shell">
      <div className="max-w-md mx-auto px-4">
        <div className="surface-card p-8 md:p-10 space-y-6">
          <span className="chip">
            <ShieldCheck className="w-4 h-4" />
            Подтверждение входа
          </span>
          <h1 className="section-title text-4xl md:text-5xl">Введите код</h1>
          <p className="section-subtitle">Код отправлен на номер {phone || "ваш телефон"}.</p>
          {!phone ? (
            <p className="text-sm text-amber-700 rounded-xl bg-amber-100 px-3 py-2">
              Потерялись параметры входа. Вернитесь на страницу авторизации и отправьте код повторно.
            </p>
          ) : null}
          <form className="space-y-4" onSubmit={handleVerify}>
            <label className="block text-sm font-bold text-[#1a1a1a]">
              Код из SMS
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3 tracking-[0.25em] text-center text-xl outline-none focus:border-[#7DD957]"
                placeholder="123456"
                inputMode="numeric"
                maxLength={6}
                required
              />
            </label>

            {error ? <p className="text-sm text-red-500">{error}</p> : null}

            <button type="submit" className="btn-green w-full" disabled={loading}>
              {loading ? "Проверяем..." : "Подтвердить и войти"}
            </button>
            {!phone ? (
              <a href="/auth/login" className="inline-flex text-sm font-semibold text-[var(--accent)] hover:underline">
                Вернуться к вводу телефона
              </a>
            ) : null}
          </form>
        </div>
      </div>
    </main>
  );
}
