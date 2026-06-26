import type { Metadata } from "next";
import TermsContent from "@/components/pages/TermsContent";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing use of the FM2 Empire website and services.",
};

export default function TermsPage() {
  return <TermsContent />;
}