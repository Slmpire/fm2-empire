// ============================================================
// FM2 EMPIRE — SERVICE REQUEST FORM
// For clients who want FM2 to work on their project without
// joining the roster. Fields: contact info, service needed,
// project description, budget range, timeline.
//
// TODO (Supabase): replace simulate block with:
// supabase.from("applications").insert({ type: "service_request", ... })
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
  email: string;
  phone: string;
  organisation: string;
  serviceNeeded: string;
  projectDescription: string;
  budget: string;
  timeline: string;
  referralSource: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const EMPTY: FormData = {
  fullName: "",
  email: "",
  phone: "",
  organisation: "",
  serviceNeeded: "",
  projectDescription: "",
  budget: "",
  timeline: "",
  referralSource: "",
};

const SERVICE_OPTIONS = [
  { label: "Music Video Production", value: "music_video" },
  { label: "Podcast Production", value: "podcast" },
  { label: "Short Film / Content Video", value: "short_film" },
  { label: "Social Media Content", value: "social_content" },
  { label: "Brand Campaign", value: "brand_campaign" },
  { label: "Photography", value: "photography" },
  { label: "Creative Direction", value: "creative_direction" },
  { label: "Event Coverage", value: "event_coverage" },
  { label: "Multiple Services", value: "multiple" },
  { label: "Not Sure Yet", value: "unsure" },
];

const BUDGET_OPTIONS = [
  { label: "Under ₦500,000", value: "under_500k" },
  { label: "₦500,000 – ₦1,000,000", value: "500k_1m" },
  { label: "₦1,000,000 – ₦3,000,000", value: "1m_3m" },
  { label: "₦3,000,000 – ₦5,000,000", value: "3m_5m" },
  { label: "Above ₦5,000,000", value: "above_5m" },
  { label: "To be discussed", value: "tbd" },
];

const TIMELINE_OPTIONS = [
  { label: "ASAP (within 2 weeks)", value: "asap" },
  { label: "1 month", value: "1_month" },
  { label: "2–3 months", value: "2_3_months" },
  { label: "3–6 months", value: "3_6_months" },
  { label: "Flexible", value: "flexible" },
];

const REFERRAL_OPTIONS = [
  { label: "Instagram", value: "instagram" },
  { label: "Twitter / X", value: "twitter" },
  { label: "YouTube", value: "youtube" },
  { label: "TikTok", value: "tiktok" },
  { label: "Word of mouth / Referral", value: "referral" },
  { label: "Google Search", value: "google" },
  { label: "FM2 Event", value: "event" },
  { label: "Other", value: "other" },
];

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim()) errors.fullName = "Full name is required";
  if (!isValidEmail(data.email)) errors.email = "A valid email is required";
  if (data.phone && !isValidNigerianPhone(data.phone))
    errors.phone = "Enter a valid Nigerian phone number";
  if (!data.serviceNeeded) errors.serviceNeeded = "Please select the service you need";
  if (!data.projectDescription.trim() || data.projectDescription.trim().length < 60)
    errors.projectDescription =
      "Please describe your project in at least a few sentences";

  return errors;
}

export default function ServiceForm() {
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
        type: "service_request",
        status: "new",
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        organisation: form.organisation,
        data: {
          serviceNeeded: form.serviceNeeded,
          projectDescription: form.projectDescription,
          budget: form.budget,
          timeline: form.timeline,
          referralSource: form.referralSource,
        },
      });
      if (error) throw error;
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
        title="Request Received"
        message="Thanks for reaching out. Our team will review your project brief and get back to you within 2–3 business days to discuss scope, timeline, and pricing."
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
          Service Request
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
          Tell us about your project. The more detail you give us, the faster
          we can give you an accurate response.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

        {/* Contact info */}
        <div className="flex flex-col gap-1 pb-2 border-b" style={{ borderColor: "var(--color-fm2-border)" }}>
          <span className="eyebrow text-xs">Your Details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Full Name"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={set("fullName")}
            placeholder="Your full name"
            required
            error={errors.fullName}
          />
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={set("phone")}
            placeholder="08012345678"
            helper="Optional but speeds up our response"
            error={errors.phone}
          />
          <FormField
            label="Organisation / Brand"
            name="organisation"
            type="text"
            value={form.organisation}
            onChange={set("organisation")}
            placeholder="Company or brand name (if applicable)"
            error={errors.organisation}
          />
        </div>

        {/* Project details */}
        <div className="flex flex-col gap-1 pb-2 border-b mt-2" style={{ borderColor: "var(--color-fm2-border)" }}>
          <span className="eyebrow text-xs">Project Details</span>
        </div>

        <FormField
          label="Service Needed"
          name="serviceNeeded"
          as="select"
          value={form.serviceNeeded}
          onChange={set("serviceNeeded")}
          options={SERVICE_OPTIONS}
          placeholder="Select the service you need"
          required
          error={errors.serviceNeeded}
        />

        <FormField
          label="Project Description"
          name="projectDescription"
          as="textarea"
          value={form.projectDescription}
          onChange={set("projectDescription")}
          placeholder="Describe your project — what it is, what you want to achieve, any specific ideas or references you have in mind..."
          rows={5}
          required
          helper="Be as specific as possible. Vague briefs get slower responses."
          error={errors.projectDescription}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Budget Range"
            name="budget"
            as="select"
            value={form.budget}
            onChange={set("budget")}
            options={BUDGET_OPTIONS}
            placeholder="Select a budget range"
            helper="Honest budget info helps us scope correctly"
            error={errors.budget}
          />
          <FormField
            label="Timeline"
            name="timeline"
            as="select"
            value={form.timeline}
            onChange={set("timeline")}
            options={TIMELINE_OPTIONS}
            placeholder="Select a timeline"
            error={errors.timeline}
          />
        </div>

        <FormField
          label="How Did You Hear About FM2?"
          name="referralSource"
          as="select"
          value={form.referralSource}
          onChange={set("referralSource")}
          options={REFERRAL_OPTIONS}
          placeholder="Select one"
          error={errors.referralSource}
        />

        <div className="flex items-center justify-between pt-4">
          <p className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>
            We respond to service requests within 2–3 business days.
          </p>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            rightIcon={!isSubmitting ? <Send size={15} /> : undefined}
          >
            Submit Request
          </Button>
        </div>

      </form>
    </div>
  );
}