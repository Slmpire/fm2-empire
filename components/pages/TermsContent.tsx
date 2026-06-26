// ============================================================
// FM2 EMPIRE — TERMS OF SERVICE CONTENT
// Standard template. Have a lawyer review before treating
// as final/binding, especially around payments and ticketing.
// ============================================================

"use client";

import SectionLabel from "@/components/ui/SectionLabel";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By using the FM2 Empire website, applying for any program, purchasing a ticket, or engaging our services, you agree to these Terms of Service. If you do not agree, please discontinue use of the site.",
  },
  {
    title: "2. Applications & Enrollment",
    content:
      "Submitting an application (internship, talent enrollment, or otherwise) does not guarantee acceptance. FM2 reserves the right to review, accept, or decline any application at its discretion. Selected applicants will be contacted using the details provided.",
  },
  {
    title: "3. Services & Creative Work",
    content:
      "Service requests submitted through this site are proposals for engagement, not binding agreements. A formal scope, timeline, and pricing will be confirmed separately before any production work begins.",
  },
  {
    title: "4. Events & Ticketing",
    content:
      "Ticket prices, dates, and venues are subject to change; FM2 will make reasonable efforts to communicate any changes to ticket holders. Refund policies will be specified at the point of purchase for each event. For events managed on behalf of partner organisations, the partner organisation's terms may also apply.",
  },
  {
    title: "5. Intellectual Property",
    content:
      "All content produced by FM2 — including videos, music, photography, and written content on this site — remains the property of FM2 Empire or its respective creators unless otherwise agreed in writing. Content submitted to FM2 by applicants (e.g. portfolios, demos) remains the property of the applicant.",
  },
  {
    title: "6. User Conduct",
    content:
      "You agree not to misuse this website, attempt unauthorised access to any part of our systems, or submit false information in any application or form.",
  },
  {
    title: "7. Limitation of Liability",
    content:
      "FM2 Empire is not liable for indirect, incidental, or consequential damages arising from use of this website or participation in FM2 programs and events, to the fullest extent permitted by law.",
  },
  {
    title: "8. Changes to These Terms",
    content:
      "We may update these Terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised Terms.",
  },
  {
    title: "9. Contact",
    content:
      "Questions about these Terms can be directed to hello@fm2empire.com or through our Contact page.",
  },
];

export default function TermsContent() {
  return (
    <section className="relative pt-32" style={{ backgroundColor: "var(--color-fm2-black)" }}>
      <div className="container-fm2 section-padding max-w-3xl">
        <SectionLabel text="Legal" align="left" />
        <h1
          className="font-display font-bold mt-5 mb-3"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-fm2-white)" }}
        >
          Terms of Service
        </h1>
        <p className="text-sm mb-12" style={{ color: "var(--color-fm2-muted)" }}>
          Last updated: June 2026
        </p>

        <div className="flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              <h2 className="font-display font-bold text-lg" style={{ color: "var(--color-fm2-white)" }}>
                {section.title}
              </h2>
              <p className="text-sm leading-7" style={{ color: "var(--color-fm2-muted)" }}>
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}