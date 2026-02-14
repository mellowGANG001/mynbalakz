"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

const STORAGE_KEY = "mynbala_birthday_popup_dismissed";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.15, duration: 0.25 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 350, damping: 28 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: { duration: 0.2 },
  },
};

export function BirthdayPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setIsOpen(true);
      }
    } catch {
      // sessionStorage unavailable (e.g. SSR), stay closed
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal card */}
          <motion.div
            className="relative w-full max-w-md rounded-3xl overflow-hidden p-7 md:p-9"
            style={{
              background: "linear-gradient(145deg, #7c3aed 0%, #a855f7 100%)",
              boxShadow: "0 30px 80px rgba(124, 58, 237, 0.45)",
            }}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors"
              aria-label="Закрыть"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="space-y-5">
              {/* Chip */}
              <span
                className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  background: "var(--secondary)",
                  color: "var(--ink)",
                }}
              >
                ДЕТСКИЙ
              </span>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                ДЕНЬ РОЖДЕНИЯ
                <br />
                В MYNBALA
              </h2>

              {/* 3D character placeholder */}
              <div className="rounded-2xl bg-white/10 min-h-[200px] flex items-center justify-center">
                <span className="text-white/40 text-sm font-bold uppercase tracking-widest">
                  3D персонаж
                </span>
              </div>

              {/* CTA */}
              <Link
                href={ROUTES.birthday}
                onClick={handleClose}
                className="btn-dark btn-auto inline-flex"
              >
                ПОДРОБНЕЕ
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
