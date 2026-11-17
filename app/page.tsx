// ============================================================
// FM2 EMPIRE — ROOT PAGE
// Renders the marketing landing page directly at "/".
// ============================================================

import LandingPage from "./(marketing)/page";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function RootPage() {
  return <LandingPage />;
}