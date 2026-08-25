// ============================================================
// FM2 EMPIRE — PAYSTACK HELPERS
// SERVER SIDE ONLY. Uses the secret key.
// Never import this in client components.
// ============================================================

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_BASE   = "https://api.paystack.co";

// ------------------------------------------------------------
// INITIALIZE TRANSACTION
// Returns a payment URL to redirect the user to.
// ------------------------------------------------------------

export type InitializePaymentParams = {
  email:     string;
  amount:    number;  // in kobo (₦1 = 100 kobo)
  reference: string;
  metadata?: Record<string, unknown>;
  callbackUrl: string;
};

export async function initializePayment(params: InitializePaymentParams) {
  const response = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email:        params.email,
      amount:       params.amount,
      reference:    params.reference,
      metadata:     params.metadata ?? {},
      callback_url: params.callbackUrl,
    }),
  });

  const data = await response.json();

  if (!data.status) {
    throw new Error(data.message ?? "Failed to initialize payment");
  }

  return data.data as {
    authorization_url: string;
    access_code:       string;
    reference:         string;
  };
}

// ------------------------------------------------------------
// VERIFY TRANSACTION
// Call this after Paystack redirects back to confirm payment.
// ------------------------------------------------------------

export async function verifyPayment(reference: string) {
  const response = await fetch(
    `${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
      },
    }
  );

  const data = await response.json();

  if (!data.status) {
    throw new Error(data.message ?? "Failed to verify payment");
  }

  return data.data as {
    status:    string;   // "success" | "failed" | "abandoned"
    reference: string;
    amount:    number;   // in kobo
    customer:  { email: string; first_name: string; last_name: string };
    metadata:  Record<string, unknown>;
    paid_at:   string;
  };
}

// ------------------------------------------------------------
// GENERATE TICKET CODE
// Short readable code for physical/email ticket verification.
// Format: FM2-XXXX-XXXX
// ------------------------------------------------------------

export function generateTicketCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part  = (len: number) =>
    Array.from({ length: len }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  return `FM2-${part(4)}-${part(4)}`;
}

// ------------------------------------------------------------
// KOBO CONVERSION
// ₦15,000 → 1,500,000 kobo
// ₦ → kobo: multiply by 100
// kobo → ₦: divide by 100
// ------------------------------------------------------------

export const toKobo  = (naira: number)  => naira * 100;
export const toNaira = (kobo: number)   => kobo / 100;