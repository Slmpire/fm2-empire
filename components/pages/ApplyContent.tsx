// ============================================================
// FM2 EMPIRE — APPLY PAGE CONTENT
// Category selector at the top — four clear paths.
// Clicking a category slides the matching form into view
// below without navigating away. URL hash updates so the
// correct form loads if someone shares a direct link.
// ============================================================

"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic2, Users, Palette, Handshake } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";
import InternshipForm from "@/components/forms/InternshipForm";
import TalentForm from "@/components/forms/TalentForm";
import ServiceForm from "@/components/forms/ServiceForm";
import PartnershipForm from "@/components/forms/PartnershipForm";

// ------------------------------------------------------------
// CATEGORIES
// ------------------------------------------------------------

type Category = "talent" | "internship" | "service" | "partnership";

const categories: {
  id: Category;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  audience: string;
}[] = [
  {
    id: "talent",
    icon: Mic2,
    title: "Talent Enrollment",
    subtitle: "Join the FM2 Roster",
    audience: "Artists, Musicians, Performers",
  },
  {
    id: "internship",
    icon: Users,
    title: "Internship Application",
    subtitle: "Learn Inside FM2",
    audience: "Students, Young Professionals",
  },
  {
    id: "service",
    icon: Palette,
    title: "Request a Service",
    subtitle: "Work With FM2",
    audience: "Independent Clients, Brands",
  },
  {
    id: "partnership",
    icon: Handshake,
    title: "Partnership Inquiry",
    subtitle: "Build With FM2",
    audience: "Organisations, Brands, Institutions",
  },
];

// ------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------

export default function ApplyContent() {
  const [selected, setSelected] = useState<Category | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Read hash from URL on mount so shared links load the right form
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as Category;
    if (["talent", "internship", "service", "partnership"].includes(hash)) {
      setSelected(hash);
    }
  }, []);

  // Update URL hash and scroll to form when category changes
  const handleSelect = (id: Category) => {
    setSelected(id);
    window.history.replaceState(null, "", `#${id}`);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      {/* ---- PAGE HEADER ---- */}
      <section
        className="relative pt-32 pb-16"
        style={{ backgroundColor: "var(--color-fm2-black)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="container-fm2 relative z-10 flex flex-col items-center text-center gap-5 max-w-2xl mx-auto">
          <SectionLabel text="Get Involved" align="center" />
          <AnimatedText
            text="Choose Your Path Into FM2"
            as="h1"
            animation="reveal"
            className="font-display font-bold leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--color-fm2-white)",
            }}
          />
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--color-fm2-muted)" }}
          >
            Whether you're an artist, a student, a brand, or an organisation —
            there's a place for you in the FM2 ecosystem. Select your category
            below to get started.
          </p>
        </div>
      </section>

      {/* ---- CATEGORY SELECTOR ---- */}
      <section
        className="relative border-b"
        style={{
          backgroundColor: "var(--color-fm2-dark)",
          borderColor: "var(--color-fm2-border)",
        }}
      >
        <div className="container-fm2 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selected === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelect(cat.id)}
                  className="flex flex-col items-start gap-3 p-5 rounded-xl text-left transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: isActive
                      ? "rgba(201,168,76,0.08)"
                      : "var(--color-fm2-surface)",
                    border: isActive
                      ? "1px solid rgba(201,168,76,0.5)"
                      : "1px solid var(--color-fm2-border)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: isActive
                        ? "rgba(201,168,76,0.15)"
                        : "rgba(201,168,76,0.06)",
                      border: "1px solid rgba(201,168,76,0.2)",
                    }}
                  >
                    <Icon
                      size={18}
                      style={{ color: "var(--color-fm2-gold)" }}
                    />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span
                      className="font-display font-bold text-sm"
                      style={{ color: "var(--color-fm2-white)" }}
                    >
                      {cat.title}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-fm2-gold)" }}
                    >
                      {cat.subtitle}
                    </span>
                    <span
                      className="text-xs mt-1"
                      style={{ color: "var(--color-fm2-muted)" }}
                    >
                      {cat.audience}
                    </span>
                  </div>

                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: "var(--color-fm2-gold)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- FORM AREA ---- */}
      <div
        ref={formRef}
        style={{ backgroundColor: "var(--color-fm2-black)" }}
      >
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="container-fm2 py-14">
                {selected === "talent" && <TalentForm />}
                {selected === "internship" && <InternshipForm />}
                {selected === "service" && <ServiceForm />}
                {selected === "partnership" && <PartnershipForm />}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="container-fm2 py-20 flex flex-col items-center text-center gap-3"
            >
              <p
                className="text-sm"
                style={{ color: "var(--color-fm2-muted)" }}
              >
                Select a category above to load the application form.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}