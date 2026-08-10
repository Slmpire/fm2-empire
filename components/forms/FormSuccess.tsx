// ============================================================
// FM2 EMPIRE — FORM SUCCESS STATE
// Shared component shown after any form submission succeeds.
// Each form passes its own title, message, and next-step
// links so the confirmation feels specific, not generic.
// ============================================================

"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

type FormSuccessProps = {
  title: string;
  message: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
};

export default function FormSuccess({
  title,
  message,
  primaryAction,
  secondaryAction,
}: FormSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center gap-6 py-12 px-6"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, type: "spring" }}
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: "rgba(39, 174, 96, 0.1)",
          border: "1px solid rgba(39, 174, 96, 0.3)",
        }}
      >
        <CheckCircle2 size={32} style={{ color: "var(--color-fm2-success)" }} />
      </motion.div>

      {/* Text */}
      <div className="flex flex-col gap-3 max-w-sm">
        <h3
          className="font-display font-bold text-xl"
          style={{ color: "var(--color-fm2-white)" }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
          {message}
        </p>
      </div>

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
          {primaryAction && (
            <Button href={primaryAction.href} variant="primary" size="md">
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button href={secondaryAction.href} variant="secondary" size="md">
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}