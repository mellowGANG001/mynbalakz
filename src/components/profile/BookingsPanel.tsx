"use client";

import Link from "next/link";
import { CalendarDays, Users } from "lucide-react";
import type { LocalBooking } from "@/lib/local-mode";
import { ROUTES } from "@/config/routes";

interface BookingsPanelProps {
  bookings: LocalBooking[];
}

const statusMap: Record<LocalBooking["status"], string> = {
  new: "Новая",
  confirmed: "Подтверждена",
  cancelled: "Отменена",
  completed: "Завершена",
};

export function BookingsPanel({ bookings }: BookingsPanelProps) {
  return (
    <div className="space-y-4">
      <div className="surface-card p-6 md:p-7 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-[var(--ink)]">Брони ресторанов</h3>
          <p className="text-sm text-gray-600 mt-1">Управляйте вашими заявками и следите за статусами.</p>
        </div>
        <Link href={ROUTES.restaurants} className="btn-green text-sm">
          Новая бронь
        </Link>
      </div>

      <div className="space-y-3">
        {bookings.length === 0 ? (
          <div className="surface-card p-6 md:p-7">
            <div className="rounded-2xl bg-black/5 p-4 text-sm text-gray-600">
              У вас пока нет броней. Забронируйте столик в пару кликов.
            </div>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="surface-card p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-black text-[var(--ink)]">{booking.full_name}</p>
                  <p className="text-sm text-gray-600">{booking.phone}</p>
                </div>
                <span className="chip">{statusMap[booking.status]}</span>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <p className="inline-flex items-center gap-2 text-gray-700">
                  <Users className="w-4 h-4 text-[var(--primary)]" />
                  Гостей: {booking.guests_count}
                </p>
                <p className="inline-flex items-center gap-2 text-gray-700">
                  <CalendarDays className="w-4 h-4 text-[var(--accent)]" />
                  {booking.visit_at ? new Date(booking.visit_at).toLocaleString("ru-RU") : "Дата не указана"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
