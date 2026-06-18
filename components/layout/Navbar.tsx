// ============================================================
// FM2 EMPIRE — NAVBAR
// Fixed top navigation. Transparent on load, fills dark on
// scroll. This is a cinematic entertainment brand — the nav
// should feel sleek and confident, never cluttered.
//
// Desktop: logo left, links center, CTA right.
// Mobile:  logo left, hamburger right → full screen menu.
//
// The full screen mobile menu is the entertainment energy
// moment — it opens with a dramatic dark overlay and the
// links animate in one by one.
// ============================================================

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import type { NavLink } from "@/types/index";

// ------------------------------------------------------------
// NAV LINKS
// Update these as FM2's pages grow.
// ------------------------------------------------------------

const navLinks: NavLink[] = [
  { label: "About",    href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Media",    href: "#media" },
  { label: "Events",   href: "#events" },
  { label: "Team",     href: "#team" },
];

// ------------------------------------------------------------
// ANIMATION VARIANTS
// ease arrays are cast as tuples to satisfy Framer Motion v12
// ------------------------------------------------------------

const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    clipPath: "inset(0 0 100% 0)",
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  open: {
    opacity: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const mobileLinkVariants: Variants = {
  closed: { opacity: 0, x: -24 },
  open: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      delay: 0.15 + index * 0.07,
    },
  }),
};

// ------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------

export default function Navbar() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMenuOpen, setIsMenuOpen]       = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Track scroll position to fill navbar background
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section for nav link highlight
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* ---- MAIN NAVBAR ---- */}
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-[#080808]/95 backdrop-blur-md border-b border-[#2A2A2A]"
            : "bg-transparent"
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        }}
      >
        <div className="container-fm2">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              onClick={closeMenu}
            >
              <span
                className="font-display text-2xl font-bold tracking-tight"
                style={{ color: "var(--color-fm2-white)" }}
              >
                FM2
                <span style={{ color: "var(--color-fm2-gold)" }}>
                  {" "}Empire
                </span>
              </span>
            </Link>

            {/* DESKTOP LINKS */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium tracking-wide transition-colors duration-200 relative group",
                    activeSection === link.href
                      ? "text-[#C9A84C]"
                      : "text-[#888880] hover:text-[#F5F5F0]"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-px bg-[#C9A84C] transition-all duration-300",
                      activeSection === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* DESKTOP CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button href="#contact" variant="secondary" size="sm">
                Get in Touch
              </Button>
              <Button href="#apply" variant="primary" size="sm">
                Join FM2
              </Button>
            </div>

            {/* MOBILE HAMBURGER */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-md transition-colors"
              style={{ color: "var(--color-fm2-white)" }}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

          </div>
        </div>
      </motion.header>

      {/* ---- MOBILE FULL SCREEN MENU ---- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col md:hidden"
            style={{ backgroundColor: "var(--color-fm2-black)" }}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="container-fm2 flex flex-col justify-center h-full pb-20">

              {/* MOBILE NAV LINKS */}
              <nav className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    custom={index}
                    variants={mobileLinkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="block py-4 border-b group"
                      style={{ borderColor: "var(--color-fm2-border)" }}
                    >
                      <span
                        className="font-display text-4xl font-bold tracking-tight transition-colors duration-200 group-hover:text-[#C9A84C]"
                        style={{ color: "var(--color-fm2-white)" }}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* MOBILE CTA BUTTONS */}
              <motion.div
                className="flex flex-col gap-3 mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Button
                  href="#apply"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  onClick={closeMenu}
                >
                  Join FM2
                </Button>
                <Button
                  href="#contact"
                  variant="secondary"
                  size="lg"
                  className="w-full justify-center"
                  onClick={closeMenu}
                >
                  Get in Touch
                </Button>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}