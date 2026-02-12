"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MapPin, Star, Sparkles } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { ThreeDStage } from "@/components/three-d/ThreeDStage";

// Декоративные floating элементы
const FloatingShape = ({ 
  className, 
  delay = 0,
  duration = 6,
  children 
}: { 
  className: string; 
  delay?: number;
  duration?: number;
  children?: React.ReactNode;
}) => (
  <motion.div
    className={className}
    animate={{ 
      y: [-10, 10, -10],
      rotate: [-5, 5, -5]
    }}
    transition={{ 
      duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
  >
    {children}
  </motion.div>
);

// Компонент для звёзд
const DecorStar = ({ className, size = 24 }: { className: string; size?: number }) => (
  <Star className={className} size={size} fill="currentColor" />
);

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] overflow-hidden bg-[var(--surface)]">
      {/* Декоративные градиентные блобы -- УСИЛЕННЫЕ */}
      <div className="absolute top-[5%] left-[2%] w-[500px] h-[500px] rounded-full bg-[#7dd957]/30 blur-[120px] pointer-events-none" />
      <div className="absolute top-[15%] right-[5%] w-[450px] h-[450px] rounded-full bg-[#00b4d8]/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[25%] w-[400px] h-[400px] rounded-full bg-[#ffd93d]/30 blur-[100px] pointer-events-none" />
      <div className="absolute top-[50%] right-[30%] w-[300px] h-[300px] rounded-full bg-[#ff6b9d]/15 blur-[100px] pointer-events-none" />

      {/* Floating декоративные элементы */}
      <FloatingShape className="absolute top-[15%] left-[8%] text-[#ffd93d]" delay={0} duration={5}>
        <DecorStar size={32} className="drop-shadow-lg" />
      </FloatingShape>
      <FloatingShape className="absolute top-[25%] right-[12%] text-[#ff6b9d]" delay={1} duration={7}>
        <DecorStar size={24} className="drop-shadow-lg" />
      </FloatingShape>
      <FloatingShape className="absolute bottom-[30%] left-[5%] text-[#00b4d8]" delay={0.5} duration={6}>
        <DecorStar size={20} className="drop-shadow-lg" />
      </FloatingShape>
      <FloatingShape className="absolute top-[40%] right-[5%] text-[#a855f7]" delay={2} duration={8}>
        <Sparkles size={28} className="drop-shadow-lg" />
      </FloatingShape>
      <FloatingShape className="absolute bottom-[20%] right-[15%] text-[#7dd957]" delay={1.5} duration={5}>
        <DecorStar size={18} className="drop-shadow-lg" />
      </FloatingShape>

      {/* Декоративные круги */}
      <motion.div 
        className="absolute top-[12%] right-[25%] w-6 h-6 rounded-full bg-[#ffd93d]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-[35%] left-[12%] w-4 h-4 rounded-full bg-[#ff6b9d]"
        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div 
        className="absolute top-[50%] left-[3%] w-5 h-5 rounded-full bg-[#00b4d8]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      />

      {/* Основной контент */}
      <div className="relative max-w-7xl mx-auto px-4 pt-8 pb-20 md:pt-12 lg:pt-16">
        <div className="hero-panel p-6 md:p-10 lg:p-14 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[500px] lg:min-h-[600px]">
            {/* Левая часть - текст */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6 lg:space-y-8 relative z-20"
            >
              <motion.span 
                className="chip"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles size={14} />
                Премиальный семейный парк
              </motion.span>

              <h1 className="text-[52px] sm:text-[68px] md:text-[80px] lg:text-[96px] leading-[0.85] font-black tracking-tight">
                <span className="text-[var(--ink)]">MYNBALA</span>
                <motion.span 
                  className="block text-[var(--primary)]"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  ВЕСЕЛЬЕ
                </motion.span>
                <motion.span 
                  className="block text-[var(--ink)]"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  КАЖДЫЙ ДЕНЬ
                </motion.span>
              </h1>

              <motion.p 
                className="section-subtitle text-base md:text-lg lg:text-xl max-w-[50ch]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Аттракционы, праздники и семейные рестораны в одном месте. 
                Найдите ближайший парк и выберите тариф за пару кликов.
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <a href={ROUTES.tickets} className="btn-green group animate-pulse-glow">
                  Купить билет
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
                <a href={ROUTES.parks} className="btn-dark group">
                  <MapPin className="w-5 h-5" />
                  Выбрать локацию
                </a>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-3 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="chip">50+ аттракционов</span>
                <span className="chip">4 города</span>
                <span className="chip">10:00 - 22:00</span>
              </motion.div>
            </motion.div>

            {/* Правая часть - маскот */}
            <ThreeDStage slot="hero">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-end justify-center"
              >
              {/* Фоновое свечение под маскотом */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] rounded-full bg-gradient-to-t from-[#7dd957]/20 via-[#7dd957]/10 to-transparent blur-2xl" />
              
              {/* Декоративная платформа */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-20 rounded-[50%] bg-gradient-to-t from-[#e0e0e0] to-white/50 blur-sm" />
              
              {/* Маскот с floating анимацией */}
              <motion.div
                className="relative w-full h-full"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/mascot.png"
                  alt="MYNBALA маскот - весёлый персонаж парка"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="object-contain object-bottom drop-shadow-2xl"
                />
              </motion.div>

              {/* Floating теги вокруг маскота */}
              <motion.div
                className="absolute top-[15%] right-[5%] glass px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                Праздники
              </motion.div>
              <motion.div
                className="absolute top-[40%] left-[0%] glass px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                animate={{ y: [5, -5, 5], rotate: [2, -2, 2] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              >
                Рестораны
              </motion.div>
              <motion.div
                className="absolute bottom-[25%] right-[0%] glass px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                animate={{ y: [-3, 7, -3], rotate: [-1, 3, -1] }}
                transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
              >
                Аттракционы
              </motion.div>
              </motion.div>
            </ThreeDStage>
          </div>
        </div>
      </div>
    </section>
  );
}
