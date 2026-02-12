"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

/* ── FAQ Data ──────────────────────────────────────────────────── */

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "safety",
    question: "Насколько безопасны аттракционы?",
    answer:
      "Все аттракционы проходят ежедневный технический осмотр и соответствуют международным стандартам безопасности. На каждой зоне дежурят обученные операторы, а территория парка оборудована камерами видеонаблюдения. Для самых маленьких предусмотрены мягкие зоны с безопасным покрытием.",
  },
  {
    id: "age",
    question: "Для какого возраста подходит парк?",
    answer:
      "MYNBALA принимает гостей от 0 до 14 лет. У нас есть зоны для малышей (0–3 года) с мягким оборудованием, активные аттракционы для детей 3–7 лет, экстремальные горки для 7–12 лет и отдельные развлечения для подростков 12+. Взрослые могут находиться на территории бесплатно.",
  },
  {
    id: "pricing",
    question: "Сколько стоит посещение и что входит в билет?",
    answer:
      "Стоимость билета — от 4 000 ₸ в будни и от 5 000 ₸ в выходные. Билет даёт безлимитный доступ ко всем аттракционам до закрытия парка. Дополнительно можно приобрести пакеты на День Рождения от 29 900 ₸. Действуют семейные скидки и акции.",
  },
  {
    id: "included",
    question: "Что включено в стоимость билета?",
    answer:
      "В стоимость билета входит безлимитный доступ ко всем аттракционам выбранной зоны, бесплатные шкафчики для вещей, браслет-пропуск и присутствие сопровождающего взрослого. Еда и напитки из ресторанной зоны оплачиваются отдельно.",
  },
  {
    id: "birthday",
    question: "Как организовать День Рождения в парке?",
    answer:
      "Мы предлагаем три пакета: «Стандарт» (29 900 ₸), «Премиум» (49 900 ₸) и «VIP» (79 900 ₸). Каждый пакет включает аниматоров, украшения и праздничную программу. Забронировать можно онлайн в разделе «День Рождения» или по телефону. Рекомендуем бронировать за 5–7 дней.",
  },
  {
    id: "food",
    question: "Можно ли приносить свою еду?",
    answer:
      "В целях безопасности и гигиены мы просим не приносить еду извне. В каждом парке работает семейный ресторан с детским и взрослым меню: пицца, бургеры, комбо-наборы, свежие соки и десерты. Для именинников предусмотрены праздничные торты в пакетах «Премиум» и «VIP».",
  },
];

/* ── Component ─────────────────────────────────────────────────── */

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="section-shell-alt relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[10%] right-[-8%] w-72 h-72 rounded-full bg-[#7dd957]/8 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[15%] left-[-5%] w-56 h-56 rounded-full bg-[#ffd93d]/8 blur-[80px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 space-y-10 relative z-10">
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
            <HelpCircle className="w-4 h-4" />
            Частые вопросы
          </motion.span>
          <h2 className="section-title">
            Ответы на ваши<br />
            <span className="text-[var(--primary)]">вопросы</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="surface-card overflow-hidden"
                style={{
                  borderColor: isOpen ? "rgba(125, 217, 87, 0.25)" : undefined,
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left transition-colors hover:bg-[var(--primary)]/[0.03]"
                >
                  <span className="text-base md:text-lg font-bold text-[var(--ink)] leading-snug">
                    {item.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 w-8 h-8 rounded-full bg-[var(--primary)]/10 flex items-center justify-center"
                  >
                    <ChevronDown className="w-5 h-5 text-[var(--primary-dark)]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
                        <div className="w-12 h-0.5 rounded-full bg-[var(--primary)]/30 mb-3" />
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
