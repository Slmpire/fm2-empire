// ============================================================
// FM2 EMPIRE — CONDITIONAL LAYOUT
// Client component that hides public Navbar, Footer, and
// ChatWidget on /admin routes so they don't appear in the
// admin panel. Admin has its own sidebar and header.
// ============================================================

"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin  = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}