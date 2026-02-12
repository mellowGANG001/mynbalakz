"use client";

import { motion } from "framer-motion";
import { ArrowRight, UtensilsCrossed, Pizza, Cake, Coffee, ChefHat, Sparkles } from "lucide-react";
import { menuHighlights } from "@/lib/home-data";
import { ROUTES } from "@/config/routes";

const menuIcons = [Pizza, Cake, Coffee, ChefHat];

export function Restaurants() {
  return (
    <section id="restaurants" className="section-shell relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[20%] left-[-5%] w-72 h-72 rounded-full bg-[#ff8c42]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-96 h-96 rounded-full bg-[#ffd93d]/10 blur-[100px] pointer-events-none" />

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
            <UtensilsCrossed className="w-4 h-4" />
            Семейные рестораны
          </motion.span>
          <h2 className="section-title">
            Вкусная пауза<br />
            <span className="text-[var(--orange)]">между аттракционами</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Детское меню, популярные семейные блюда и праздничные сеты в каждом парке MYNBALA.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Menu Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[var(--radius-lg)] bg-white border border-black/5 shadow-[var(--shadow-lift)] p-8 md:p-10 flex flex-col"
          >
            {/* Decorative blob */}
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#ff8c42]/10 blur-3xl" />

            <div className="relative z-10 flex-1 flex flex-col">
              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff8c42] to-[#ff6b00] flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <ChefHat className="w-7 h-7 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-black text-[var(--ink)]">Меню для всей семьи</h3>
                  <p className="text-sm text-gray-500">Топовые блюда для активного дня</p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-1 flex-1">
                {menuHighlights.map((item, index) => {
                  const IconComp = menuIcons[index % menuIcons.length];
                  return (
                    <motion.div 
                      key={item.id} 
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[var(--surface)] transition-colors group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#fff2e8] to-[#ffe0c8] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <IconComp className="w-5 h-5 text-[#ff8c42]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[var(--ink)]">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.category}</p>
                      </div>
                      <span className="text-sm font-bold text-[#ff8c42]">{item.price}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA */}
              <motion.a 
                href={ROUTES.restaurants}
                className="btn-dark w-fit mt-6"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <UtensilsCrossed className="w-5 h-5" />
                Забронировать стол
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lift]] min-h-[500px]"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fff4ca] via-[#ffecd8] to-[#ffe0c8]" />

            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute top-10 right-10 w-24 h-24 rounded-full bg-[#ff8c42]/20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-[#ffd93d]/30"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              />
            </div>

            <div className="relative z-10 h-full p-8 flex flex-col">
              <span className="chip-white w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                Меню ресторана
              </span>

              {/* Food Grid Preview */}
              <div className="grid grid-cols-2 gap-4 mt-6 flex-1">
                {[
                  { icon: Pizza, label: "Пицца", color: "#ff6b00" },
                  { icon: Cake, label: "Десерты", color: "#ff6b9d" },
                  { icon: Coffee, label: "Напитки", color: "#8b5a2b" },
                  { icon: ChefHat, label: "Сеты", color: "#7dd957" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 p-5 flex flex-col items-center justify-center gap-3 hover:bg-white/90 transition-all cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ background: `${item.color}20` }}
                    >
                      <item.icon className="w-6 h-6" style={{ color: item.color }} />
                    </div>
                    <span className="text-sm font-bold text-[var(--ink)]">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.a 
                href={ROUTES.restaurants}
                className="btn-green w-full justify-center mt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Смотреть полное меню
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
