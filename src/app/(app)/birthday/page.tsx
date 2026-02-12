"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  PartyPopper,
  Star,
  Crown,
  Gift,
  Users,
  Clock,
  Camera,
  Cake,
  Music,
  Sparkles,
  Phone,
  Calendar,
  User,
} from "lucide-react";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { AppTabs } from "@/components/navigation/AppTabs";
import { addLocalBooking, isLocalTestingMode } from "@/lib/local-mode";

/* ── Package Data ──────────────────────────────────────────────── */

interface BirthdayPackage {
  id: string;
  name: string;
  price: number;
  color: string;
  gradient: string;
  borderColor: string;
  glowShadow: string;
  icon: React.ElementType;
  popular?: boolean;
  includes: string[];
}

const packages: BirthdayPackage[] = [
  {
    id: "standard",
    name: "Стандарт",
    price: 29_900,
    color: "#7dd957",
    gradient: "linear-gradient(135deg, #7dd957 0%, #5cb338 100%)",
    borderColor: "rgba(125, 217, 87, 0.4)",
    glowShadow: "0 20px 50px rgba(125, 217, 87, 0.25)",
    icon: Gift,
    includes: ["2 часа праздника", "До 10 детей", "1 аниматор", "Воздушные шарики"],
  },
  {
    id: "premium",
    name: "Премиум",
    price: 49_900,
    color: "#ffd93d",
    gradient: "linear-gradient(135deg, #ffd93d 0%, #f5c400 100%)",
    borderColor: "rgba(255, 217, 61, 0.5)",
    glowShadow: "0 20px 50px rgba(255, 217, 61, 0.3)",
    icon: Star,
    popular: true,
    includes: [
      "3 часа праздника",
      "До 15 детей",
      "2 аниматора",
      "Фотосъёмка",
      "Праздничный торт",
    ],
  },
  {
    id: "vip",
    name: "VIP",
    price: 79_900,
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
    borderColor: "rgba(168, 85, 247, 0.4)",
    glowShadow: "0 20px 50px rgba(168, 85, 247, 0.25)",
    icon: Crown,
    includes: [
      "4 часа праздника",
      "До 20 детей",
      "Шоу-программа",
      "Полный декор зала",
      "Праздничный торт",
      "Фото + видеосъёмка",
    ],
  },
];

const includeIcons: Record<string, React.ElementType> = {
  час: Clock,
  дет: Users,
  аниматор: Music,
  шар: PartyPopper,
  фото: Camera,
  торт: Cake,
  шоу: Sparkles,
  декор: Gift,
  видео: Camera,
};

function getIncludeIcon(text: string): React.ElementType {
  const lower = text.toLowerCase();
  for (const [key, Icon] of Object.entries(includeIcons)) {
    if (lower.includes(key)) return Icon;
  }
  return CheckCircle2;
}

/* ── Step transition variants ─────────────────────────────────── */

const stepVariants = {
  initial: { opacity: 0, x: 60, scale: 0.96 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -60, scale: 0.96 },
};

/* ── Page ──────────────────────────────────────────────────────── */

export default function BirthdayPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [date, setDate] = useState("");
  const [phone, setPhone] = useState("");
  const [guestsCount, setGuestsCount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const chosenPkg = packages.find((p) => p.id === selectedPackage);

  const canGoNext =
    currentStep === 1
      ? !!selectedPackage
      : currentStep === 2
        ? childName.trim() !== "" && childAge.trim() !== "" && date !== "" && phone.trim() !== ""
        : true;

  const handleConfirm = () => {
    if (!chosenPkg) return;

    if (isLocalTestingMode) {
      addLocalBooking({
        full_name: childName,
        phone,
        guests_count: Number(guestsCount) || 1,
        visit_at: date || null,
        status: "new",
      });
    }

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen page-bg-juicy">
      <Header />
      <AppTabs />

      <section className="section-shell">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          {/* ── Header ─────────────────────────────────────── */}
          <motion.div
            className="space-y-3 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="chip mx-auto">
              <PartyPopper className="w-4 h-4" />
              День Рождения
            </span>
            <h1 className="section-title text-4xl md:text-5xl">
              Праздник мечты<br />
              <span className="text-[var(--primary)]">в MYNBALA</span>
            </h1>
            <p className="section-subtitle mx-auto text-center">
              Выберите пакет, укажите детали — и мы сделаем всё остальное.
            </p>
          </motion.div>

          {/* ── Progress Bar ──────────────────────────────── */}
          <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors"
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
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    step
                  )}
                </motion.div>
                {step < 3 && (
                  <div className="flex-1 h-1 rounded-full bg-gray-200 overflow-hidden">
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

          {/* ── Steps ─────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {/* STEP 1 — Choose Package */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <h2 className="text-2xl font-black text-[var(--ink)] mb-6 text-center">
                  Выберите пакет
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packages.map((pkg, i) => {
                    const isSelected = selectedPackage === pkg.id;
                    const Icon = pkg.icon;
                    return (
                      <motion.button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg.id)}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 25 }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative text-left overflow-hidden rounded-[var(--radius-lg)] border-2 transition-all duration-300"
                        style={{
                          borderColor: isSelected ? pkg.color : "rgba(0,0,0,0.06)",
                          boxShadow: isSelected ? pkg.glowShadow : "var(--shadow-soft)",
                          background: "linear-gradient(180deg, #ffffff 0%, #fafffe 100%)",
                        }}
                      >
                        {/* Gradient top bar */}
                        <div
                          className="h-2 w-full"
                          style={{ background: pkg.gradient }}
                        />

                        {/* Popular badge */}
                        {pkg.popular && (
                          <div className="absolute top-4 right-4">
                            <motion.span
                              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-[var(--ink)]"
                              style={{ background: pkg.gradient }}
                              animate={{ y: [0, -2, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Star className="w-3 h-3" fill="currentColor" />
                              Хит
                            </motion.span>
                          </div>
                        )}

                        <div className="p-6 space-y-4">
                          {/* Icon & Name */}
                          <div className="flex items-center gap-3">
                            <div
                              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                              style={{ background: pkg.gradient }}
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-black text-[var(--ink)]">
                                {pkg.name}
                              </h3>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline gap-1">
                            <span
                              className="text-4xl font-black"
                              style={{ color: pkg.color }}
                            >
                              {pkg.price.toLocaleString("ru-RU")}
                            </span>
                            <span className="text-lg font-bold text-gray-400">
                              ₸
                            </span>
                          </div>

                          {/* Includes */}
                          <ul className="space-y-2.5">
                            {pkg.includes.map((item) => {
                              const ItemIcon = getIncludeIcon(item);
                              return (
                                <li
                                  key={item}
                                  className="flex items-center gap-2.5 text-sm text-gray-700"
                                >
                                  <CheckCircle2
                                    className="w-5 h-5 shrink-0"
                                    style={{ color: pkg.color }}
                                  />
                                  {item}
                                </li>
                              );
                            })}
                          </ul>

                          {/* Selection indicator */}
                          <div
                            className="w-full h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
                            style={{
                              background: isSelected ? pkg.gradient : "transparent",
                              color: isSelected ? "#fff" : pkg.color,
                              border: isSelected ? "none" : `2px solid ${pkg.borderColor}`,
                            }}
                          >
                            {isSelected ? "Выбрано ✓" : "Выбрать"}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2 — Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="max-w-xl mx-auto"
              >
                <div className="surface-card p-7 md:p-8 space-y-5">
                  <h2 className="text-2xl font-black text-[var(--ink)]">
                    Детали праздника
                  </h2>

                  <div>
                    <label htmlFor="childName" className="form-label">
                      <User className="inline w-4 h-4 mr-1 -mt-0.5" />
                      Имя ребёнка
                    </label>
                    <input
                      id="childName"
                      type="text"
                      className="form-input"
                      placeholder="Алия"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="childAge" className="form-label">
                      <Gift className="inline w-4 h-4 mr-1 -mt-0.5" />
                      Возраст ребёнка
                    </label>
                    <input
                      id="childAge"
                      type="number"
                      min={1}
                      max={17}
                      className="form-input"
                      placeholder="7"
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="date" className="form-label">
                      <Calendar className="inline w-4 h-4 mr-1 -mt-0.5" />
                      Дата и время
                    </label>
                    <input
                      id="date"
                      type="datetime-local"
                      className="form-input"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="form-label">
                      <Phone className="inline w-4 h-4 mr-1 -mt-0.5" />
                      Телефон для связи
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="form-input"
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="guests" className="form-label">
                      <Users className="inline w-4 h-4 mr-1 -mt-0.5" />
                      Количество гостей
                    </label>
                    <input
                      id="guests"
                      type="number"
                      min={1}
                      max={50}
                      className="form-input"
                      placeholder="10"
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(e.target.value)}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3 — Confirmation */}
            {currentStep === 3 && !submitted && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="max-w-xl mx-auto"
              >
                <div className="surface-card p-7 md:p-8 space-y-6 relative overflow-hidden">
                  <div
                    className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px] pointer-events-none"
                    style={{ background: chosenPkg ? `${chosenPkg.color}25` : undefined }}
                  />

                  <h2 className="text-2xl font-black text-[var(--ink)] relative z-10">
                    Проверьте данные
                  </h2>

                  <div
                    className="rounded-2xl p-6 space-y-3 relative z-10"
                    style={{
                      background: chosenPkg
                        ? `linear-gradient(145deg, ${chosenPkg.color}18 0%, ${chosenPkg.color}08 100%)`
                        : "var(--card-green)",
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {chosenPkg && (
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: chosenPkg.gradient }}
                        >
                          <chosenPkg.icon className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div>
                        <p className="font-black text-lg text-[var(--ink)]">
                          {chosenPkg?.name ?? "—"}
                        </p>
                        <p
                          className="text-2xl font-black"
                          style={{ color: chosenPkg?.color }}
                        >
                          {chosenPkg?.price.toLocaleString("ru-RU")} ₸
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                      <p>
                        <span className="font-bold">Имя ребёнка:</span>{" "}
                        {childName || "—"}
                      </p>
                      <p>
                        <span className="font-bold">Возраст:</span>{" "}
                        {childAge ? `${childAge} лет` : "—"}
                      </p>
                      <p>
                        <span className="font-bold">Дата и время:</span>{" "}
                        {date
                          ? new Date(date).toLocaleString("ru-RU", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "—"}
                      </p>
                      <p>
                        <span className="font-bold">Телефон:</span>{" "}
                        {phone || "—"}
                      </p>
                      <p>
                        <span className="font-bold">Гостей:</span>{" "}
                        {guestsCount || "—"}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleConfirm}
                    className="btn-green w-full text-lg relative z-10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Подтвердить бронирование
                    <CheckCircle2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Success State */}
            {submitted && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="max-w-xl mx-auto text-center space-y-6"
              >
                <div className="surface-card p-10 space-y-5">
                  <motion.div
                    className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
                    style={{ background: "var(--gradient-green)" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
                  >
                    <PartyPopper className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-black text-[var(--ink)]">
                    Бронирование принято!
                  </h2>
                  <p className="section-subtitle mx-auto text-center">
                    Мы свяжемся с вами по номеру{" "}
                    <span className="font-bold text-[var(--ink)]">{phone}</span>{" "}
                    для подтверждения праздника{" "}
                    <span className="font-bold text-[var(--ink)]">{childName}</span>.
                  </p>
                  <motion.a
                    href="/"
                    className="btn-dark inline-flex"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    На главную
                  </motion.a>
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
                  onClick={() => setCurrentStep((s) => Math.max(1, s - 1) as 1 | 2 | 3)}
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
              {currentStep < 3 && (
                <motion.button
                  type="button"
                  onClick={() => setCurrentStep((s) => Math.min(3, s + 1) as 1 | 2 | 3)}
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
