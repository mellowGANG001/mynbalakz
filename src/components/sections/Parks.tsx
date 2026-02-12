"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, MapPin, Phone, Navigation, Sparkles } from "lucide-react";
import { branches } from "@/lib/home-data";
import { ROUTES } from "@/config/routes";
import { get2GisRouteUrl, getGoogleRouteUrl } from "@/lib/maps";

const cardColors = [
  { gradient: "from-[#7dd957]/20 via-[#a8e88a]/10 to-white", accent: "#7dd957", accentLight: "#e8fce0" },
  { gradient: "from-[#00b4d8]/20 via-[#5dd3f3]/10 to-white", accent: "#00b4d8", accentLight: "#e0f7ff" },
  { gradient: "from-[#ffd93d]/20 via-[#ffe680]/10 to-white", accent: "#ffd93d", accentLight: "#fff9db" },
  { gradient: "from-[#ff6b9d]/20 via-[#ff9fc0]/10 to-white", accent: "#ff6b9d", accentLight: "#ffe8f0" },
];

interface ParkCardProps {
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  colorIndex: number;
  delay?: number;
}

const ParkCard = ({ name, city, address, phone, hours, colorIndex, delay = 0 }: ParkCardProps) => {
  const colors = cardColors[colorIndex % cardColors.length];
  const location = { name, city, address };
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative overflow-hidden rounded-[var(--radius-lg)] bg-white border border-black/5 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-all duration-400"
    >
      {/* Header gradient section */}
      <div className={`relative h-32 bg-gradient-to-br ${colors.gradient} overflow-hidden`}>
        {/* Decorative circles */}
        <motion.div 
          className="absolute -top-8 -right-8 w-24 h-24 rounded-full"
          style={{ background: colors.accent, opacity: 0.2 }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full"
          style={{ background: colors.accent, opacity: 0.15 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        />
        
        {/* City badge */}
        <div 
          className="absolute top-4 left-4 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg"
          style={{ background: colors.accent }}
        >
          {city}
        </div>

        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id={`pattern-${colorIndex}`} width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill={colors.accent} opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#pattern-${colorIndex})`} />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <h3 className="font-black text-xl text-[var(--ink)] leading-tight group-hover:text-[var(--primary)] transition-colors">
          {name}
        </h3>
        
        <div className="space-y-2.5">
          <p className="text-sm text-gray-600 flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} />
            <span>{address}</span>
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-3">
            <Phone className="w-4 h-4 flex-shrink-0" style={{ color: colors.accent }} />
            <span className="font-semibold">{phone}</span>
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-3">
            <Clock className="w-4 h-4 flex-shrink-0" style={{ color: colors.accent }} />
            <span>{hours}</span>
          </p>
        </div>

        {/* CTA */}
        <div className="pt-3 border-t border-black/5 space-y-2">
          <a
            href={get2GisRouteUrl(location)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold transition-colors"
            style={{ color: colors.accent }}
          >
            <Navigation className="w-4 h-4" />
            Маршрут в 2GIS
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={getGoogleRouteUrl(location)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-gray-700"
          >
            Резерв: Google Maps
          </a>
        </div>
      </div>

      {/* Hover glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at 50% 100%, ${colors.accent}15 0%, transparent 70%)` 
        }}
      />
    </motion.article>
  );
};

export function Parks() {
  return (
    <section id="parks" className="section-shell-alt relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[30%] left-[-10%] w-96 h-96 rounded-full bg-[#7dd957]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-80 h-80 rounded-full bg-[#00b4d8]/5 blur-[100px] pointer-events-none" />

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
            <MapPin className="w-4 h-4" />
            Локации
          </motion.span>
          <h2 className="section-title">
            Выберите<br />
            <span className="text-[var(--primary)]">ближайший парк</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Все площадки выполнены в едином стандарте MYNBALA: яркий дизайн, контроль безопасности и сервис.
          </p>
        </motion.div>

        {/* Parks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {branches.map((park, index) => (
            <ParkCard
              key={park.id}
              name={park.name}
              city={park.city}
              address={park.address}
              phone={park.phone}
              hours={park.hours}
              colorIndex={index}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center pt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a href={ROUTES.tickets} className="btn-green">
            <Sparkles className="w-5 h-5" />
            Купить билеты онлайн
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
