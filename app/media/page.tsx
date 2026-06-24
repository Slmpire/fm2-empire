// ============================================================
// FM2 EMPIRE — MEDIA LIBRARY PAGE (route: /media)
// Full library with all items, real filtering, and search.
// ============================================================

import type { Metadata } from "next";
import MediaLibraryContent from "@/components/pages/MediaLibraryContent";

export const metadata: Metadata = {
  title: "Media Library",
  description:
    "Watch and listen to FM2 Empire's full media library — music, podcasts, video, series, and photo stories.",
};

export default function MediaLibraryPage() {
  return <MediaLibraryContent />;
}