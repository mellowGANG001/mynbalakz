"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, MapPin, UtensilsCrossed } from "lucide-react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { ROUTES } from "@/config/routes";

export default function TicketSuccessPage() {
  return (
    <main className="min-h-screen page-bg-juicy">
      <Header />
      <section className="section-shell">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            className="surface-card p-8 md:p-12 text-center space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-20 h-20 mx-auto text-[var(--primary)]" strokeWidth={1.5} />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-black text-[var(--ink)]">Билет оформлен</h1>
            <p className="text-base text-gray-600 max-w-md mx-auto">
              QR-код уже в разделе «Мои билеты». Покажите его на входе в парк.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <Link href={ROUTES.myTickets} className="btn-green justify-center">
                Мои билеты
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={ROUTES.parks} className="btn-dark justify-center">
                <MapPin className="w-4 h-4" />
                Маршрут
              </Link>
              <Link href={ROUTES.restaurants} className="btn-outline justify-center">
                <UtensilsCrossed className="w-4 h-4" />
                Забронировать стол
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
