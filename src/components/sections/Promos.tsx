"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Gift, Percent, PartyPopper, Sparkles, ChevronRight } from "lucide-react";
import { promos } from "@/lib/home-data";
import { ROUTES } from "@/config/routes";

const promoStyles = {
  green: {
    gradient: "from-[#e8fce0] via-[#d4f5c8] to-[#c8f0b8]",
    accent: "#7dd957",
    accentDark: "#5cb338",
    icon: Gift,
  },
  yellow: {
    gradient: "from-[#fff9db] via-[#fff0a8] to-[#ffe680]",
    accent: "#ffd93d",
    accentDark: "#f5c400",
    icon: PartyPopper,
  },
  blue: {
    gradient: "from-[#e0f7ff] via-[#b8ecff] to-[#90e0ef]",
    accent: "#00b4d8",
    accentDark: "#0077b6",
    icon: Percent,
  },
};

export function Promos() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % promos.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + promos.length) % promos.length);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide, prefersReducedMotion]);

  const currentPromo = promos[currentIndex];
  const style = promoStyles[currentPromo.color as keyof typeof promoStyles];
  const IconComponent = style.icon;

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section id="promos" className="section-shell-alt relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[10%] right-[-5%] w-80 h-80 rounded-full bg-[#ffd93d]/10 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-96 h-96 rounded-full bg-[#ff6b9d]/10 blur-[64px] pointer-events-none" />

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
            <Sparkles className="w-4 h-4" />
            Акции и спецпредложения
          </motion.span>
          <h2 className="section-title">
            Сэкономьте на<br />
            <span className="text-[var(--primary)]">каждом визите</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Актуальные предложения MYNBALA для семейного отдыха и праздников.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Content Card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`content-${currentIndex}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={prefersReducedMotion ? { duration: 0.15 } : { duration: 0.5, ease: "easeInOut" }}
                className="relative overflow-hidden rounded-[var(--radius-lg)] bg-white border border-black/5 shadow-[var(--shadow-lift)] p-8 md:p-10 flex flex-col"
              >
                {/* Decorative blob */}
                <div 
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-40"
                  style={{ background: style.accent }}
                />

                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Badge */}
                  <motion.div 
                    className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6"
                    style={{ 
                      background: `linear-gradient(135deg, ${style.accent}20, ${style.accent}10)`,
                      color: style.accentDark,
                      border: `1px solid ${style.accent}30`
                    }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <IconComponent className="w-4 h-4" />
                    {currentPromo.subtitle}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--ink)] mb-4 leading-[0.9]">
                    {currentPromo.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-lg mb-8 max-w-md">
                    {currentPromo.description}
                  </p>

                  {/* CTA & Navigation */}
                  <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <motion.a
                      href={ROUTES.promos}
                      className="btn-green"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {currentPromo.ctaLabel}
                      <ChevronRight className="w-5 h-5" />
                    </motion.a>

                    <div className="flex items-center gap-3">
                      <motion.button
                        onClick={prevSlide}
                        className="w-12 h-12 rounded-full bg-[var(--ink)] text-white flex items-center justify-center hover:bg-[#333] transition-colors shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        onClick={nextSlide}
                        className="w-12 h-12 rounded-full text-white flex items-center justify-center transition-colors shadow-lg"
                        style={{ background: style.accent }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Visual Card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`visual-${currentIndex}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={prefersReducedMotion ? { duration: 0.15 } : { duration: 0.5, ease: "easeInOut", delay: 0.1 }}
                className="relative overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-lift)] min-h-[400px] md:min-h-[500px]"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${style.gradient}`} />

                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div 
                    className="absolute top-10 right-10 w-20 h-20 rounded-full"
                    style={{ background: style.accent, opacity: 0.2 }}
                    animate={prefersReducedMotion ? undefined : { scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={prefersReducedMotion ? undefined : { duration: 10, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute bottom-20 left-10 w-16 h-16 rounded-full"
                    style={{ background: style.accentDark, opacity: 0.15 }}
                    animate={prefersReducedMotion ? undefined : { scale: [1, 1.3, 1] }}
                    transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, delay: 1 }}
                  />
                  <motion.div 
                    className="absolute top-1/2 right-1/4 w-12 h-12 rounded-full"
                    style={{ background: style.accent, opacity: 0.25 }}
                    animate={prefersReducedMotion ? undefined : { y: [-20, 20, -20] }}
                    transition={prefersReducedMotion ? undefined : { duration: 6, repeat: Infinity }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="chip-white">
                      <Sparkles className="w-3.5 h-3.5" />
                      Акция
                    </span>
                    <span className="text-sm font-bold text-white/80">
                      {currentIndex + 1} / {promos.length}
                    </span>
                  </div>

                  {/* Main visual icon */}
                  <motion.div 
                    className="flex items-center justify-center"
                    animate={prefersReducedMotion ? undefined : { y: [-10, 10, -10], rotate: [-5, 5, -5] }}
                    transition={prefersReducedMotion ? undefined : { duration: 5, repeat: Infinity }}
                  >
                    <div 
                      className="w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl"
                      style={{ background: `linear-gradient(135deg, ${style.accent}, ${style.accentDark})` }}
                    >
                      <IconComponent className="w-16 h-16 text-white" />
                    </div>
                  </motion.div>

                  {/* Bottom info */}
                  <div className="space-y-3">
                    <div className="h-14 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 flex items-center px-4">
                      <span className="text-sm font-bold text-[var(--ink)]/80">
                        {currentPromo.title}
                      </span>
                    </div>
                    <div className="h-14 rounded-2xl bg-white/40 backdrop-blur-sm border border-white/50 flex items-center px-4">
                      <span className="text-sm text-[var(--ink)]/60">
                        {currentPromo.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
                  <motion.div
                    className="h-full"
                    style={{ background: style.accent }}
                    initial={{ width: "0%" }}
                    animate={prefersReducedMotion ? undefined : { width: "100%" }}
                    transition={prefersReducedMotion ? undefined : { duration: 6, ease: "linear" }}
                    key={currentIndex}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {promos.map((promo, index) => {
              const dotStyle = promoStyles[promo.color as keyof typeof promoStyles];
              return (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative w-11 h-11 rounded-full transition-all duration-300 flex items-center justify-center"
                  aria-label={`Перейти к акции ${index + 1}`}
                  style={{ 
                    background: index === currentIndex ? `${dotStyle.accent}22` : "#f2f2f2"
                  }}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ background: index === currentIndex ? dotStyle.accent : "#bdbdbd" }}
                  />
                  {index === currentIndex && (
                    <motion.div
                      className="absolute h-3.5 w-3.5 rounded-full"
                      style={{ background: dotStyle.accent }}
                      animate={prefersReducedMotion ? undefined : { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
