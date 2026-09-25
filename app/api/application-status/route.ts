// ============================================================
// FM2 EMPIRE — APPLICATION STATUS API ROUTE
// Public endpoint — no auth required.
// Takes an email, returns the most recent application for
// that email with its current status. Never returns internal
// notes or admin-only data.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { isValidEmail } from "@/lib/utils";

// Rate limiting — simple in-memory store
// In production on Vercel this resets per instance, which is
// fine — we just want to prevent obvious abuse.
const requestLog = new Map<string, number[]>();

function isRateLimited(email: string): boolean {
  const now      = Date.now();
  const window   = 60 * 1000; // 1 minute
  const maxReqs  = 5;

  const log = requestLog.get(email) ?? [];
  const recent = log.filter((t) => now - t < window);

  if (recent.length >= maxReqs) return true;

  recent.push(now);
  requestLog.set(email, recent);
  return false;
}

const TYPE_LABELS: Record<string, string> = {
  internship:        "Internship Application",
  talent_enrollment: "Talent Enrollment",
  service_request:   "Service Request",
  partnership:       "Partnership Inquiry",
  collaboration:     "Collaboration Request",
  sponsorship:       "Sponsorship Inquiry",
  general_inquiry:   "General Inquiry",
  contact:           "Contact Form",
};

const STATUS_MESSAGES: Record<string, { label: string; message: string; colour: string }> = {
  new: {
    label:   "Received",
    message: "We have received your application and it is in our queue for review. We review submissions on a rolling basis.",
    colour:  "#C9A84C",
  },
  reviewing: {
    label:   "Under Review",
    message: "Your application is currently being reviewed by our team. We will be in touch once a decision has been made.",
    colour:  "#3498DB",
  },
  shortlisted: {
    label:   "Shortlisted",
    message: "Congratulations — you have been shortlisted. Our team will be reaching out to you shortly with next steps.",
    colour:  "#9B59B6",
  },
  approved: {
    label:   "Approved",
    message: "Your application has been approved. Please check your email for further instructions from our team.",
    colour:  "#27AE60",
  },
  rejected: {
    label:   "Unsuccessful",
    message: "After careful review, we were unable to move forward with your application at this time. We appreciate your interest in FM2 Empire and encourage you to apply again in the future.",
    colour:  "#888880",
  },
  on_hold: {
    label:   "On Hold",
    message: "Your application has been placed on hold. This does not mean it has been rejected — our team will revisit it in due course.",
    colour:  "#E67E22",
  },
};

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const normalised = email.trim().toLowerCase();

    if (isRateLimited(normalised)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    const supabase = createAdminClient();

    // Get all applications for this email, most recent first
    const { data, error } = await supabase
      .from("applications")
      .select("id, type, status, submitted_at, updated_at")
      .eq("email", normalised)
      .order("submitted_at", { ascending: false });

    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json({
        found: false,
        message:
          "No application found for this email address. Please check you entered the same email you used when applying.",
      });
    }

    // Return all applications for this email (most recent first)
    const applications = data.map((app) => ({
      id:           app.id,
      type:         TYPE_LABELS[app.type]  ?? app.type,
      status:       app.status,
      statusInfo:   STATUS_MESSAGES[app.status] ?? {
        label:   app.status,
        message: "Your application is being processed.",
        colour:  "#888880",
      },
      submittedAt:  app.submitted_at,
      updatedAt:    app.updated_at,
    }));

    return NextResponse.json({ found: true, applications });
  } catch (error) {
    console.error("Status check error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}