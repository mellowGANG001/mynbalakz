export const isLocalTestingMode = process.env.NODE_ENV === "development";

export interface LocalUser {
  id: string;
  phone: string;
}

export interface LocalTicket {
  id: string;
  tariff_name: string;
  quantity: number;
  total_price: number;
  original_price?: number;
  discount_amount?: number;
  promo_code?: string;
  status: string;
  qr_code: string;
  valid_until: string;
}

export interface LocalBooking {
  id: string;
  full_name: string;
  phone: string;
  guests_count: number;
  visit_at: string | null;
  status: "new" | "confirmed" | "cancelled" | "completed";
  created_at: string;
}

export interface LocalBonusOperation {
  id: string;
  type: "earned" | "spent";
  amount: number;
  title: string;
  created_at: string;
}

export interface LocalProfileSettings {
  first_name: string;
  last_name: string;
  avatar_url: string;
  notifications_promos: boolean;
  notifications_bookings: boolean;
}

const KEYS = {
  user: "mynbala_local_user",
  tickets: "mynbala_local_tickets",
  bookings: "mynbala_local_bookings",
  bonuses: "mynbala_local_bonus_operations",
  settings: "mynbala_local_profile_settings",
  feedback: "mynbala_local_feedback",
  newsletter: "mynbala_local_newsletter",
} as const;

function readArray<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function writeArray<T>(key: string, value: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("mynbala-local-data-changed"));
}

export function getLocalUser(): LocalUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(KEYS.user);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LocalUser;
  } catch {
    return null;
  }
}

export function setLocalUser(user: LocalUser) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEYS.user, JSON.stringify(user));
  window.dispatchEvent(new Event("mynbala-local-auth-changed"));
}

export function clearLocalUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEYS.user);
  window.dispatchEvent(new Event("mynbala-local-auth-changed"));
}

export function getLocalTickets(): LocalTicket[] {
  return readArray<LocalTicket>(KEYS.tickets);
}

export function addLocalTicket(ticket: LocalTicket) {
  const current = getLocalTickets();
  writeArray(KEYS.tickets, [ticket, ...current]);
}

export function addLocalBooking(payload: Record<string, unknown>) {
  const current = readArray<LocalBooking>(KEYS.bookings);
  const record: LocalBooking = {
    id: `local-booking-${Date.now()}`,
    full_name: String(payload.full_name ?? ""),
    phone: String(payload.phone ?? ""),
    guests_count: Number(payload.guests_count ?? 1),
    visit_at: (payload.visit_at as string | null) ?? null,
    status: (payload.status as LocalBooking["status"]) ?? "new",
    created_at: new Date().toISOString(),
  };
  writeArray(KEYS.bookings, [record, ...current]);
}

export function getLocalBookings(): LocalBooking[] {
  return readArray<LocalBooking>(KEYS.bookings);
}

export function getLocalBonusOperations(): LocalBonusOperation[] {
  return readArray<LocalBonusOperation>(KEYS.bonuses);
}

export function addLocalBonusOperation(operation: Omit<LocalBonusOperation, "id" | "created_at">) {
  const current = getLocalBonusOperations();
  const record: LocalBonusOperation = {
    ...operation,
    id: `local-bonus-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  writeArray(KEYS.bonuses, [record, ...current]);
}

export function seedLocalBonusOperationsIfEmpty() {
  const current = getLocalBonusOperations();
  if (current.length > 0) return;
  const seeded: LocalBonusOperation[] = [
    {
      id: "local-bonus-seed-1",
      type: "earned",
      amount: 120,
      title: "Покупка билета",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    },
    {
      id: "local-bonus-seed-2",
      type: "earned",
      amount: 80,
      title: "Участие в акции",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
  ];
  writeArray(KEYS.bonuses, seeded);
}

export function getLocalProfileSettings(): LocalProfileSettings {
  if (typeof window === "undefined") {
    return {
      first_name: "",
      last_name: "",
      avatar_url: "",
      notifications_promos: true,
      notifications_bookings: true,
    };
  }
  const raw = window.localStorage.getItem(KEYS.settings);
  if (!raw) {
    return {
      first_name: "",
      last_name: "",
      avatar_url: "",
      notifications_promos: true,
      notifications_bookings: true,
    };
  }
  try {
    return JSON.parse(raw) as LocalProfileSettings;
  } catch {
    return {
      first_name: "",
      last_name: "",
      avatar_url: "",
      notifications_promos: true,
      notifications_bookings: true,
    };
  }
}

export function setLocalProfileSettings(value: LocalProfileSettings) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEYS.settings, JSON.stringify(value));
  window.dispatchEvent(new Event("mynbala-local-data-changed"));
}

export function addLocalFeedback(payload: Record<string, unknown>) {
  const current = readArray<Record<string, unknown>>(KEYS.feedback);
  writeArray(KEYS.feedback, [{ ...payload, created_at: new Date().toISOString() }, ...current]);
}

export function addLocalNewsletter(payload: Record<string, unknown>) {
  const current = readArray<Record<string, unknown>>(KEYS.newsletter);
  writeArray(KEYS.newsletter, [{ ...payload, created_at: new Date().toISOString() }, ...current]);
}
