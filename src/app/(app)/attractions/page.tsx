"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FerrisWheel,
  Waves,
  Castle,
  Rocket,
  Car,
  Gamepad2,
  Drama,
  Baby,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { AppTabs } from "@/components/navigation/AppTabs";

/* ── Attractions Data ──────────────────────────────────────────── */

interface Attraction {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  ageRange: string;
  color: string;
  gradient: string;
}

const attractions: Attraction[] = [
  {
    id: "carousel",
    name: "Карусели",
    description: "Классические карусели с лошадками и каретами для самых маленьких гостей.",
    icon: FerrisWheel,
    ageRange: "0-3",
    color: "#7dd957",
    gradient: "linear-gradient(135deg, #7dd957 0%, #5cb338 100%)",
  },
  {
    id: "softplay",
    name: "Мягкая зона",
    description: "Безопасное пространство с мягкими модулями, горками и сухим бассейном.",
    icon: Baby,
    ageRange: "0-3",
    color: "#ff6b9d",
    gradient: "linear-gradient(135deg, #ff6b9d 0%, #ff3366 100%)",
  },
  {
    id: "trampoline",
    name: "Батутная арена",
    description: "Большие батуты, поролоновая яма и акробатические дорожки.",
    icon: Rocket,
    ageRange: "3-7",
    color: "#00b4d8",
    gradient: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
  },
  {
    id: "slides",
    name: "Горки и лабиринты",
    description: "Многоуровневый лабиринт с тоннелями, мостиками и скоростными горками.",
    icon: Waves,
    ageRange: "3-7",
    color: "#ffd93d",
    gradient: "linear-gradient(135deg, #ffd93d 0%, #f5c400 100%)",
  },
  {
    id: "castle",
    name: "Надувной замок",
    description: "Огромный надувной замок с полосой препятствий и стенкой для скалолазания.",
    icon: Castle,
    ageRange: "3-7",
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
  },
  {
    id: "racing",
    name: "Автодром",
    description: "Электрические машинки на настоящей трассе с виражами и светофорами.",
    icon: Car,
    ageRange: "7-12",
    color: "#ff8c42",
    gradient: "linear-gradient(135deg, #ff8c42 0%, #ff6b00 100%)",
  },
  {
    id: "arcade",
    name: "Аркадные автоматы",
    description: "Зона с игровыми автоматами, аэрохоккеем, баскетболом и VR-очками.",
    icon: Gamepad2,
    ageRange: "7-12",
    color: "#00b4d8",
    gradient: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
  },
  {
    id: "show",
    name: "Шоу-сцена",
    description: "Ежедневные шоу с аниматорами, квестами и интерактивными спектаклями.",
    icon: Drama,
    ageRange: "12+",
    color: "#7dd957",
    gradient: "linear-gradient(135deg, #7dd957 0%, #5cb338 100%)",
  },
];

/* ── Filter Badges ─────────────────────────────────────────────── */

const ageFilters = ["Все", "0-3", "3-7", "7-12", "12+"] as const;
type AgeFilter = (typeof ageFilters)[number];

/* ── Page ──────────────────────────────────────────────────────── */

export default function AttractionsPage() {
  const [activeFilter, setActiveFilter] = useState<AgeFilter>("Все");

  const filtered =
    activeFilter === "Все"
      ? attractions
      : attractions.filter((a) => a.ageRange === activeFilter);

  return (
    <main className="min-h-screen page-bg-juicy">
      <Header />
      <AppTabs />

      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          {/* ── Header ─────────────────────────────────────── */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="chip">
              <Sparkles className="w-4 h-4" />
              Аттракционы
            </span>
            <h1 className="section-title text-4xl md:text-5xl">
              Все развлечения<br />
              <span className="text-[var(--primary)]">в одном месте</span>
            </h1>
            <p className="section-subtitle">
              Более 50 аттракционов для детей любого возраста. Выберите категорию, чтобы найти идеальное развлечение.
            </p>
          </motion.div>

          {/* ── Age Filters ─────────────────────────────────── */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {ageFilters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <motion.button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300"
                  style={{
                    background: isActive
                      ? "var(--gradient-green)"
                      : "rgba(0,0,0,0.04)",
                    color: isActive ? "#fff" : "var(--ink)",
                    boxShadow: isActive ? "var(--shadow-glow)" : "none",
                    border: isActive ? "none" : "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  {filter === "Все" ? "Все возрасты" : `${filter} лет`}
                </motion.button>
              );
            })}
          </motion.div>

          {/* ── Cards Grid ──────────────────────────────────── */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((attraction, index) => {
                const Icon = attraction.icon;
                return (
                  <motion.article
                    key={attraction.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: index * 0.06,
                    }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="surface-card relative overflow-hidden group"
                  >
                    {/* Gradient top bar */}
                    <div
                      className="h-2 w-full"
                      style={{ background: attraction.gradient }}
                    />

                    {/* Decorative glow */}
                    <div
                      className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[50px] opacity-20 group-hover:opacity-35 transition-opacity"
                      style={{ background: attraction.color }}
                    />

                    <div className="p-6 space-y-4 relative z-10">
                      {/* Icon */}
                      <motion.div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ background: attraction.gradient }}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-black text-[var(--ink)]">
                          {attraction.name}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {attraction.description}
                        </p>
                      </div>

                      {/* Age Badge */}
                      <div className="flex items-center gap-2 pt-1">
                        <span
                          className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold"
                          style={{
                            background: `${attraction.color}18`,
                            color: attraction.color,
                            border: `1px solid ${attraction.color}30`,
                          }}
                        >
                          {attraction.ageRange === "12+"
                            ? "12+ лет"
                            : `${attraction.ageRange} лет`}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-500 text-lg">
                Нет аттракционов для выбранного возраста.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
