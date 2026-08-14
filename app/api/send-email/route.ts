// ============================================================
// FM2 EMPIRE — EMAIL API ROUTE
// Server-side only. Called by all form submit handlers after
// a successful Supabase insert. Sends two emails:
// 1. Confirmation to the applicant
// 2. Internal alert to the FM2 team
//
// The Resend API key never leaves the server.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  internshipConfirmationEmail,
  talentConfirmationEmail,
  serviceConfirmationEmail,
  partnershipConfirmationEmail,
  contactConfirmationEmail,
  internalAlertEmail,
} from "@/lib/emails";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM    = process.env.RESEND_FROM_EMAIL  ?? "FM2 Empire <onboarding@resend.dev>";
const TO_TEAM = process.env.RESEND_TEAM_EMAIL  ?? "hello@fm2empire.com";

type EmailRequest = {
  type: string;
  name: string;
  email: string;
  summary?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequest = await request.json();
    const { type, name, email, summary = "" } = body;

    if (!type || !name || !email) {
      return NextResponse.json(
        { error: "type, name and email are required" },
        { status: 400 }
      );
    }

    // Pick the right confirmation template
    const confirmationHtml = (() => {
      switch (type) {
        case "internship":       return internshipConfirmationEmail(name);
        case "talent_enrollment": return talentConfirmationEmail(name);
        case "service_request":  return serviceConfirmationEmail(name);
        case "contact":          return contactConfirmationEmail(name);
        default:                 return partnershipConfirmationEmail(name, type);
      }
    })();

    // Subject lines per type
    const subjectLines: Record<string, string> = {
      internship:        "We received your internship application — FM2 Empire",
      talent_enrollment: "We received your talent enrollment — FM2 Empire",
      service_request:   "We received your service request — FM2 Empire",
      partnership:       "We received your partnership inquiry — FM2 Empire",
      collaboration:     "We received your collaboration request — FM2 Empire",
      sponsorship:       "We received your sponsorship inquiry — FM2 Empire",
      general_inquiry:   "We received your message — FM2 Empire",
      contact:           "We received your message — FM2 Empire",
    };

    // Send both emails in parallel
    const [confirmationResult, alertResult] = await Promise.all([
      // 1. Confirmation to applicant
      resend.emails.send({
        from:    FROM,
        to:      email,
        subject: subjectLines[type] ?? "We received your message — FM2 Empire",
        html:    confirmationHtml,
      }),
      // 2. Internal alert to FM2 team
      resend.emails.send({
        from:    FROM,
        to:      TO_TEAM,
        subject: `[FM2] New ${type.replace(/_/g, " ")} from ${name}`,
        html:    internalAlertEmail(type, name, email, summary),
      }),
    ]);

    if (confirmationResult.error || alertResult.error) {
      console.error("Resend errors:", confirmationResult.error, alertResult.error);
      // Don't fail the whole request over email — the form data is already saved
      return NextResponse.json({
        success: true,
        warning: "Form saved but one or more emails failed to send.",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email route error:", error);
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    );
  }
}