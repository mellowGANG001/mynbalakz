import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { createClient } from "@/lib/supabase/server";
import { AppTabs } from "@/components/navigation/AppTabs";
import Link from "next/link";
import { getPromoCodeFromId } from "@/lib/promo";

export default async function PromosPage() {
  const supabase = await createClient();
  const supabaseAny = supabase as any;
  const { data: promos } = await supabaseAny
    .from("promos")
    .select("id,title,description,discount,valid_until")
    .eq("is_active", true)
    .order("valid_until");

  return (
    <main className="min-h-screen bg-[#F8F8F8]">
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
            {(promos ?? []).map((promo: any) => (
              <article key={promo.id} className="surface-card p-6 space-y-3">
                <p className="chip w-fit">Скидка {promo.discount ?? 0}%</p>
                <h2 className="text-2xl font-black text-[#1a1a1a]">{promo.title}</h2>
                <p className="text-sm text-gray-600">{promo.description}</p>
                <p className="rounded-xl bg-black/5 px-3 py-2 text-sm font-semibold text-[#1a1a1a]">
                  Промокод: {getPromoCodeFromId(promo.id)}
                </p>
                <p className="text-xs text-gray-500">
                  Действует до: {new Date(promo.valid_until).toLocaleDateString("ru-RU")}
                </p>
                <Link href={`/tickets?promo=${encodeURIComponent(getPromoCodeFromId(promo.id))}`} className="btn-green w-fit">
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
