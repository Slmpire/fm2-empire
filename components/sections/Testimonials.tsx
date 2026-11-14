// ============================================================
// FM2 EMPIRE — TESTIMONIALS SECTION
// Social proof from artists, clients, and partners. Centered
// card content, equal-height rows via items-start (same fix
// pattern used in About), real avatar photos via Unsplash
// until FM2 provides real client/artist photos.
// ============================================================

"use client";

import { motion, type Variants } from "framer-motion";
import { Quote } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";
import type { Testimonial } from "@/types/index";

// ------------------------------------------------------------
// DATA
// Replace quote, name, role, and imageUrl with real FM2
// testimonials once collected from artists/clients/partners.
// ------------------------------------------------------------

const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Yeah so far so good, I have worked with Fm2empire for more than  4years now on different projects and they have been so awesome. Their professionalism, their taste for high quality creativity and consistency has been awesome. I look forward to working with you guys more in years to come",
    name: "Jimmy Ex",
    role: "Creative",
    imageUrl:
      "https://res.cloudinary.com/fi0iuzdw/image/upload/v1794597088/file_000000000570820ea84b3a9edd8c04fe.png",
  },
  {
    id: "2",
    quote:
      "They’ve handled most of my visuals over the past three years, so I’ve had a front-row seat to their work ethic, creativity, and commitment to the craft.If you need people who care about the work as much as you do, people who will push, improvise, and find a way to bring your vision to life, I can recommend FM2 Empire without a second thought.",
    name: "MO'BELIEVE",
    role: "Event Partner, Lagos Creative Week",
    imageUrl:
      "https://res.cloudinary.com/fi0iuzdw/image/upload/v1794597084/IMG-20261111-WA0088.jpg",
  },
  {
    id: "3",
    quote:
      "The internship gave me real studio hours, not busywork. Three weeks in and I was already in love with their services.",
    name: "Etienne Steve",
    role: "Media Lead at MegaWatt",
    imageUrl:
      "https://res.cloudinary.com/fi0iuzdw/image/upload/v1794605146/IMG-20261111-WA0014.jpg",
  },
];

// ------------------------------------------------------------
// ANIMATION VARIANTS
// ------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// ------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative"
      style={{ backgroundColor: "var(--color-fm2-black)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-fm2-border), transparent)",
        }}
      />

      <div className="container-fm2 section-padding">

        {/* ---- HEADER — centered ---- */}
        <div className="flex flex-col items-center gap-6 mb-14 text-center max-w-2xl mx-auto">
          <SectionLabel text="In Their Words" align="center" />
          <AnimatedText
            text="Trusted by Artists & Partners"
            as="h2"
            animation="reveal"
            delay={0.1}
            className="font-display font-bold leading-tight"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 3rem)",
              color: "var(--color-fm2-white)",
            }}
          />
          <AnimatedText
            text="The people we've worked with say it best — talent, clients, and partners who've experienced FM2 firsthand."
            as="p"
            animation="fade"
            delay={0.2}
            className="text-base leading-relaxed"
            style={{ color: "var(--color-fm2-muted)" }}
          />
        </div>

        {/* ---- TESTIMONIAL CARDS ---- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="card-surface flex flex-col items-center text-center gap-5 hover:border-[#C9A84C]/30 transition-colors duration-300"
            >
              {/* Quote icon */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "rgba(201, 168, 76, 0.08)",
                  border: "1px solid rgba(201, 168, 76, 0.2)",
                }}
              >
                <Quote size={16} style={{ color: "var(--color-fm2-gold)" }} />
              </div>

              {/* Quote text */}
              <p
                className="font-display italic text-base leading-relaxed"
                style={{ color: "var(--color-fm2-white)", opacity: 0.9 }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Avatar + name + role */}
              <div className="flex flex-col items-center gap-3 pt-2 mt-auto">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden shrink-0"
                  style={{ border: "2px solid rgba(201, 168, 76, 0.3)" }}
                >
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <span
                    className="font-display font-bold text-sm"
                    style={{ color: "var(--color-fm2-white)" }}
                  >
                    {testimonial.name}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-fm2-gold)" }}
                  >
                    {testimonial.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}