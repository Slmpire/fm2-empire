// ============================================================
// FM2 EMPIRE — PAYSTACK INITIALIZE ROUTE
// Frontend calls this with event + buyer details.
// Returns a Paystack payment URL to redirect to.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { initializePayment, toKobo, generateTicketCode } from "@/lib/paystack";
import { createAdminClient } from "@/lib/supabase";
import { allEvents } from "@/lib/data";

export async function POST(request: NextRequest) {
  try {
    const {
      eventSlug,
      fullName,
      email,
      phone,
      quantity = 1,
    } = await request.json();

    // Validate
    if (!eventSlug || !fullName || !email) {
      return NextResponse.json(
        { error: "eventSlug, fullName, and email are required" },
        { status: 400 }
      );
    }

    // Find the event
    const event = allEvents.find((e) => e.slug === eventSlug);
    if (!event) {
      return NextResponse.json(
        { error: "Event not found" },
        { status: 404 }
      );
    }

    if (event.ticketPrice === 0) {
      return NextResponse.json(
        { error: "This is a free event — no payment needed" },
        { status: 400 }
      );
    }

    const totalAmount  = event.ticketPrice * quantity;
    const reference    = `FM2-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const ticketCode   = generateTicketCode();
    const callbackUrl  = `${process.env.NEXT_PUBLIC_SITE_URL}/payment/verify?ref=${reference}`;

    // Create a pending ticket record in Supabase
    const supabase = createAdminClient();
    const { error: dbError } = await supabase.from("tickets").insert({
      event_slug:   eventSlug,
      event_title:  event.title,
      full_name:    fullName,
      email,
      phone:        phone ?? null,
      quantity,
      amount_paid:  totalAmount,
      paystack_ref: reference,
      ticket_code:  ticketCode,
      status:       "pending",
    });

    if (dbError) {
      console.error("DB error creating ticket:", dbError);
      return NextResponse.json(
        { error: "Failed to create ticket record" },
        { status: 500 }
      );
    }

    // Initialize with Paystack
    const payment = await initializePayment({
      email,
      amount:      toKobo(totalAmount),
      reference,
      callbackUrl,
      metadata: {
        full_name:   fullName,
        phone:       phone ?? "",
        event_slug:  eventSlug,
        event_title: event.title,
        quantity,
        ticket_code: ticketCode,
      },
    });

    return NextResponse.json({
      success:      true,
      paymentUrl:   payment.authorization_url,
      reference,
    });
  } catch (error) {
    console.error("Paystack initialize error:", error);
    return NextResponse.json(
      { error: "Failed to initialize payment" },
      { status: 500 }
    );
  }
}