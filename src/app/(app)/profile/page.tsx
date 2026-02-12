"use client";

import { useEffect, useMemo, useState, type ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, WalletCards, UtensilsCrossed, Settings2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { AppTabs } from "@/components/navigation/AppTabs";
import { useAuth } from "@/providers/auth-provider";
import { useProfileData } from "@/hooks/use-profile-data";
import { ProfileQuickActions } from "@/components/profile/ProfileQuickActions";
import { BonusPanel } from "@/components/profile/BonusPanel";
import { BookingsPanel } from "@/components/profile/BookingsPanel";
import { SettingsPanel } from "@/components/profile/SettingsPanel";
import { ROUTES } from "@/config/routes";

type ProfileTab = "bonuses" | "bookings" | "settings";

const tabConfig: Array<{ id: ProfileTab; label: string; icon: ComponentType<{ className?: string }> }> = [
  { id: "bonuses", label: "Бонусы", icon: WalletCards },
  { id: "bookings", label: "Брони", icon: UtensilsCrossed },
  { id: "settings", label: "Настройки", icon: Settings2 },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<ProfileTab>("bonuses");
  const profileData = useProfileData();

  const displayName = useMemo(() => {
    const raw = [profileData.settings.first_name, profileData.settings.last_name].filter(Boolean).join(" ").trim();
    if (raw) return raw;
    if (user?.phone) return user.phone;
    return "Гость MYNBALA";
  }, [profileData.settings.first_name, profileData.settings.last_name, user?.phone]);

  useEffect(() => {
    if (!profileData.loading && !profileData.isAuthenticated) {
      router.replace(`${ROUTES.authLogin}?next=${encodeURIComponent(ROUTES.profile)}`);
    }
  }, [profileData.loading, profileData.isAuthenticated, router]);

  return (
    <main className="min-h-screen page-bg-juicy">
      <Header />
      <AppTabs />
      <section className="section-shell">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <motion.div
            className="relative overflow-hidden rounded-[var(--radius-lg)] p-7 md:p-9"
            style={{ background: "linear-gradient(145deg, #e8fce0 0%, #e0f7ff 50%, #fff9db 100%)", border: "1px solid rgba(125,217,87,0.15)" }}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.4 }}
          >
            <div className="absolute -top-16 -right-12 w-56 h-56 rounded-full bg-[#7dd957]/25 blur-[70px] pointer-events-none" />
            <div className="absolute -bottom-12 -left-10 w-40 h-40 rounded-full bg-[#00b4d8]/15 blur-[50px] pointer-events-none" />
            <div className="relative z-10">
              <p className="chip w-fit">
                <Sparkles className="w-4 h-4" />
                Личный кабинет
              </p>
              <h1 className="section-title text-4xl md:text-5xl mt-3">{displayName}</h1>
              <p className="section-subtitle mt-2">
                Управляйте бонусами, бронированиями и настройками профиля в одном месте.
              </p>
              <div className="mt-4 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <p className="font-semibold text-[#1a1a1a]">Телефон: {profileData.phone || user?.phone || "—"}</p>
                  <p className="font-black text-[var(--primary-dark)]">{profileData.bonusBalance} баллов</p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-[var(--primary)] transition-all"
                    style={{ width: `${Math.min(100, ((profileData.bonusBalance % 1000) / 1000) * 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">До следующего уровня: {1000 - (profileData.bonusBalance % 1000)} баллов</p>
              </div>
            </div>
          </motion.div>

          {!profileData.loading ? <ProfileQuickActions /> : null}

          {profileData.loading ? (
            <div className="surface-card p-7 md:p-8">
              <p className="text-sm text-gray-600">Загружаем данные профиля...</p>
            </div>
          ) : !profileData.isAuthenticated ? (
            <div className="surface-card p-7 md:p-8">
              <p className="text-sm text-gray-600">Переводим вас на страницу входа...</p>
            </div>
          ) : (
            <>
              <div className="surface-card p-2">
                <div className="grid grid-cols-3 gap-2">
                  {tabConfig.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={
                          isActive
                            ? "chip w-full min-h-11 justify-center text-sm bg-[var(--primary)]/20 border-[var(--primary)]/40 text-[var(--primary-dark)]"
                            : "chip w-full min-h-11 justify-center text-sm"
                        }
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <motion.div
                key={activeTab}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? undefined : { duration: 0.25 }}
              >
                {activeTab === "bonuses" ? (
                  <BonusPanel balance={profileData.bonusBalance} operations={profileData.bonusOperations} />
                ) : null}
                {activeTab === "bookings" ? <BookingsPanel bookings={profileData.bookings} /> : null}
                {activeTab === "settings" ? (
                  <SettingsPanel initialSettings={profileData.settings} phone={profileData.phone} onSave={profileData.saveSettings} />
                ) : null}
              </motion.div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
