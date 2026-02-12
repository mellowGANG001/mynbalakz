"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FerrisWheel,
  Waves,
  Castle,
  Rocket,
  Baby,
  Puzzle,
  Zap,
  PartyPopper,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

/* ─── Types ───────────────────────────────────────────────────── */

interface Attraction {
  id: string;
  name: string;
  description: string;
  ageRange: string;
  ageMin: number;
  ageMax: number;
  icon: React.ElementType;
  color: string;
}

/* ─── Data ────────────────────────────────────────────────────── */

const attractions: Attraction[] = [
  {
    id: "ferris-wheel",
    name: "Колесо обозрения",
    description: "Панорамный вид на весь парк с высоты птичьего полёта.",
    ageRange: "3-12 лет",
    ageMin: 3,
    ageMax: 12,
    icon: FerrisWheel,
    color: "#7dd957",
  },
  {
    id: "aqua-zone",
    name: "Аква-зона",
    description: "Водные горки и бассейн с тёплой водой круглый год.",
    ageRange: "3-12 лет",
    ageMin: 3,
    ageMax: 12,
    icon: Waves,
    color: "#00b4d8",
  },
  {
    id: "castle-quest",
    name: "Замок приключений",
    description: "Многоуровневый лабиринт с горками и мягкими препятствиями.",
    ageRange: "3-7 лет",
    ageMin: 3,
    ageMax: 7,
    icon: Castle,
    color: "#a855f7",
  },
  {
    id: "rocket-ride",
    name: "Ракета",
    description: "Захватывающие вращения для любителей скорости и адреналина.",
    ageRange: "7-12 лет",
    ageMin: 7,
    ageMax: 12,
    icon: Rocket,
    color: "#ff8c42",
  },
  {
    id: "baby-land",
    name: "Baby Land",
    description: "Мягкая игровая зона для самых маленьких гостей парка.",
    ageRange: "0-3 лет",
    ageMin: 0,
    ageMax: 3,
    icon: Baby,
    color: "#ff6b9d",
  },
  {
    id: "puzzle-room",
    name: "Комната головоломок",
    description: "Интерактивные квесты, развивающие логику и командную работу.",
    ageRange: "7-12 лет",
    ageMin: 7,
    ageMax: 12,
    icon: Puzzle,
    color: "#ffd93d",
  },
  {
    id: "laser-tag",
    name: "Лазертаг арена",
    description: "Командные бои в неоновом лабиринте с безопасным оружием.",
    ageRange: "12+ лет",
    ageMin: 12,
    ageMax: 99,
    icon: Zap,
    color: "#00b4d8",
  },
  {
    id: "party-zone",
    name: "Зона праздников",
    description: "Тематические комнаты для дней рождений и вечеринок.",
    ageRange: "3-12 лет",
    ageMin: 3,
    ageMax: 12,
    icon: PartyPopper,
    color: "#7dd957",
  },
];

/* ─── Age filter config ───────────────────────────────────────── */

interface AgeFilter {
  label: string;
  min: number;
  max: number;
}

const ageFilters: AgeFilter[] = [
  { label: "Все", min: 0, max: 99 },
  { label: "0-3", min: 0, max: 3 },
  { label: "3-7", min: 3, max: 7 },
  { label: "7-12", min: 7, max: 12 },
  { label: "12+", min: 12, max: 99 },
];

/* ─── Attraction Card ─────────────────────────────────────────── */

interface AttractionCardProps {
  attraction: Attraction;
  index: number;
}

function AttractionCard({ attraction, index }: AttractionCardProps) {
  const Icon = attraction.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-7 cursor-pointer transition-shadow duration-300"
      style={{
        background: `linear-gradient(160deg, ${attraction.color}18 0%, ${attraction.color}08 60%, #ffffff 100%)`,
        border: `1.5px solid ${attraction.color}22`,
      }}
    >
      {/* Decorative background circle */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"
        style={{ background: attraction.color }}
      />

      {/* Icon */}
      <motion.div
        className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg"
        style={{ background: `linear-gradient(135deg, ${attraction.color}, ${attraction.color}cc)` }}
        whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>

      {/* Name */}
      <h3 className="text-lg font-black text-[var(--ink)] leading-tight mb-2">
        {attraction.name}
      </h3>

      {/* Age badge */}
      <span
        className="inline-flex items-center px-3 py-1 mb-3 text-[11px] font-bold uppercase tracking-wider rounded-full"
        style={{
          background: `${attraction.color}15`,
          color: attraction.color,
          border: `1px solid ${attraction.color}30`,
        }}
      >
        {attraction.ageRange}
      </span>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {attraction.description}
      </p>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 100%, ${attraction.color}12 0%, transparent 70%)`,
        }}
      />
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */

export function Attractions() {
  const [activeFilter, setActiveFilter] = useState<AgeFilter>(ageFilters[0]);

  const filtered = attractions.filter((a) => {
    if (activeFilter.label === "Все") return true;
    // Show attraction if its age range overlaps with the filter range
    return a.ageMin < activeFilter.max && a.ageMax >= activeFilter.min;
  });

  return (
    <section id="attractions" className="section-shell relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[10%] left-[-6%] w-80 h-80 rounded-full bg-[#a855f7]/8 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[-8%] w-96 h-96 rounded-full bg-[#00b4d8]/8 blur-[90px] pointer-events-none" />
      <div className="absolute top-[50%] left-[30%] w-60 h-60 rounded-full bg-[#ffd93d]/8 blur-[70px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 space-y-12 relative z-10">
        {/* Section header */}
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
            <Sparkles className="w-4 h-4" />
            Аттракционы
          </motion.span>

          <h2 className="section-title">
            50+ развлечений<br />
            <span className="text-[var(--primary)]">для всех возрастов</span>
          </h2>
        </motion.div>

        {/* Age filter pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {ageFilters.map((filter) => {
            const isActive = activeFilter.label === filter.label;
            return (
              <motion.button
                key={filter.label}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                style={{
                  background: isActive
                    ? "var(--gradient-green)"
                    : "rgba(125,217,87,0.08)",
                  color: isActive ? "#fff" : "var(--ink)",
                  border: isActive
                    ? "1.5px solid transparent"
                    : "1.5px solid rgba(125,217,87,0.2)",
                  boxShadow: isActive ? "var(--shadow-glow)" : "none",
                }}
              >
                {filter.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Attraction grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter.label}
            layout
            className="grid grid-cols-2 md:grid-cols-4 gap-5"
          >
            {filtered.map((attraction, index) => (
              <AttractionCard
                key={attraction.id}
                attraction={attraction}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          className="text-center pt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          <Link href="/attractions" className="btn-green">
            <Sparkles className="w-5 h-5" />
            Смотреть все аттракционы
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
