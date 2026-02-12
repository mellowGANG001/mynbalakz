import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { createClient } from "@/lib/supabase/server";
import { AppTabs } from "@/components/navigation/AppTabs";
import { get2GisRouteUrl, getGoogleRouteUrl } from "@/lib/maps";

export default async function ParksPage() {
  const supabase = await createClient();
  const supabaseAny = supabase as any;
  const { data: branches } = await supabaseAny
    .from("branches")
    .select("id,name,city,address,phone,working_hours,latitude,longitude")
    .eq("is_active", true)
    .order("city");

  return (
    <main className="min-h-screen page-bg-juicy">
      <Header />
      <AppTabs />
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <div className="space-y-3">
            <h1 className="section-title text-4xl md:text-5xl">Наши парки</h1>
            <p className="section-subtitle">
              Выберите филиал и откройте маршрут в картах в один клик.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {(branches ?? []).map((branch: any) => (
              <article key={branch.id} className="surface-card p-6 space-y-3 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-[#7dd957]/10 blur-[40px] pointer-events-none" />
                <p className="chip w-fit relative z-10">{branch.city}</p>
                <h2 className="text-2xl font-black text-[#1a1a1a]">{branch.name}</h2>
                <p className="text-sm text-gray-600">{branch.address}</p>
                <p className="text-sm text-gray-600">{branch.phone ?? "Телефон уточняется"}</p>
                <p className="text-sm text-gray-600">{branch.working_hours ?? "График уточняется"}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={get2GisRouteUrl({
                      name: branch.name,
                      city: branch.city,
                      address: branch.address,
                      latitude: branch.latitude,
                      longitude: branch.longitude,
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-green"
                  >
                    Маршрут в 2GIS
                  </a>
                  <a
                    href={getGoogleRouteUrl({
                      name: branch.name,
                      city: branch.city,
                      address: branch.address,
                      latitude: branch.latitude,
                      longitude: branch.longitude,
                    })}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                  >
                    Открыть в Google Maps
                  </a>
                  <a href={`tel:${(branch.phone ?? "").replace(/\s+/g, "")}`} className="btn-dark">
                    Позвонить
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
