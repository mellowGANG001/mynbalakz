"use client";

import { FormEvent, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Mail, Sparkles, Bell, Gift } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { createClient } from "@/lib/supabase/client";
import { addLocalNewsletter, isLocalTestingMode } from "@/lib/local-mode";

export function Newsletter() {
  const supabase = useMemo(() => createClient() as any, []);
  const prefersReducedMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!agreed || !agreedTerms) {
      setSubmitError("Подтвердите согласие с условиями и политикой.");
      return;
    }

    setLoading(true);

    if (isLocalTestingMode) {
      addLocalNewsletter({
        email,
        source: "website",
        is_active: true,
      });
      setLoading(false);
      setSubmitSuccess("Локально сохранено: подписка записана в браузер для теста.");
      setEmail("");
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("newsletter_subscriptions").insert({
      email,
      user_id: user?.id ?? null,
      source: "website",
      is_active: true,
    });

    setLoading(false);
    if (error) {
      setSubmitError(error.message);
      return;
    }

    setSubmitSuccess("Готово! Вы успешно подписались на новости MYNBALA.");
    setEmail("");
  };

  return (
    <section id="newsletter" className="section-shell-alt relative overflow-hidden px-4">
      {/* Background decorations */}
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 rounded-full bg-[#7dd957]/10 blur-[70px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-80 h-80 rounded-full bg-[#00b4d8]/10 blur-[60px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lift)]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? undefined : { duration: 0.6 }}
        >
          {/* Left Side - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? undefined : { delay: 0.2 }}
            className="relative overflow-hidden bg-gradient-to-br from-[#7dd957] via-[#5cb338] to-[#00b4d8] p-8 md:p-12 lg:p-14"
          >
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10"
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.2, 1] }}
                transition={prefersReducedMotion ? undefined : { duration: 6, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-20 left-10 w-20 h-20 rounded-full bg-white/10"
                animate={prefersReducedMotion ? undefined : { scale: [1, 1.3, 1] }}
                transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity, delay: 1 }}
              />
              <motion.div 
                className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-white/5"
                animate={prefersReducedMotion ? undefined : { y: [-20, 20, -20] }}
                transition={prefersReducedMotion ? undefined : { duration: 5, repeat: Infinity }}
              />
            </div>

            <div className="relative z-10">
              <motion.div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold uppercase tracking-wider mb-6"
                initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? undefined : { delay: 0.3 }}
              >
                <Bell className="w-4 h-4" />
                Оставайтесь на связи
              </motion.div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-[0.95]">
                Получайте<br />
                <span className="text-white/90">новости, скидки</span><br />
                <span className="text-[#ffd93d]">и анонсы</span>
              </h2>

              <p className="text-white/85 text-base md:text-lg max-w-md mb-8">
                Информация о мероприятиях, эксклюзивные бонусы и специальные предложения прямо на вашу почту!
              </p>

              <div className="space-y-4">
                <motion.div 
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Эксклюзивные скидки</p>
                    <p className="text-white/70 text-xs">Только для подписчиков</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Ранний доступ</p>
                    <p className="text-white/70 text-xs">К новым акциям и событиям</p>
                  </div>
                </motion.div>

                <div className="flex items-center gap-3 pt-4 text-white/90 text-sm">
                  <ShieldCheck className="w-5 h-5 text-[#ffd93d]" />
                  <span>Отписка в любой момент</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={prefersReducedMotion ? undefined : { delay: 0.3 }}
            className="bg-white p-8 md:p-12 lg:p-14"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7dd957] to-[#00b4d8] flex items-center justify-center shadow-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[var(--ink)]">Подпишитесь</h3>
                  <p className="text-sm text-gray-500">Это бесплатно и полезно</p>
                </div>
              </div>
              {isLocalTestingMode ? (
                <p className="text-xs text-amber-700 rounded-xl bg-amber-100 px-3 py-2">
                  Локальный режим: подписка сохраняется в localStorage.
                </p>
              ) : null}

              <div className="space-y-2">
                <label className="text-sm font-bold text-[var(--ink)] flex items-center gap-1">
                  E-mail <span className="text-[#ff6b9d]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-[var(--surface)] border-2 border-transparent rounded-2xl px-5 py-4 text-base focus:border-[var(--primary)] focus:bg-white outline-none transition-all placeholder:text-gray-400"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <label htmlFor="newsletter-consent-data" className="flex items-start gap-3 cursor-pointer group">
                  <input
                    id="newsletter-consent-data"
                    type="checkbox"
                    checked={agreed}
                    onChange={(event) => setAgreed(event.target.checked)}
                    className="mt-0.5 h-6 w-6 rounded border-2 border-gray-300 accent-[var(--primary)]"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    Я согласен(на) с{" "}
                    <a href={ROUTES.legalTerms} className="text-[var(--accent)] hover:underline font-medium">
                      условиями обработки персональных данных
                    </a>{" "}
                    и{" "}
                    <a href={ROUTES.legalPrivacy} className="text-[var(--accent)] hover:underline font-medium">
                      политикой конфиденциальности
                    </a>
                  </span>
                </label>

                <label htmlFor="newsletter-consent-terms" className="flex items-start gap-3 cursor-pointer group">
                  <input
                    id="newsletter-consent-terms"
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(event) => setAgreedTerms(event.target.checked)}
                    className="mt-0.5 h-6 w-6 rounded border-2 border-gray-300 accent-[var(--primary)]"
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    Я принимаю{" "}
                    <a href={ROUTES.legalTerms} className="text-[var(--accent)] hover:underline font-medium">
                      пользовательское соглашение
                    </a>
                  </span>
                </label>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-[var(--ink)] to-[#333] text-white font-bold py-4 px-6 rounded-full flex items-center justify-center gap-3 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-all disabled:opacity-60"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                disabled={loading}
              >
                {loading ? "ОТПРАВЛЯЕМ..." : "ПОДПИСАТЬСЯ"}
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <p className="text-sm text-gray-500 flex items-center gap-1">
                <span className="text-[#ff6b9d]">*</span> обязательно для заполнения
              </p>
              {submitSuccess ? <p className="text-sm text-emerald-600">{submitSuccess}</p> : null}
              {submitError ? <p className="text-sm text-red-500">{submitError}</p> : null}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
