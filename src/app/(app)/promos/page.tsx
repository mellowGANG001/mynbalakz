"use client";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { AppTabs } from "@/components/navigation/AppTabs";
import Link from "next/link";
import { getPromoCodeFromId } from "@/lib/promo";
import { promos as localPromos } from "@/lib/home-data";

const promos = localPromos.map((p, i) => ({
  id: p.id,
  title: p.title,
  description: p.description,
  discount: p.id === "family" ? 20 : p.id === "restaurant" ? 15 : 10,
  valid_until: new Date(Date.now() + (i + 30) * 24 * 60 * 60 * 1000).toISOString(),
}));

export default function PromosPage() {
  return (
    <main className="min-h-screen page-bg-juicy">
      <Header />
      <AppTabs />
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <div className="space-y-3">
            <h1 className="section-title text-4xl md:text-5xl">Акции и предложения</h1>
            <p className="section-subtitle">
              Выберите акцию, и мы автоматически подставим ее в сценарий покупки билета.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {promos.map((promo) => (
              <article key={promo.id} className="surface-card p-6 space-y-3 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[#ffd93d]/15 blur-[50px] pointer-events-none" />
                <p className="chip w-fit relative z-10">Скидка {promo.discount}%</p>
                <h2 className="text-2xl font-black text-[#1a1a1a]">{promo.title}</h2>
                <p className="text-sm text-gray-600">{promo.description}</p>
                <p className="rounded-xl bg-black/5 px-3 py-2 text-sm font-semibold text-[#1a1a1a]">
                  Промокод: {getPromoCodeFromId(promo.id)}
                </p>
                <p className="text-xs text-gray-500">
                  Действует до: {new Date(promo.valid_until).toLocaleDateString("ru-RU")}
                </p>
                <Link href={`/tickets?promo=${encodeURIComponent(getPromoCodeFromId(promo.id))}`} className="btn-green">
                  Применить акцию
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
