// ============================================================
// FM2 EMPIRE — PLACEHOLDER MEDIA COMPONENT
// Generates a branded "demo" visual wherever real photos,
// videos, or thumbnails are missing. Used across Hero, About,
// Media, Events, and Team sections until real FM2 assets
// are provided.
//
// Each placeholder shows a subtle "DEMO" tag so the team
// knows at a glance what still needs real content — without
// looking broken or empty on screen.
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { ImageIcon, Film, Users, Calendar } from "lucide-react";

// ------------------------------------------------------------
// TYPES
// ------------------------------------------------------------

type PlaceholderVariant = "photo" | "video" | "team" | "event" | "abstract";

type PlaceholderMediaProps = {
  variant?: PlaceholderVariant;
  label?: string;
  showTag?: boolean;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait" | "wide";
};

// ------------------------------------------------------------
// ICON MAP
// ------------------------------------------------------------

const variantIcons: Record<PlaceholderVariant, React.ElementType> = {
  photo: ImageIcon,
  video: Film,
  team: Users,
  event: Calendar,
  abstract: ImageIcon,
};

const aspectClasses: Record<string, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/6]",
};

// ------------------------------------------------------------
// GRADIENT VARIANTS
// Rotates through a few gold-toned gradients so repeated
// placeholders on one page don't look identical/flat.
// ------------------------------------------------------------

const gradients = [
  "linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 60%, #1A1A1A 100%)",
  "linear-gradient(135deg, #1A1A1A 0%, #232017 50%, #1A1A1A 100%)",
  "linear-gradient(160deg, #161616 0%, #2A2418 100%)",
  "linear-gradient(200deg, #1A1A1A 0%, #201E14 100%)",
];

function getGradient(seed: string) {
  const index =
    seed
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length;
  return gradients[index];
}

// ------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------

export default function PlaceholderMedia({
  variant = "abstract",
  label,
  showTag = true,
  className,
  aspectRatio = "video",
}: PlaceholderMediaProps) {
  const Icon = variantIcons[variant];
  const gradient = getGradient(label ?? variant);

  return (
    <div
      className={cn(
        "relative overflow-hidden flex items-center justify-center",
        aspectClasses[aspectRatio],
        className
      )}
      style={{ background: gradient }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Diagonal texture lines — gives it a designed feel, not empty */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 14px)",
        }}
      />

      {/* Center icon */}
      <Icon
        size={32}
        strokeWidth={1.25}
        style={{ color: "var(--color-fm2-gold)", opacity: 0.35 }}
      />

      {/* Demo tag */}
      {showTag && (
        <span
          className="absolute bottom-3 left-3 text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded-full z-10"
          style={{
            backgroundColor: "rgba(8, 8, 8, 0.75)",
            color: "var(--color-fm2-gold)",
            border: "1px solid rgba(201, 168, 76, 0.25)",
          }}
        >
          Demo
        </span>
      )}

      {/* Optional label */}
      {label && (
        <span
          className="absolute top-3 right-3 text-[10px] font-medium px-2 py-1 rounded z-10 max-w-[70%] truncate"
          style={{
            backgroundColor: "rgba(8, 8, 8, 0.6)",
            color: "var(--color-fm2-muted)",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}