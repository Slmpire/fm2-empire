// ============================================================
// FM2 EMPIRE — PAYSTACK VERIFY ROUTE
// Called after Paystack redirects back to our site.
// Verifies payment, updates ticket status in Supabase.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { verifyPayment } from "@/lib/paystack";
import { createAdminClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    if (!reference) {
      return NextResponse.json(
        { error: "reference is required" },
        { status: 400 }
      );
    }

    // Verify with Paystack
    const paymentData = await verifyPayment(reference);

    if (paymentData.status !== "success") {
      return NextResponse.json({
        success: false,
        status:  paymentData.status,
        message: "Payment was not successful",
      });
    }

    // Update ticket status in Supabase
    const supabase = createAdminClient();

    const { data: ticket, error: fetchError } = await supabase
      .from("tickets")
      .select("*")
      .eq("paystack_ref", reference)
      .single();

    if (fetchError || !ticket) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    // Already verified — don't double-process
    if (ticket.status === "confirmed") {
      return NextResponse.json({
        success:     true,
        ticket_code: ticket.ticket_code,
        event_title: ticket.event_title,
        full_name:   ticket.full_name,
        email:       ticket.email,
        quantity:    ticket.quantity,
        amount_paid: ticket.amount_paid,
      });
    }

    const { error: updateError } = await supabase
      .from("tickets")
      .update({ status: "confirmed" })
      .eq("paystack_ref", reference);

    if (updateError) {
      console.error("Failed to update ticket status:", updateError);
    }

    // Send confirmation email
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type:    "ticket_confirmation",
        name:    ticket.full_name,
        email:   ticket.email,
        summary: `Event: ${ticket.event_title}. Ticket Code: ${ticket.ticket_code}. Qty: ${ticket.quantity}. Amount: ₦${ticket.amount_paid.toLocaleString()}.`,
      }),
    });

    return NextResponse.json({
      success:     true,
      ticket_code: ticket.ticket_code,
      event_title: ticket.event_title,
      full_name:   ticket.full_name,
      email:       ticket.email,
      quantity:    ticket.quantity,
      amount_paid: ticket.amount_paid,
    });
  } catch (error) {
    console.error("Paystack verify error:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}