"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Gift, User, Ticket, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { ROUTES } from "@/config/routes";

const leftItems = [
  { href: ROUTES.parks, label: "Парки", icon: MapPin, color: "#00b4d8" },
  { href: ROUTES.promos, label: "Акции", icon: Gift, color: "#ffd93d" },
] as const;

const rightItems = [
  { href: ROUTES.myTickets, label: "Билеты", icon: Ticket, color: "#ff6b9d" },
  { href: ROUTES.profile, label: "Профиль", icon: User, color: "#a855f7" },
] as const;

function NavItem({ href, label, icon: Icon, color, pathname }: {
  href: string;
  label: string;
  icon: typeof MapPin;
  color: string;
  pathname: string;
}) {
  const isActive =
    pathname === href ||
    (href === ROUTES.myTickets && pathname === ROUTES.tickets) ||
    (href === ROUTES.profile && pathname === ROUTES.support) ||
    (href === ROUTES.promos && (pathname === ROUTES.restaurants || pathname === ROUTES.birthday));

  return (
    <Link href={href} className="relative flex flex-col items-center gap-1 py-2 transition-colors">
      {isActive && (
        <span
          className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full"
          style={{ background: color, boxShadow: `0 2px 12px ${color}80` }}
        />
      )}
      <span
        className="relative flex items-center justify-center w-9 h-9 rounded-2xl transition-all"
        style={isActive ? { background: `${color}18`, boxShadow: `0 4px 16px ${color}25` } : undefined}
      >
        <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.8} style={{ color: isActive ? color : "#bbb" }} />
      </span>
      <span className="text-[10px] font-bold leading-none" style={{ color: isActive ? color : "#bbb" }}>
        {label}
      </span>
    </Link>
  );
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/90 backdrop-blur-xl border-t border-black/5" />

      <div className="relative max-w-lg mx-auto grid grid-cols-5 items-end safe-area-pb">
        {leftItems.map((item) => (
          <NavItem key={item.href} {...item} pathname={pathname} />
        ))}

        {/* FAB Center Button */}
        <div className="flex justify-center -mt-5">
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
            <Link
              href={ROUTES.tickets}
              className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg"
              style={{
                background: "linear-gradient(135deg, #7dd957, #5cb338)",
                boxShadow: "0 8px 28px rgba(125,217,87,0.45)",
              }}
            >
              <Plus className="w-7 h-7 text-white" strokeWidth={2.5} />
              <span className="absolute -bottom-5 text-[11px] font-black text-[var(--primary-dark)]">Купить</span>
            </Link>
          </motion.div>
        </div>

        {rightItems.map((item) => (
          <NavItem key={item.href} {...item} pathname={pathname} />
        ))}
      </div>
    </nav>
  );
}
