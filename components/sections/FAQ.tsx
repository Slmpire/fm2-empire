// ============================================================
// FM2 EMPIRE — FAQ SECTION (homepage)
// Placed right before the final CTA — answers common
// objections/questions before asking the visitor to act.
// Accordion-style: only one item open at a time, smooth
// height animation via Framer Motion.
// ============================================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How do I apply to join FM2 as an artist?",
    answer:
      "Use the talent enrollment form, accessible from any \"Join FM2\" button on the site. You'll be asked for basic info, your creative category, a short bio, and links to your portfolio or social profiles. Our team reviews submissions on a rolling basis.",
  },
  {
    question: "Does the internship program pay?",
    answer:
      "Internship terms (paid, unpaid, or stipend-based) vary by role and are communicated clearly during the application process — never after you've started. Every intern gets real production experience and mentorship regardless of compensation structure.",
  },
  {
    question: "I'm not an artist — can FM2 still help with my project?",
    answer:
      "Yes. Many people who work with FM2 never join the talent roster at all. If you need production help, creative direction, or content for your own brand or project, submit a service request and our team will scope it with you directly.",
  },
  {
    question: "How does ticket buying work for FM2 events?",
    answer:
      "Each event has its own page with full details — date, venue, lineup, and pricing. Online checkout is currently being finalized; in the meantime, click \"Get Tickets\" on any event page and our team will help you reserve a spot directly.",
  },
  {
    question: "Can my organisation partner with FM2 for an event?",
    answer:
      "Yes — FM2 both hosts its own events and manages ticketing/production for partner organisations. Reach out through the Contact page or submit a partnership inquiry, and our events team will follow up to discuss scope.",
  },
  {
    question: "Where can I watch or listen to FM2's content?",
    answer:
      "The Media Library has our full catalog — music, podcasts, video, original series, and photo stories. Some content is free to access now; premium content with paid access is planned for a future release.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative" style={{ backgroundColor: "var(--color-fm2-dark)" }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-fm2-border), transparent)" }}
      />

      <div className="container-fm2 section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* Header column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <SectionLabel text="Questions" align="left" />
            <AnimatedText
              text="Before You Reach Out"
              as="h2"
              animation="reveal"
              delay={0.1}
              className="font-display font-bold leading-tight"
              style={{ fontSize: "clamp(1.875rem, 4vw, 2.75rem)", color: "var(--color-fm2-white)" }}
            />
            <p className="text-base leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
              Quick answers to what people usually ask. Still curious?
              Our chat assistant in the corner can help, or reach out directly.
            </p>
          </div>

          {/* Accordion column */}
          <div className="lg:col-span-3 flex flex-col">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="border-b"
                  style={{ borderColor: "var(--color-fm2-border)" }}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  >
                    <span
                      className="font-display font-bold text-base sm:text-lg"
                      style={{ color: isOpen ? "var(--color-fm2-gold)" : "var(--color-fm2-white)" }}
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: "rgba(201,168,76,0.08)",
                        border: "1px solid rgba(201,168,76,0.2)",
                      }}
                    >
                      <Plus size={14} style={{ color: "var(--color-fm2-gold)" }} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="text-sm leading-7 pb-5 pr-10"
                          style={{ color: "var(--color-fm2-muted)" }}
                        >
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}