"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/config/routes";
import { ThreeDStage } from "@/components/three-d/ThreeDStage";

/** Small decorative colored circles scattered around the hero */
const decorativeBalls: {
  size: number;
  color: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay: number;
}[] = [
  { size: 40, color: "#00B4D8", top: "10%", left: "6%", delay: 0 },
  { size: 30, color: "#FF6B9D", top: "18%", right: "8%", delay: 0.8 },
  { size: 50, color: "#FFD93D", bottom: "22%", left: "4%", delay: 0.4 },
  { size: 35, color: "#7DD957", bottom: "30%", right: "5%", delay: 1.2 },
];

const stats = [
  { value: "4", label: "ПАРКА" },
  { value: "50+", label: "АТТРАКЦИОНОВ" },
  { value: "10 000+", label: "СЕМЕЙ" },
];

export function Hero() {
  return (
    <section className="relative bg-white overflow-hidden py-10 md:py-16 px-4">
      {/* Decorative balls */}
      {decorativeBalls.map((ball, i) => (
        <motion.div
          key={`ball-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: ball.size,
            height: ball.size,
            backgroundColor: ball.color,
            top: ball.top,
            left: ball.left,
            right: ball.right,
            bottom: ball.bottom,
            opacity: 0.5,
          }}
          animate={{ y: [-6, 6, -6] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ball.delay,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center z-10">
        {/* ── Typography Block ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full"
        >
          {/* MYNBALA — outline */}
          <h1 className="text-outline-huge select-none">MYNBALA</h1>

          {/* ВЕСЕЛЬЕ — filled, primary color */}
          <p
            className="font-black leading-[0.85] tracking-tight select-none"
            style={{
              fontSize: "clamp(60px, 15vw, 200px)",
              color: "var(--primary)",
              letterSpacing: "-0.03em",
            }}
          >
            ВЕСЕЛЬЕ
          </p>

          {/* КАЖДЫЙ ДЕНЬ — outline */}
          <p className="text-outline-huge select-none">КАЖДЫЙ ДЕНЬ</p>
        </motion.div>

        {/* ── 3D Character / Mascot Slot ── */}
        <motion.div
          className="w-full max-w-lg mt-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <ThreeDStage slot="hero" className="w-full">
            <div className="relative min-h-[400px] rounded-3xl bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
              <Image
                src="/images/mascot.png"
                alt="MYNBALA маскот"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-contain object-center drop-shadow-xl"
                onError={(e) => {
                  /* Hide the image and show placeholder text if mascot doesn't exist */
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const placeholder = parent.querySelector(
                      "[data-placeholder]"
                    );
                    if (placeholder)
                      (placeholder as HTMLElement).style.display = "flex";
                  }
                }}
              />
              {/* Placeholder fallback (hidden by default when image loads) */}
              <div
                data-placeholder
                className="absolute inset-0 items-center justify-center text-gray-400 font-bold text-xl"
                style={{ display: "none" }}
              >
                3D ПЕРСОНАЖ
              </div>
            </div>
          </ThreeDStage>
        </motion.div>

        {/* ── Stats Bar ── */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-0 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              {i > 0 && (
                <div className="w-px h-8 bg-black/10 mx-4 md:mx-6 flex-shrink-0" />
              )}
              <div className="text-center px-2">
                <span className="text-xl md:text-2xl font-black text-[var(--ink)]">
                  {stat.value}
                </span>
                <span className="ml-1.5 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
