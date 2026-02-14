"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MapPin, Star, Sparkles, Users, Trophy, Zap } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { ThreeDStage } from "@/components/three-d/ThreeDStage";

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

const trustStats = [
  { value: "10 000+", label: "счастливых семей", icon: Users, color: "#FF7A2E" },
  { value: "4.9", label: "рейтинг парка", icon: Trophy, color: "#ffd93d" },
  { value: "50+", label: "аттракционов", icon: Zap, color: "#5ECE2E" },
];

const floatingTags = [
  { text: "Праздники", icon: Sparkles, top: "12%", right: "5%", color: "#ff6b9d", delay: 0 },
  { text: "Рестораны", icon: Star, top: "42%", left: "0%", color: "#ffd93d", delay: 1 },
  { text: "Аттракционы", icon: Zap, bottom: "22%", right: "0%", color: "#00b4d8", delay: 0.5 },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Animated gradient blobs -- big, bright, moving */}
      {[
        { color: "#5ECE2E", size: 650, top: "0%", left: "-5%", opacity: 0.35, dx: 30, dy: 20 },
        { color: "#ffd93d", size: 550, top: "10%", right: "-8%", opacity: 0.3, dx: -25, dy: 15 },
        { color: "#5DD3F3", size: 500, bottom: "-5%", left: "20%", opacity: 0.3, dx: 20, dy: -20 },
        { color: "#FF7A2E", size: 400, top: "50%", right: "15%", opacity: 0.2, dx: -15, dy: 25 },
        { color: "#ff6b9d", size: 350, bottom: "10%", right: "0%", opacity: 0.15, dx: 10, dy: -10 },
      ].map((blob, i) => (
        <motion.div
          key={`blob-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: blob.size,
            height: blob.size,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            opacity: blob.opacity,
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
            filter: "blur(80px)",
          }}
          animate={{ x: [0, blob.dx, 0], y: [0, blob.dy, 0] }}
          transition={{ duration: 15 + i * 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Floating star decorations */}
      {[
        { top: "8%", left: "6%", size: 28, color: "#ffd93d", delay: 0 },
        { top: "20%", right: "10%", size: 22, color: "#ff6b9d", delay: 1 },
        { bottom: "30%", left: "4%", size: 18, color: "#5DD3F3", delay: 0.5 },
        { top: "45%", right: "4%", size: 24, color: "#a855f7", delay: 2 },
        { bottom: "15%", right: "12%", size: 16, color: "#5ECE2E", delay: 1.5 },
      ].map((star, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          style={{ top: star.top, left: star.left, right: star.right, bottom: star.bottom }}
          animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: star.delay }}
        >
          <Star size={star.size} fill={star.color} color={star.color} className="drop-shadow-lg" />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 pt-6 pb-16 md:pt-10 lg:pt-14 z-10">
        <div className="hero-panel p-6 md:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[480px] lg:min-h-[580px]">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-6 lg:space-y-8 relative z-20"
            >
              <motion.span
                className="glass-pill px-5 py-2.5 text-xs font-extrabold uppercase tracking-widest text-[var(--ink)] inline-flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Sparkles size={14} className="text-[var(--warm-orange)]" />
                Семейный парк #1 в Казахстане
              </motion.span>

              <h1 className="text-playful text-[48px] sm:text-[64px] md:text-[76px] lg:text-[92px] leading-[0.85]">
                <span className="text-[var(--ink)]">MYNBALA</span>
                <motion.span
                  className="block"
                  style={{ color: "var(--warm-orange)" }}
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
                  КАЖДЫЙ ДЕНЬ!
                </motion.span>
              </h1>

              <motion.p
                className="text-base md:text-lg lg:text-xl font-semibold text-gray-600 max-w-[48ch] leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Аттракционы, праздники и семейные рестораны.
                Найдите ближайший парк за пару кликов.
              </motion.p>

              {/* Trust bar -- glass pills */}
              <motion.div
                className="flex flex-wrap gap-3 pt-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {trustStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      className="glass-pill flex items-center gap-2.5 px-4 py-2.5"
                      whileHover={{ y: -5, scale: 1.05 }}
                      transition={spring}
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: `${stat.color}20` }}
                      >
                        <Icon size={16} style={{ color: stat.color }} />
                      </div>
                      <div>
                        <p className="text-lg font-black text-[var(--ink)] leading-none">{stat.value}</p>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-wrap gap-3 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.a
                  href={ROUTES.tickets}
                  className="btn-yellow btn-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={spring}
                >
                  Купить билет
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href={ROUTES.parks}
                  className="btn-green btn-auto"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={spring}
                >
                  <MapPin className="w-5 h-5" />
                  Выбрать парк
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right: Mascot */}
            <ThreeDStage slot="hero">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative h-[380px] md:h-[480px] lg:h-[580px] flex items-end justify-center"
              >
                {/* Glow under mascot */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[55%] rounded-full bg-gradient-to-t from-[#5ECE2E]/25 via-[#5ECE2E]/10 to-transparent blur-3xl" />

                {/* Platform */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[65%] h-16 rounded-[50%] bg-gradient-to-t from-[#e0e0e0] to-white/40 blur-sm" />

                {/* Mascot */}
                <motion.div
                  className="relative w-full h-full"
                  animate={{ y: [0, -18, 0], rotate: [0, 1.5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/images/mascot.png"
                    alt="MYNBALA маскот"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                    className="object-contain object-bottom drop-shadow-2xl"
                  />
                </motion.div>

                {/* Floating glass tags around mascot */}
                {floatingTags.map((tag) => {
                  const Icon = tag.icon;
                  return (
                    <motion.div
                      key={tag.text}
                      className="absolute glass-pill px-4 py-2 text-sm font-bold shadow-lg flex items-center gap-2"
                      style={{ top: tag.top, left: tag.left, right: tag.right, bottom: tag.bottom }}
                      animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                      transition={{ duration: 4.5, repeat: Infinity, delay: tag.delay }}
                    >
                      <Icon size={14} style={{ color: tag.color }} />
                      {tag.text}
                    </motion.div>
                  );
                })}
              </motion.div>
            </ThreeDStage>
          </div>
        </div>
      </div>
    </section>
  );
}
