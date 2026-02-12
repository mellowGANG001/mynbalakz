"use client";

import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { createClient } from "@/lib/supabase/client";
import { AppTabs } from "@/components/navigation/AppTabs";
import { branches as localBranches, promos as localPromos, tariffs as localTariffs } from "@/lib/home-data";
import { addLocalTicket, getLocalUser, isLocalTestingMode } from "@/lib/local-mode";
import { clearTicketsFlowState, readTicketsFlowState, writeTicketsFlowState } from "@/lib/ticket-funnel-state";
import { findPromoByCode, getPromoCodeFromId, isPromoExpired, normalizePromoCode, type PromoOffer } from "@/lib/promo";

type Branch = { id: string; name: string; city: string };
type Tariff = { id: string; name: string; price: number; description: string | null };
type Promo = PromoOffer;

export default function TicketsPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#F8F8F8] section-shell" />}>
      <TicketsPageContent />
    </Suspense>
  );
}

function TicketsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createClient() as any, []);

  const [branches, setBranches] = useState<Branch[]>([]);
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [branchId, setBranchId] = useState("");
  const [tariffId, setTariffId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<Promo | null>(null);
  const [stateRestored, setStateRestored] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const incomingPromo = searchParams.get("promo");
    if (incomingPromo) {
      setPromoCode(normalizePromoCode(incomingPromo));
    }
  }, [searchParams]);

  useEffect(() => {
    const loadData = async () => {
      if (isLocalTestingMode) {
        const b = localBranches.map((item) => ({ id: item.id, name: item.name, city: item.city }));
        const t = localTariffs.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description ?? null,
        }));
        const p = localPromos.map((item, index) => ({
          id: item.id,
          title: item.title,
          discount: item.id === "family" ? 20 : item.id === "restaurant" ? 15 : 10,
          valid_until: new Date(Date.now() + (index + 30) * 24 * 60 * 60 * 1000).toISOString(),
        }));
        setBranches(b);
        setTariffs(t);
        setPromos(p);
        if (b[0]) setBranchId(b[0].id);
        if (t[0]) setTariffId(t[0].id);
        return;
      }

      const [{ data: branchData }, { data: tariffData }, { data: promoData }] = await Promise.all([
        supabase.from("branches").select("id,name,city").eq("is_active", true).order("city"),
        supabase.from("tariffs").select("id,name,price,description").eq("is_active", true).order("sort_order"),
        supabase.from("promos").select("id,title,discount,valid_until").eq("is_active", true).order("valid_until"),
      ]);

      const b = (branchData ?? []) as Branch[];
      const t = (tariffData ?? []) as Tariff[];
      const p = (promoData ?? []) as Promo[];
      setBranches(b);
      setTariffs(t);
      setPromos(p);
      if (b[0]) setBranchId(b[0].id);
      if (t[0]) setTariffId(t[0].id);
    };

    void loadData();
  }, [supabase]);

  useEffect(() => {
    if (stateRestored || branches.length === 0 || tariffs.length === 0) return;
    const state = readTicketsFlowState();
    const qtyFromQuery = Number(searchParams.get("qty") ?? "");
    const promoFromQuery = searchParams.get("promo");
    if (state) {
      if (state.branchId) setBranchId(state.branchId);
      if (state.tariffId) setTariffId(state.tariffId);
      if (state.quantity > 0) setQuantity(state.quantity);
      if (state.promoCode) setPromoCode(normalizePromoCode(state.promoCode));
      setMessage("Восстановили ваш незавершенный заказ.");
    }
    if (Number.isFinite(qtyFromQuery) && qtyFromQuery > 0) {
      setQuantity(Math.floor(qtyFromQuery));
    }
    if (promoFromQuery) {
      setPromoCode(normalizePromoCode(promoFromQuery));
    }
    setStateRestored(true);
  }, [branches.length, searchParams, stateRestored, tariffs.length]);

  useEffect(() => {
    if (!promoCode || promos.length === 0 || appliedPromo) return;
    const matchedPromo = findPromoByCode(promos, promoCode);
    if (!matchedPromo) return;
    if (isPromoExpired(matchedPromo.valid_until)) return;
    setAppliedPromo(matchedPromo);
    setMessage(`Промокод ${getPromoCodeFromId(matchedPromo.id)} применен.`);
  }, [appliedPromo, promoCode, promos]);

  useEffect(() => {
    if (!branchId || !tariffId || !stateRestored) return;
    writeTicketsFlowState({
      branchId,
      tariffId,
      quantity,
      promoCode,
    });
  }, [branchId, promoCode, quantity, stateRestored, tariffId]);

  const selectedTariff = tariffs.find((item) => item.id === tariffId);
  const originalTotal = (selectedTariff?.price ?? 0) * quantity;
  const discountPercent = Math.max(0, Math.min(100, Number(appliedPromo?.discount ?? 0)));
  const discountAmount = Math.round((originalTotal * discountPercent) / 100);
  const finalTotal = Math.max(0, originalTotal - discountAmount);

  const handleApplyPromo = () => {
    setError(null);
    setMessage(null);
    const matchedPromo = findPromoByCode(promos, promoCode);
    if (!matchedPromo) {
      setAppliedPromo(null);
      setError("Промокод не найден. Проверьте код и попробуйте снова.");
      return;
    }
    if (isPromoExpired(matchedPromo.valid_until)) {
      setAppliedPromo(null);
      setError("Срок действия промокода истек.");
      return;
    }
    setAppliedPromo(matchedPromo);
    setPromoCode(getPromoCodeFromId(matchedPromo.id));
    setMessage(`Скидка ${matchedPromo.discount ?? 0}% активирована.`);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    let userId = "";
    if (isLocalTestingMode) {
      const localUser = getLocalUser();
      if (!localUser) {
        writeTicketsFlowState({
          branchId,
          tariffId,
          quantity,
          promoCode: promoCode.trim(),
        });
        setLoading(false);
        router.push(`/auth/login?next=${encodeURIComponent("/tickets")}`);
        return;
      }
      userId = localUser.id;
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        writeTicketsFlowState({
          branchId,
          tariffId,
          quantity,
          promoCode: promoCode.trim(),
        });
        setLoading(false);
        router.push(`/auth/login?next=${encodeURIComponent("/tickets")}`);
        return;
      }
      userId = user.id;
    }

    if (!selectedTariff || !branchId) {
      setLoading(false);
      setError("Выберите филиал и тариф.");
      return;
    }

    const now = new Date();
    const validUntil = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const qrCode = `MYNBALA-${userId.slice(0, 6)}-${Date.now()}`;

    if (isLocalTestingMode) {
      addLocalTicket({
        id: `local-ticket-${Date.now()}`,
        tariff_name: selectedTariff.name,
        quantity,
        total_price: finalTotal,
        original_price: originalTotal,
        discount_amount: discountAmount,
        promo_code: appliedPromo ? getPromoCodeFromId(appliedPromo.id) : "",
        qr_code: qrCode,
        status: "paid",
        valid_until: validUntil.toISOString(),
      });
      clearTicketsFlowState();
      setLoading(false);
      setMessage("Билет оформлен!");
      setTimeout(() => router.push("/tickets/success"), 500);
      return;
    }

    const { error: insertError } = await supabase.from("tickets").insert({
      user_id: userId,
      branch_id: branchId,
      tariff_id: selectedTariff.id,
      tariff_name: selectedTariff.name,
      quantity,
      total_price: finalTotal,
      qr_code: qrCode,
      valid_from: now.toISOString(),
      valid_until: validUntil.toISOString(),
      status: "paid",
      points_earned: Math.floor(finalTotal / 100),
      payment_id: appliedPromo ? `promo:${appliedPromo.id}` : null,
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    clearTicketsFlowState();
    setMessage("Билет оформлен!");
    setTimeout(() => router.push("/tickets/success"), 500);
  };

  return (
    <main className="min-h-screen page-bg-juicy">
      <Header />
      <AppTabs />
      <section className="section-shell">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="surface-card p-7 md:p-8 space-y-4">
            <h1 className="section-title text-4xl md:text-5xl">Купить билет</h1>
            <p className="section-subtitle">
              Выберите город, тариф и количество билетов. После оплаты QR появится в разделе «Мои билеты».
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="branch" className="form-label">Парк</label>
                <select
                  id="branch"
                  className="form-input"
                  value={branchId}
                  onChange={(event) => setBranchId(event.target.value)}
                >
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.city} — {branch.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tariff" className="form-label">Тариф</label>
                <div className="space-y-2">
                  {tariffs.map((tariff) => (
                    <button
                      key={tariff.id}
                      type="button"
                      onClick={() => setTariffId(tariff.id)}
                      className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${
                        tariffId === tariff.id
                          ? "border-[var(--primary)] bg-[var(--primary)]/5 shadow-sm"
                          : "border-black/5 bg-white hover:border-black/15"
                      }`}
                    >
                      <span className="text-sm font-black text-[var(--ink)]">{tariff.name}</span>
                      <span className="block text-xs text-gray-500 mt-0.5">{tariff.description}</span>
                      <span className="block text-lg font-black text-[var(--primary-dark)] mt-1">
                        {tariff.price.toLocaleString("ru-RU")} ₸
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="qty" className="form-label">Количество</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-2xl border border-black/10 bg-white text-xl font-bold flex items-center justify-center hover:bg-black/5 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-black text-[var(--ink)] w-12 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-2xl border border-black/10 bg-white text-xl font-bold flex items-center justify-center hover:bg-black/5 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="promo" className="form-label">Промокод</label>
                <div className="flex gap-2">
                  <input
                    id="promo"
                    type="text"
                    value={promoCode}
                    onChange={(event) => setPromoCode(normalizePromoCode(event.target.value))}
                    placeholder="MYN-ABC123"
                    className="form-input"
                  />
                  <button type="button" className="btn-dark px-5 py-3 text-sm shrink-0" onClick={handleApplyPromo}>
                    OK
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-green w-full text-lg" disabled={loading}>
                {loading ? "Оформляем..." : `Купить за ${finalTotal.toLocaleString("ru-RU")} ₸`}
              </button>
            </form>

            {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
            {error ? <p className="text-sm text-red-500">{error}</p> : null}
          </div>

          <div className="surface-card p-7 md:p-8 space-y-4 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#7dd957]/15 blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full bg-[#ffd93d]/15 blur-[50px] pointer-events-none" />
            <h2 className="text-2xl font-black text-[#1a1a1a] relative z-10">Итог заказа</h2>
            <div className="rounded-2xl p-5 space-y-2 relative z-10" style={{ background: "linear-gradient(145deg, #e8fce0 0%, #e0f7ff 100%)" }}>
              <p className="text-sm text-gray-700 font-semibold">Тариф: {selectedTariff?.name ?? "—"}</p>
              <p className="text-sm text-gray-700">Количество: {quantity}</p>
              <p className="text-sm text-gray-600">Базовая сумма: {originalTotal.toLocaleString("ru-RU")} ₸</p>
              {discountAmount > 0 && (
                <p className="text-sm font-bold text-emerald-700">
                  Скидка: -{discountAmount.toLocaleString("ru-RU")} ₸
                  {appliedPromo ? ` (${getPromoCodeFromId(appliedPromo.id)})` : ""}
                </p>
              )}
              <div className="pt-2 border-t border-black/5">
                <p className="text-4xl font-black text-[#1a1a1a]">{finalTotal.toLocaleString("ru-RU")} ₸</p>
              </div>
            </div>
            <Link href="/my-tickets" className="btn-dark w-full justify-center">
              Перейти в Мои билеты
            </Link>
            <Link href="/restaurants" className="btn-outline w-full justify-center">
              После покупки: забронировать стол
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
