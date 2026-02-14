"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { AppTabs } from "@/components/navigation/AppTabs";
import { createClient } from "@/lib/supabase/client";
import { getLocalTickets, getLocalUser, isLocalTestingMode, type LocalTicket } from "@/lib/local-mode";
import { Skeleton } from "@/components/ui/skeleton";

type Ticket = {
  id: string;
  tariff_name: string;
  quantity: number;
  total_price: number;
  original_price?: number;
  discount_amount?: number;
  promo_code?: string;
  status: string;
  qr_code: string;
  valid_until: string;
};

function getQrImageUrl(payload: string) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(payload)}`;
}

export default function MyTicketsPage() {
  const supabase = useMemo(() => createClient() as any, []);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const loadTickets = async () => {
      if (isLocalTestingMode) {
        const localUser = getLocalUser();
        const localTickets = getLocalTickets();
        setIsAuthenticated(Boolean(localUser));
        setTickets((localTickets as LocalTicket[]).map((ticket) => ({ ...ticket })));
        setLoading(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsAuthenticated(Boolean(user));
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("tickets")
        .select("id,tariff_name,quantity,total_price,status,qr_code,valid_until")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setTickets((data ?? []) as Ticket[]);
      setLoading(false);
    };

    void loadTickets();
  }, [supabase]);

  return (
    <main className="min-h-screen page-bg-juicy">
      <Header />
      <AppTabs />
      <section className="section-shell">
        <div className="max-w-5xl mx-auto px-4">
          <div className="surface-card p-8 md:p-10 space-y-4">
            <h1 className="section-title text-4xl md:text-5xl">Мои билеты</h1>
            <p className="section-subtitle">Покажите QR на входе или купите билет повторно в один клик.</p>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={`skeleton-ticket-${index}`} className="rounded-2xl border border-black/10 bg-white p-5 space-y-3">
                    <Skeleton className="h-4 w-24 rounded-xl" />
                    <Skeleton className="h-8 w-2/3 rounded-2xl" />
                    <Skeleton className="h-4 w-1/2 rounded-xl" />
                    <Skeleton className="h-52 w-full rounded-2xl" />
                  </div>
                ))}
              </div>
            ) : !isAuthenticated ? (
              <Link href="/auth/login?next=/my-tickets" className="btn-green">
                Войти для просмотра билетов
              </Link>
            ) : tickets.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="rounded-2xl border border-black/10 bg-white p-5 relative overflow-hidden">
                    <div
                      className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl"
                      style={{
                        background:
                          ticket.status === "paid"
                            ? "var(--gradient-green)"
                            : ticket.status === "active"
                              ? "var(--gradient-blue)"
                              : ticket.status === "used"
                                ? "var(--gradient-yellow)"
                                : "linear-gradient(135deg, #ccc 0%, #999 100%)",
                      }}
                    />
                    <p className="text-xs font-bold uppercase text-gray-500 mt-1">{ticket.status}</p>
                    <h3 className="mt-2 text-xl font-black text-[#1a1a1a]">{ticket.tariff_name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {ticket.quantity} шт. · {Number(ticket.total_price).toLocaleString("ru-RU")} ₸
                    </p>
                    {ticket.discount_amount ? (
                      <p className="text-xs font-semibold text-emerald-700 mt-1">
                        Скидка: -{Number(ticket.discount_amount).toLocaleString("ru-RU")} ₸
                        {ticket.promo_code ? ` (${ticket.promo_code})` : ""}
                      </p>
                    ) : null}
                    <div className="mt-4 rounded-2xl bg-black/5 p-3">
                      <img
                        src={getQrImageUrl(ticket.qr_code)}
                        alt={`QR код билета ${ticket.tariff_name}`}
                        className="mx-auto h-44 w-44 rounded-xl border border-black/10 bg-white p-2"
                        loading="lazy"
                      />
                      <p className="mt-2 text-center text-xs text-gray-500">Код: {ticket.qr_code}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Действует до: {new Date(ticket.valid_until).toLocaleString("ru-RU")}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link
                        href={`/tickets?qty=${encodeURIComponent(String(ticket.quantity))}`}
                        className="btn-green btn-sm"
                      >
                        Купить снова
                      </Link>
                      <Link href="/restaurants" className="btn-dark btn-sm">
                        Забронировать стол
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-black/5 p-5 text-sm text-gray-600">
                Билеты пока не найдены. Перейдите в раздел покупки и оформите первый билет.
                <div className="mt-4">
                  <Link href="/tickets" className="btn-green">
                    Купить первый билет
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
