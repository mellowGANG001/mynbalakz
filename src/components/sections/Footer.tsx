"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Clock, Send, MapPin, Instagram, Facebook, Youtube, MessageCircle, ArrowUpRight } from "lucide-react";
import { ROUTES } from "@/config/routes";

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com/mynbala", label: "Instagram", color: "#E4405F" },
  { icon: Facebook, href: "https://facebook.com/mynbala", label: "Facebook", color: "#1877F2" },
  { icon: Youtube, href: "https://youtube.com/@mynbala", label: "YouTube", color: "#FF0000" },
  { icon: Send, href: "https://t.me/mynbala", label: "Telegram", color: "#0088cc" },
];

const footerLinks = {
  parks: [
    { label: "Тараз", href: ROUTES.parks },
    { label: "Шымкент", href: ROUTES.parks },
    { label: "Аксу", href: ROUTES.parks },
    { label: "Атырау", href: ROUTES.parks },
  ],
  company: [
    { label: "О нас", href: ROUTES.home },
    { label: "Вакансии", href: ROUTES.support },
    { label: "Партнёрам", href: ROUTES.support },
    { label: "Контакты", href: ROUTES.support },
  ],
  services: [
    { label: "Билеты", href: ROUTES.tickets },
    { label: "День Рождения", href: ROUTES.promos },
    { label: "Рестораны", href: ROUTES.restaurants },
    { label: "Акции", href: ROUTES.promos },
  ],
};

export function Footer() {
  return (
    <footer id="contacts" className="relative bg-[#0f0f0f] text-white pt-20 pb-8 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#7dd957]/10 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {/* Logo */}
            <a href={ROUTES.home} className="inline-flex items-center gap-0.5 mb-6">
              {["M", "Y", "N", "B", "A", "L", "A"].map((letter, i) => {
                const colors = ["#00B4D8", "#7DD957", "#FFD93D", "#FF6B9D", "#FF8C42", "#A855F7", "#00B4D8"];
                return (
                  <motion.span
                    key={i}
                    className="text-3xl md:text-4xl font-black"
                    style={{ color: colors[i] }}
                    whileHover={{ y: -3, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </a>

            <p className="text-gray-400 mb-8 max-w-sm text-base leading-relaxed">
              Детский развлекательный парк, где каждый день — это праздник.
              Веселье для всей семьи в 4 городах Казахстана!
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <motion.a 
                href={ROUTES.parks}
                className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#7dd957]/10 flex items-center justify-center group-hover:bg-[#7dd957]/20 transition-colors">
                  <MapPin className="w-5 h-5 text-[#7DD957]" />
                </div>
                <span>Тараз, Шымкент, Аксу, Атырау</span>
              </motion.a>
              <motion.a 
                href="tel:+77262505050"
                className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#00b4d8]/10 flex items-center justify-center group-hover:bg-[#00b4d8]/20 transition-colors">
                  <Phone className="w-5 h-5 text-[#00B4D8]" />
                </div>
                <span className="font-semibold">+7 (7262) 50-50-50</span>
              </motion.a>
              <motion.a 
                href="mailto:info@mynbala.kz"
                className="flex items-center gap-4 text-gray-400 hover:text-white transition-colors group"
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#ffd93d]/10 flex items-center justify-center group-hover:bg-[#ffd93d]/20 transition-colors">
                  <Mail className="w-5 h-5 text-[#FFD93D]" />
                </div>
                <span>info@mynbala.kz</span>
              </motion.a>
              <div className="flex items-center gap-4 text-gray-400">
                <div className="w-10 h-10 rounded-xl bg-[#ff6b9d]/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#FF6B9D]" />
                </div>
                <span>Ежедневно 10:00 - 22:00</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all border border-white/5"
                  style={{ 
                    boxShadow: `0 0 0 0 ${social.color}00`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 8px 20px ${social.color}30`;
                    e.currentTarget.style.borderColor = `${social.color}50`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 0 ${social.color}00`;
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" style={{ color: social.color }} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {[
            { title: "ПАРКИ", links: footerLinks.parks, color: "#7DD957" },
            { title: "КОМПАНИЯ", links: footerLinks.company, color: "#00B4D8" },
            { title: "УСЛУГИ", links: footerLinks.services, color: "#FFD93D" },
          ].map((column, colIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (colIndex + 1) }}
            >
              <h4 className="font-bold mb-6 text-sm tracking-wider" style={{ color: column.color }}>
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                      whileHover={{ x: 5 }}
                    >
                      {link.label}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MYNBALA. Все права защищены.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <a href={ROUTES.legalPrivacy} className="hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
            <a href={ROUTES.legalTerms} className="hover:text-white transition-colors">
              Условия использования
            </a>
            <a href={ROUTES.legalOferta} className="hover:text-white transition-colors">
              Публичная оферта
            </a>
          </div>
        </motion.div>
      </div>

      {/* Floating Social Buttons */}
      <div className="fixed safe-bottom-offset right-6 flex flex-col gap-3 z-50">
        <motion.a
          href="https://wa.me/77262505050"
          target="_blank"
          rel="noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)]"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-7 h-7 text-white" />
        </motion.a>
        <motion.a
          href="https://t.me/mynbala"
          target="_blank"
          rel="noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1, type: "spring" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-2xl bg-[#0088cc] flex items-center justify-center shadow-[0_8px_30px_rgba(0,136,204,0.4)]"
          aria-label="Telegram"
        >
          <Send className="w-6 h-6 text-white" />
        </motion.a>
      </div>
    </footer>
  );
}
