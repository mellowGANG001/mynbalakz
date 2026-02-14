"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Users,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Crown,
  Star,
  Sparkles,
  PartyPopper,
  Home,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { AppTabs } from "@/components/navigation/AppTabs";
import { addLocalBooking, isLocalTestingMode } from "@/lib/local-mode";

/* ── Types ─────────────────────────────────────────────────────── */

type CabinType = "birthday" | "vip" | "standard";

interface Cabin {
  id: string;
  name: string;
  cabin_type: CabinType;
  capacity: number;
  price_per_hour: number;
  color: string;
}

interface Branch {
  id: string;
  city: string;
  emoji: string;
  cabins: Cabin[];
}

interface TimeSlot {
  hour: number;
  label: string;
  booked: boolean;
}

/* ── Cabin type metadata ───────────────────────────────────────── */

const CABIN_META: Record<
  CabinType,
  { label: string; gradient: string; icon: React.ElementType; features: string[] }
> = {
  birthday: {
    label: "День Рождения",
    gradient: "linear-gradient(135deg, #ff6b9d 0%, #ff3d7f 100%)",
    icon: PartyPopper,
    features: ["Аниматор", "Шарики", "Фото-зона"],
  },
  vip: {
    label: "VIP",
    gradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
    icon: Crown,
    features: ["Декор", "Бар", "Звук"],
  },
  standard: {
    label: "Стандарт",
    gradient: "linear-gradient(135deg, #5ECE2E 0%, #4aab1e 100%)",
    icon: Star,
    features: ["Уютно", "ТВ", "Чисто"],
  },
};

/* ── Data ──────────────────────────────────────────────────────── */

const BRANCHES: Branch[] = [
  {
    id: "taraz",
    city: "Тараз",
    emoji: "🏔️",
    cabins: [
      { id: "t-1", name: "Кабинка «Праздник»", cabin_type: "birthday", capacity: 15, price_per_hour: 8000, color: "#ff6b9d" },
      { id: "t-2", name: "Кабинка «Люкс»", cabin_type: "vip", capacity: 20, price_per_hour: 12000, color: "#a855f7" },
      { id: "t-3", name: "Кабинка «Уют»", cabin_type: "standard", capacity: 10, price_per_hour: 5000, color: "#7dd957" },
    ],
  },
  {
    id: "shymkent",
    city: "Шымкент",
    emoji: "🌞",
    cabins: [
      { id: "s-1", name: "Кабинка «Веселье»", cabin_type: "birthday", capacity: 15, price_per_hour: 8000, color: "#ff6b9d" },
      { id: "s-2", name: "Кабинка «Премиум»", cabin_type: "vip", capacity: 20, price_per_hour: 12000, color: "#a855f7" },
      { id: "s-3", name: "Кабинка «Комфорт»", cabin_type: "standard", capacity: 10, price_per_hour: 5000, color: "#7dd957" },
    ],
  },
  {
    id: "aksu",
    city: "Аксу",
    emoji: "🌊",
    cabins: [
      { id: "a-1", name: "Кабинка «Торжество»", cabin_type: "birthday", capacity: 15, price_per_hour: 8000, color: "#ff6b9d" },
      { id: "a-2", name: "Кабинка «Элит»", cabin_type: "vip", capacity: 20, price_per_hour: 12000, color: "#a855f7" },
      { id: "a-3", name: "Кабинка «Семейная»", cabin_type: "standard", capacity: 10, price_per_hour: 5000, color: "#7dd957" },
    ],
  },
  {
    id: "atyrau",
    city: "Атырау",
    emoji: "🏙️",
    cabins: [
      { id: "at-1", name: "Кабинка «Радость»", cabin_type: "birthday", capacity: 15, price_per_hour: 8000, color: "#ff6b9d" },
      { id: "at-2", name: "Кабинка «VIP Зал»", cabin_type: "vip", capacity: 20, price_per_hour: 12000, color: "#a855f7" },
      { id: "at-3", name: "Кабинка «Базовая»", cabin_type: "standard", capacity: 10, price_per_hour: 5000, color: "#7dd957" },
    ],
  },
];

/** Demo booked slots per cabin id: hours that are occupied */
const DEMO_BOOKED: Record<string, number[]> = {
  "t-1": [14, 15],
  "t-2": [11, 12, 13],
  "s-1": [16, 17],
  "s-2": [10, 11],
  "a-1": [13, 14, 15],
  "a-3": [18, 19],
  "at-1": [12, 13],
  "at-2": [15, 16, 17],
};

/* ── Animation variants ────────────────────────────────────────── */

const stepVariants = {
  initial: { opacity: 0, x: 60, scale: 0.96 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.96 },
};

const cardStagger = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

/* ── Confetti particle ─────────────────────────────────────────── */

function ConfettiParticle({ index }: { index: number }) {
  const colors = ["#ff6b9d", "#a855f7", "#7dd957", "#ffd93d", "#00b4d8", "#ff8c42"];
  const color = colors[index % colors.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 0.5;
  const duration = 1.5 + Math.random() * 1.5;
  const size = 6 + Math.random() * 8;
  const rotation = Math.random() * 360;

  return (
    <motion.div
      className="absolute rounded-sm pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        left: `${left}%`,
        top: -10,
        rotate: rotation,
      }}
      initial={{ y: -20, opacity: 1 }}
      animate={{
        y: [0, 400 + Math.random() * 200],
        x: [0, (Math.random() - 0.5) * 150],
        rotate: [rotation, rotation + 360 * (Math.random() > 0.5 ? 1 : -1)],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

/* ── Helpers ────────────────────────────────────────────────────── */

function buildTimeSlots(cabinId: string): TimeSlot[] {
  const booked = DEMO_BOOKED[cabinId] ?? [];
  const slots: TimeSlot[] = [];
  for (let h = 10; h <= 21; h++) {
    slots.push({
      hour: h,
      label: `${String(h).padStart(2, "0")}:00`,
      booked: booked.includes(h),
    });
  }
  return slots;
}

function formatPrice(n: number): string {
  return n.toLocaleString("ru-RU");
}

/* ── Page Component ────────────────────────────────────────────── */

export default function CabinBookingPage() {
  /* State */
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");
  const [selectedCabinId, setSelectedCabinId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState("");
  const [startHour, setStartHour] = useState<number | null>(null);
  const [duration, setDuration] = useState(2);
  const [guestsCount, setGuestsCount] = useState(10);
  const [submitted, setSubmitted] = useState(false);

  /* Derived */
  const selectedBranch = useMemo(
    () => BRANCHES.find((b) => b.id === selectedBranchId) ?? null,
    [selectedBranchId],
  );

  const selectedCabin = useMemo(
    () => selectedBranch?.cabins.find((c) => c.id === selectedCabinId) ?? null,
    [selectedBranch, selectedCabinId],
  );

  const timeSlots = useMemo(
    () => (selectedCabinId ? buildTimeSlots(selectedCabinId) : []),
    [selectedCabinId],
  );

  const totalPrice = useMemo(
    () => (selectedCabin ? selectedCabin.price_per_hour * duration : 0),
    [selectedCabin, duration],
  );

  /* Step validation */
  const canGoNext =
    currentStep === 1
      ? !!selectedBranchId
      : currentStep === 2
        ? !!selectedCabinId
        : currentStep === 3
          ? !!selectedDate && startHour !== null && guestsCount > 0
          : true;

  /* Handlers */
  const handleBranchSelect = useCallback((id: string) => {
    setSelectedBranchId(id);
    setSelectedCabinId("");
    setStartHour(null);
  }, []);

  const handleCabinSelect = useCallback((id: string) => {
    setSelectedCabinId(id);
    setStartHour(null);
  }, []);

  const handleSlotClick = useCallback(
    (hour: number) => {
      const slot = timeSlots.find((s) => s.hour === hour);
      if (!slot || slot.booked) return;
      setStartHour(hour);
    },
    [timeSlots],
  );

  const handleConfirm = useCallback(() => {
    if (!selectedCabin || !selectedBranch || startHour === null) return;

    if (isLocalTestingMode) {
      addLocalBooking({
        full_name: `Кабинка: ${selectedCabin.name}`,
        phone: "",
        guests_count: guestsCount,
        visit_at: selectedDate
          ? `${selectedDate}T${String(startHour).padStart(2, "0")}:00`
          : null,
        status: "new",
      });
    }

    setSubmitted(true);
  }, [selectedCabin, selectedBranch, startHour, guestsCount, selectedDate]);

  const progressPercent = ((currentStep - 1) / 3) * 100;

  /* Available start hours for select */
  const availableStartHours = useMemo(() => {
    const hours: number[] = [];
    for (let h = 10; h <= 20; h++) {
      hours.push(h);
    }
    return hours;
  }, []);

  /* Check if selected time range has conflicts */
  const hasTimeConflict = useMemo(() => {
    if (startHour === null) return false;
    for (let i = 0; i < duration; i++) {
      const slot = timeSlots.find((s) => s.hour === startHour + i);
      if (slot?.booked) return true;
      if (startHour + i > 21) return true;
    }
    return false;
  }, [startHour, duration, timeSlots]);

  /* ── Render ────────────────────────────────────────────────── */

  return (
    <main className="min-h-screen page-bg-juicy">
      <Header />
      <AppTabs />

      <section className="section-shell">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          {/* ── Page Header ───────────────────────────────── */}
          <motion.div
            className="space-y-3 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="chip mx-auto">
              <Home className="w-4 h-4" />
              Кабинки
            </span>
            <h1 className="section-title text-4xl md:text-5xl">
              Забронируй кабинку
              <br />
              <span className="text-[var(--primary)]">в MYNBALA</span>
            </h1>
            <p className="section-subtitle mx-auto text-center">
              Уютные кабинки для праздников и семейного отдыха в 4 городах
            </p>
          </motion.div>

          {/* ── Progress Bar ──────────────────────────────── */}
          <div className="max-w-lg mx-auto space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500">
              <span>Шаг {currentStep} из 4</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 rounded-full bg-black/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--gradient-green)" }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
            {/* Step indicators */}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center gap-2 flex-1">
                  <motion.div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    animate={{
                      background:
                        step <= currentStep
                          ? "linear-gradient(135deg, #7dd957, #5cb338)"
                          : "#e5e7eb",
                      color: step <= currentStep ? "#fff" : "#9ca3af",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {step < currentStep ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      step
                    )}
                  </motion.div>
                  {step < 4 && (
                    <div className="flex-1 h-0.5 rounded-full bg-gray-200 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "var(--gradient-green)" }}
                        initial={{ width: "0%" }}
                        animate={{
                          width: currentStep > step ? "100%" : "0%",
                        }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── Steps ─────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {/* ─── STEP 1: Select Branch ─── */}
            {currentStep === 1 && !submitted && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <h2 className="text-2xl font-black text-[var(--ink)] mb-6 text-center">
                  Выберите город
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {BRANCHES.map((branch, i) => {
                    const isSelected = selectedBranchId === branch.id;
                    return (
                      <motion.button
                        key={branch.id}
                        type="button"
                        onClick={() => handleBranchSelect(branch.id)}
                        variants={cardStagger}
                        initial="initial"
                        animate="animate"
                        transition={{
                          delay: i * 0.08,
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        whileHover={{ y: -6, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative overflow-hidden rounded-[28px] border-2 transition-all duration-300 text-center"
                        style={{
                          borderColor: isSelected
                            ? "var(--primary)"
                            : "rgba(0,0,0,0.06)",
                          boxShadow: isSelected
                            ? "0 20px 50px rgba(125,217,87,0.25)"
                            : "var(--shadow-soft)",
                          background:
                            "linear-gradient(180deg, #ffffff 0%, #fafffe 100%)",
                        }}
                      >
                        {/* Decorative gradient blob */}
                        <div
                          className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[40px] pointer-events-none opacity-30"
                          style={{
                            background: isSelected
                              ? "var(--gradient-green)"
                              : "linear-gradient(135deg, #00b4d8, #7dd957)",
                          }}
                        />

                        <div className="relative z-10 p-6 md:p-8 space-y-3">
                          <div className="text-4xl md:text-5xl">
                            {branch.emoji}
                          </div>
                          <div className="text-lg md:text-xl font-black text-[var(--ink)]">
                            {branch.city}
                          </div>
                          <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{branch.cabins.length} кабинки</span>
                          </div>

                          {isSelected && (
                            <motion.div
                              className="mx-auto w-8 h-8 rounded-full flex items-center justify-center"
                              style={{ background: "var(--gradient-green)" }}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 20,
                              }}
                            >
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ─── STEP 2: Select Cabin ─── */}
            {currentStep === 2 && !submitted && selectedBranch && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <h2 className="text-2xl font-black text-[var(--ink)] mb-2 text-center">
                  Выберите кабинку
                </h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                  {selectedBranch.city} — {selectedBranch.cabins.length} кабинки
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selectedBranch.cabins.map((cabin, i) => {
                    const isSelected = selectedCabinId === cabin.id;
                    const meta = CABIN_META[cabin.cabin_type];
                    const Icon = meta.icon;

                    return (
                      <motion.button
                        key={cabin.id}
                        type="button"
                        onClick={() => handleCabinSelect(cabin.id)}
                        variants={cardStagger}
                        initial="initial"
                        animate="animate"
                        transition={{
                          delay: i * 0.12,
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        whileHover={{ y: -12, scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="relative text-left overflow-hidden rounded-[var(--radius-xl)] transition-all duration-300"
                        style={{
                          background: "rgba(255,255,255,0.55)",
                          backdropFilter: "blur(24px) saturate(1.8)",
                          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
                          border: isSelected
                            ? `2.5px solid ${cabin.color}`
                            : "1.5px solid rgba(255,255,255,0.6)",
                          boxShadow: isSelected
                            ? `0 20px 50px ${cabin.color}35, inset 0 1px 0 rgba(255,255,255,0.8)`
                            : "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
                        }}
                      >
                        {/* Gradient header with dot pattern */}
                        <div
                          className="relative h-24 w-full overflow-hidden"
                          style={{ background: meta.gradient }}
                        >
                          {/* Dot pattern overlay */}
                          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 60" preserveAspectRatio="none">
                            <pattern id={`dots-${cabin.id}`} width="8" height="8" patternUnits="userSpaceOnUse">
                              <circle cx="2" cy="2" r="1" fill="white" />
                            </pattern>
                            <rect width="100" height="60" fill={`url(#dots-${cabin.id})`} />
                          </svg>
                          {/* Gloss overlay */}
                          <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent" />

                          {/* Large animated icon */}
                          <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0, -3, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <div
                              className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl"
                              style={{ background: "rgba(255,255,255,0.3)", backdropFilter: "blur(8px)" }}
                            >
                              <Icon className="w-8 h-8 text-white drop-shadow-md" />
                            </div>
                          </motion.div>

                          {/* Selected checkmark */}
                          {isSelected && (
                            <motion.div
                              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 20 }}
                            >
                              <CheckCircle2 className="w-5 h-5" style={{ color: cabin.color }} />
                            </motion.div>
                          )}
                        </div>

                        {/* Decorative glow blob */}
                        <div
                          className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full blur-[60px] pointer-events-none"
                          style={{ background: cabin.color, opacity: isSelected ? 0.15 : 0.08 }}
                        />

                        <div className="relative z-10 p-5 space-y-4">
                          {/* Name + type badge */}
                          <div>
                            <h3 className="text-lg font-black text-[var(--ink)] leading-tight">
                              {cabin.name}
                            </h3>
                            <span
                              className="inline-block mt-1.5 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full"
                              style={{
                                background: `${cabin.color}15`,
                                color: cabin.color,
                              }}
                            >
                              {meta.label}
                            </span>
                          </div>

                          {/* Stats pills */}
                          <div className="flex gap-2">
                            <div className="glass-pill flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold">
                              <Users className="w-3.5 h-3.5" style={{ color: cabin.color }} />
                              {cabin.capacity} гостей
                            </div>
                            <div className="glass-pill flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold">
                              <Clock className="w-3.5 h-3.5" style={{ color: cabin.color }} />
                              {formatPrice(cabin.price_per_hour)} ₸/ч
                            </div>
                          </div>

                          {/* Features pills */}
                          <div className="flex flex-wrap gap-1.5">
                            {meta.features.map((feature) => (
                              <span
                                key={feature}
                                className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                                style={{ background: `${cabin.color}10`, color: cabin.color }}
                              >
                                {feature}
                              </span>
                            ))}
                          </div>

                          {/* CTA button */}
                          <div
                            className="w-full h-12 rounded-full flex items-center justify-center font-extrabold text-sm uppercase tracking-wider transition-all duration-300"
                            style={{
                              background: isSelected ? meta.gradient : "transparent",
                              color: isSelected ? "#fff" : cabin.color,
                              border: isSelected ? "none" : `2.5px solid ${cabin.color}30`,
                              boxShadow: isSelected ? `0 6px 0 ${cabin.color}60, 0 8px 20px ${cabin.color}30` : "none",
                              textShadow: isSelected ? "0 1px 2px rgba(0,0,0,0.15)" : "none",
                            }}
                          >
                            {isSelected ? "Выбрано" : "Выбрать"}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ─── STEP 3: Date / Time / Guests ─── */}
            {currentStep === 3 && !submitted && selectedCabin && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="max-w-2xl mx-auto"
              >
                <div className="surface-card p-7 md:p-8 space-y-6">
                  <h2 className="text-2xl font-black text-[var(--ink)]">
                    Дата и время
                  </h2>

                  {/* Date */}
                  <div>
                    <label htmlFor="cabin-date" className="form-label">
                      <Calendar className="inline w-4 h-4 mr-1 -mt-0.5" />
                      Дата посещения
                    </label>
                    <input
                      id="cabin-date"
                      type="date"
                      className="form-input"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>

                  {/* Start time select */}
                  <div>
                    <label htmlFor="cabin-start" className="form-label">
                      <Clock className="inline w-4 h-4 mr-1 -mt-0.5" />
                      Время начала
                    </label>
                    <select
                      id="cabin-start"
                      className="form-input"
                      value={startHour ?? ""}
                      onChange={(e) => {
                        const v = e.target.value;
                        setStartHour(v === "" ? null : Number(v));
                      }}
                    >
                      <option value="">Выберите время</option>
                      {availableStartHours.map((h) => (
                        <option key={h} value={h}>
                          {String(h).padStart(2, "0")}:00
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label htmlFor="cabin-duration" className="form-label">
                      <Sparkles className="inline w-4 h-4 mr-1 -mt-0.5" />
                      Длительность (часы)
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((d) => (
                        <motion.button
                          key={d}
                          type="button"
                          onClick={() => setDuration(d)}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 h-12 rounded-2xl font-bold text-sm transition-all duration-200"
                          style={{
                            background:
                              duration === d
                                ? CABIN_META[selectedCabin.cabin_type].gradient
                                : "var(--surface)",
                            color: duration === d ? "#fff" : "var(--ink)",
                            border:
                              duration === d
                                ? "2px solid transparent"
                                : "2px solid rgba(0,0,0,0.06)",
                          }}
                        >
                          {d} ч
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label htmlFor="cabin-guests" className="form-label">
                      <Users className="inline w-4 h-4 mr-1 -mt-0.5" />
                      Количество гостей (макс. {selectedCabin.capacity})
                    </label>
                    <input
                      id="cabin-guests"
                      type="number"
                      min={1}
                      max={selectedCabin.capacity}
                      className="form-input"
                      value={guestsCount}
                      onChange={(e) =>
                        setGuestsCount(
                          Math.min(
                            selectedCabin.capacity,
                            Math.max(1, Number(e.target.value) || 1),
                          ),
                        )
                      }
                    />
                  </div>

                  {/* ── Time Grid (availability visual) ─── */}
                  <div>
                    <p className="form-label mb-3">
                      <Clock className="inline w-4 h-4 mr-1 -mt-0.5" />
                      Доступность (нажмите на слот для выбора)
                    </p>
                    <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                      {timeSlots.map((slot) => {
                        const isInRange =
                          startHour !== null &&
                          slot.hour >= startHour &&
                          slot.hour < startHour + duration;
                        const isBooked = slot.booked;

                        let bg = "var(--surface)";
                        let border = "2px solid rgba(0,0,0,0.06)";
                        let textColor = "var(--ink)";

                        if (isBooked) {
                          bg = "#fee2e2";
                          border = "2px solid #fca5a5";
                          textColor = "#dc2626";
                        } else if (isInRange) {
                          bg =
                            "linear-gradient(135deg, #00b4d8 0%, #0284c7 100%)";
                          border = "2px solid #0284c7";
                          textColor = "#fff";
                        } else {
                          bg = "#ecfdf5";
                          border = "2px solid #86efac";
                          textColor = "#16a34a";
                        }

                        return (
                          <motion.button
                            key={slot.hour}
                            type="button"
                            onClick={() => handleSlotClick(slot.hour)}
                            disabled={isBooked}
                            whileHover={
                              isBooked ? undefined : { scale: 1.08 }
                            }
                            whileTap={isBooked ? undefined : { scale: 0.95 }}
                            className="h-10 rounded-xl text-xs font-bold transition-all duration-200 disabled:cursor-not-allowed"
                            style={{
                              background: bg,
                              border,
                              color: textColor,
                            }}
                          >
                            {slot.label}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-sm bg-[#ecfdf5] border border-[#86efac]" />
                        Свободно
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-sm bg-[#fee2e2] border border-[#fca5a5]" />
                        Занято
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-sm bg-[#00b4d8] border border-[#0284c7]" />
                        Ваш выбор
                      </div>
                    </div>

                    {hasTimeConflict && startHour !== null && (
                      <motion.p
                        className="mt-2 text-sm text-red-500 font-semibold"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        Выбранный диапазон пересекается с занятыми слотами. Выберите другое время.
                      </motion.p>
                    )}
                  </div>

                  {/* Price preview */}
                  <div
                    className="rounded-2xl p-5 flex items-center justify-between"
                    style={{
                      background: `linear-gradient(135deg, ${selectedCabin.color}12 0%, ${selectedCabin.color}06 100%)`,
                    }}
                  >
                    <div className="text-sm text-gray-600">
                      {formatPrice(selectedCabin.price_per_hour)} ₸ × {duration}{" "}
                      ч
                    </div>
                    <div className="text-2xl font-black" style={{ color: selectedCabin.color }}>
                      {formatPrice(totalPrice)} ₸
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 4: Confirmation ─── */}
            {currentStep === 4 && !submitted && selectedCabin && selectedBranch && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="max-w-xl mx-auto"
              >
                <div className="surface-card p-7 md:p-8 space-y-6 relative overflow-hidden">
                  {/* Decorative blob */}
                  <div
                    className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px] pointer-events-none"
                    style={{ background: `${selectedCabin.color}25` }}
                  />

                  <h2 className="text-2xl font-black text-[var(--ink)] relative z-10">
                    Подтвердите бронирование
                  </h2>

                  {/* Summary card */}
                  <div
                    className="rounded-2xl p-6 space-y-4 relative z-10"
                    style={{
                      background: `linear-gradient(145deg, ${selectedCabin.color}18 0%, ${selectedCabin.color}08 100%)`,
                    }}
                  >
                    {/* Cabin info */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          background:
                            CABIN_META[selectedCabin.cabin_type].gradient,
                        }}
                      >
                        {(() => {
                          const Icon =
                            CABIN_META[selectedCabin.cabin_type].icon;
                          return <Icon className="w-5 h-5 text-white" />;
                        })()}
                      </div>
                      <div>
                        <p className="font-black text-lg text-[var(--ink)]">
                          {selectedCabin.name}
                        </p>
                        <span
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: selectedCabin.color }}
                        >
                          {CABIN_META[selectedCabin.cabin_type].label}
                        </span>
                      </div>
                    </div>

                    {/* Details rows */}
                    <div className="space-y-2.5 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="font-bold">Город:</span>{" "}
                        {selectedBranch.city}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="font-bold">Дата:</span>{" "}
                        {selectedDate
                          ? new Date(selectedDate).toLocaleDateString("ru-RU", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                          : "—"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="font-bold">Время:</span>{" "}
                        {startHour !== null
                          ? `${String(startHour).padStart(2, "0")}:00 — ${String(startHour + duration).padStart(2, "0")}:00`
                          : "—"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="font-bold">Гостей:</span>{" "}
                        {guestsCount}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-600">
                        Итого:
                      </span>
                      <span
                        className="text-3xl font-black"
                        style={{ color: selectedCabin.color }}
                      >
                        {formatPrice(totalPrice)} ₸
                      </span>
                    </div>
                  </div>

                  {/* Confirm button */}
                  <motion.button
                    type="button"
                    onClick={handleConfirm}
                    disabled={hasTimeConflict}
                    className="btn-green w-full text-lg relative z-10"
                    whileHover={hasTimeConflict ? undefined : { scale: 1.02 }}
                    whileTap={hasTimeConflict ? undefined : { scale: 0.97 }}
                  >
                    Подтвердить
                    <CheckCircle2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ─── Success ─── */}
            {submitted && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="max-w-xl mx-auto text-center space-y-6 relative"
              >
                {/* Confetti */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <ConfettiParticle key={i} index={i} />
                  ))}
                </div>

                <div className="surface-card p-10 space-y-5 relative z-10">
                  <motion.div
                    className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                    style={{ background: "var(--gradient-green)" }}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                      delay: 0.2,
                    }}
                  >
                    <PartyPopper className="w-10 h-10 text-white" />
                  </motion.div>

                  <motion.h2
                    className="text-3xl font-black text-[var(--ink)]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Бронирование принято!
                  </motion.h2>

                  <motion.p
                    className="section-subtitle mx-auto text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Кабинка{" "}
                    <span className="font-bold text-[var(--ink)]">
                      {selectedCabin?.name}
                    </span>{" "}
                    в городе{" "}
                    <span className="font-bold text-[var(--ink)]">
                      {selectedBranch?.city}
                    </span>{" "}
                    забронирована на{" "}
                    <span className="font-bold text-[var(--ink)]">
                      {selectedDate
                        ? new Date(selectedDate).toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "long",
                          })
                        : "—"}
                    </span>{" "}
                    с{" "}
                    <span className="font-bold text-[var(--ink)]">
                      {startHour !== null
                        ? `${String(startHour).padStart(2, "0")}:00`
                        : "—"}
                    </span>
                    .
                  </motion.p>

                  {selectedCabin && (
                    <motion.div
                      className="inline-block text-2xl font-black"
                      style={{ color: selectedCabin.color }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {formatPrice(totalPrice)} ₸
                    </motion.div>
                  )}

                  <motion.div
                    className="flex flex-col sm:flex-row gap-3 justify-center pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Link href="/" className="btn-dark inline-flex">
                      На главную
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setCurrentStep(1);
                        setSelectedBranchId("");
                        setSelectedCabinId("");
                        setSelectedDate("");
                        setStartHour(null);
                        setDuration(2);
                        setGuestsCount(10);
                      }}
                      className="btn-outline"
                    >
                      Забронировать ещё
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Navigation Buttons ─────────────────────────── */}
          {!submitted && (
            <motion.div
              className="flex items-center justify-between max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentStep > 1 ? (
                <motion.button
                  type="button"
                  onClick={() =>
                    setCurrentStep((s) => Math.max(1, s - 1))
                  }
                  className="btn-outline"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Назад
                </motion.button>
              ) : (
                <div />
              )}
              {currentStep < 4 && (
                <motion.button
                  type="button"
                  onClick={() =>
                    setCurrentStep((s) => Math.min(4, s + 1))
                  }
                  disabled={!canGoNext}
                  className="btn-green"
                  whileHover={canGoNext ? { scale: 1.03 } : undefined}
                  whileTap={canGoNext ? { scale: 0.97 } : undefined}
                >
                  Далее
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
