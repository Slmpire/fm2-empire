// ============================================================
// FM2 EMPIRE — APPLICATION STATUS CONTENT
// Clean self-service portal. Applicant enters their email,
// sees all their applications and current pipeline stage.
// No login, no account needed — just the email they used.
// ============================================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, CheckCircle2, Clock, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";
import { isValidEmail, formatDate } from "@/lib/utils";

type StatusInfo = {
  label:   string;
  message: string;
  colour:  string;
};

type ApplicationStatus = {
  id:          string;
  type:        string;
  status:      string;
  statusInfo:  StatusInfo;
  submittedAt: string;
  updatedAt:   string;
};

type Result =
  | { found: false; message: string }
  | { found: true; applications: ApplicationStatus[] };

const STATUS_ICONS: Record<string, React.ElementType> = {
  new:         Clock,
  reviewing:   Clock,
  shortlisted: CheckCircle2,
  approved:    CheckCircle2,
  rejected:    AlertCircle,
  on_hold:     Clock,
};

export default function StatusContent() {
  const [email,       setEmail]       = useState("");
  const [isLoading,   setIsLoading]   = useState(false);
  const [error,       setError]       = useState("");
  const [result,      setResult]      = useState<Result | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const res  = await fetch("/api/application-status", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Page header */}
      <section
        className="relative pt-32 pb-12"
        style={{ backgroundColor: "var(--color-fm2-black)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="container-fm2 relative z-10 flex flex-col items-center text-center gap-5 max-w-xl mx-auto">
          <SectionLabel text="Application Status" align="center" />
          <AnimatedText
            text="Check Your Status"
            as="h1"
            animation="reveal"
            className="font-display font-bold leading-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "var(--color-fm2-white)",
            }}
          />
          <p className="text-base leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
            Enter the email address you used when applying to FM2 Empire.
            We'll show you the current status of all your applications.
          </p>
        </div>
      </section>

      {/* Search form */}
      <section
        className="relative"
        style={{ backgroundColor: "var(--color-fm2-dark)" }}
      >
        <div className="container-fm2 py-12">
          <form
            onSubmit={handleCheck}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "var(--color-fm2-muted)" }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-lg text-sm focus:outline-none"
                style={{
                  backgroundColor: "var(--color-fm2-black)",
                  border:          "1px solid var(--color-fm2-border)",
                  color:           "var(--color-fm2-white)",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold transition-all duration-200 shrink-0"
              style={{
                backgroundColor: isLoading ? "#888880" : "var(--color-fm2-gold)",
                color:           "var(--color-fm2-black)",
                border:          "none",
                cursor:          isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading
                ? <Loader2 size={16} className="animate-spin" />
                : <><Search size={16} /> Check Status</>
              }
            </button>
          </form>

          {error && (
            <p
              className="text-sm text-center mt-4 max-w-lg mx-auto"
              style={{ color: "var(--color-fm2-red)" }}
            >
              {error}
            </p>
          )}
        </div>
      </section>

      {/* Results */}
      <section
        className="relative"
        style={{ backgroundColor: "var(--color-fm2-black)", minHeight: "300px" }}
      >
        <div className="container-fm2 py-12">
          <AnimatePresence mode="wait">

            {/* Not found */}
            {result && !result.found && (
              <motion.div
                key="not-found"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center gap-5 max-w-md mx-auto py-10"
              >
                <AlertCircle size={40} style={{ color: "var(--color-fm2-muted)" }} />
                <div className="flex flex-col gap-2">
                  <h3
                    className="font-display font-bold text-lg"
                    style={{ color: "var(--color-fm2-white)" }}
                  >
                    No Application Found
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
                    {result.message}
                  </p>
                </div>
                <Button href="/apply" variant="primary" size="md">
                  Apply Now
                </Button>
              </motion.div>
            )}

            {/* Found */}
            {result && result.found && (
              <motion.div
                key="found"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5 max-w-2xl mx-auto"
              >
                <p className="text-sm" style={{ color: "var(--color-fm2-muted)" }}>
                  Found {result.applications.length} application{result.applications.length !== 1 ? "s" : ""} for{" "}
                  <span style={{ color: "var(--color-fm2-gold)" }}>{email}</span>
                </p>

                {result.applications.map((app) => {
                  const StatusIcon = STATUS_ICONS[app.status] ?? Clock;

                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card-surface flex flex-col gap-5"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex flex-col gap-1">
                          <h3
                            className="font-display font-bold text-lg"
                            style={{ color: "var(--color-fm2-white)" }}
                          >
                            {app.type}
                          </h3>
                          <p
                            className="text-xs"
                            style={{ color: "var(--color-fm2-muted)" }}
                          >
                            Submitted {formatDate(app.submittedAt)}
                          </p>
                        </div>

                        {/* Status badge */}
                        <span
                          className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full capitalize shrink-0"
                          style={{
                            backgroundColor: `${app.statusInfo.colour}18`,
                            color:           app.statusInfo.colour,
                            border:          `1px solid ${app.statusInfo.colour}35`,
                          }}
                        >
                          <StatusIcon size={12} />
                          {app.statusInfo.label}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div>
                        <div
                          className="w-full rounded-full overflow-hidden"
                          style={{ height: "4px", backgroundColor: "var(--color-fm2-border)" }}
                        >
                          {(() => {
                            const stages      = ["new", "reviewing", "shortlisted", "approved"];
                            const stageIndex  = stages.indexOf(app.status);
                            const percentage  = app.status === "rejected" || app.status === "on_hold"
                              ? 100
                              : stageIndex === -1
                                ? 10
                                : ((stageIndex + 1) / stages.length) * 100;

                            return (
                              <div
                                className="h-full rounded-full transition-all duration-700"
                                style={{
                                  width:           `${percentage}%`,
                                  backgroundColor: app.status === "rejected"
                                    ? "var(--color-fm2-muted)"
                                    : app.statusInfo.colour,
                                }}
                              />
                            );
                          })()}
                        </div>

                        {/* Stage labels */}
                        <div
                          className="flex justify-between mt-1.5"
                          style={{ color: "var(--color-fm2-muted)", fontSize: "0.65rem" }}
                        >
                          {["Received", "Reviewing", "Shortlisted", "Decision"].map((stage) => (
                            <span key={stage}>{stage}</span>
                          ))}
                        </div>
                      </div>

                      {/* Status message */}
                      <div
                        className="rounded-lg p-4"
                        style={{
                          backgroundColor: `${app.statusInfo.colour}08`,
                          border:          `1px solid ${app.statusInfo.colour}20`,
                        }}
                      >
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--color-fm2-white)", opacity: 0.9 }}
                        >
                          {app.statusInfo.message}
                        </p>
                      </div>

                      {/* Last updated */}
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-fm2-muted)" }}
                      >
                        Last updated {formatDate(app.updatedAt)}
                      </p>
                    </motion.div>
                  );
                })}

                {/* Questions CTA */}
                <div
                  className="card-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--color-fm2-white)" }}
                    >
                      Have questions about your application?
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--color-fm2-muted)" }}
                    >
                      Our team responds within 1–2 business days.
                    </span>
                  </div>
                  <Button
                    href="/contact"
                    variant="secondary"
                    size="sm"
                    rightIcon={<ArrowRight size={14} />}
                    className="shrink-0"
                  >
                    Contact Us
                  </Button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>
    </>
  );
}