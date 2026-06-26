import type { Metadata } from "next";
import PrivacyContent from "@/components/pages/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How FM2 Empire collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}