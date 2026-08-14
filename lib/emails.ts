// ============================================================
// FM2 EMPIRE — EMAIL TEMPLATES
// All email content lives here. Plain HTML strings — simple,
// reliable, renders correctly in every email client.
// Resend handles delivery; these functions return the HTML.
// ============================================================

// ------------------------------------------------------------
// SHARED STYLES
// Inline CSS only — email clients strip <style> tags.
// ------------------------------------------------------------

const colors = {
  black:   "#080808",
  dark:    "#111111",
  surface: "#1A1A1A",
  border:  "#2A2A2A",
  gold:    "#C9A84C",
  white:   "#F5F5F0",
  muted:   "#888880",
};

function baseTemplate(content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>FM2 Empire</title>
    </head>
    <body style="margin:0;padding:0;background-color:${colors.black};font-family:Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.black};padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

              <!-- HEADER -->
              <tr>
                <td style="padding:32px 40px;background-color:${colors.dark};border-bottom:2px solid ${colors.gold};border-radius:8px 8px 0 0;">
                  <p style="margin:0;font-size:24px;font-weight:700;color:${colors.white};font-family:Georgia,serif;">
                    FM2 <span style="color:${colors.gold};">Empire</span>
                  </p>
                </td>
              </tr>

              <!-- CONTENT -->
              <tr>
                <td style="padding:40px;background-color:${colors.surface};border-left:1px solid ${colors.border};border-right:1px solid ${colors.border};">
                  ${content}
                </td>
              </tr>

              <!-- FOOTER -->
              <tr>
                <td style="padding:24px 40px;background-color:${colors.dark};border-top:1px solid ${colors.border};border-radius:0 0 8px 8px;">
                  <p style="margin:0;font-size:12px;color:${colors.muted};text-align:center;">
                    FM2 Empire &nbsp;|&nbsp; Lagos, Nigeria
                    &nbsp;|&nbsp;
                    <a href="https://fm2empire.com" style="color:${colors.gold};text-decoration:none;">fm2empire.com</a>
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// ------------------------------------------------------------
// APPLICANT CONFIRMATION EMAILS
// Sent to the person who submitted the form.
// ------------------------------------------------------------

export function internshipConfirmationEmail(name: string): string {
  return baseTemplate(`
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${colors.white};font-family:Georgia,serif;">
      Application Received
    </h1>
    <p style="margin:0 0 24px;font-size:13px;color:${colors.gold};text-transform:uppercase;letter-spacing:0.1em;">
      Internship Program
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${colors.white};line-height:1.6;">
      Hi ${name},
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${colors.muted};line-height:1.6;">
      Thank you for applying to the FM2 Empire internship program. We've received your application and our team will review it carefully.
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:${colors.muted};line-height:1.6;">
      We review applications on a rolling basis and aim to respond within <strong style="color:${colors.white};">5–7 business days</strong>. In the meantime, feel free to explore our work.
    </p>
    <a href="https://fm2empire.com/media" style="display:inline-block;padding:12px 24px;background-color:${colors.gold};color:${colors.black};font-size:14px;font-weight:700;text-decoration:none;border-radius:6px;">
      View Our Work
    </a>
  `);
}

export function talentConfirmationEmail(name: string): string {
  return baseTemplate(`
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${colors.white};font-family:Georgia,serif;">
      Enrollment Received
    </h1>
    <p style="margin:0 0 24px;font-size:13px;color:${colors.gold};text-transform:uppercase;letter-spacing:0.1em;">
      Talent Development
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${colors.white};line-height:1.6;">
      Hi ${name},
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${colors.muted};line-height:1.6;">
      Thank you for submitting your talent enrollment to FM2 Empire. Our A&R team reviews every submission personally and will get back to you within <strong style="color:${colors.white};">7–10 business days</strong>.
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:${colors.muted};line-height:1.6;">
      We look forward to learning more about your craft.
    </p>
    <a href="https://fm2empire.com/media" style="display:inline-block;padding:12px 24px;background-color:${colors.gold};color:${colors.black};font-size:14px;font-weight:700;text-decoration:none;border-radius:6px;">
      Explore FM2 Media
    </a>
  `);
}

export function serviceConfirmationEmail(name: string): string {
  return baseTemplate(`
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${colors.white};font-family:Georgia,serif;">
      Request Received
    </h1>
    <p style="margin:0 0 24px;font-size:13px;color:${colors.gold};text-transform:uppercase;letter-spacing:0.1em;">
      Service Request
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${colors.white};line-height:1.6;">
      Hi ${name},
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${colors.muted};line-height:1.6;">
      We've received your service request and our production team will review your project brief. Expect a response within <strong style="color:${colors.white};">2–3 business days</strong> to discuss scope, timeline, and pricing.
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:${colors.muted};line-height:1.6;">
      If you have additional details to share in the meantime, reply directly to this email.
    </p>
    <a href="https://fm2empire.com/contact" style="display:inline-block;padding:12px 24px;background-color:${colors.gold};color:${colors.black};font-size:14px;font-weight:700;text-decoration:none;border-radius:6px;">
      Contact Our Team
    </a>
  `);
}

export function partnershipConfirmationEmail(name: string, type: string): string {
  const typeLabels: Record<string, string> = {
    partnership: "Partnership Proposal",
    collaboration: "Collaboration Request",
    sponsorship: "Sponsorship Inquiry",
    general_inquiry: "General Inquiry",
  };

  return baseTemplate(`
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${colors.white};font-family:Georgia,serif;">
      Message Received
    </h1>
    <p style="margin:0 0 24px;font-size:13px;color:${colors.gold};text-transform:uppercase;letter-spacing:0.1em;">
      ${typeLabels[type] ?? "Inquiry"}
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${colors.white};line-height:1.6;">
      Hi ${name},
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${colors.muted};line-height:1.6;">
      Thank you for reaching out to FM2 Empire. We've received your message and the right person on our team will review it and get back to you within <strong style="color:${colors.white};">3–5 business days</strong>.
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:${colors.muted};line-height:1.6;">
      We appreciate your interest in working with FM2.
    </p>
    <a href="https://fm2empire.com" style="display:inline-block;padding:12px 24px;background-color:${colors.gold};color:${colors.black};font-size:14px;font-weight:700;text-decoration:none;border-radius:6px;">
      Visit FM2 Empire
    </a>
  `);
}

export function contactConfirmationEmail(name: string): string {
  return baseTemplate(`
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${colors.white};font-family:Georgia,serif;">
      Message Received
    </h1>
    <p style="margin:0 0 24px;font-size:13px;color:${colors.gold};text-transform:uppercase;letter-spacing:0.1em;">
      Contact Form
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:${colors.white};line-height:1.6;">
      Hi ${name},
    </p>
    <p style="margin:0 0 24px;font-size:15px;color:${colors.muted};line-height:1.6;">
      Thank you for getting in touch with FM2 Empire. We've received your message and will get back to you within <strong style="color:${colors.white};">1–2 business days</strong>.
    </p>
    <a href="https://fm2empire.com" style="display:inline-block;padding:12px 24px;background-color:${colors.gold};color:${colors.black};font-size:14px;font-weight:700;text-decoration:none;border-radius:6px;">
      Visit FM2 Empire
    </a>
  `);
}

// ------------------------------------------------------------
// INTERNAL ALERT EMAILS
// Sent to the FM2 team when a new submission arrives.
// ------------------------------------------------------------

export function internalAlertEmail(
  type: string,
  name: string,
  email: string,
  summary: string
): string {
  const typeLabels: Record<string, string> = {
    internship: "Internship Application",
    talent_enrollment: "Talent Enrollment",
    service_request: "Service Request",
    partnership: "Partnership Proposal",
    collaboration: "Collaboration Request",
    sponsorship: "Sponsorship Inquiry",
    general_inquiry: "General Inquiry",
  };

  return baseTemplate(`
    <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:${colors.white};font-family:Georgia,serif;">
      New Submission
    </h1>
    <p style="margin:0 0 24px;font-size:13px;color:${colors.gold};text-transform:uppercase;letter-spacing:0.1em;">
      ${typeLabels[type] ?? type}
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr>
        <td style="padding:12px 16px;background-color:${colors.dark};border:1px solid ${colors.border};border-radius:6px;">
          <p style="margin:0 0 8px;font-size:13px;color:${colors.muted};">From</p>
          <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:${colors.white};">${name}</p>
          <p style="margin:0;font-size:14px;color:${colors.gold};">${email}</p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 8px;font-size:13px;color:${colors.muted};text-transform:uppercase;letter-spacing:0.05em;">
      Summary
    </p>
    <p style="margin:0 0 24px;font-size:14px;color:${colors.muted};line-height:1.6;padding:12px 16px;background-color:${colors.dark};border:1px solid ${colors.border};border-radius:6px;">
      ${summary}
    </p>

    <a href="https://fm2empire.com/admin" style="display:inline-block;padding:12px 24px;background-color:${colors.gold};color:${colors.black};font-size:14px;font-weight:700;text-decoration:none;border-radius:6px;">
      View in Admin Panel
    </a>
  `);
}