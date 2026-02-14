"use client";

import { FormEvent, useMemo, useState } from "react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { createClient } from "@/lib/supabase/client";
import { AppTabs } from "@/components/navigation/AppTabs";
import { addLocalBooking, isLocalTestingMode } from "@/lib/local-mode";

export default function RestaurantsPage() {
  const supabase = useMemo(() => createClient(), []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [guests, setGuests] = useState(2);
  const [visitDate, setVisitDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (isLocalTestingMode) {
      addLocalBooking({
        full_name: name,
        phone,
        guests_count: guests,
        visit_at: visitDate ? new Date(visitDate).toISOString() : null,
        status: "new",
      });
      setLoading(false);
      setMessage("Заявка принята! Мы свяжемся с вами для подтверждения.");
      setName("");
      setPhone("+7");
      setGuests(2);
      setVisitDate("");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error: insertError } = await supabase.from("restaurant_bookings").insert({
      user_id: user?.id ?? null,
      full_name: name,
      phone,
      guests_count: guests,
      visit_at: visitDate ? new Date(visitDate).toISOString() : null,
      status: "new",
    });

    setLoading(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }

    setMessage("Заявка отправлена. Мы свяжемся с вами для подтверждения.");
    setName("");
    setPhone("+7");
    setGuests(2);
    setVisitDate("");
  };

  return (
    <main className="min-h-screen page-bg-juicy">
      <Header />
      <AppTabs />
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="surface-card p-7 md:p-8 space-y-4">
            <h1 className="section-title text-4xl md:text-5xl">Рестораны MYNBALA</h1>
            <p className="section-subtitle">
              Бронирование столика в пару кликов. Укажите контакты, и администратор подтвердит бронь.
            </p>
            <a href="/support" className="btn-dark">
              Связаться с менеджером
            </a>
          </div>

          <div className="surface-card p-7 md:p-8">
            <form className="space-y-5" onSubmit={handleBooking}>
              <h2 className="text-2xl font-black text-[#1a1a1a]">Забронировать стол</h2>
              <div>
                <label htmlFor="booking-name" className="form-label">Имя</label>
                <input
                  id="booking-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  placeholder="Ваше имя"
                  className="form-input"
                />
              </div>
              <div>
                <label htmlFor="booking-phone" className="form-label">Телефон</label>
                <input
                  id="booking-phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                  autoComplete="tel"
                  className="form-input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="booking-guests" className="form-label">Гостей</label>
                  <input
                    id="booking-guests"
                    type="number"
                    min={1}
                    value={guests}
                    onChange={(event) => setGuests(Number(event.target.value))}
                    className="form-input"
                  />
                </div>
                <div>
                  <label htmlFor="booking-date" className="form-label">Дата и время</label>
                  <input
                    id="booking-date"
                    type="datetime-local"
                    value={visitDate}
                    onChange={(event) => setVisitDate(event.target.value)}
                    className="form-input"
                  />
                </div>
              </div>
              <button className="btn-green w-full" type="submit" disabled={loading}>
                {loading ? "Отправляем..." : "Забронировать"}
              </button>
              {message ? <p className="text-sm text-emerald-600 rounded-xl bg-emerald-50 px-3 py-2">{message}</p> : null}
              {error ? <p className="text-sm text-red-500 rounded-xl bg-red-50 px-3 py-2">{error}</p> : null}
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
