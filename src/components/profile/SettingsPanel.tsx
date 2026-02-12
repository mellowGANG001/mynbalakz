"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2, Settings2 } from "lucide-react";
import type { LocalProfileSettings } from "@/lib/local-mode";

interface SettingsPanelProps {
  initialSettings: LocalProfileSettings;
  phone: string;
  onSave: (next: LocalProfileSettings) => Promise<void>;
}

export function SettingsPanel({ initialSettings, phone, onSave }: SettingsPanelProps) {
  const [form, setForm] = useState<LocalProfileSettings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(initialSettings);
  }, [initialSettings]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    await onSave(form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="surface-card p-6 md:p-7 space-y-4">
      <div className="flex items-center gap-2">
        <Settings2 className="w-5 h-5 text-[var(--primary)]" />
        <h3 className="text-2xl font-black text-[var(--ink)]">Настройки профиля</h3>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="block text-sm font-bold">
            Имя
            <input
              value={form.first_name}
              onChange={(event) => setForm((prev) => ({ ...prev, first_name: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
            />
          </label>
          <label className="block text-sm font-bold">
            Фамилия
            <input
              value={form.last_name}
              onChange={(event) => setForm((prev) => ({ ...prev, last_name: event.target.value }))}
              className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
            />
          </label>
        </div>

        <label className="block text-sm font-bold">
          Аватар (URL)
          <input
            value={form.avatar_url}
            onChange={(event) => setForm((prev) => ({ ...prev, avatar_url: event.target.value }))}
            className="mt-2 w-full rounded-2xl border border-black/10 bg-white px-4 py-3"
            placeholder="https://..."
          />
        </label>

        <label className="block text-sm font-bold">
          Телефон
          <input value={phone} readOnly className="mt-2 w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-gray-600" />
        </label>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={form.notifications_promos}
              onChange={(event) => setForm((prev) => ({ ...prev, notifications_promos: event.target.checked }))}
              className="h-5 w-5 accent-[var(--primary)]"
            />
            Получать уведомления об акциях
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={form.notifications_bookings}
              onChange={(event) => setForm((prev) => ({ ...prev, notifications_bookings: event.target.checked }))}
              className="h-5 w-5 accent-[var(--primary)]"
            />
            Получать уведомления по бронированиям
          </label>
        </div>

        <button type="submit" className="btn-green w-full md:w-fit" disabled={saving}>
          {saving ? "Сохраняем..." : "Сохранить изменения"}
        </button>
        {saved ? (
          <p className="inline-flex items-center gap-2 text-sm text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
            Настройки сохранены
          </p>
        ) : null}
      </form>
    </div>
  );
}
