"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

interface PhotoCard {
  id: string;
  gradient: string;
  stat?: string;
  title: string;
  subtitle: string;
  href: string;
}

const cards: PhotoCard[] = [
  {
    id: "parks",
    gradient: "linear-gradient(145deg, #7dd957 0%, #3d8520 100%)",
    stat: "4",
    title: "ПАРКА",
    subtitle: "Тараз, Шымкент, Аксу, Атырау",
    href: ROUTES.parks,
  },
  {
    id: "attractions",
    gradient: "linear-gradient(145deg, #00b4d8 0%, #0077b6 100%)",
    stat: "50+",
    title: "АТТРАКЦИОНОВ",
    subtitle: "Для детей и всей семьи",
    href: ROUTES.attractions,
  },
  {
    id: "restaurants",
    gradient: "linear-gradient(145deg, #ff8c42 0%, #e06610 100%)",
    title: "СЕМЕЙНЫЕ РЕСТОРАНЫ",
    subtitle: "Вкусно, весело и рядом с парком",
    href: ROUTES.restaurants,
  },
  {
    id: "birthday",
    gradient: "linear-gradient(145deg, #ff6b9d 0%, #e84580 100%)",
    title: "ДЕТСКИЕ ДНИ РОЖДЕНИЯ",
    subtitle: "Праздник под ключ от MYNBALA",
    href: ROUTES.birthday,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export function PhotoGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        className="grid grid-cols-2 gap-3 md:gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {cards.map((card) => (
          <motion.div key={card.id} variants={cardVariants}>
            <Link href={card.href} className="block group">
              <div
                className="photo-card min-h-[220px] md:min-h-[280px] p-5 md:p-6 flex flex-col justify-end"
                style={{ background: card.gradient }}
              >
                {/* Text overlay */}
                <div className="relative z-10 space-y-1">
                  {card.stat && (
                    <p className="text-5xl md:text-6xl font-black text-white leading-none drop-shadow-lg">
                      {card.stat}
                    </p>
                  )}
                  <p className="text-base md:text-lg font-extrabold text-white uppercase leading-tight tracking-wide drop-shadow-md">
                    {card.title}
                  </p>
                  <p className="text-[11px] md:text-xs font-semibold text-white/80 leading-snug">
                    {card.subtitle}
                  </p>
                </div>

                {/* Arrow button — bottom-left */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="arrow-btn group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
