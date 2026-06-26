// ============================================================
// FM2 EMPIRE — LANDING PAGE
// Navbar and Footer now live in the root layout — this file
// only assembles the homepage sections.
// ============================================================

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Media from "@/components/sections/Media";
import Events from "@/components/sections/Events";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import FAQ from "@/components/sections/FAQ";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Media />
      <Events />
      <Team />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}