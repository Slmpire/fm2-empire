// ============================================================
// FM2 EMPIRE — UPDATE APPLICATION STATUS API ROUTE
// Now also sends status change emails to applicants when
// their application moves to: reviewing, shortlisted,
// approved, or rejected.
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { updateApplicationStatus, getApplication } from "@/lib/admin";
import { Resend } from "resend";
import {
  reviewingEmail,
  shortlistedEmail,
  approvedEmail,
  rejectedEmail,
} from "@/lib/emails";

const resend  = new Resend(process.env.RESEND_API_KEY);
const FROM    = process.env.RESEND_FROM_EMAIL ?? "FM2 Empire <onboarding@resend.dev>";

const VALID_STATUSES = [
  "new",
  "reviewing",
  "shortlisted",
  "approved",
  "rejected",
  "on_hold",
];

// Which statuses trigger an email to the applicant
const EMAIL_STATUSES = ["reviewing", "shortlisted", "approved", "rejected"];

const STATUS_SUBJECTS: Record<string, string> = {
  reviewing:   "Your FM2 Application is Under Review",
  shortlisted: "You've Been Shortlisted — FM2 Empire",
  approved:    "Congratulations — Your FM2 Application is Approved",
  rejected:    "FM2 Empire — Application Update",
};

export async function POST(request: NextRequest) {
  try {
    // Verify authenticated session
    const cookieStore = await cookies();
    const supabase    = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() {},
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "id and status are required" },
        { status: 400 }
      );
    }

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    // Update the status in Supabase
    await updateApplicationStatus(id, status);

    // Send email to applicant if this status warrants it
    if (EMAIL_STATUSES.includes(status)) {
      const application = await getApplication(id);

      if (application) {
        // Pick the right email template
        const html = (() => {
          switch (status) {
            case "reviewing":   return reviewingEmail(application.full_name);
            case "shortlisted": return shortlistedEmail(application.full_name, application.type);
            case "approved":    return approvedEmail(application.full_name, application.type);
            case "rejected":    return rejectedEmail(application.full_name, application.type);
            default:            return null;
          }
        })();

        if (html) {
          const { error: emailError } = await resend.emails.send({
            from:    FROM,
            to:      application.email,
            subject: STATUS_SUBJECTS[status] ?? "FM2 Empire — Application Update",
            html,
          });

          if (emailError) {
            // Log but don't fail the status update
            console.error("Status email error:", emailError);
          }
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update status error:", error);
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    );
  }
}