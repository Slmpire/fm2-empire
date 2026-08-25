// ============================================================
// FM2 EMPIRE — PAYMENT VERIFY PAGE (route: /payment/verify)
// Paystack redirects here after checkout with ?ref=REFERENCE.
// We verify the payment and show the ticket confirmation.
// ============================================================

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, Ticket } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

type TicketData = {
  success:     boolean;
  ticket_code: string;
  event_title: string;
  full_name:   string;
  email:       string;
  quantity:    number;
  amount_paid: number;
  message?:    string;
};

export default function PaymentVerifyPage() {
  const searchParams  = useSearchParams();
  const reference     = searchParams.get("ref") ?? searchParams.get("reference");
  const [ticket, setTicket]     = useState<TicketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error,     setError]     = useState("");

  useEffect(() => {
    if (!reference) {
      setError("No payment reference found.");
      setIsLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const res  = await fetch("/api/paystack/verify", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ reference }),
        });
        const data = await res.json();

        if (data.success) {
          setTicket(data);
        } else {
          setError(data.message ?? "Payment could not be verified.");
        }
      } catch {
        setError("Something went wrong verifying your payment.");
      } finally {
        setIsLoading(false);
      }
    };

    verify();
  }, [reference]);

  return (
    <section
      className="relative pt-32 min-h-screen"
      style={{ backgroundColor: "var(--color-fm2-black)" }}
    >
      <div className="container-fm2 section-padding max-w-lg mx-auto">

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center gap-4 text-center py-20">
            <Loader2
              size={40}
              className="animate-spin"
              style={{ color: "var(--color-fm2-gold)" }}
            />
            <p className="text-sm" style={{ color: "var(--color-fm2-muted)" }}>
              Verifying your payment...
            </p>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="flex flex-col items-center gap-5 text-center py-12">
            <XCircle size={48} style={{ color: "var(--color-fm2-red)" }} />
            <h1
              className="font-display font-bold text-2xl"
              style={{ color: "var(--color-fm2-white)" }}
            >
              Payment Failed
            </h1>
            <p className="text-sm" style={{ color: "var(--color-fm2-muted)" }}>
              {error}
            </p>
            <Button href="/#events" variant="secondary" size="md">
              Back to Events
            </Button>
          </div>
        )}

        {/* Success */}
        {!isLoading && ticket && (
          <div className="flex flex-col items-center gap-6 text-center">
            <CheckCircle2 size={48} style={{ color: "var(--color-fm2-success)" }} />

            <div className="flex flex-col gap-2">
              <h1
                className="font-display font-bold text-2xl"
                style={{ color: "var(--color-fm2-white)" }}
              >
                You&apos;re In!
              </h1>
              <p className="text-sm" style={{ color: "var(--color-fm2-muted)" }}>
                Payment confirmed. Your ticket has been sent to{" "}
                <span style={{ color: "var(--color-fm2-gold)" }}>
                  {ticket.email}
                </span>
              </p>
            </div>

            {/* Ticket card */}
            <div
              className="w-full rounded-2xl p-6 flex flex-col gap-5"
              style={{
                backgroundColor: "var(--color-fm2-surface)",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span
                  className="font-display font-bold text-lg"
                  style={{ color: "var(--color-fm2-white)" }}
                >
                  FM2 <span style={{ color: "var(--color-fm2-gold)" }}>Empire</span>
                </span>
                <Ticket size={20} style={{ color: "var(--color-fm2-gold)" }} />
              </div>

              <div
                className="h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--color-fm2-gold), transparent)",
                }}
              />

              {/* Details */}
              <div className="flex flex-col gap-3 text-left">
                <div>
                  <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-fm2-muted)" }}>Event</p>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-fm2-white)" }}>
                    {ticket.event_title}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-fm2-muted)" }}>Name</p>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-fm2-white)" }}>
                    {ticket.full_name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-fm2-muted)" }}>Qty</p>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-fm2-white)" }}>
                      {ticket.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-fm2-muted)" }}>Paid</p>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-fm2-white)" }}>
                      ₦{ticket.amount_paid.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--color-fm2-border), transparent)",
                }}
              />

              {/* Ticket code */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-fm2-muted)" }}>
                  Ticket Code
                </p>
                <p
                  className="font-mono font-bold text-2xl tracking-widest"
                  style={{ color: "var(--color-fm2-gold)" }}
                >
                  {ticket.ticket_code}
                </p>
                <p className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>
                  Present this code at the event entrance
                </p>
              </div>
            </div>

            <Button href="/#events" variant="secondary" size="md">
              View More Events
            </Button>
          </div>
        )}

      </div>
    </section>
  );
}