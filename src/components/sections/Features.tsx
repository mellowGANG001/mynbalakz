"use client";

import { motion } from "framer-motion";
import { MapPin, FerrisWheel, PartyPopper, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { ROUTES } from "@/config/routes";

const features = [
  {
    id: "parks",
    stat: "4",
    title: "ПАРКА",
    subtitle: "Тараз, Шымкент, Аксу, Атырау",
    icon: MapPin,
    color: "green",
    href: ROUTES.parks,
  },
  {
    id: "rides",
    stat: "50+",
    title: "АТТРАКЦИОНОВ",
    subtitle: "Для детей и всей семьи",
    icon: FerrisWheel,
    color: "yellow",
    href: ROUTES.tickets,
  },
  {
    id: "events",
    stat: "2x",
    title: "КАЖДЫЕ ВЫХОДНЫЕ",
    subtitle: "Шоу, квесты и праздники",
    icon: PartyPopper,
    color: "blue",
    href: ROUTES.promos,
  },
  {
    id: "safety",
    stat: "24/7",
    title: "БЕЗОПАСНОСТЬ",
    subtitle: "Контроль и забота на каждом шаге",
    icon: ShieldCheck,
    color: "pink",
    href: ROUTES.support,
  },
];

const colorStyles = {
  green: {
    card: "feature-card-green",
    gradient: "from-[#7dd957] to-[#5cb338]",
    iconBg: "bg-[#7dd957]",
    text: "text-[#5cb338]",
    glow: "group-hover:shadow-[0_20px_50px_rgba(125,217,87,0.35)]",
  },
  yellow: {
    card: "feature-card-yellow",
    gradient: "from-[#ffd93d] to-[#f5c400]",
    iconBg: "bg-[#ffd93d]",
    text: "text-[#b8930a]",
    glow: "group-hover:shadow-[0_20px_50px_rgba(255,217,61,0.4)]",
  },
  blue: {
    card: "feature-card-blue",
    gradient: "from-[#00b4d8] to-[#0077b6]",
    iconBg: "bg-[#00b4d8]",
    text: "text-[#0077b6]",
    glow: "group-hover:shadow-[0_20px_50px_rgba(0,180,216,0.35)]",
  },
  pink: {
    card: "feature-card-pink",
    gradient: "from-[#ff6b9d] to-[#ff3366]",
    iconBg: "bg-[#ff6b9d]",
    text: "text-[#e0456b]",
    glow: "group-hover:shadow-[0_20px_50px_rgba(255,107,157,0.35)]",
  },
};

interface FeatureCardProps {
  stat: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: keyof typeof colorStyles;
  href: string;
  delay?: number;
}

const FeatureCard = ({ stat, title, subtitle, icon: Icon, color, href, delay = 0 }: FeatureCardProps) => {
  const styles = colorStyles[color];

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-7 transition-all duration-400 ${styles.card} ${styles.glow}`}
    >
      {/* Background decoration */}
      <div className={`absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gradient-to-br ${styles.gradient} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity`} />
      
      {/* Icon */}
      <motion.div 
        className={`relative w-14 h-14 rounded-2xl ${styles.iconBg} flex items-center justify-center mb-5 shadow-lg`}
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="w-7 h-7 text-white" />
      </motion.div>

      {/* Content */}
      <div className="relative space-y-2">
        <div className="flex items-baseline gap-2">
          <span className={`text-5xl md:text-6xl font-black ${styles.text}`}>{stat}</span>
        </div>
        <h3 className="text-base md:text-lg font-black text-[var(--ink)] leading-tight">{title}</h3>
        <p className="text-sm text-gray-600 max-w-[26ch]">{subtitle}</p>
      </div>

      {/* Hover arrow */}
      <motion.div 
        className={`absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300`}
        initial={{ x: -10 }}
        whileHover={{ x: 0 }}
      >
        <ArrowRight className={`w-5 h-5 ${styles.text}`} />
      </motion.div>
    </motion.a>
  );
};

export function Features() {
  return (
    <section id="features" className="section-shell relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[20%] left-[-5%] w-72 h-72 rounded-full bg-[#7dd957]/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-64 h-64 rounded-full bg-[#00b4d8]/10 blur-[80px] pointer-events-none" />

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
            Почему выбирают MYNBALA
          </motion.span>
          <h2 className="section-title">
            Сочный отдых<br />
            <span className="text-[var(--primary)]">для всей семьи</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Всё, за что любят формат больших семейных парков: масштаб, эмоции, безопасность и сервис.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              stat={feature.stat}
              title={feature.title}
              subtitle={feature.subtitle}
              icon={feature.icon}
              color={feature.color as keyof typeof colorStyles}
              href={feature.href}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
