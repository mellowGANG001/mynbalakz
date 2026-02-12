"use client";

import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

/* ─── Review data ─────────────────────────────────────────────── */

interface Review {
  id: number;
  name: string;
  city: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Айгерим Нурланова",
    city: "Тараз",
    rating: 5,
    text: "Дети были в восторге! Провели целый день и не хотели уходить. Очень чисто, персонал вежливый, аттракционы безопасные.",
    date: "12 янв 2026",
  },
  {
    id: 2,
    name: "Тимур Ахметов",
    city: "Шымкент",
    rating: 5,
    text: "Отмечали день рождения сына — всё организовали на высшем уровне. Аниматоры, торт, фото-зона. Рекомендую!",
    date: "28 дек 2025",
  },
  {
    id: 3,
    name: "Дана Сериккызы",
    city: "Атырау",
    rating: 4,
    text: "Приятно удивлены масштабом парка. Ребёнку 2 года — нашлись горки и для малышей. Единственное — хотелось бы больше тени летом.",
    date: "5 янв 2026",
  },
  {
    id: 4,
    name: "Марат Оспанов",
    city: "Аксу",
    rating: 5,
    text: "Наконец-то у нас появилось место, куда не стыдно привести семью. Качество как в лучших парках Алматы. Спасибо MYNBALA!",
    date: "19 дек 2025",
  },
  {
    id: 5,
    name: "Жанна Бекмуратова",
    city: "Тараз",
    rating: 5,
    text: "Ходим каждые выходные. Дочь обожает батуты, а сын — картинг. Кафе тоже порадовало, вкусные детские блюда.",
    date: "1 фев 2026",
  },
  {
    id: 6,
    name: "Ерлан Касымов",
    city: "Шымкент",
    rating: 4,
    text: "Покупал билеты онлайн — удобно и без очередей. В парке провели 5 часов, дети счастливы. Цены адекватные.",
    date: "8 фев 2026",
  },
];

/* ─── Accent colours that rotate across cards ─────────────────── */

const cardAccents = [
  { gradient: "from-[#7dd957] to-[#5cb338]", bg: "#7dd957", light: "rgba(125,217,87,0.12)" },
  { gradient: "from-[#00b4d8] to-[#0077b6]", bg: "#00b4d8", light: "rgba(0,180,216,0.12)" },
  { gradient: "from-[#ffd93d] to-[#f5c400]", bg: "#ffd93d", light: "rgba(255,217,61,0.12)" },
  { gradient: "from-[#ff6b9d] to-[#ff3366]", bg: "#ff6b9d", light: "rgba(255,107,157,0.12)" },
];

/* ─── Helpers ─────────────────────────────────────────────────── */

function getInitials(fullName: string): string {
  return fullName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i < count ? "#ffd93d" : "none"}
          stroke={i < count ? "#ffd93d" : "#d1d5db"}
          strokeWidth={2}
        />
      ))}
    </div>
  );
}

/* ─── Review Card ─────────────────────────────────────────────── */

interface ReviewCardProps {
  review: Review;
  index: number;
}

function ReviewCard({ review, index }: ReviewCardProps) {
  const accent = cardAccents[index % cardAccents.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="surface-card relative flex flex-col min-w-[280px] snap-start"
    >
      {/* Top accent gradient bar */}
      <div
        className={`h-2 rounded-t-[var(--radius-lg)] bg-gradient-to-r ${accent.gradient}`}
      />

      <div className="p-6 flex flex-col flex-1 gap-4">
        {/* Quote icon */}
        <Quote
          className="w-8 h-8 opacity-15"
          style={{ color: accent.bg }}
        />

        {/* Review text */}
        <p className="text-sm leading-relaxed text-gray-700 flex-1">
          {review.text}
        </p>

        {/* Stars */}
        <Stars count={review.rating} />

        {/* Divider */}
        <div className="border-t border-black/5" />

        {/* Author */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ background: `linear-gradient(135deg, ${accent.bg}, ${accent.bg}cc)` }}
          >
            {getInitials(review.name)}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-bold text-[var(--ink)] truncate">{review.name}</p>
            <span
              className="inline-flex items-center px-2.5 py-0.5 mt-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
              style={{ background: accent.light, color: accent.bg }}
            >
              {review.city}
            </span>
          </div>

          {/* Date */}
          <span className="ml-auto text-[11px] text-gray-400 whitespace-nowrap">{review.date}</span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Section ─────────────────────────────────────────────────── */

export function Reviews() {
  return (
    <section id="reviews" className="section-shell-alt relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[15%] left-[-8%] w-80 h-80 rounded-full bg-[#ffd93d]/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-6%] w-96 h-96 rounded-full bg-[#ff6b9d]/8 blur-[90px] pointer-events-none" />
      <div className="absolute top-[60%] right-[20%] w-60 h-60 rounded-full bg-[#7dd957]/8 blur-[70px] pointer-events-none" />

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
            Отзывы
          </motion.span>

          <h2 className="section-title">
            Нас любят<br />
            <span className="text-[var(--primary)]">семьи</span>
          </h2>

          <p className="section-subtitle mx-auto text-center">
            4.9 из 5 на основе 2 000+ отзывов
          </p>
        </motion.div>

        {/* Large average rating display */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <span className="text-7xl md:text-8xl font-black text-[var(--ink)] leading-none">
            4.9
          </span>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-7 h-7 decor-star"
                fill="#ffd93d"
                stroke="#ffd93d"
              />
            ))}
          </div>

          <span className="text-sm text-gray-500 font-medium">
            На основе 2 000+ проверенных отзывов
          </span>
        </motion.div>

        {/* ── Review cards ───────────────────────────────────── */}
        {/* Mobile: horizontal scroll · Desktop: 3-col grid */}
        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:pb-0">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
