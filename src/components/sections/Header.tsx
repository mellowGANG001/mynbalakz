"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MapPin, Phone, Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ROUTES } from "@/config/routes";
import { useAuth } from "@/providers/auth-provider";
import { getLocalBonusOperations, isLocalTestingMode } from "@/lib/local-mode";

const navLinks = [
  { label: "ПАРКИ", href: ROUTES.parks },
  { label: "ЦЕНЫ", href: ROUTES.tickets },
  { label: "РЕСТОРАНЫ", href: ROUTES.restaurants },
  { label: "АКЦИИ", href: ROUTES.promos },
  { label: "КОНТАКТЫ", href: ROUTES.support },
];

const cities = [
  { name: "Тараз", phone: "+7 (7262) 50-50-50" },
  { name: "Шымкент", phone: "+7 (7252) 50-50-50" },
  { name: "Аксу", phone: "+7 (7183) 50-50-50" },
  { name: "Атырау", phone: "+7 (7122) 50-50-50" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [bonusBalance, setBonusBalance] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const { user, signOut, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isLocalTestingMode) return;
    const updateBalance = () => {
      const total = getLocalBonusOperations().reduce((acc, operation) => {
        const amount = Number(operation.amount) || 0;
        return operation.type === "spent" ? acc - amount : acc + amount;
      }, 0);
      setBonusBalance(Math.max(0, total));
    };
    updateBalance();
    window.addEventListener("mynbala-local-data-changed", updateBalance);
    return () => window.removeEventListener("mynbala-local-data-changed", updateBalance);
  }, []);

  return (
    <>
      {/* Promo Banner */}
      <motion.div 
        className="promo-banner py-2.5 px-4 relative overflow-hidden"
        initial={prefersReducedMotion ? false : { y: -50 }}
        animate={prefersReducedMotion ? undefined : { y: 0 }}
        transition={prefersReducedMotion ? undefined : { duration: 0.5 }}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7dd957]/10 via-[#ffd93d]/10 to-[#00b4d8]/10" />
        
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 relative z-10">
          <Sparkles className="w-4 h-4 text-[#ffd93d] hidden sm:block" />
          <span className="text-xs md:text-sm font-bold text-[var(--ink)]">
            ДЕНЬ РОЖДЕНИЯ В MYNBALA — ПОДАРОК ИМЕНИННИКУ
          </span>
          <a 
            href={ROUTES.promos}
            className="hidden sm:inline-flex items-center gap-1 bg-[var(--ink)] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#333] transition-all hover:scale-105"
          >
            ПОДРОБНЕЕ
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/92 backdrop-blur-md shadow-lg border-b border-black/5" 
            : "bg-white/75 backdrop-blur-sm border-b border-black/5"
        }`}
        initial={prefersReducedMotion ? false : { y: -20, opacity: 0 }}
        animate={prefersReducedMotion ? undefined : { y: 0, opacity: 1 }}
        transition={prefersReducedMotion ? undefined : { duration: 0.4, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href={ROUTES.home}
            className="flex items-center gap-0.5"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {["M", "Y", "N", "B", "A", "L", "A"].map((letter, i) => {
              const colors = ["#00B4D8", "#7DD957", "#FFD93D", "#FF6B9D", "#FF8C42", "#A855F7", "#00B4D8"];
              return (
                <motion.span
                  key={i}
                  className="text-2xl md:text-3xl font-black"
                  style={{ color: colors[i] }}
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </motion.a>

          {/* City Selector & Phone */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => setShowCityDropdown(!showCityDropdown)}
                className="flex items-center gap-2 bg-[var(--surface)] border border-black/5 rounded-full px-4 py-2.5 hover:border-[var(--primary)]/30 hover:bg-white transition-all group"
              >
                <MapPin className="w-4 h-4 text-[var(--primary)]" />
                <span className="font-bold text-sm">4 ГОРОДА</span>
                <motion.div
                  animate={prefersReducedMotion ? undefined : { rotate: showCityDropdown ? 180 : 0 }}
                  transition={prefersReducedMotion ? undefined : { duration: 0.2 }}
                >
                  <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {showCityDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden z-50"
                  >
                    {cities.map((city, i) => (
                      <a
                        key={city.name}
                        href={ROUTES.parks}
                        onClick={() => setShowCityDropdown(false)}
                        className="flex items-center justify-between px-4 py-3 hover:bg-[var(--surface)] transition-colors border-b border-black/5 last:border-0"
                      >
                        <span className="font-bold text-sm">{city.name}</span>
                        <span className="text-xs text-gray-500">{city.phone}</span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="tel:+77262505050"
              className="flex items-center gap-2 bg-[var(--surface)] border border-black/5 rounded-full px-4 py-2.5 hover:border-[var(--primary)]/30 hover:bg-white transition-all"
            >
              <Phone className="w-4 h-4 text-[var(--primary)]" />
              <span className="font-bold text-sm">+7 (7262) 50-50-50</span>
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-bold text-[var(--ink)] hover:text-[var(--primary)] transition-colors rounded-full hover:bg-[var(--primary)]/5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.a 
            href={ROUTES.tickets}
            className="hidden md:inline-flex btn-green text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            КУПИТЬ БИЛЕТЫ
          </motion.a>

          {!loading && (
            <div className="hidden md:flex items-center gap-2 ml-2">
              {user ? (
                <>
                  <a
                    href={ROUTES.profile}
                    className="chip text-[11px] normal-case tracking-normal px-3 py-2 min-h-10"
                  >
                    Баллы: {bonusBalance}
                  </a>
                  <a href={ROUTES.profile} className="btn-dark text-sm py-2.5 px-4">
                    Профиль
                  </a>
                  <button
                    onClick={() => void signOut()}
                    className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold hover:bg-black/5"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <a href={ROUTES.authLogin} className="btn-dark text-sm py-2.5 px-4">
                  Войти
                </a>
              )}
            </div>
          )}

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <motion.button 
                  className="p-3 rounded-xl hover:bg-[var(--surface)] transition-colors" 
                  aria-label="Открыть меню"
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] p-0 border-l-0">
                <SheetTitle className="sr-only">Меню навигации</SheetTitle>
                
                {/* Mobile Menu Header */}
                <div className="p-6 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-black text-[var(--ink)]">Меню</span>
                    <button 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-3 rounded-full hover:bg-white/50 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <a 
                    href="tel:+77262505050"
                    className="flex items-center gap-2 text-sm text-[var(--ink)]"
                  >
                    <Phone className="w-4 h-4 text-[var(--primary)]" />
                    <span className="font-semibold">+7 (7262) 50-50-50</span>
                  </a>
                </div>

                {/* Mobile Nav Links */}
                <nav className="p-6 flex flex-col gap-2">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 p-3 rounded-2xl text-base font-bold text-[var(--ink)] hover:bg-[var(--surface)] transition-colors"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="p-6 pt-0 flex flex-col gap-3">
                  <a 
                    href={ROUTES.tickets}
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="btn-green w-full justify-center"
                  >
                    КУПИТЬ БИЛЕТЫ
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a 
                    href={ROUTES.parks}
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="btn-dark w-full justify-center"
                  >
                    <MapPin className="w-4 h-4" />
                    ВЫБРАТЬ ПАРК
                  </a>
                  {!loading && (
                    user ? (
                      <>
                        <a
                          href={ROUTES.profile}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="btn-dark w-full justify-center"
                        >
                          Профиль
                        </a>
                        <button
                          onClick={async () => {
                            await signOut();
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full rounded-full border border-black/10 px-5 py-3 font-bold"
                        >
                          Выйти
                        </button>
                      </>
                    ) : (
                      <a
                        href={ROUTES.authLogin}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="btn-dark w-full justify-center"
                      >
                        Войти
                      </a>
                    )
                  )}
                </div>

                {/* Cities in Mobile */}
                <div className="p-6 pt-0">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Наши парки</p>
                  <div className="grid grid-cols-2 gap-2">
                    {cities.map((city) => (
                      <a
                        key={city.name}
                        href={ROUTES.parks}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm font-semibold text-[var(--ink)] p-3 rounded-xl hover:bg-[var(--surface)] transition-colors"
                      >
                        {city.name}
                      </a>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* Click outside to close dropdown */}
      {showCityDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowCityDropdown(false)}
        />
      )}
    </>
  );
}
