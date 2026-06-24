// ============================================================
// FM2 EMPIRE — MEDIA SHOWCASE SECTION (homepage preview)
// Pulls from the central data source in lib/data.ts. Shows
// only the first 6 items here — "View Full Library" goes to
// the dedicated /media page with everything + real filtering.
// Thumbnails are now real images, not empty gradient boxes.
// ============================================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Play, Music, Mic, Film, Image as ImageIcon } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import AnimatedText from "@/components/ui/AnimatedText";
import Button from "@/components/ui/Button";
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
  visible: { transition: { staggerChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export default function Media() {
  const [activeFilter, setActiveFilter] = useState<MediaType | "all">("all");

  // Homepage preview only shows the first 6 items
  const previewItems = mediaItems.slice(0, 6);
  const filteredItems =
    activeFilter === "all"
      ? previewItems
      : previewItems.filter((item) => item.type === activeFilter);

  return (
    <section id="media" className="relative" style={{ backgroundColor: "var(--color-fm2-dark)" }}>
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-fm2-border), transparent)" }}
      />

      <div className="container-fm2 section-padding">

        <div className="flex flex-col gap-6 mb-12 max-w-2xl">
          <SectionLabel text="Watch & Listen" align="left" />
          <AnimatedText
            text="Our Stage Is Always Live"
            as="h2"
            animation="reveal"
            delay={0.1}
            className="font-display font-bold leading-tight"
            style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", color: "var(--color-fm2-white)" }}
          />
          <AnimatedText
            text="Music, podcasts, shows, and behind-the-scenes content from FM2 and our talent roster."
            as="p"
            animation="fade"
            delay={0.2}
            className="text-base leading-relaxed"
            style={{ color: "var(--color-fm2-muted)" }}
          />
        </div>

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

        <div className="flex justify-center mt-12">
          <Button href="/media" variant="secondary" size="md">
            View Full Library
          </Button>
        </div>

      </div>
    </section>
  );
}