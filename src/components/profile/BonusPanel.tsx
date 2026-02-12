"use client";

import { Gift, TrendingDown, TrendingUp } from "lucide-react";
import type { LocalBonusOperation } from "@/lib/local-mode";

interface BonusPanelProps {
  balance: number;
  operations: LocalBonusOperation[];
}

export function BonusPanel({ balance, operations }: BonusPanelProps) {
  return (
    <div className="space-y-4">
      <div className="surface-card p-6 md:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="chip w-fit">
              <Gift className="w-4 h-4" />
              Бонусный баланс
            </p>
            <p className="mt-3 text-4xl font-black text-[var(--ink)]">{balance.toLocaleString("ru-RU")} pts</p>
          </div>
          <a href="/tickets" className="btn-green text-sm">
            Начислить баллы
          </a>
        </div>
      </div>

      <div className="surface-card p-6 md:p-7 space-y-3">
        <h3 className="text-2xl font-black text-[var(--ink)]">История операций</h3>
        {operations.length === 0 ? (
          <div className="rounded-2xl bg-black/5 p-4 text-sm text-gray-600">
            Пока нет операций. Баллы будут появляться после первых покупок.
          </div>
        ) : (
          operations.map((item) => (
            <div key={item.id} className="rounded-2xl border border-black/10 bg-white px-4 py-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-bold text-[var(--ink)]">{item.title}</p>
                <p className="text-xs text-gray-500">{new Date(item.created_at).toLocaleString("ru-RU")}</p>
              </div>
              <p className={`inline-flex items-center gap-1 text-sm font-black ${item.type === "earned" ? "text-emerald-600" : "text-rose-600"}`}>
                {item.type === "earned" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {item.type === "earned" ? "+" : "-"}
                {item.amount}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
