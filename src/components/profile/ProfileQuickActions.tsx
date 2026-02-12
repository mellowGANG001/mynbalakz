"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Ticket, MapPin, UtensilsCrossed, LifeBuoy, Sparkles, Gift } from "lucide-react";
import { ROUTES } from "@/config/routes";

const actions = [
  { href: ROUTES.tickets, label: "Купить билет", icon: Ticket, color: "var(--primary)" },
  { href: ROUTES.myTickets, label: "Мои билеты", icon: Sparkles, color: "var(--accent)" },
  { href: ROUTES.parks, label: "Маршрут", icon: MapPin, color: "var(--secondary-dark)" },
  { href: ROUTES.restaurants, label: "Ресторан", icon: UtensilsCrossed, color: "var(--orange)" },
  { href: ROUTES.promos, label: "Акции", icon: Gift, color: "var(--pink)" },
  { href: ROUTES.support, label: "Поддержка", icon: LifeBuoy, color: "var(--purple)" },
];

export function ProfileQuickActions() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <motion.div key={action.href} whileHover={prefersReducedMotion ? undefined : { y: -4 }}>
            <Link
              href={action.href}
              className="surface-card flex flex-col items-center justify-center gap-2 p-4 text-center min-h-[88px]"
            >
              <Icon className="w-5 h-5" style={{ color: action.color }} />
              <p className="text-xs font-bold text-[var(--ink)] leading-tight">{action.label}</p>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
