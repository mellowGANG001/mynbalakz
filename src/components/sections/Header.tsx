"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MapPin, Phone, X, Menu, ArrowRight } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { useAuth } from "@/providers/auth-provider";

const logoLetters = [
  { letter: "M", color: "#00B4D8" },
  { letter: "Y", color: "#7DD957" },
  { letter: "N", color: "#FFD93D" },
  { letter: "B", color: "#FF6B9D" },
  { letter: "A", color: "#FF8C42" },
  { letter: "L", color: "#A855F7" },
  { letter: "A", color: "#00B4D8" },
];

const navLinks = [
  { label: "ПАРКИ", href: ROUTES.parks },
  { label: "О КОМПАНИИ", href: ROUTES.support },
  { label: "РЕСТОРАНЫ", href: ROUTES.restaurants },
  { label: "ЦЕНЫ", href: ROUTES.tickets },
  { label: "АКЦИИ", href: ROUTES.promos },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/mynbala",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me/mynbala",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@mynbala",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  return (
    <>
      {/* ── Promo Bar ── */}
      <div className="promo-banner py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-xs sm:text-sm font-bold text-[var(--ink)] tracking-wide">
            ДЕТСКИЙ ДЕНЬ РОЖДЕНИЯ СО СКИДКОЙ
          </span>
          <Link
            href={ROUTES.birthday}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--ink)] text-white flex items-center justify-center hover:bg-[#333] transition-colors"
            aria-label="Подробнее о дне рождения"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href={ROUTES.home} className="flex items-center gap-0.5">
            {logoLetters.map((l, i) => (
              <span
                key={i}
                className="text-2xl md:text-3xl font-black"
                style={{ color: l.color }}
              >
                {l.letter}
              </span>
            ))}
          </Link>

          {/* Center: Buy Tickets */}
          <Link
            href={ROUTES.tickets}
            className="btn-green btn-auto btn-sm hidden sm:inline-flex"
          >
            КУПИТЬ БИЛЕТЫ
          </Link>

          {/* Right: Menu trigger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="flex items-center gap-2 py-2 px-1 hover:opacity-70 transition-opacity"
            aria-label="Открыть меню"
          >
            <span className="text-sm font-bold text-[var(--ink)] hidden sm:inline">
              МЕНЮ
            </span>
            <Menu className="w-6 h-6 text-[var(--ink)]" />
          </button>
        </div>
      </header>

      {/* ── Full-screen Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-white flex flex-col overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close button */}
            <div className="flex justify-end p-5">
              <button
                onClick={() => setMenuOpen(false)}
                className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                aria-label="Закрыть меню"
              >
                <X className="w-6 h-6 text-[var(--ink)]" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 flex flex-col px-6 md:px-12 pb-10 gap-8">
              {/* Info pills */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href={ROUTES.parks}
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 border border-black/10 rounded-full px-5 py-2.5 text-sm font-bold text-[var(--ink)] hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[var(--primary)]" />
                  4 ГОРОДА
                </Link>
                <a
                  href="tel:+77262505050"
                  className="inline-flex items-center gap-2 border border-black/10 rounded-full px-5 py-2.5 text-sm font-bold text-[var(--ink)] hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-4 h-4 text-[var(--primary)]" />
                  +7 (7262) 50-50-50
                </a>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-[clamp(28px,6vw,56px)] font-black text-[var(--ink)] leading-tight hover:text-[var(--primary)] transition-colors py-1"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Auth section in menu */}
              {!loading && (
                <div className="flex flex-wrap gap-3">
                  {user ? (
                    <>
                      <Link
                        href={ROUTES.profile}
                        onClick={() => setMenuOpen(false)}
                        className="btn-dark btn-auto btn-sm"
                      >
                        ПРОФИЛЬ
                      </Link>
                      <button
                        onClick={async () => {
                          await signOut();
                          setMenuOpen(false);
                        }}
                        className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-bold hover:bg-gray-50 transition-colors"
                      >
                        ВЫЙТИ
                      </button>
                    </>
                  ) : (
                    <Link
                      href={ROUTES.authLogin}
                      onClick={() => setMenuOpen(false)}
                      className="btn-dark btn-auto btn-sm"
                    >
                      ВОЙТИ
                    </Link>
                  )}
                </div>
              )}

              {/* Spacer */}
              <div className="flex-1" />

              {/* Social icons */}
              <div className="flex items-center gap-5">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--ink)] hover:text-[var(--primary)] transition-colors"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
