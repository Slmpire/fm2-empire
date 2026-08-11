// ============================================================
// FM2 EMPIRE — HERO SECTION
// Every gap between elements uses a clear, consistent margin
// scale. See the spacing guide below this file for what each
// value controls.
// ============================================================

"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import Button from "@/components/ui/Button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay,
    },
  }),
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2400&auto=format&fit=crop";

const stats = [
  { value: "50+", label: "Talents Developed" },
  { value: "100+", label: "Productions" },
  { value: "20+", label: "Events Hosted" },
  { value: "Africa", label: "Our Stage" },
];

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-fm2-black)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.55) 40%, rgba(8,8,8,0.92) 100%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="container-fm2 relative z-10 flex w-full flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-screen w-full flex-col items-center justify-center py-24 sm:py-28 lg:py-50">

          {/* GAP-1: space below the eyebrow row */}
          <motion.div
            className="mb-8 flex items-center justify-center gap-3 sm:mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="h-px w-6 sm:w-8" style={{ backgroundColor: "var(--color-fm2-gold)" }} />
            <span className="eyebrow text-[10px] sm:text-xs whitespace-nowrap">
              Africa&apos;s Creative Ecosystem
            </span>
            <span className="h-px w-6 sm:w-8" style={{ backgroundColor: "var(--color-fm2-gold)" }} />
          </motion.div>

          {/* GAP-2: space below the main headline */}
          <div className="w-full max-w-6xl text-center">
            <motion.h1
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-display mb-6 px-1 font-bold leading-[1.05] tracking-tight sm:mb-8"
              style={{
                fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
                color: "var(--color-fm2-white)",
                textShadow: "0 6px 30px rgba(0,0,0,0.65)",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              Where Talent Meets Empire
            </motion.h1>
          </div>

          {/* GAP-3: space below the gold "FM2 Empire" line */}
          <motion.div
            custom={0.9}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 sm:mb-8"
          >
            <span
              className="font-display font-bold italic leading-none tracking-tight"
              style={{
                fontSize: "clamp(1.25rem, 3.5vw, 2.5rem)",
                color: "var(--color-fm2-gold)",
              }}
            >
              FM2 Empire
            </span>
          </motion.div>

          {/* GAP-4: space below the supporting paragraph */}
          <motion.p
            custom={1.1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-10 max-w-[42rem] px-2 text-center text-sm leading-7 sm:mb-12 sm:px-4 sm:text-base sm:leading-8"
            style={{ color: "var(--color-fm2-white)", opacity: 0.85 }}
          >
            A media, content, talent development, and creative ecosystem.
            We produce, develop, and amplify Africa&apos;s next generation
            of artists, creators, and cultural voices.
          </motion.p>

          {/* GAP-5: space below the CTA buttons */}
          {/* CTA buttons */}
          <motion.div
            custom={1.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-12 flex w-full max-w-md flex-col items-center gap-3 px-1 sm:mb-14 sm:max-w-none sm:w-auto sm:flex-row sm:justify-center sm:gap-4 sm:px-0 lg:mb-16"
          >
            <Button
              href="/apply"
              variant="primary"
              size="lg"
              className="w-full justify-center sm:w-[340px] md:w-[240px]"
            >
              Join FM2
            </Button>

            <Button
              href="#media"
              variant="secondary"
              size="lg"
              leftIcon={<Play size={16} fill="currentColor" />}
              className="w-full justify-center sm:w-auto"
            >
              Watch Our Work
            </Button>
          </motion.div>
          {/* GAP-6: space above the stats row (the border-top divider) */}
          <motion.div
            custom={1.6}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="w-full max-w-4xl border-t pt-10 sm:pt-12"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-x-8 md:gap-x-10 lg:gap-x-12">
              {stats.map((stat) => (
                <div key={stat.label} className="flex min-w-0 flex-col items-center justify-start gap-1.5 text-center">
                  <span
                    className="font-display text-xl font-bold sm:text-2xl lg:text-3xl"
                    style={{ color: "var(--color-fm2-gold)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="max-w-[140px] text-[10px] uppercase tracking-[0.18em] sm:max-w-none sm:text-xs"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      <motion.div
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex lg:bottom-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.5)" }}>
          Scroll
        </span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={16} style={{ color: "var(--color-fm2-gold)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}