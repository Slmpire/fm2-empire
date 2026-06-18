// ============================================================
// FM2 EMPIRE — SECTION LABEL COMPONENT
// The small uppercase label that appears above every section
// heading. Signals to the reader what area they are in.
// Example: "WHO WE ARE" above the About section heading.
//
// Includes the gold line beneath it — that short 48px gold
// bar is the FM2 signature visual detail used consistently
// across every section of the landing page.
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// ------------------------------------------------------------
// TYPES
// ------------------------------------------------------------

type SectionLabelProps = {
  text: string;
  align?: "left" | "center" | "right";
  showLine?: boolean;
  className?: string;
};

// ------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------

export default function SectionLabel({
  text,
  align = "left",
  showLine = true,
  className,
}: SectionLabelProps) {
  const alignStyles = {
    left: "items-start",
    center: "items-center",
    right: "items-end",
  };

  return (
    <motion.div
      className={cn(
        "flex flex-col gap-3",
        alignStyles[align],
        className
      )}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Gold line above the label */}
      {showLine && (
        <motion.span
          className="gold-line"
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        />
      )}

      {/* Label text */}
      <span className={cn("eyebrow", align === "center" && "text-center")}>
        {text}
      </span>
    </motion.div>
  );
}