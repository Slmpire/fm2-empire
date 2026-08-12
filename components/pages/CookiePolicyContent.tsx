// ============================================================
// FM2 EMPIRE — COOKIE POLICY CONTENT
// Explains what cookies FM2 uses, why, and how visitors
// can control them. Kept honest and plain — no legal padding.
// Have a lawyer review before treating as final/binding.
// ============================================================

"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import Link from "next/link";

const sections = [
  {
    title: "1. What Are Cookies?",
    content:
      "Cookies are small text files placed on your device when you visit a website. They help the site remember information about your visit — like your preferences or what you've interacted with — so the site works better the next time you come back.",
  },
  {
    title: "2. What Cookies Does FM2 Empire Use?",
    content: null,
    subsections: [
      {
        heading: "Essential Cookies",
        description:
          "These are required for the site to function. Without them, core features like form submissions and page navigation won't work properly. You cannot opt out of essential cookies.",
        examples: [
          "Session management (keeping you logged in if you're an admin user)",
          "Security tokens (protecting forms from spam and bots)",
          "Load balancing (ensuring the site stays responsive)",
        ],
      },
      {
        heading: "Analytics Cookies",
        description:
          "These help us understand how visitors use the site — which pages get the most visits, how long people stay, and where they come from. This information is aggregated and anonymous; we can't identify you individually from it.",
        examples: [
          "Page view counts",
          "Traffic source tracking (how you found the site)",
          "General device and browser type",
        ],
      },
      {
        heading: "Functional Cookies",
        description:
          "These remember choices you've made on the site to improve your experience — like which media filter you last used or whether you've already seen a particular notice.",
        examples: [
          "Remembering your last media filter selection",
          "Storing your chat session with the FM2 AI assistant during your visit",
        ],
      },
    ],
  },
  {
    title: "3. What We Don't Do With Cookies",
    content:
      "FM2 Empire does not use cookies to track you across other websites, build advertising profiles, or sell your browsing data to third parties. We don't use any third-party advertising cookies.",
  },
  {
    title: "4. Third-Party Services",
    content:
      "Some features on this site are powered by third-party services that may set their own cookies. These include: Supabase (database and authentication), Google Gemini (AI chat assistant), and Paystack (payment processing). Each of these providers has their own cookie and privacy policies governing how they handle data.",
  },
  {
    title: "5. How to Control Cookies",
    content:
      "You can control and delete cookies through your browser settings. Here's how to do it in the most common browsers:",
    browsers: [
      { name: "Chrome", url: "https://support.google.com/chrome/answer/95647" },
      { name: "Firefox", url: "https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" },
      { name: "Safari", url: "https://support.apple.com/en-gb/guide/safari/sfri11471/mac" },
      { name: "Edge", url: "https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge" },
      { name: "Brave", url: "https://support.brave.com/hc/en-us/articles/360022806212-How-do-I-use-Shields-while-browsing" },
    ],
    additionalNote:
      "Note that disabling certain cookies may affect how the FM2 website functions. Essential cookies in particular cannot be disabled without impacting core features.",
  },
  {
    title: "6. Cookie Retention",
    content:
      "Different cookies are kept for different lengths of time. Session cookies are deleted when you close your browser. Persistent cookies remain on your device for a set period — typically between 30 days and 12 months depending on the purpose — or until you delete them manually.",
  },
  {
    title: "7. Changes to This Policy",
    content:
      "We may update this Cookie Policy from time to time as our site evolves. Changes will be posted on this page with an updated date.",
  },
  {
    title: "8. Contact",
    content: null,
    contactNote: true,
  },
];

export default function CookiePolicyContent() {
  return (
    <section
      className="relative pt-32"
      style={{ backgroundColor: "var(--color-fm2-black)" }}
    >
      <div className="container-fm2 section-padding max-w-3xl">
        <SectionLabel text="Legal" align="left" />
        <h1
          className="font-display font-bold mt-5 mb-3"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--color-fm2-white)" }}
        >
          Cookie Policy
        </h1>
        <p className="text-sm mb-12" style={{ color: "var(--color-fm2-muted)" }}>
          Last updated: June 2026
        </p>

        <div className="flex flex-col gap-10">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h2
                className="font-display font-bold text-lg"
                style={{ color: "var(--color-fm2-white)" }}
              >
                {section.title}
              </h2>

              {/* Standard paragraph */}
              {section.content && (
                <p
                  className="text-sm leading-7"
                  style={{ color: "var(--color-fm2-muted)" }}
                >
                  {section.content}
                </p>
              )}

              {/* Subsections (cookie types) */}
              {section.subsections && (
                <div className="flex flex-col gap-6">
                  {section.subsections.map((sub) => (
                    <div
                      key={sub.heading}
                      className="rounded-lg p-5 flex flex-col gap-3"
                      style={{
                        backgroundColor: "var(--color-fm2-surface)",
                        border: "1px solid var(--color-fm2-border)",
                      }}
                    >
                      <h3
                        className="font-display font-bold text-base"
                        style={{ color: "var(--color-fm2-gold)" }}
                      >
                        {sub.heading}
                      </h3>
                      <p
                        className="text-sm leading-7"
                        style={{ color: "var(--color-fm2-muted)" }}
                      >
                        {sub.description}
                      </p>
                      <ul className="flex flex-col gap-1.5">
                        {sub.examples.map((example) => (
                          <li
                            key={example}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "var(--color-fm2-muted)" }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                              style={{ backgroundColor: "var(--color-fm2-gold)" }}
                            />
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Browser links */}
              {section.browsers && (
                <>
                  <div className="flex flex-wrap gap-3 mt-1">
                    {section.browsers.map((browser) => (
                      
                      <a  key={browser.name}
                        href={browser.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-200"
                        style={{
                          backgroundColor: "var(--color-fm2-surface)",
                          border: "1px solid var(--color-fm2-border)",
                          color: "var(--color-fm2-muted)",
                        }}
                      >
                        {browser.name} →
                      </a>
                    ))}
                  </div>
                  {section.additionalNote && (
                    <p
                      className="text-sm leading-7"
                      style={{ color: "var(--color-fm2-muted)" }}
                    >
                      {section.additionalNote}
                    </p>
                  )}
                </>
              )}

              {/* Contact section */}
              {section.contactNote && (
                <p
                  className="text-sm leading-7"
                  style={{ color: "var(--color-fm2-muted)" }}
                >
                  Questions about this Cookie Policy? Email us at{" "}
                  
                   <a href="mailto:hello@fm2empire.com"
                    className="transition-colors duration-200"
                    style={{ color: "var(--color-fm2-gold)" }}
                  >
                    hello@fm2empire.com
                  </a>{" "}
                  or visit our{" "}
                  <Link
                    href="/contact"
                    className="transition-colors duration-200"
                    style={{ color: "var(--color-fm2-gold)" }}
                  >
                    Contact page
                  </Link>
                  .
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Related legal docs */}
        <div
          className="mt-14 pt-8 border-t flex flex-col sm:flex-row gap-4"
          style={{ borderColor: "var(--color-fm2-border)" }}
        >
          <p className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>
            Related legal documents:
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-xs transition-colors duration-200 hover:text-[#E8C97A]"
              style={{ color: "var(--color-fm2-gold)" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs transition-colors duration-200 hover:text-[#E8C97A]"
              style={{ color: "var(--color-fm2-gold)" }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}