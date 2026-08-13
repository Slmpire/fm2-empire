// ============================================================
// FM2 EMPIRE — INTERNSHIP APPLICATION FORM
// Fields: personal info, academic background, department
// preference, cover letter, portfolio/CV links.
//
// On submit: currently logs to console and shows success state.
// Supabase wiring: replace the TODO block with a single
// supabase.from('applications').insert({...}) call.
// ============================================================

"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import FormField from "@/components/ui/FormField";
import FormSuccess from "@/components/forms/FormSuccess";
import Button from "@/components/ui/Button";
import { isValidEmail, isValidNigerianPhone } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

// ------------------------------------------------------------
// TYPES
// ------------------------------------------------------------

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  university: string;
  course: string;
  year: string;
  department: string;
  portfolioUrl: string;
  resumeUrl: string;
  coverLetter: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const EMPTY: FormData = {
  fullName: "",
  email: "",
  phone: "",
  university: "",
  course: "",
  year: "",
  department: "",
  portfolioUrl: "",
  resumeUrl: "",
  coverLetter: "",
};

const YEAR_OPTIONS = [
  { label: "100 Level", value: "100" },
  { label: "200 Level", value: "200" },
  { label: "300 Level", value: "300" },
  { label: "400 Level", value: "400" },
  { label: "500 Level", value: "500" },
  { label: "Graduate / Postgraduate", value: "graduate" },
  { label: "Recently Graduated", value: "graduated" },
];

const DEPARTMENT_OPTIONS = [
  { label: "Music Production", value: "music_production" },
  { label: "Video Production", value: "video_production" },
  { label: "Content Creation", value: "content_creation" },
  { label: "Talent Management", value: "talent_management" },
  { label: "Events & Logistics", value: "events" },
  { label: "Brand & Marketing", value: "brand_marketing" },
  { label: "Creative Direction", value: "creative_direction" },
  { label: "Administration", value: "admin" },
];

// ------------------------------------------------------------
// VALIDATION
// ------------------------------------------------------------

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.fullName.trim())
    errors.fullName = "Full name is required";
  if (!isValidEmail(data.email))
    errors.email = "A valid email address is required";
  if (data.phone && !isValidNigerianPhone(data.phone))
    errors.phone = "Enter a valid Nigerian phone number";
  if (!data.university.trim())
    errors.university = "University or institution is required";
  if (!data.course.trim())
    errors.course = "Course of study is required";
  if (!data.year)
    errors.year = "Please select your current level";
  if (!data.department)
    errors.department = "Please select a preferred department";
  if (!data.coverLetter.trim() || data.coverLetter.trim().length < 80)
    errors.coverLetter =
      "Please write at least a few sentences about why you want to intern at FM2";

  return errors;
}

// ------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------

export default function InternshipForm() {
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
      // Scroll to first error
      const firstError = document.querySelector("[data-error]");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    try {
    const { error } = await supabase.from("applications").insert({
        type: "internship",
        status: "new",
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        data: {
          university: form.university,
          course: form.course,
          year: form.year,
          department: form.department,
          portfolioUrl: form.portfolioUrl,
          resumeUrl: form.resumeUrl,
          coverLetter: form.coverLetter,
        },
      });
      if (error) throw error;
      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setErrors({ fullName: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <FormSuccess
        title="Application Received"
        message="Thanks for applying for the FM2 internship program. Our team reviews applications on a rolling basis — we'll be in touch within 5–7 business days."
        primaryAction={{ label: "Back to Homepage", href: "/" }}
        secondaryAction={{ label: "View Our Work", href: "/media" }}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Form header */}
      <div className="flex flex-col gap-2 mb-10">
        <h2
          className="font-display font-bold"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            color: "var(--color-fm2-white)",
          }}
        >
          Internship Application
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
          Fields marked <span style={{ color: "var(--color-fm2-gold)" }}>*</span> are required.
          Portfolio and CV links are optional but strongly encouraged.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

        {/* Personal info */}
        <div className="flex flex-col gap-1 pb-2 border-b" style={{ borderColor: "var(--color-fm2-border)" }}>
          <span className="eyebrow text-xs">Personal Information</span>
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

        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={set("phone")}
          placeholder="08012345678"
          helper="Nigerian number preferred. WhatsApp-enabled if possible."
          error={errors.phone}
        />

        {/* Academic background */}
        <div className="flex flex-col gap-1 pb-2 border-b mt-2" style={{ borderColor: "var(--color-fm2-border)" }}>
          <span className="eyebrow text-xs">Academic Background</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="University / Institution"
            name="university"
            type="text"
            value={form.university}
            onChange={set("university")}
            placeholder="e.g. University of Lagos"
            required
            error={errors.university}
          />
          <FormField
            label="Course of Study"
            name="course"
            type="text"
            value={form.course}
            onChange={set("course")}
            placeholder="e.g. Mass Communication"
            required
            error={errors.course}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Current Level"
            name="year"
            as="select"
            value={form.year}
            onChange={set("year")}
            options={YEAR_OPTIONS}
            placeholder="Select your level"
            required
            error={errors.year}
          />
          <FormField
            label="Preferred Department"
            name="department"
            as="select"
            value={form.department}
            onChange={set("department")}
            options={DEPARTMENT_OPTIONS}
            placeholder="Select a department"
            required
            error={errors.department}
          />
        </div>

        {/* Links */}
        <div className="flex flex-col gap-1 pb-2 border-b mt-2" style={{ borderColor: "var(--color-fm2-border)" }}>
          <span className="eyebrow text-xs">Portfolio & CV</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="Portfolio / Work Samples"
            name="portfolioUrl"
            type="url"
            value={form.portfolioUrl}
            onChange={set("portfolioUrl")}
            placeholder="https://yourportfolio.com"
            helper="Link to your work — Instagram, YouTube, Behance, etc."
            error={errors.portfolioUrl}
          />
          <FormField
            label="CV / Resume"
            name="resumeUrl"
            type="url"
            value={form.resumeUrl}
            onChange={set("resumeUrl")}
            placeholder="https://drive.google.com/..."
            helper="Google Drive, Dropbox, or any public link."
            error={errors.resumeUrl}
          />
        </div>

        {/* Cover letter */}
        <div className="flex flex-col gap-1 pb-2 border-b mt-2" style={{ borderColor: "var(--color-fm2-border)" }}>
          <span className="eyebrow text-xs">Cover Letter</span>
        </div>

        <FormField
          label="Why do you want to intern at FM2?"
          name="coverLetter"
          as="textarea"
          value={form.coverLetter}
          onChange={set("coverLetter")}
          placeholder="Tell us about yourself, why FM2, and what you hope to gain from this experience..."
          rows={6}
          required
          helper="Minimum 80 characters. Be specific — generic answers get skipped."
          error={errors.coverLetter}
        />

        {/* Submit */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>
            We review applications on a rolling basis and respond within 5–7 business days.
          </p>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            rightIcon={!isSubmitting ? <Send size={15} /> : undefined}
          >
            Submit Application
          </Button>
        </div>

      </form>
    </div>
  );
}