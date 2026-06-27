// ============================================================
// FM2 EMPIRE — FOOTER
// Real brand icons via react-icons (lucide-react dropped
// brand/logo icons over trademark concerns, so this is the
// correct package for Instagram, X, YouTube, etc).
// ============================================================

"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaFacebookF,
  FaSpotify,
  FaTiktok,
} from "react-icons/fa6";

// ------------------------------------------------------------
// DATA
// ------------------------------------------------------------

const footerLinks = [
  {
    heading: "Company",
    links: [
      { label: "About FM2", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Careers", href: "/#apply" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Talent Development", href: "/#services" },
      { label: "Media Production", href: "/#services" },
      { label: "Creative Services", href: "/#services" },
      { label: "Partnerships", href: "/contact" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { label: "Watch & Listen", href: "/media" },
      { label: "Events", href: "/#events" },
      { label: "Buy Tickets", href: "/#events" },
      { label: "Apply / Enroll", href: "/#apply" },
    ],
  },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/fm2empire", icon: FaInstagram },
  { label: "X (Twitter)", href: "https://twitter.com/fm2empire", icon: FaXTwitter },
  { label: "YouTube", href: "https://youtube.com/@fm2empire", icon: FaYoutube },
  { label: "Facebook", href: "https://facebook.com/fm2empire", icon: FaFacebookF },
  { label: "Spotify", href: "https://open.spotify.com/artist/fm2empire", icon: FaSpotify },
  { label: "TikTok", href: "https://tiktok.com/@fm2empire", icon: FaTiktok },
];

// ------------------------------------------------------------
// ANIMATION VARIANTS
// ------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// ------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t"
      style={{
        backgroundColor: "var(--color-fm2-dark)",
        borderColor: "var(--color-fm2-border)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-fm2-gold), transparent)",
        }}
      />

      <div className="container-fm2 py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b"
          style={{ borderColor: "var(--color-fm2-border)" }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div className="lg:col-span-2 flex flex-col gap-5" variants={itemVariants}>
            <Link href="/" className="inline-block">
              <span
                className="font-display text-3xl font-bold tracking-tight"
                style={{ color: "var(--color-fm2-white)" }}
              >
                FM2
                <span style={{ color: "var(--color-fm2-gold)" }}> Empire</span>
              </span>
            </Link>

            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "var(--color-fm2-muted)" }}
            >
              A media, content, talent development, and creative ecosystem.
              Producing, developing, and amplifying Africa&apos;s next
              generation of creative talent.
            </p>

            <div className="flex items-center gap-3 mt-2 flex-wrap">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={cn(
                      "w-9 h-9 rounded-md flex items-center justify-center",
                      "transition-all duration-200 hover:-translate-y-0.5"
                    )}
                    style={{
                      color: "var(--color-fm2-muted)",
                      backgroundColor: "var(--color-fm2-surface)",
                      border: "1px solid var(--color-fm2-border)",
                    }}
                    onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.currentTarget.style.color = "var(--color-fm2-gold)";
                      e.currentTarget.style.borderColor = "var(--color-fm2-gold)";
                    }}
                    onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                      e.currentTarget.style.color = "var(--color-fm2-muted)";
                      e.currentTarget.style.borderColor = "var(--color-fm2-border)";
                    }}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {footerLinks.map((column) => (
            <motion.div key={column.heading} className="flex flex-col gap-4" variants={itemVariants}>
              <h4
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "var(--color-fm2-gold)" }}
              >
                {column.heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-[#F5F5F0]"
                      style={{ color: "var(--color-fm2-muted)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>
            &copy; {currentYear} FM2 Empire. All rights reserved.
          </p>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs transition-colors duration-200 hover:text-[#F5F5F0]"
                style={{ color: "var(--color-fm2-muted)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}