// ============================================================
// FM2 EMPIRE — LANDING PAGE
// Assembles every section in order. This is the page that
// renders at the root URL.
// ============================================================

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Media from "@/components/sections/Media";
import Events from "@/components/sections/Events";
import Team from "@/components/sections/Team";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Media />
        <Events />
        <Team />
      </main>
      <Footer />
    </>
  );
}