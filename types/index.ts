// ============================================================
// FM2 EMPIRE — SHARED TYPES
// Every data shape used across the platform lives here.
// Components, forms, and API calls import from this file.
// When FM2's data changes, update here and TypeScript will
// flag every place that needs updating automatically.
// ============================================================

// ------------------------------------------------------------
// NAVIGATION
// ------------------------------------------------------------

export type NavLink = {
  label: string;
  href: string;
  isExternal?: boolean;
};

// ------------------------------------------------------------
// SERVICES
// What FM2 offers — used in the Services section
// ------------------------------------------------------------

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  audience: string;
  isAvailable: boolean;
  ctaLabel: string;
  ctaHref: string;
};

// ------------------------------------------------------------
// TEAM MEMBERS
// Used in the Team section and admin roster
// ------------------------------------------------------------

export type TeamMember = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  longBio?: string;
  imageUrl: string;
  socials?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
};

// ------------------------------------------------------------
// EVENTS
// Used in the Events section and ticketing system
// ------------------------------------------------------------

export type EventStatus = "upcoming" | "ongoing" | "past" | "cancelled";

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  imageUrl: string;
  ticketPrice: number;
  ticketUrl: string;
  status: EventStatus;
  isFeatured: boolean;
  organiser: string;
  isThirdParty: boolean;
};

// ------------------------------------------------------------
// MEDIA
// Used in the Media showcase section
// Phase 1: embedded links from YouTube / Spotify
// Phase 2: hosted directly on FM2's platform
// ------------------------------------------------------------

export type MediaType =
  | "video"
  | "music"
  | "podcast"
  | "photo"
  | "series"
  | "show";

export type MediaItem = {
  id: string;
  title: string;
  description: string;
  type: MediaType;
  thumbnailUrl: string;
  embedUrl?: string;
  externalUrl?: string;
  duration?: string;
  releaseDate: string;
  isPremium: boolean;
  isPublished: boolean;
};

// ------------------------------------------------------------
// TESTIMONIALS
// Social proof — used in the Testimonials section
// ------------------------------------------------------------

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  organisation?: string;
  imageUrl?: string;
};

// ------------------------------------------------------------
// INTAKE FORMS
// All the different types of people coming into FM2
// Each maps to a form and a pipeline in the admin panel
// ------------------------------------------------------------

export type InquiryType =
  | "internship"
  | "talent_enrollment"
  | "service_request"
  | "general_inquiry"
  | "partnership"
  | "collaboration"
  | "sponsorship";

export type ApplicationStatus =
  | "new"
  | "reviewing"
  | "shortlisted"
  | "approved"
  | "rejected"
  | "on_hold";

export type BaseApplication = {
  id: string;
  type: InquiryType;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  notes?: string;
};

export type InternshipApplication = BaseApplication & {
  type: "internship";
  fullName: string;
  email: string;
  phone: string;
  university: string;
  course: string;
  year: string;
  department: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  coverLetter: string;
};

export type TalentEnrollment = BaseApplication & {
  type: "talent_enrollment";
  fullName: string;
  email: string;
  phone: string;
  stageName?: string;
  category: string;
  genre?: string;
  bio: string;
  portfolioUrl?: string;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
    tiktok?: string;
  };
};

export type ServiceRequest = BaseApplication & {
  type: "service_request";
  fullName: string;
  email: string;
  phone: string;
  organisation?: string;
  serviceNeeded: string;
  projectDescription: string;
  budget?: string;
  timeline?: string;
  referralSource?: string;
};

export type GeneralInquiry = BaseApplication & {
  type: "general_inquiry" | "partnership" | "collaboration" | "sponsorship";
  fullName: string;
  email: string;
  phone?: string;
  organisation?: string;
  subject: string;
  message: string;
};

// Union type — covers any application coming into FM2
export type AnyApplication =
  | InternshipApplication
  | TalentEnrollment
  | ServiceRequest
  | GeneralInquiry;

// ------------------------------------------------------------
// ADMIN
// Role-based access for the FM2 team
// ------------------------------------------------------------

export type AdminRole =
  | "super_admin"
  | "admin"
  | "reviewer"
  | "events_manager"
  | "media_manager"
  | "read_only";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  department?: string;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
};

// ------------------------------------------------------------
// API RESPONSES
// Standard shape for all server responses
// ------------------------------------------------------------

export type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ApiError = {
  success: false;
  error: string;
  code?: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ------------------------------------------------------------
// PAGINATION
// Used in admin panel lists and public event/media listings
// ------------------------------------------------------------

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};