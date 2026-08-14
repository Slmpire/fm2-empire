// ============================================================
// FM2 EMPIRE — CONTACT PAGE CONTENT
// Front-end only for now. The form shows a success state on
// submit but doesn't persist data yet — Supabase wiring for
// this resumes when we return to the backend phase.
// ============================================================

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Camera, Send, CheckCircle2 } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/utils";

export default function ContactContent() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!isValidEmail(form.email)) newErrors.email = "A valid email is required";
    if (!form.message.trim()) newErrors.message = "Message can't be empty";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { error } = await supabase.from("applications").insert({
        type: "general_inquiry",
        status: "new",
        full_name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      if (error) throw error;
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: form.name,
          email: form.email,
          summary: `Subject: ${form.subject || "No subject"}. Message: ${form.message.slice(0, 200)}...`,
        }),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Contact form error:", err);
      setErrors({ name: "Something went wrong. Please try again." });
    }
  };
  const contactDetails = [
    { icon: Mail, label: "Email", value: "hello@fm2empire.com", href: "mailto:hello@fm2empire.com" },
    { icon: Phone, label: "WhatsApp", value: "+234 XXX XXX XXXX", href: "https://wa.me/234XXXXXXXXX" },
    { icon: MapPin, label: "Location", value: "Lagos, Nigeria", href: undefined },
  ];

  return (
    <>
      <section className="relative pt-32 pb-16" style={{ backgroundColor: "var(--color-fm2-black)" }}>
        <div className="container-fm2 flex flex-col items-center text-center gap-5">
          <SectionLabel text="Get In Touch" align="center" />
          <AnimatedText
            text="Let's Start a Conversation"
            as="h1"
            animation="reveal"
            className="font-display font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--color-fm2-white)" }}
          />
          <p className="max-w-lg text-base leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
            Questions, partnerships, service requests, or just curious about
            FM2? Reach out — our team responds within 1–2 business days.
          </p>
        </div>
      </section>

      <section className="relative" style={{ backgroundColor: "var(--color-fm2-dark)" }}>
        <div className="container-fm2 section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

            {/* Contact info column */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                const content = (
                  <div className="card-surface flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}
                    >
                      <Icon size={18} style={{ color: "var(--color-fm2-gold)" }} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>{detail.label}</span>
                      <span className="text-sm font-medium" style={{ color: "var(--color-fm2-white)" }}>{detail.value}</span>
                    </div>
                  </div>
                );
                return detail.href ? (
                  <a key={detail.label} href={detail.href} target="_blank" rel="noopener noreferrer">{content}</a>
                ) : (
                  <div key={detail.label}>{content}</div>
                );
              })}

              
              <a
                href="https://instagram.com/fm2empire"
                target="_blank"
                rel="noopener noreferrer"
                className="card-surface flex items-center gap-4 hover:border-[#C9A84C]/30 transition-colors duration-300"
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  <Camera size={18} style={{ color: "var(--color-fm2-gold)" }} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>Instagram</span>
                  <span className="text-sm font-medium" style={{ color: "var(--color-fm2-white)" }}>@fm2empire</span>
                </div>
              </a>
            </div>

            {/* Form column */}
            <div className="lg:col-span-3">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-surface flex flex-col items-center text-center gap-4 py-14"
                >
                  <CheckCircle2 size={40} style={{ color: "var(--color-fm2-gold)" }} />
                  <h3 className="font-display font-bold text-xl" style={{ color: "var(--color-fm2-white)" }}>
                    Message Sent
                  </h3>
                  <p className="text-sm max-w-sm" style={{ color: "var(--color-fm2-muted)" }}>
                    Thanks for reaching out — our team will get back to you within 1–2 business days.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="card-surface flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium" style={{ color: "var(--color-fm2-muted)" }}>Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="px-4 py-3 rounded-md text-sm focus:outline-none"
                      style={{
                        backgroundColor: "var(--color-fm2-black)",
                        border: `1px solid ${errors.name ? "var(--color-fm2-red)" : "var(--color-fm2-border)"}`,
                        color: "var(--color-fm2-white)",
                      }}
                      placeholder="Your name"
                    />
                    {errors.name && <span className="text-xs" style={{ color: "var(--color-fm2-red)" }}>{errors.name}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium" style={{ color: "var(--color-fm2-muted)" }}>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="px-4 py-3 rounded-md text-sm focus:outline-none"
                      style={{
                        backgroundColor: "var(--color-fm2-black)",
                        border: `1px solid ${errors.email ? "var(--color-fm2-red)" : "var(--color-fm2-border)"}`,
                        color: "var(--color-fm2-white)",
                      }}
                      placeholder="you@example.com"
                    />
                    {errors.email && <span className="text-xs" style={{ color: "var(--color-fm2-red)" }}>{errors.email}</span>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium" style={{ color: "var(--color-fm2-muted)" }}>Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      className="px-4 py-3 rounded-md text-sm focus:outline-none"
                      style={{ backgroundColor: "var(--color-fm2-black)", border: "1px solid var(--color-fm2-border)", color: "var(--color-fm2-white)" }}
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium" style={{ color: "var(--color-fm2-muted)" }}>Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={5}
                      className="px-4 py-3 rounded-md text-sm focus:outline-none resize-none"
                      style={{
                        backgroundColor: "var(--color-fm2-black)",
                        border: `1px solid ${errors.message ? "var(--color-fm2-red)" : "var(--color-fm2-border)"}`,
                        color: "var(--color-fm2-white)",
                      }}
                      placeholder="Tell us what you need..."
                    />
                    {errors.message && <span className="text-xs" style={{ color: "var(--color-fm2-red)" }}>{errors.message}</span>}
                  </div>

                  <Button type="submit" variant="primary" size="md" rightIcon={<Send size={15} />}>
                    Send Message
                  </Button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}