"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  getLocalBonusOperations,
  getLocalBookings,
  getLocalProfileSettings,
  getLocalTickets,
  getLocalUser,
  isLocalTestingMode,
  seedLocalBonusOperationsIfEmpty,
  setLocalProfileSettings,
  type LocalBonusOperation,
  type LocalBooking,
  type LocalProfileSettings,
  type LocalTicket,
} from "@/lib/local-mode";

export interface ProfileDataState {
  loading: boolean;
  isAuthenticated: boolean;
  phone: string;
  tickets: LocalTicket[];
  bookings: LocalBooking[];
  bonusOperations: LocalBonusOperation[];
  bonusBalance: number;
  settings: LocalProfileSettings;
  saveSettings: (next: LocalProfileSettings) => Promise<void>;
}

const emptySettings: LocalProfileSettings = {
  first_name: "",
  last_name: "",
  avatar_url: "",
  notifications_promos: true,
  notifications_bookings: true,
};

export function useProfileData(): ProfileDataState {
  const supabase = useMemo(() => createClient(), []);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [phone, setPhone] = useState("");
  const [tickets, setTickets] = useState<LocalTicket[]>([]);
  const [bookings, setBookings] = useState<LocalBooking[]>([]);
  const [bonusOperations, setBonusOperations] = useState<LocalBonusOperation[]>([]);
  const [settings, setSettings] = useState<LocalProfileSettings>(emptySettings);

  const loadLocal = () => {
    const localUser = getLocalUser();
    seedLocalBonusOperationsIfEmpty();
    setIsAuthenticated(Boolean(localUser));
    setPhone(localUser?.phone ?? "");
    setTickets(getLocalTickets());
    setBookings(getLocalBookings());
    setBonusOperations(getLocalBonusOperations());
    setSettings(getLocalProfileSettings());
    setLoading(false);
  };

  useEffect(() => {
    if (isLocalTestingMode) {
      loadLocal();
      const onLocalChanged = () => loadLocal();
      window.addEventListener("mynbala-local-auth-changed", onLocalChanged);
      window.addEventListener("mynbala-local-data-changed", onLocalChanged);
      window.addEventListener("storage", onLocalChanged);
      return () => {
        window.removeEventListener("mynbala-local-auth-changed", onLocalChanged);
        window.removeEventListener("mynbala-local-data-changed", onLocalChanged);
        window.removeEventListener("storage", onLocalChanged);
      };
    }

    const loadRemote = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsAuthenticated(Boolean(user));
      if (!user) {
        setLoading(false);
        return;
      }

      setPhone(user.phone ?? "");

      const [ticketsRes, bookingsRes, userRes, txRes] = await Promise.all([
        supabase
          .from("tickets")
          .select("id,tariff_name,quantity,total_price,status,qr_code,valid_until")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("restaurant_bookings")
          .select("id,full_name,phone,guests_count,visit_at,status,created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("users")
          .select("first_name,last_name,avatar_url")
          .eq("id", user.id)
          .maybeSingle(),
        supabase
          .from("transactions")
          .select("id,type,amount,description,created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

      setTickets((ticketsRes.data ?? []) as LocalTicket[]);
      setBookings((bookingsRes.data ?? []) as LocalBooking[]);
      setSettings({
        first_name: userRes.data?.first_name ?? "",
        last_name: userRes.data?.last_name ?? "",
        avatar_url: userRes.data?.avatar_url ?? "",
        notifications_promos: true,
        notifications_bookings: true,
      });
      setBonusOperations(
        ((txRes.data ?? []) as Array<{ id: string; type: string; amount: number; description: string; created_at: string }>).map(
          (item) => ({
            id: item.id,
            type: item.amount >= 0 ? "earned" : "spent",
            amount: Math.abs(Number(item.amount ?? 0)),
            title: item.description || "Операция",
            created_at: item.created_at,
          })
        )
      );
      setLoading(false);
    };

    void loadRemote();
  }, [supabase]);

  const bonusBalance = useMemo(
    () =>
      bonusOperations.reduce((acc, item) => {
        return item.type === "earned" ? acc + item.amount : acc - item.amount;
      }, 0),
    [bonusOperations]
  );

  const saveSettings = async (next: LocalProfileSettings) => {
    if (isLocalTestingMode) {
      setLocalProfileSettings(next);
      setSettings(next);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("users")
      .update({
        first_name: next.first_name,
        last_name: next.last_name,
        avatar_url: next.avatar_url,
      })
      .eq("id", user.id);
    setSettings(next);
  };

  return {
    loading,
    isAuthenticated,
    phone,
    tickets,
    bookings,
    bonusOperations,
    bonusBalance,
    settings,
    saveSettings,
  };
}
