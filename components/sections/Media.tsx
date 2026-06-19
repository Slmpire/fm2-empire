// ============================================================
// FM2 EMPIRE — MEDIA SHOWCASE SECTION
// Phase 1: embedded content from YouTube / Spotify, shown
// in FM2's own cinematic UI. No upload infrastructure yet —
// just clean presentation of existing content.
//
// Layout: tabbed filter (All / Music / Video / Podcast)
// then a responsive grid of media cards. Each card shows
// a thumbnail, play overlay, type badge, and title.
//
// This is the entertainment energy section — should feel
// like browsing a premium streaming platform, not a blog.
// ============================================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Play, Music, Mic, Film, Image as ImageIcon } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { MediaItem, MediaType } from "@/types/index";

// ------------------------------------------------------------
// PLACEHOLDER DATA
// Replace thumbnailUrl and embedUrl with real FM2 content.
// This structure is final — only the data changes later.
// ------------------------------------------------------------

const mediaItems: MediaItem[] = [
  {
    id: "1",
    title: "FM2 Sessions — Episode 1",
    description: "Raw studio performances from FM2 talent.",
    type: "music",
    thumbnailUrl: "/images/media-placeholder-1.jpg",
    externalUrl: "https://youtube.com",
    duration: "4:32",
    releaseDate: "2026-05-01",
    isPremium: false,
    isPublished: true,
  },
  {
    id: "2",
    title: "Behind the Empire — Podcast Ep. 3",
    description: "Conversations on building creative careers in Africa.",
    type: "podcast",
    thumbnailUrl: "/images/media-placeholder-2.jpg",
    externalUrl: "https://open.spotify.com",
    duration: "38:12",
    releaseDate: "2026-04-15",
    isPremium: false,
    isPublished: true,
  },
  {
    id: "3",
    title: "FM2 Showreel 2026",
    description: "A look at our biggest productions this year.",
    type: "video",
    thumbnailUrl: "/images/media-placeholder-3.jpg",
    externalUrl: "https://youtube.com",
    duration: "2:48",
    releaseDate: "2026-03-20",
    isPremium: false,
    isPublished: true,
  },
  {
    id: "4",
    title: "Rising — Original Series",
    description: "The journey of three artists from streets to stage.",
    type: "series",
    thumbnailUrl: "/images/media-placeholder-4.jpg",
    externalUrl: "https://youtube.com",
    duration: "Episode 1",
    releaseDate: "2026-02-10",
    isPremium: true,
    isPublished: true,
  },
  {
    id: "5",
    title: "Empire Nights — Live Set",
    description: "Live recording from our last showcase event.",
    type: "music",
    thumbnailUrl: "/images/media-placeholder-5.jpg",
    externalUrl: "https://open.spotify.com",
    duration: "12:05",
    releaseDate: "2026-01-28",
    isPremium: false,
    isPublished: true,
  },
  {
    id: "6",
    title: "FM2 Visuals — Photo Story",
    description: "A visual journey through our latest production.",
    type: "photo",
    thumbnailUrl: "/images/media-placeholder-6.jpg",
    externalUrl: "https://instagram.com",
    releaseDate: "2026-01-10",
    isPremium: false,
    isPublished: true,
  },
];

const filters: { label: string; value: MediaType | "all" }[] = [
  { label: "All",     value: "all" },
  { label: "Music",   value: "music" },
  { label: "Video",   value: "video" },
  { label: "Podcast", value: "podcast" },
  { label: "Series",  value: "series" },
  { label: "Photo",   value: "photo" },
];

const typeIcons: Record<MediaType, React.ElementType> = {
  music: Music,
  video: Film,
  podcast: Mic,
  series: Film,
  show: Film,
  photo: ImageIcon,
};

// ------------------------------------------------------------
// ANIMATION VARIANTS
// ------------------------------------------------------------

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

// ------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------

export default function Media() {
  const [activeFilter, setActiveFilter] = useState<MediaType | "all">("all");

  const filteredItems =
    activeFilter === "all"
      ? mediaItems
      : mediaItems.filter((item) => item.type === activeFilter);

  return (
    <section
      id="media"
      className="relative"
      style={{ backgroundColor: "var(--color-fm2-dark)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-fm2-border), transparent)",
        }}
      />

      <div className="container-fm2 section-padding">

        {/* ---- HEADER ---- */}
        <div className="flex flex-col gap-6 mb-12 max-w-2xl">
          <SectionLabel text="Watch & Listen" align="left" />
          <AnimatedText
            text="Our Stage Is Always Live"
            as="h2"
            animation="reveal"
            delay={0.1}
            className="font-display font-bold leading-tight"
            style={{
              fontSize: "clamp(1.875rem, 4vw, 3rem)",
              color: "var(--color-fm2-white)",
            }}
          />
          <AnimatedText
            text="Music, podcasts, shows, and behind-the-scenes content from FM2 and our talent roster. Premium content is marked — everything else is free to enjoy."
            as="p"
            animation="fade"
            delay={0.2}
            className="text-base leading-relaxed"
            style={{ color: "var(--color-fm2-muted)" }}
          />
        </div>

        {/* ---- FILTER TABS ---- */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200",
                activeFilter === filter.value
                  ? "text-black"
                  : "text-[#888880] hover:text-[#F5F5F0]"
              )}
              style={{
                backgroundColor:
                  activeFilter === filter.value
                    ? "var(--color-fm2-gold)"
                    : "var(--color-fm2-surface)",
                border:
                  activeFilter === filter.value
                    ? "1px solid var(--color-fm2-gold)"
                    : "1px solid var(--color-fm2-border)",
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* ---- MEDIA GRID ---- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const TypeIcon = typeIcons[item.type];
              return (
                <motion.a
                  key={item.id}
                  href={item.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                  className="group relative rounded-lg overflow-hidden card-surface cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div
                    className="relative aspect-video overflow-hidden"
                    style={{ backgroundColor: "var(--color-fm2-surface)" }}
                  >
                    {/* Placeholder gradient — replace with real Image component once thumbnails exist */}
                    <div
                      className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                      style={{
                        background:
                          "linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)",
                      }}
                    />

                    {/* Premium badge */}
                    {item.isPremium && (
                      <span
                        className="absolute top-3 left-3 text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full z-10"
                        style={{
                          backgroundColor: "var(--color-fm2-gold)",
                          color: "var(--color-fm2-black)",
                        }}
                      >
                        Premium
                      </span>
                    )}

                    {/* Duration badge */}
                    {item.duration && (
                      <span
                        className="absolute bottom-3 right-3 text-xs font-medium px-2 py-1 rounded z-10"
                        style={{
                          backgroundColor: "rgba(8, 8, 8, 0.8)",
                          color: "var(--color-fm2-white)",
                        }}
                      >
                        {item.duration}
                      </span>
                    )}

                    {/* Play overlay */}
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: "rgba(8, 8, 8, 0.5)" }}
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300"
                        style={{ backgroundColor: "var(--color-fm2-gold)" }}
                      >
                        <Play
                          size={20}
                          fill="black"
                          style={{ color: "var(--color-fm2-black)" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <TypeIcon
                        size={13}
                        style={{ color: "var(--color-fm2-gold)" }}
                      />
                      <span
                        className="text-xs font-semibold tracking-widest uppercase"
                        style={{ color: "var(--color-fm2-gold)" }}
                      >
                        {item.type}
                      </span>
                    </div>
                    <h3
                      className="font-display font-bold text-lg leading-snug"
                      style={{ color: "var(--color-fm2-white)" }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-fm2-muted)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* ---- VIEW MORE CTA ---- */}
        <div className="flex justify-center mt-12">
          <Button href="#contact" variant="secondary" size="md">
            View Full Library
          </Button>
        </div>

      </div>
    </section>
  );
}