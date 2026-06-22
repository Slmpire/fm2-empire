// ============================================================
// FM2 EMPIRE — FINAL CTA SECTION
// The last push before the footer. Full-width background
// image (different from Hero so it doesn't feel repetitive),
// dark overlay, centered headline, two clear action buttons.
// ============================================================

"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";

const CTA_IMAGE =
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2400&auto=format&fit=crop";

export default function CTA() {
  return (
    <section
      id="join"
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--color-fm2-black)" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${CTA_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.75) 50%, rgba(8,8,8,0.92) 100%)",
        }}
      />

      {/* Gold ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,168,76,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="container-fm2 section-padding relative z-10">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-7">

          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Your Stage Is Waiting
          </motion.span>

          <AnimatedText
            text="Ready to Build Something Bigger?"
            as="h2"
            animation="reveal"
            delay={0.1}
            className="font-display font-bold leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.75rem)",
              color: "var(--color-fm2-white)",
            }}
          />

          <motion.p
            className="text-base sm:text-lg leading-relaxed max-w-xl"
            style={{ color: "var(--color-fm2-white)", opacity: 0.85 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Whether you&apos;re an artist ready to be developed, a brand
            looking for a creative partner, or a student chasing real
            industry experience — FM2 Empire is where it starts.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 mt-2"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button href="#apply" variant="primary" size="lg">
              Join FM2 Today
            </Button>
            <Button href="#contact" variant="secondary" size="lg">
              Talk to Our Team
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}