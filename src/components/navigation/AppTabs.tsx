"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/routes";

const tabs = [
  { href: ROUTES.tickets, label: "Билеты" },
  { href: ROUTES.myTickets, label: "Мои билеты" },
  { href: ROUTES.parks, label: "Парки" },
  { href: ROUTES.restaurants, label: "Рестораны" },
  { href: ROUTES.promos, label: "Акции" },
  { href: ROUTES.support, label: "Поддержка" },
  { href: ROUTES.profile, label: "Профиль" },
];

export function AppTabs() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:block max-w-6xl mx-auto px-4 pt-4">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={
                isActive
                  ? "chip whitespace-nowrap min-h-11 px-5 py-3 text-sm bg-[var(--primary)]/20 border-[var(--primary)]/40 text-[var(--primary-dark)]"
                  : "chip whitespace-nowrap min-h-11 px-5 py-3 text-sm"
              }
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
