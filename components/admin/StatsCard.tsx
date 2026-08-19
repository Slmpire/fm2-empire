// ============================================================
// FM2 EMPIRE — STATS CARD
// Metric display card used on the admin dashboard.
// Shows a number, label, and optional trend/icon.
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type StatsCardProps = {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accent?: boolean;
  className?: string;
};

export default function StatsCard({
  label,
  value,
  icon: Icon,
  accent = false,
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl p-5",
        className
      )}
      style={{
        backgroundColor: accent ? "rgba(201,168,76,0.08)" : "#1A1A1A",
        border: `1px solid ${accent ? "rgba(201,168,76,0.3)" : "#2A2A2A"}`,
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-semibold tracking-widest uppercase"
          style={{ color: accent ? "#C9A84C" : "#888880" }}
        >
          {label}
        </span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: accent
              ? "rgba(201,168,76,0.15)"
              : "rgba(255,255,255,0.05)",
          }}
        >
          <Icon
            size={15}
            style={{ color: accent ? "#C9A84C" : "#888880" }}
          />
        </div>
      </div>

      <span
        className="font-bold leading-none"
        style={{
          fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
          color: accent ? "#C9A84C" : "#F5F5F0",
          fontFamily: "Georgia, serif",
        }}
      >
        {value}
      </span>
    </div>
  );
}