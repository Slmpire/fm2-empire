// ============================================================
// FM2 EMPIRE — 404 PAGE
// Next.js renders this automatically for any unmatched route.
// ============================================================

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section
      className="relative flex items-center justify-center min-h-screen pt-20"
      style={{ backgroundColor: "var(--color-fm2-black)" }}
    >
      <div className="container-fm2 flex flex-col items-center text-center gap-6 py-20">
        <span
          className="font-display font-bold leading-none"
          style={{ fontSize: "clamp(4rem, 12vw, 8rem)", color: "var(--color-fm2-surface)" }}
        >
          404
        </span>
        <h1
          className="font-display font-bold"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", color: "var(--color-fm2-white)" }}
        >
          This Page Took an Early Exit
        </h1>
        <p className="max-w-sm text-sm leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
          The page you're looking for doesn't exist or may have moved.
          Let's get you back on stage.
        </p>
        <Button href="/" variant="primary" size="md">
          Back to Homepage
        </Button>
      </div>
    </section>
  );
}