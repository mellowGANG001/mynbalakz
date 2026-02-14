"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { createClient } from "@/lib/supabase/client";
import { AppTabs } from "@/components/navigation/AppTabs";
import { addLocalFeedback, isLocalTestingMode } from "@/lib/local-mode";
import { branches as localBranches } from "@/lib/home-data";

type Branch = { id: string; city: string; name: string };

export default function SupportPage() {
  const supabase = useMemo(() => createClient(), []);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchId, setBranchId] = useState("");
  const [topic, setTopic] = useState("general");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadBranches = async () => {
      if (isLocalTestingMode) {
        const fallback = localBranches.map((branch) => ({ id: branch.id, city: branch.city, name: branch.name }));
        setBranches(fallback);
        if (fallback[0]) setBranchId(fallback[0].id);
        return;
      }
      const { data } = await supabase.from("branches").select("id,city,name").eq("is_active", true).order("city");
      const normalized = (data ?? []) as Branch[];
      setBranches(normalized);
      if (normalized[0]) setBranchId(normalized[0].id);
    };
    void loadBranches();
  }, [supabase]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (isLocalTestingMode) {
      addLocalFeedback({
        branch_id: branchId,
        topic,
        rating,
        message,
        status: "new",
      });
      setLoading(false);
      setSuccess("Обращение отправлено! Мы ответим в ближайшее время.");
      setMessage("");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      setError("Для отправки обращения выполните вход.");
      window.location.href = "/auth/login?next=/support";
      return;
    }

    const { error: insertError } = await supabase.from("feedback").insert({
      user_id: user.id,
      branch_id: branchId,
      topic,
      rating,
      message,
      status: "new",
    });

    setLoading(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }

    setSuccess("Обращение отправлено. Спасибо за обратную связь!");
    setMessage("");
  };

  return (
    <main className="min-h-screen page-bg-juicy">
      <Header />
      <AppTabs />
      <section className="section-shell">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="surface-card p-8 md:p-10 space-y-4">
            <h1 className="section-title text-4xl md:text-5xl">Поддержка MYNBALA</h1>
            <p className="section-subtitle">
              Оставьте обращение, и мы ответим в ближайшее время. Для срочных вопросов используйте телефон из шапки.
            </p>
          </div>
          <div className="surface-card p-8 md:p-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="support-branch" className="form-label">Филиал</label>
                <select id="support-branch" value={branchId} onChange={(event) => setBranchId(event.target.value)} className="form-input">
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>{branch.city} — {branch.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="support-topic" className="form-label">Тема</label>
                <select id="support-topic" value={topic} onChange={(event) => setTopic(event.target.value)} className="form-input">
                  <option value="general">Общий вопрос</option>
                  <option value="tickets">Билеты</option>
                  <option value="service">Сервис</option>
                  <option value="suggestion">Предложение</option>
                </select>
              </div>
              <div>
                <label className="form-label">Оценка</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`w-11 h-11 rounded-xl text-lg font-bold transition-all ${
                        star <= rating
                          ? "bg-[var(--secondary)] text-[var(--ink)] shadow-sm"
                          : "bg-black/5 text-gray-400 hover:bg-black/10"
                      }`}
                    >
                      {star}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="support-message" className="form-label">Сообщение</label>
                <textarea
                  id="support-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                  placeholder="Опишите ваш вопрос или предложение..."
                  className="form-input min-h-28 resize-none"
                />
              </div>
              <button type="submit" className="btn-green w-full" disabled={loading}>
                {loading ? "Отправляем..." : "Отправить"}
              </button>
              {success ? <p className="text-sm text-emerald-600 rounded-xl bg-emerald-50 px-3 py-2">{success}</p> : null}
              {error ? <p className="text-sm text-red-500 rounded-xl bg-red-50 px-3 py-2">{error}</p> : null}
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
