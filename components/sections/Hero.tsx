// ============================================================
// FM2 EMPIRE — HERO SECTION
// The first thing every visitor sees. This is the moment.
//
// Direction: Cinematic entertainment energy. Dark stage,
// spotlight feeling, bold Playfair Display headline,
// gold accents. Headline animates in word by word.
// Film grain canvas overlay adds depth without noise.
// ============================================================

"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import Button from "@/components/ui/Button";
import AnimatedText from "@/components/ui/AnimatedText";

// ------------------------------------------------------------
// ANIMATION VARIANTS
// ------------------------------------------------------------

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
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

// ------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Film grain / particle canvas — ambient cinematic texture
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGrain = () => {
      const { width, height } = canvas;
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i]     = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = Math.random() * 18;
      }
      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(drawGrain);
    };

    resize();
    drawGrain();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--color-fm2-black)" }}
    >

      {/* ---- AMBIENT BACKGROUND GLOW ---- */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse 80% 50% at 50% -10%,
              rgba(201, 168, 76, 0.12) 0%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 60% 40% at 80% 80%,
              rgba(201, 168, 76, 0.04) 0%,
              transparent 60%
            )
          `,
        }}
      />

      {/* ---- FILM GRAIN CANVAS ---- */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.4, mixBlendMode: "overlay" }}
        aria-hidden="true"
      />

      {/* ---- CONTENT ---- */}
      <div className="container-fm2 relative z-10 flex flex-col items-center text-center pt-24">

        {/* EYEBROW LABEL */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <span
            className="h-px w-8"
            style={{ backgroundColor: "var(--color-fm2-gold)" }}
          />
          <span className="eyebrow">Africa&apos;s Creative Ecosystem</span>
          <span
            className="h-px w-8"
            style={{ backgroundColor: "var(--color-fm2-gold)" }}
          />
        </motion.div>

        {/* MAIN HEADLINE — word by word reveal */}
        <div
          className="mb-6"
          style={{
            fontSize: "clamp(2.75rem, 8vw, 6rem)",
            color: "var(--color-fm2-white)",
          }}
        >
          <AnimatedText
            text="Where Talent Meets Empire"
            as="h1"
            animation="reveal"
            delay={0.4}
            className="font-display font-bold leading-none tracking-tight"
          />
        </div>

        {/* GOLD ITALIC SUBHEADLINE */}
        <motion.div
          variants={fadeUp}
          custom={0.9}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <span
            className="font-display font-bold italic leading-none tracking-tight"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              color: "var(--color-fm2-gold)",
            }}
          >
            FM2 Empire
          </span>
        </motion.div>

        {/* SUBHEADING */}
        <motion.p
          variants={fadeUp}
          custom={1.1}
          initial="hidden"
          animate="visible"
          className="max-w-2xl leading-relaxed mb-12 text-lg"
          style={{ color: "var(--color-fm2-muted)" }}
        >
          A media, content, talent development, and creative ecosystem.
          We produce, develop, and amplify Africa&apos;s next generation
          of artists, creators, and cultural voices.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          variants={fadeUp}
          custom={1.3}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Button href="#apply" variant="primary" size="lg">
            Join FM2
          </Button>
          <Button
            href="#media"
            variant="secondary"
            size="lg"
            leftIcon={<Play size={16} fill="currentColor" />}
          >
            Watch Our Work
          </Button>
        </motion.div>

        {/* STATS ROW */}
        <motion.div
          variants={fadeUp}
          custom={1.6}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center gap-8 sm:gap-16 mt-20 pt-10 border-t w-full justify-center"
          style={{ borderColor: "var(--color-fm2-border)" }}
        >
          {[
            { value: "50+",    label: "Talents Developed" },
            { value: "100+",   label: "Productions"       },
            { value: "20+",    label: "Events Hosted"     },
            { value: "Africa", label: "Our Stage"         },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span
                className="font-display font-bold text-3xl"
                style={{ color: "var(--color-fm2-gold)" }}
              >
                {stat.value}
              </span>
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "var(--color-fm2-muted)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* ---- SCROLL INDICATOR ---- */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--color-fm2-muted)" }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={16} style={{ color: "var(--color-fm2-gold)" }} />
        </motion.div>
      </motion.div>

    </section>
  );
}