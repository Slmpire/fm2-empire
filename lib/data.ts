// ============================================================
// FM2 EMPIRE — CENTRAL DATA SOURCE
// Single source of truth for team members, events, and media.
// Both the landing page sections AND the dedicated detail
// pages (/team/[slug], /events/[slug]) import from here —
// so updating one place updates everywhere it's used.
//
// This is placeholder data. Once FM2 provides real content,
// only this file needs editing — no component code changes.
// Later, this file's contents move into Supabase and these
// arrays get replaced with database queries.
// ============================================================

import type { TeamMember, Event, MediaItem } from "@/types/index";

// ------------------------------------------------------------
// TEAM MEMBERS
// ------------------------------------------------------------

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    slug: "founder-name",
    name: "Founder Name",
    role: "Founder & Creative Director",
    bio: "Leads the overall creative vision and direction of FM2 Empire across all productions and talent initiatives.",
    longBio:
      "With a background spanning music production, brand strategy, and live events, [Founder Name] built FM2 Empire to close the gap between raw creative talent and the industry infrastructure needed to sustain a career. Their approach blends artistic instinct with operational discipline — every FM2 production reflects that balance.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    socials: { instagram: "https://instagram.com" },
  },
  {
    id: "2",
    slug: "co-founder-name",
    name: "Co-Founder Name",
    role: "Head of Talent Development",
    bio: "Oversees artist onboarding, mentorship programs, and long-term career development for FM2 talent.",
    longBio:
      "[Co-Founder Name] designed FM2's talent development framework from the ground up — covering vocal coaching, brand positioning, and career planning. Their work ensures every artist who joins FM2 has a clear, structured path forward, not just a one-off production deal.",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=600&auto=format&fit=crop",
    socials: { instagram: "https://instagram.com" },
  },
  {
    id: "3",
    slug: "team-member-3",
    name: "Team Member Name",
    role: "Head of Media Production",
    bio: "Directs music videos, podcasts, and original content across the FM2 media library.",
    longBio:
      "Responsible for everything that ends up in front of FM2's audience — from concept to final cut. [Team Member Name] leads a production process built for consistency at scale, without losing the creative edge that makes FM2's content stand out.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
    socials: { instagram: "https://instagram.com" },
  },
  {
    id: "4",
    slug: "team-member-4",
    name: "Team Member Name",
    role: "Events & Partnerships Lead",
    bio: "Manages FM2's live events calendar and strategic partnerships with brands and organisations.",
    longBio:
      "From intimate showcases to large-scale productions, [Team Member Name] handles the logistics, vendor relationships, and brand partnerships that make FM2 events run smoothly — and keeps the partnerships pipeline growing.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    socials: { instagram: "https://instagram.com" },
  },
];

// ------------------------------------------------------------
// EVENTS
// ------------------------------------------------------------

export const featuredEvent: Event = {
  id: "f1",
  slug: "fm2-empire-showcase-2026",
  title: "FM2 Empire Showcase 2026",
  description:
    "An evening celebrating the artists, creators, and talent shaping FM2's next chapter. Live performances, exclusive media premieres, and industry networking.",
  longDescription:
    "The FM2 Empire Showcase is our flagship annual event — a night where every artist on the FM2 roster takes the stage, new media projects get their first public premiere, and the wider creative industry comes together under one roof. Expect live performances, a curated media screening, and structured networking time with FM2's partners and team.",
  date: "2026-08-15",
  time: "6:00 PM",
  venue: "Eko Convention Centre",
  address: "Plot 1415, Adetokunbo Ademola Street, Victoria Island",
  city: "Lagos",
  imageUrl: "/images/event-featured.jpg",
  ticketPrice: 15000,
  ticketUrl: "#",
  status: "upcoming",
  isFeatured: true,
  organiser: "FM2 Empire",
  isThirdParty: false,
  lineup: ["FM2 Talent Roster", "Special Guest Performers", "Live DJ Set"],
};

export const upcomingEvents: Event[] = [
  {
    id: "e1",
    slug: "sound-and-story-open-mic",
    title: "Sound & Story — Open Mic Night",
    description: "A platform for emerging voices in music and spoken word.",
    longDescription:
      "An intimate open-mic evening for emerging musicians, poets, and spoken word artists. Sign-up is on a first-come basis at the door, with a small house band available for musical performers who need backing.",
    date: "2026-07-10",
    time: "7:00 PM",
    venue: "The Bridge Lagos",
    address: "Tiamiyu Savage Street, Victoria Island",
    city: "Lagos",
    imageUrl: "/images/event-1.jpg",
    ticketPrice: 5000,
    ticketUrl: "#",
    status: "upcoming",
    isFeatured: false,
    organiser: "FM2 Empire",
    isThirdParty: false,
  },
  {
    id: "e2",
    slug: "creative-industry-mixer",
    title: "Creative Industry Mixer",
    description: "Networking event for creatives, brands, and investors.",
    longDescription:
      "A structured networking evening connecting creatives, brand representatives, and investors active in Nigeria's creative economy. Includes a short panel discussion followed by open networking.",
    date: "2026-07-22",
    time: "4:00 PM",
    venue: "Radisson Blu Ikeja",
    address: "Mobolaji Bank Anthony Way, Ikeja",
    city: "Lagos",
    imageUrl: "/images/event-2.jpg",
    ticketPrice: 10000,
    ticketUrl: "#",
    status: "upcoming",
    isFeatured: false,
    organiser: "Partner Organisation",
    isThirdParty: true,
  },
  {
    id: "e3",
    slug: "fm2-talent-auditions-round-2",
    title: "FM2 Talent Auditions — Round 2",
    description: "Open auditions for the next FM2 talent intake.",
    longDescription:
      "FM2's next round of open talent auditions. Open to vocalists, instrumentalists, and performers of all genres. Walk-ins welcome, though pre-registration through the FM2 talent enrollment form is encouraged to secure a time slot.",
    date: "2026-08-02",
    time: "10:00 AM",
    venue: "FM2 Studios",
    address: "Lekki Phase 1",
    city: "Lagos",
    imageUrl: "/images/event-3.jpg",
    ticketPrice: 0,
    ticketUrl: "#",
    status: "upcoming",
    isFeatured: false,
    organiser: "FM2 Empire",
    isThirdParty: false,
  },
];

export const allEvents: Event[] = [featuredEvent, ...upcomingEvents];

// ------------------------------------------------------------
// MEDIA ITEMS
// ------------------------------------------------------------

export const mediaItems: MediaItem[] = [
  {
    id: "1",
    title: "FM2 Sessions — Episode 1",
    description: "Raw studio performances from FM2 talent.",
    type: "music",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop",
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
    thumbnailUrl:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop",
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
    thumbnailUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
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
    thumbnailUrl:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
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
    thumbnailUrl:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=800&auto=format&fit=crop",
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
    thumbnailUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    externalUrl: "https://instagram.com",
    releaseDate: "2026-01-10",
    isPremium: false,
    isPublished: true,
  },
  {
    id: "7",
    title: "Studio Diaries — Episode 4",
    description: "Inside the booth with FM2's newest signee.",
    type: "podcast",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=800&auto=format&fit=crop",
    externalUrl: "https://open.spotify.com",
    duration: "29:47",
    releaseDate: "2025-12-18",
    isPremium: false,
    isPublished: true,
  },
  {
    id: "8",
    title: "Empire Anthem — Official Video",
    description: "The visual companion to FM2's 2025 anthem.",
    type: "video",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=800&auto=format&fit=crop",
    externalUrl: "https://youtube.com",
    duration: "3:54",
    releaseDate: "2025-11-30",
    isPremium: true,
    isPublished: true,
  },
];