// ============================================================
// FM2 EMPIRE — EVENT DETAIL CONTENT (with Paystack checkout)
// Clicking "Get Tickets" opens a checkout form that collects
// buyer details, then initializes a Paystack payment.
// ============================================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowLeft, Ticket, X, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { formatDate, isValidEmail, isValidNigerianPhone } from "@/lib/utils";
import { allEvents } from "@/lib/data";
import type { Event } from "@/types/index";

export default function EventDetailContent({ event }: { event: Event }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isLoading,    setIsLoading]    = useState(false);
  const [error,        setError]        = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email:    "",
    phone:    "",
    quantity: 1,
  });

  const otherEvents = allEvents
    .filter((e) => e.slug !== event.slug)
    .slice(0, 3);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.fullName.trim()) { setError("Full name is required"); return; }
    if (!isValidEmail(form.email)) { setError("A valid email is required"); return; }
    if (form.phone && !isValidNigerianPhone(form.phone)) { setError("Enter a valid Nigerian phone number"); return; }

    setIsLoading(true);

    try {
      const res  = await fetch("/api/paystack/initialize", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          eventSlug: event.slug,
          fullName:  form.fullName,
          email:     form.email,
          phone:     form.phone,
          quantity:  form.quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error ?? "Failed to initialize payment. Please try again.");
        return;
      }

      // Redirect to Paystack hosted checkout
      window.location.href = data.paymentUrl;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width:           "100%",
    padding:         "0.75rem 1rem",
    backgroundColor: "var(--color-fm2-black)",
    border:          "1px solid var(--color-fm2-border)",
    borderRadius:    "8px",
    color:           "var(--color-fm2-white)",
    fontSize:        "0.875rem",
    outline:         "none",
    boxSizing:       "border-box" as const,
  };

  const labelStyle = {
    fontSize:    "0.75rem",
    fontWeight:  600,
    color:       "var(--color-fm2-white)",
    display:     "block",
    marginBottom: "0.375rem",
  };

  return (
    <>
      {/* ---- EVENT HERO IMAGE ---- */}
      <section className="relative pt-20">
        <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${event.imageUrl})` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.5) 60%, var(--color-fm2-black) 100%)" }}
          />
          <div className="absolute inset-0 flex flex-col justify-end">
            <div className="container-fm2 pb-10">
              <Link
                href="/#events"
                className="inline-flex items-center gap-2 text-sm mb-6 transition-colors duration-200 hover:text-[#C9A84C]"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                <ArrowLeft size={15} /> Back to Events
              </Link>

              {event.isThirdParty && (
                <span
                  className="inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-4"
                  style={{ backgroundColor: "rgba(8,8,8,0.7)", color: "var(--color-fm2-muted)" }}
                >
                  Partner Event
                </span>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-display font-bold leading-tight max-w-3xl"
                style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", color: "var(--color-fm2-white)" }}
              >
                {event.title}
              </motion.h1>
            </div>
          </div>
        </div>
      </section>

      {/* ---- EVENT DETAILS ---- */}
      <section className="relative" style={{ backgroundColor: "var(--color-fm2-black)" }}>
        <div className="container-fm2 section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

            {/* Main content */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <p className="text-base sm:text-lg leading-8" style={{ color: "var(--color-fm2-muted)" }}>
                {event.longDescription ?? event.description}
              </p>

              {event.lineup && event.lineup.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h2 className="font-display font-bold text-xl" style={{ color: "var(--color-fm2-white)" }}>
                    Lineup
                  </h2>
                  <div className="flex flex-col gap-2">
                    {event.lineup.map((act) => (
                      <div
                        key={act}
                        className="flex items-center gap-3 py-3 border-b"
                        style={{ borderColor: "var(--color-fm2-border)" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--color-fm2-gold)" }} />
                        <span className="text-sm font-medium" style={{ color: "var(--color-fm2-white)" }}>
                          {act}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky info card */}
            <div className="lg:col-span-1">
              <div className="card-surface flex flex-col gap-5 lg:sticky lg:top-28">
                <div className="flex items-start gap-3">
                  <Calendar size={18} className="shrink-0 mt-0.5" style={{ color: "var(--color-fm2-gold)" }} />
                  <div className="flex flex-col">
                    <span className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>Date</span>
                    <span className="text-sm font-medium" style={{ color: "var(--color-fm2-white)" }}>
                      {formatDate(event.date)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={18} className="shrink-0 mt-0.5" style={{ color: "var(--color-fm2-gold)" }} />
                  <div className="flex flex-col">
                    <span className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>Time</span>
                    <span className="text-sm font-medium" style={{ color: "var(--color-fm2-white)" }}>
                      {event.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={18} className="shrink-0 mt-0.5" style={{ color: "var(--color-fm2-gold)" }} />
                  <div className="flex flex-col">
                    <span className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>Venue</span>
                    <span className="text-sm font-medium" style={{ color: "var(--color-fm2-white)" }}>
                      {event.venue}
                    </span>
                    {event.address && (
                      <span className="text-xs mt-0.5" style={{ color: "var(--color-fm2-muted)" }}>
                        {event.address}, {event.city}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className="flex items-center justify-between pt-4 border-t"
                  style={{ borderColor: "var(--color-fm2-border)" }}
                >
                  <span className="text-sm" style={{ color: "var(--color-fm2-muted)" }}>Price</span>
                  <span className="font-display font-bold text-xl" style={{ color: "var(--color-fm2-white)" }}>
                    {event.ticketPrice === 0
                      ? "Free"
                      : `₦${event.ticketPrice.toLocaleString()}`}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<Ticket size={16} />}
                  onClick={() => setShowCheckout(true)}
                  className="justify-center"
                >
                  {event.ticketPrice === 0 ? "Reserve a Spot" : "Get Tickets"}
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---- MORE EVENTS ---- */}
      {otherEvents.length > 0 && (
        <section className="relative" style={{ backgroundColor: "var(--color-fm2-dark)" }}>
          <div className="container-fm2 section-padding">
            <h2 className="font-display font-bold mb-10" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-fm2-white)" }}>
              More Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {otherEvents.map((other) => (
                <Link
                  key={other.id}
                  href={`/events/${other.slug}`}
                  className="card-surface overflow-hidden group hover:border-[#C9A84C]/40 transition-colors duration-300 !p-0"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${other.imageUrl})` }}
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <span className="text-xs font-medium" style={{ color: "var(--color-fm2-gold)" }}>
                      {formatDate(other.date)}
                    </span>
                    <h3 className="font-display font-bold text-base leading-snug" style={{ color: "var(--color-fm2-white)" }}>
                      {other.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- CHECKOUT MODAL ---- */}
      <AnimatePresence>
        {showCheckout && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(8,8,8,0.9)" }}
            onClick={() => !isLoading && setShowCheckout(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25 }}
              className="card-surface w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between pb-5 mb-5 border-b"
                style={{ borderColor: "var(--color-fm2-border)" }}
              >
                <div>
                  <h3
                    className="font-display font-bold text-lg"
                    style={{ color: "var(--color-fm2-white)" }}
                  >
                    Get Tickets
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-fm2-gold)" }}>
                    {event.title}
                  </p>
                </div>
                <button
                  onClick={() => !isLoading && setShowCheckout(false)}
                  style={{ color: "var(--color-fm2-muted)", background: "none", border: "none", cursor: "pointer" }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCheckout} style={{ display: "flex", flexDirection: "column", gap: "1.125rem" }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                    placeholder="Your full name"
                    required
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    placeholder="Ticket will be sent here"
                    required
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="08012345678 (optional)"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Number of Tickets</label>
                  <select
                    value={form.quantity}
                    onChange={(e) => setForm((p) => ({ ...p, quantity: Number(e.target.value) }))}
                    style={inputStyle}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? "ticket" : "tickets"}</option>
                    ))}
                  </select>
                </div>

                {/* Order summary */}
                <div
                  className="rounded-lg p-4 flex items-center justify-between"
                  style={{ backgroundColor: "var(--color-fm2-black)", border: "1px solid var(--color-fm2-border)" }}
                >
                  <span className="text-sm" style={{ color: "var(--color-fm2-muted)" }}>
                    {form.quantity} × ₦{event.ticketPrice.toLocaleString()}
                  </span>
                  <span className="font-display font-bold text-lg" style={{ color: "var(--color-fm2-gold)" }}>
                    ₦{(event.ticketPrice * form.quantity).toLocaleString()}
                  </span>
                </div>

                {error && (
                  <p className="text-xs" style={{ color: "var(--color-fm2-red)" }}>{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    padding:         "0.875rem",
                    backgroundColor: isLoading ? "#888880" : "var(--color-fm2-gold)",
                    color:           "var(--color-fm2-black)",
                    border:          "none",
                    borderRadius:    "8px",
                    fontSize:        "0.875rem",
                    fontWeight:      700,
                    cursor:          isLoading ? "not-allowed" : "pointer",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    gap:             "8px",
                  }}
                >
                  {isLoading && <Loader2 size={16} className="animate-spin" />}
                  {isLoading ? "Redirecting to Paystack..." : "Pay Now"}
                </button>

                <p className="text-xs text-center" style={{ color: "var(--color-fm2-muted)" }}>
                  Secured by Paystack. Your card details are never stored on our servers.
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}