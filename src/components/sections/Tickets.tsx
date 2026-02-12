"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Ticket, QrCode, Zap, Star, Clock, Sparkles } from "lucide-react";
import { tariffs } from "@/lib/home-data";
import { ROUTES } from "@/config/routes";

const tariffStyles = [
  { 
    gradient: "from-[#f8fdf5] to-white",
    accent: "#7dd957",
    iconBg: "bg-gradient-to-br from-[#7dd957] to-[#5cb338]",
  },
  { 
    gradient: "from-[#fff9eb] to-white",
    accent: "#ffd93d",
    iconBg: "bg-gradient-to-br from-[#ffd93d] to-[#f5c400]",
    isPopular: true,
  },
  { 
    gradient: "from-[#f0f9ff] to-white",
    accent: "#00b4d8",
    iconBg: "bg-gradient-to-br from-[#00b4d8] to-[#0077b6]",
  },
];

export function Tickets() {
  return (
    <section id="prices" className="section-shell relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[10%] left-[-5%] w-80 h-80 rounded-full bg-[#7dd957]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 rounded-full bg-[#ffd93d]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 space-y-12 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="chip mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Ticket className="w-4 h-4" />
            Тарифы и билеты
          </motion.span>
          <h2 className="section-title">
            Честные цены<br />
            <span className="text-[var(--primary)]">без скрытых условий</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Покупка онлайн и проход без очередей. Все тарифы включают доступ к основным аттракционам.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tariffs.map((tariff, index) => {
            const style = tariffStyles[index % tariffStyles.length];
            const isPopular = tariff.isPopular;

            return (
              <motion.div
                key={tariff.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -10, scale: isPopular ? 1.02 : 1.03 }}
                className={`relative overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-b ${style.gradient} border-2 transition-all duration-400 ${
                  isPopular 
                    ? "border-[#ffd93d] shadow-[0_20px_60px_rgba(255,217,61,0.25)] scale-[1.02] md:scale-105 z-10" 
                    : "border-black/5 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]"
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                    <motion.div 
                      className="flex items-center gap-1.5 bg-gradient-to-r from-[#ffd93d] to-[#f5c400] text-[var(--ink)] text-xs font-bold px-4 py-2 rounded-full shadow-lg"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Star className="w-3.5 h-3.5" fill="currentColor" />
                      ПОПУЛЯРНЫЙ
                    </motion.div>
                  </div>
                )}

                {/* Decorative glow */}
                <div 
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30"
                  style={{ background: style.accent }}
                />

                <div className={`p-6 md:p-8 ${isPopular ? "pt-10" : ""}`}>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${style.iconBg} flex items-center justify-center shadow-lg`}>
                      {index === 0 && <Clock className="w-7 h-7 text-white" />}
                      {index === 1 && <Zap className="w-7 h-7 text-white" />}
                      {index === 2 && <Sparkles className="w-7 h-7 text-white" />}
                    </div>
                    <div>
                      <h3 className="font-black text-xl text-[var(--ink)]">{tariff.name}</h3>
                      <p className="text-sm text-gray-500">{tariff.description}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl md:text-6xl font-black" style={{ color: style.accent }}>
                        {tariff.price.toLocaleString("ru-RU")}
                      </span>
                      <span className="text-2xl font-bold text-gray-400">₸</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">за 1 ребёнка</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-5 h-5" style={{ color: style.accent }} />
                      <span>Все аттракционы включены</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-5 h-5" style={{ color: style.accent }} />
                      <span>Без ограничений по времени</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-5 h-5" style={{ color: style.accent }} />
                      <span>Электронный билет</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.a
                    href={ROUTES.tickets}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full font-bold text-base transition-all duration-300 ${
                      isPopular 
                        ? "bg-gradient-to-r from-[#ffd93d] to-[#f5c400] text-[var(--ink)] shadow-[0_10px_30px_rgba(255,217,61,0.4)] hover:shadow-[0_15px_40px_rgba(255,217,61,0.5)]" 
                        : "bg-[var(--ink)] text-white shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Выбрать тариф
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* QR Code Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-[var(--radius-lg)] bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] p-8 md:p-10"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#7dd957]/20 to-transparent rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex items-start gap-5">
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7dd957] to-[#5cb338] flex items-center justify-center shadow-[var(--shadow-glow)] flex-shrink-0"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <QrCode className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                  Быстрый вход по онлайн-билету
                </h3>
                <p className="text-gray-400 text-base">
                  Покажите QR-код на входе и проходите без ожидания в кассе.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
              <div className="flex flex-col gap-3">
                <p className="inline-flex items-center gap-3 text-white text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#7dd957]" />
                  Без комиссии
                </p>
                <p className="inline-flex items-center gap-3 text-white text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#7dd957]" />
                  Мгновенная доставка
                </p>
                <p className="inline-flex items-center gap-3 text-white text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#7dd957]" />
                  Возврат по правилам
                </p>
              </div>
              <motion.a
                href={ROUTES.myTickets}
                className="btn-green whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Купить сейчас
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
