// ============================================================
// FM2 EMPIRE — PARTNERSHIP / INQUIRY FORM
// Covers: general inquiries, partnership proposals,
// collaboration requests, sponsorship inquiries.
//
// TODO (Supabase): replace simulate block with:
// supabase.from("applications").insert({ type: inquiryType, ... })
// ============================================================

"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import FormField from "@/components/ui/FormField";
import FormSuccess from "@/components/forms/FormSuccess";
import Button from "@/components/ui/Button";
import { isValidEmail } from "@/lib/utils";

type InquiryType = "partnership" | "collaboration" | "sponsorship" | "general_inquiry";

type FormData = {
  inquiryType: InquiryType | "";
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
  website: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const EMPTY: FormData = {
  inquiryType: "",
  fullName: "",
  email: "",
  phone: "",
  organisation: "",
  website: "",
  subject: "",
  message: "",
};

const INQUIRY_TYPE_OPTIONS = [
  { label: "Partnership Proposal", value: "partnership" },
  { label: "Creative Collaboration", value: "collaboration" },
  { label: "Sponsorship / Brand Deal", value: "sponsorship" },
  { label: "General Inquiry", value: "general_inquiry" },
];

const SUCCESS_MESSAGES: Record<InquiryType, { title: string; message: string }> = {
  partnership: {
    title: "Partnership Inquiry Received",
    message:
      "Thank you for your interest in partnering with FM2 Empire. Our partnerships team will review your proposal and get back to you within 3–5 business days.",
  },
  collaboration: {
    title: "Collaboration Request Received",
    message:
      "We've received your collaboration request. Our creative team will be in touch within 3–5 business days to explore the opportunity.",
  },
  sponsorship: {
    title: "Sponsorship Inquiry Received",
    message:
      "Thanks for your interest in sponsoring FM2. Our events and partnerships team will review your inquiry and respond within 3–5 business days.",
  },
  general_inquiry: {
    title: "Message Received",
    message:
      "Thanks for reaching out to FM2 Empire. We'll get back to you within 2–3 business days.",
  },
};

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.inquiryType) errors.inquiryType = "Please select the type of inquiry";
  if (!data.fullName.trim()) errors.fullName = "Full name is required";
  if (!isValidEmail(data.email)) errors.email = "A valid email is required";
  if (!data.subject.trim()) errors.subject = "A subject line is required";
  if (!data.message.trim() || data.message.trim().length < 50)
    errors.message = "Please write at least a few sentences about your inquiry";

  return errors;
}

export default function PartnershipForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const set = (field: keyof FormData) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value as FormData[typeof field] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(form);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: supabase.from("applications").insert({
      //   type: form.inquiryType,
      //   status: "new",
      //   full_name: form.fullName,
      //   email: form.email,
      //   phone: form.phone,
      //   organisation: form.organisation,
      //   subject: form.subject,
      //   message: form.message,
      //   data: { website: form.website },
      // });
      await new Promise((res) => setTimeout(res, 1000));
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const successContent = form.inquiryType
    ? SUCCESS_MESSAGES[form.inquiryType as InquiryType]
    : SUCCESS_MESSAGES.general_inquiry;

  if (isSubmitted) {
    return (
      <FormSuccess
        title={successContent.title}
        message={successContent.message}
        primaryAction={{ label: "Back to Homepage", href: "/" }}
        secondaryAction={{ label: "Contact Us Directly", href: "/contact" }}
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
          Partnership & Inquiries
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-fm2-muted)" }}>
          Partnerships, collaborations, sponsorships, or general questions —
          this is the right place. Tell us what you have in mind.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

        {/* Inquiry type */}
        <FormField
          label="Type of Inquiry"
          name="inquiryType"
          as="select"
          value={form.inquiryType}
          onChange={set("inquiryType")}
          options={INQUIRY_TYPE_OPTIONS}
          placeholder="What is this about?"
          required
          error={errors.inquiryType}
        />

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
            placeholder="08012345678 (optional)"
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

        <FormField
          label="Website"
          name="website"
          type="url"
          value={form.website}
          onChange={set("website")}
          placeholder="https://yourwebsite.com (optional)"
          error={errors.website}
        />

        {/* Message */}
        <div className="flex flex-col gap-1 pb-2 border-b mt-2" style={{ borderColor: "var(--color-fm2-border)" }}>
          <span className="eyebrow text-xs">Your Message</span>
        </div>

        <FormField
          label="Subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={set("subject")}
          placeholder="Brief summary of what this is about"
          required
          error={errors.subject}
        />

        <FormField
          label="Message"
          name="message"
          as="textarea"
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us what you have in mind — the more context you give us, the better we can respond..."
          rows={6}
          required
          helper="Minimum 50 characters."
          error={errors.message}
        />

        <div className="flex items-center justify-between pt-4">
          <p className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>
            We respond to all partnership inquiries within 3–5 business days.
          </p>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            rightIcon={!isSubmitting ? <Send size={15} /> : undefined}
          >
            Send Inquiry
          </Button>
        </div>

      </form>
    </div>
  );
}