// ============================================================
// FM2 EMPIRE — PRIVACY POLICY CONTENT
// Standard template, NDPR-aware. Have a lawyer review before
// this is treated as final/binding, especially once payments
// and real personal data collection are live.
// ============================================================

"use client";

import SectionLabel from "@/components/ui/SectionLabel";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "When you apply, enroll, request a service, or contact FM2 Empire, we collect information you provide directly — such as your name, email address, phone number, and any details relevant to your application or inquiry. We may also collect basic technical information (like browser type and general location) through standard website analytics.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use the information you provide to process applications, respond to inquiries, manage event bookings, and improve our services. We do not sell your personal information to third parties. We may share information with trusted service providers (such as payment processors) strictly to deliver the services you've requested.",
  },
  {
    title: "3. Data Storage & Security",
    content:
      "Your data is stored using industry-standard security practices, including encrypted databases and access controls limited to authorised FM2 team members. While we take reasonable steps to protect your information, no system is completely secure, and we cannot guarantee absolute security.",
  },
  {
    title: "4. Your Rights",
    content:
      "Under the Nigeria Data Protection Regulation (NDPR), you have the right to request access to the personal data we hold about you, request corrections, or request deletion, subject to any legal or operational requirements. To exercise these rights, contact us at the email below.",
  },
  {
    title: "5. Cookies",
    content:
      "Our website may use cookies to improve your browsing experience and understand site usage. You can disable cookies through your browser settings, though some site features may not function properly as a result.",
  },
  {
    title: "6. Third-Party Services",
    content:
      "We use third-party services for specific functions — including payment processing (Paystack), database hosting (Supabase), and AI-assisted chat support (Google Gemini). These providers have their own privacy practices governing data they process on our behalf.",
  },
  {
    title: "7. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.",
  },
  {
    title: "8. Contact Us",
    content:
      "If you have questions about this Privacy Policy or how your data is handled, contact us at hello@fm2empire.com or through our Contact page.",
  },
];

export default function PrivacyContent() {
  return (
    <section className="relative pt-32" style={{ backgroundColor: "var(--color-fm2-black)" }}>
      <div className="container-fm2 section-padding max-w-3xl">
        <SectionLabel text="Legal" align="left" />
        <h1
          className="font-display font-bold mt-5 mb-3"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-fm2-white)" }}
        >
          Privacy Policy
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