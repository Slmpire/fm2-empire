// ============================================================
// FM2 EMPIRE — BOOKING CONTENT
// Cal.com embed with two event type tabs.
// Username pulled from env — swap NEXT_PUBLIC_CALCOM_USERNAME
// in .env to change which Cal.com account is used.
// ============================================================

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";
import { cn } from "@/lib/utils";

const CAL_USERNAME = process.env.NEXT_PUBLIC_CALCOM_USERNAME ?? "fm2empire";

const EVENT_TYPES = [
  {
    id:          "discovery-call",
    label:       "Discovery Call",
    duration:    "30 min",
    description: "A quick call to learn about FM2 and explore how we can work together. Perfect for first-time inquiries.",
    icon:        Video,
  },
  {
    id:          "project-consultation",
    label:       "Project Consultation",
    duration:    "60 min",
    description: "An in-depth session to discuss your project, service request, or partnership in detail.",
    icon:        Calendar,
  },
];

export default function BookingContent() {
  const [activeEvent, setActiveEvent] = useState(EVENT_TYPES[0].id);
  const [isLoading,   setIsLoading]   = useState(true);

  const calUrl = `https://cal.com/${CAL_USERNAME}/${activeEvent}`;

  return (
    <>
      {/* Page header */}
      <section
        className="relative pt-32 pb-10"
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
          <SectionLabel text="Schedule a Call" align="center" />
          <AnimatedText
            text="Let's Talk"
            as="h1"
            animation="reveal"
            className="font-display font-bold leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--color-fm2-white)",
            }}
          />
          <p className="text-base leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
            Pick a time that works for you. All calls are held via Google Meet
            — a link will be sent to your email automatically.
          </p>
        </div>
      </section>

      {/* Event type selector */}
      <section
        className="border-b"
        style={{
          backgroundColor: "var(--color-fm2-dark)",
          borderColor: "var(--color-fm2-border)",
        }}
      >
        <div className="container-fm2 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {EVENT_TYPES.map((event) => {
              const Icon    = event.icon;
              const isActive = activeEvent === event.id;

              return (
                <button
                  key={event.id}
                  onClick={() => {
                    if (activeEvent !== event.id) {
                      setIsLoading(true);
                      setActiveEvent(event.id);
                    }
                  }}
                  className={cn(
                    "flex flex-col items-start gap-3 p-5 rounded-xl text-left transition-all duration-200"
                  )}
                  style={{
                    backgroundColor: isActive
                      ? "rgba(201,168,76,0.08)"
                      : "var(--color-fm2-surface)",
                    border: isActive
                      ? "1px solid rgba(201,168,76,0.4)"
                      : "1px solid var(--color-fm2-border)",
                  }}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(201,168,76,0.15)"
                          : "rgba(201,168,76,0.06)",
                        border: "1px solid rgba(201,168,76,0.2)",
                      }}
                    >
                      <Icon size={16} style={{ color: "var(--color-fm2-gold)" }} />
                    </div>
                    <div className="flex flex-col gap-0">
                      <span
                        className="font-display font-bold text-sm"
                        style={{ color: "var(--color-fm2-white)" }}
                      >
                        {event.label}
                      </span>
                      <span
                        className="flex items-center gap-1 text-xs"
                        style={{ color: "var(--color-fm2-gold)" }}
                      >
                        <Clock size={11} /> {event.duration}
                      </span>
                    </div>
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--color-fm2-muted)" }}
                  >
                    {event.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cal.com embed */}
      <section
        className="relative"
        style={{ backgroundColor: "var(--color-fm2-black)", minHeight: "700px" }}
      >
        <div className="container-fm2 py-8">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: "1px solid var(--color-fm2-border)",
              minHeight: "650px",
            }}
          >
            {/* Loading state */}
            {isLoading && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10"
                style={{ backgroundColor: "var(--color-fm2-surface)" }}
              >
                <div
                  className="w-10 h-10 rounded-full border-2 animate-spin"
                  style={{
                    borderColor: "var(--color-fm2-border)",
                    borderTopColor: "var(--color-fm2-gold)",
                  }}
                />
                <p className="text-sm" style={{ color: "var(--color-fm2-muted)" }}>
                  Loading calendar...
                </p>
              </div>
            )}

            {/* Cal.com iframe embed */}
            <iframe
              key={activeEvent}
              src={`${calUrl}?embed=true&layout=month_view`}
              width="100%"
              height="650"
              frameBorder="0"
              style={{
                display:         "block",
                backgroundColor: "var(--color-fm2-surface)",
                colorScheme:     "dark",
              }}
              onLoad={() => setIsLoading(false)}
              title={`Book a ${EVENT_TYPES.find((e) => e.id === activeEvent)?.label}`}
            />
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section
        className="relative border-t"
        style={{
          backgroundColor: "var(--color-fm2-dark)",
          borderColor: "var(--color-fm2-border)",
        }}
      >
        <div className="container-fm2 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            {[
              {
                icon:  "📅",
                title: "Pick Your Time",
                desc:  "Choose any available slot that works for your schedule.",
              },
              {
                icon:  "✉️",
                title: "Get Confirmation",
                desc:  "A calendar invite and Google Meet link lands in your inbox immediately.",
              },
              {
                icon:  "🎙",
                title: "Show Up Ready",
                desc:  "Come with your questions, ideas, or project brief and we'll take it from there.",
              },
            ].map((step) => (
              <motion.div
                key={step.title}
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span style={{ fontSize: "1.75rem" }}>{step.icon}</span>
                <h3
                  className="font-display font-bold text-base"
                  style={{ color: "var(--color-fm2-white)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-fm2-muted)" }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}