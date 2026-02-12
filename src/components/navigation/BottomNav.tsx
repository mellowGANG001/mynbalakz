"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket, MapPin, Gift, User } from "lucide-react";
import { ROUTES } from "@/config/routes";

const items = [
  { href: ROUTES.tickets, label: "Билеты", icon: Ticket, color: "#7dd957" },
  { href: ROUTES.parks, label: "Парки", icon: MapPin, color: "#00b4d8" },
  { href: ROUTES.promos, label: "Акции", icon: Gift, color: "#ffd93d" },
  { href: ROUTES.profile, label: "Профиль", icon: User, color: "#a855f7" },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/5 bg-white/95 backdrop-blur-xl safe-area-pb lg:hidden">
      <div className="grid grid-cols-4 max-w-lg mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href === ROUTES.tickets && pathname === ROUTES.myTickets) ||
            (item.href === ROUTES.profile && pathname === ROUTES.support) ||
            (item.href === ROUTES.promos && pathname === ROUTES.restaurants);

          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center gap-1 py-2.5 transition-colors"
            >
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full"
                  style={{ background: item.color, boxShadow: `0 2px 12px ${item.color}80` }}
                />
              )}
              <span
                className="relative flex items-center justify-center w-9 h-9 rounded-2xl transition-all"
                style={
                  isActive
                    ? { background: `${item.color}18`, boxShadow: `0 4px 16px ${item.color}25` }
                    : undefined
                }
              >
                <Icon
                  className="w-5 h-5 transition-colors"
                  strokeWidth={isActive ? 2.5 : 2}
                  style={{ color: isActive ? item.color : "#aaa" }}
                />
              </span>
              <span
                className="text-[10px] font-bold leading-none transition-colors"
                style={{ color: isActive ? item.color : "#aaa" }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
