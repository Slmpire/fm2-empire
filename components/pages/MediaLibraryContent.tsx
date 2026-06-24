// ============================================================
// FM2 EMPIRE — MEDIA LIBRARY CONTENT
// Full library, every item from lib/data.ts, real filtering
// by type plus a text search across title/description.
// ============================================================

"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Play, Music, Mic, Film, Image as ImageIcon, Search } from "lucide-react";
import AnimatedText from "@/components/ui/AnimatedText";
import SectionLabel from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";
import { mediaItems } from "@/lib/data";
import type { MediaType } from "@/types/index";

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

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export default function MediaLibraryContent() {
  const [activeFilter, setActiveFilter] = useState<MediaType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    let items = mediaItems;

    if (activeFilter !== "all") {
      items = items.filter((item) => item.type === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    return items;
  }, [activeFilter, searchQuery]);

  return (
    <section className="relative pt-32" style={{ backgroundColor: "var(--color-fm2-black)" }}>
      <div className="container-fm2 section-padding">

        <div className="flex flex-col gap-6 mb-10 max-w-2xl">
          <SectionLabel text="Full Library" align="left" />
          <AnimatedText
            text="Everything We've Made"
            as="h1"
            animation="reveal"
            className="font-display font-bold leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--color-fm2-white)" }}
          />
          <p className="text-base leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
            Browse the full FM2 catalog — music, podcasts, video, original series, and photo stories.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-fm2-muted)" }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search titles or descriptions..."
            className="w-full pl-11 pr-4 py-3 rounded-full text-sm focus:outline-none"
            style={{
              backgroundColor: "var(--color-fm2-surface)",
              border: "1px solid var(--color-fm2-border)",
              color: "var(--color-fm2-white)",
            }}
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-200",
                activeFilter === filter.value ? "text-black" : "text-[#888880] hover:text-[#F5F5F0]"
              )}
              style={{
                backgroundColor: activeFilter === filter.value ? "var(--color-fm2-gold)" : "var(--color-fm2-surface)",
                border: activeFilter === filter.value ? "1px solid var(--color-fm2-gold)" : "1px solid var(--color-fm2-border)",
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-xs mb-6" style={{ color: "var(--color-fm2-muted)" }}>
          {filteredItems.length} {filteredItems.length === 1 ? "result" : "results"}
        </p>

        {/* Grid */}
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-base" style={{ color: "var(--color-fm2-muted)" }}>
              No media found matching your search.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-20"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
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
                    className="group relative rounded-lg overflow-hidden card-surface cursor-pointer !p-0"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${item.thumbnailUrl})` }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(180deg, transparent 50%, rgba(8,8,8,0.7) 100%)" }}
                      />

                      {item.isPremium && (
                        <span
                          className="absolute top-3 left-3 text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full z-10"
                          style={{ backgroundColor: "var(--color-fm2-gold)", color: "var(--color-fm2-black)" }}
                        >
                          Premium
                        </span>
                      )}

                      {item.duration && (
                        <span
                          className="absolute bottom-3 right-3 text-xs font-medium px-2 py-1 rounded z-10"
                          style={{ backgroundColor: "rgba(8, 8, 8, 0.8)", color: "var(--color-fm2-white)" }}
                        >
                          {item.duration}
                        </span>
                      )}

                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: "rgba(8, 8, 8, 0.4)" }}
                      >
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300"
                          style={{ backgroundColor: "var(--color-fm2-gold)" }}
                        >
                          <Play size={20} fill="black" style={{ color: "var(--color-fm2-black)" }} />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <TypeIcon size={13} style={{ color: "var(--color-fm2-gold)" }} />
                        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--color-fm2-gold)" }}>
                          {item.type}
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-lg leading-snug" style={{ color: "var(--color-fm2-white)" }}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
                        {item.description}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}