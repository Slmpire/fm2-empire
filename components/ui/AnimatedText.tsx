// ============================================================
// FM2 EMPIRE — ANIMATED TEXT COMPONENT
// Scroll-triggered entrance animations for headings and text.
//
// "fade"   → whole element fades up. Clean and subtle.
// "reveal" → each word slides up from beneath a mask.
//            Cinematic curtain-lift effect. Used on big
//            headings — Hero, About section titles.
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";

// ------------------------------------------------------------
// TYPES
// ------------------------------------------------------------

type AnimatedTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  animation?: "fade" | "reveal";
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  once?: boolean;
};

// ------------------------------------------------------------
// ANIMATION VARIANTS
// ------------------------------------------------------------

const fadeVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay,
    },
  }),
};

const wordVariants: Variants = {
  hidden:  { y: "110%", opacity: 0 },
  visible: (delay: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay,
    },
  }),
};

// ------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------

export default function AnimatedText({
  text,
  as: Tag = "p",
  animation = "fade",
  className,
  style,
  delay = 0,
  once = true,
}: AnimatedTextProps) {

  // ---- FADE — whole element fades up ----
  if (animation === "fade") {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-50px" }}
        custom={delay}
        variants={fadeVariants}
      >
        <Tag className={className} style={style}>
          {text}
        </Tag>
      </motion.div>
    );
  }

  // ---- REVEAL — word by word slide up from mask ----
  const words = text.split(" ");

  return (
    <Tag className={cn("flex flex-wrap", className)} style={style}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="overflow-hidden inline-block mr-[0.25em] last:mr-0"
        >
          <motion.span
            className="inline-block"
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-50px" }}
            custom={delay + index * 0.05}
            variants={wordVariants}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}