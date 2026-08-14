// ============================================================
// FM2 EMPIRE — TALENT ENROLLMENT FORM
// Fields: personal info, creative category, genre/niche,
// bio, social/streaming links, portfolio.
//
// TODO (Supabase): replace the simulate block with:
// supabase.from("applications").insert({ type: "talent_enrollment", ... })
// ============================================================

"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import FormField from "@/components/ui/FormField";
import FormSuccess from "@/components/forms/FormSuccess";
import Button from "@/components/ui/Button";
import { isValidEmail, isValidNigerianPhone } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

type FormData = {
  fullName: string;
  stageName: string;
  email: string;
  phone: string;
  category: string;
  genre: string;
  city: string;
  bio: string;
  instagram: string;
  youtube: string;
  spotify: string;
  tiktok: string;
  portfolioUrl: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const EMPTY: FormData = {
  fullName: "",
  stageName: "",
  email: "",
  phone: "",
  category: "",
  genre: "",
  city: "",
  bio: "",
  instagram: "",
  youtube: "",
  spotify: "",
  tiktok: "",
  portfolioUrl: "",
};

const CATEGORY_OPTIONS = [
  { label: "Musician / Recording Artist", value: "musician" },
  { label: "Performer / Stage Artist", value: "performer" },
  { label: "Content Creator", value: "content_creator" },
  { label: "Spoken Word / Poet", value: "spoken_word" },
  { label: "Comedian / Entertainer", value: "comedian" },
  { label: "Actor / Media Personality", value: "actor" },
  { label: "DJ / Producer", value: "dj_producer" },
  { label: "Other", value: "other" },
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) errors.fullName = "Full name is required";
  if (!isValidEmail(data.email)) errors.email = "A valid email is required";
  if (!isValidNigerianPhone(data.phone)) errors.phone = "A valid phone number is required";
  if (!data.category) errors.category = "Please select your creative category";
  if (!data.city.trim()) errors.city = "City is required";
  if (!data.bio.trim() || data.bio.trim().length < 100)
    errors.bio = "Please write at least 100 characters about yourself and your craft";

  return errors;
}

export default function TalentForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const set = (field: keyof FormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("applications").insert({
        type: "talent_enrollment",
        status: "new",
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        data: {
          stageName: form.stageName,
          category: form.category,
          genre: form.genre,
          city: form.city,
          bio: form.bio,
          instagram: form.instagram,
          youtube: form.youtube,
          spotify: form.spotify,
          tiktok: form.tiktok,
          portfolioUrl: form.portfolioUrl,
        },
      });
      if (error) throw error;
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "talent_enrollment",
          name: form.fullName,
          email: form.email,
          summary: `Category: ${form.category}. Genre/Niche: ${form.genre || "Not specified"}. Based in ${form.city}.`,
        }),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <FormSuccess
        title="Enrollment Submitted"
        message="We've received your talent enrollment. Our A&R team reviews new submissions every week — expect to hear from us within 7–10 business days."
        primaryAction={{ label: "Back to Homepage", href: "/" }}
        secondaryAction={{ label: "View Our Work", href: "/media" }}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex flex-col gap-2 mb-10">
        <h2
          className="font-display font-bold"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "var(--color-fm2-white)" }}
        >
          Talent Enrollment
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
          Tell us about yourself and your craft. Be honest and specific — that's what gets noticed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

        <div className="flex flex-col gap-1 pb-2 border-b" style={{ borderColor: "var(--color-fm2-border)" }}>
          <span className="eyebrow text-xs">Personal Information</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Full Legal Name"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={set("fullName")}
            placeholder="Your full name"
            required
            error={errors.fullName}
          />
          <FormField
            label="Stage Name"
            name="stageName"
            type="text"
            value={form.stageName}
            onChange={set("stageName")}
            placeholder="If different from your legal name"
            error={errors.stageName}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="you@example.com"
            required
            error={errors.email}
          />
          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="08012345678"
            required
            error={errors.phone}
          />
        </div>

        <FormField
          label="City / State"
          name="city"
          type="text"
          value={form.city}
          onChange={set("city")}
          placeholder="e.g. Lagos, Abuja, Port Harcourt"
          required
          error={errors.city}
        />

        <div className="flex flex-col gap-1 pb-2 border-b mt-2" style={{ borderColor: "var(--color-fm2-border)" }}>
          <span className="eyebrow text-xs">Your Craft</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Creative Category"
            name="category"
            as="select"
            value={form.category}
            onChange={set("category")}
            options={CATEGORY_OPTIONS}
            placeholder="Select your category"
            required
            error={errors.category}
          />
          <FormField
            label="Genre / Niche"
            name="genre"
            type="text"
            value={form.genre}
            onChange={set("genre")}
            placeholder="e.g. Afrobeats, Gospel, Comedy Skits"
            helper="Be specific — not just 'music' or 'content'"
            error={errors.genre}
          />
        </div>

        <FormField
          label="Your Bio"
          name="bio"
          as="textarea"
          value={form.bio}
          onChange={set("bio")}
          placeholder="Tell us who you are, what you create, where you're at in your career, and what you're looking for from FM2..."
          rows={6}
          required
          helper="Minimum 100 characters. Be real — tell us your actual story."
          error={errors.bio}
        />

        <div className="flex flex-col gap-1 pb-2 border-b mt-2" style={{ borderColor: "var(--color-fm2-border)" }}>
          <span className="eyebrow text-xs">Social & Streaming Links</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Instagram"
            name="instagram"
            type="url"
            value={form.instagram}
            onChange={set("instagram")}
            placeholder="https://instagram.com/yourhandle"
            error={errors.instagram}
          />
          <FormField
            label="YouTube"
            name="youtube"
            type="url"
            value={form.youtube}
            onChange={set("youtube")}
            placeholder="https://youtube.com/@yourchannel"
            error={errors.youtube}
          />
          <FormField
            label="Spotify / Apple Music"
            name="spotify"
            type="url"
            value={form.spotify}
            onChange={set("spotify")}
            placeholder="https://open.spotify.com/artist/..."
            error={errors.spotify}
          />
          <FormField
            label="TikTok"
            name="tiktok"
            type="url"
            value={form.tiktok}
            onChange={set("tiktok")}
            placeholder="https://tiktok.com/@yourhandle"
            error={errors.tiktok}
          />
        </div>

        <FormField
          label="Portfolio / Best Work"
          name="portfolioUrl"
          type="url"
          value={form.portfolioUrl}
          onChange={set("portfolioUrl")}
          placeholder="https://..."
          helper="Link to your best single piece of work if the above links don't capture it."
          error={errors.portfolioUrl}
        />

        <div className="flex items-center justify-between pt-4">
          <p className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>
            Our A&R team reviews every submission. Expect a response within 7–10 business days.
          </p>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            rightIcon={!isSubmitting ? <Send size={15} /> : undefined}
          >
            Submit Enrollment
          </Button>
        </div>

      </form>
    </div>
  );
}