// ============================================================
// FM2 EMPIRE — FORM FIELD COMPONENT
// Reusable field used across all intake forms.
// Handles: text, email, tel, url, textarea, select.
// Shows error state with message, required indicator,
// and optional helper text below the field.
// ============================================================

"use client";

import { cn } from "@/lib/utils";

type BaseFieldProps = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  helper?: string;
  className?: string;
};

type InputProps = BaseFieldProps & {
  type: "text" | "email" | "tel" | "url" | "number";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  as?: never;
  options?: never;
  rows?: never;
};

type TextareaProps = BaseFieldProps & {
  as: "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  type?: never;
  options?: never;
};

type SelectProps = BaseFieldProps & {
  as: "select";
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  type?: never;
  rows?: never;
};

type FormFieldProps = InputProps | TextareaProps | SelectProps;

const baseInputStyles = {
  backgroundColor: "var(--color-fm2-black)",
  border: "1px solid var(--color-fm2-border)",
  color: "var(--color-fm2-white)",
  borderRadius: "var(--radius-md)",
};

const errorInputStyles = {
  ...baseInputStyles,
  border: "1px solid var(--color-fm2-red)",
};

const focusClass =
  "focus:outline-none focus:ring-1 focus:ring-[#C9A84C] focus:border-[#C9A84C]";

export default function FormField(props: FormFieldProps) {
  const { label, name, error, required, helper, className } = props;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {/* Label */}
      <label
        htmlFor={name}
        className="text-xs font-semibold tracking-wide"
        style={{ color: "var(--color-fm2-white)" }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: "var(--color-fm2-gold)" }}>
            *
          </span>
        )}
      </label>

      {/* Input / Textarea / Select */}
      {props.as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
          rows={props.rows ?? 4}
          className={cn("px-4 py-3 text-sm resize-none transition-all duration-200", focusClass)}
          style={error ? errorInputStyles : baseInputStyles}
        />
      ) : props.as === "select" ? (
        <select
          id={name}
          name={name}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          className={cn("px-4 py-3 text-sm transition-all duration-200 cursor-pointer", focusClass)}
          style={error ? errorInputStyles : baseInputStyles}
        >
          <option value="" disabled>
            {props.placeholder ?? "Select an option"}
          </option>
          {props.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={props.type}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
          className={cn("px-4 py-3 text-sm transition-all duration-200", focusClass)}
          style={error ? errorInputStyles : baseInputStyles}
        />
      )}

      {/* Error message */}
      {error && (
        <p className="text-xs" style={{ color: "var(--color-fm2-red)" }}>
          {error}
        </p>
      )}

      {/* Helper text */}
      {helper && !error && (
        <p className="text-xs" style={{ color: "var(--color-fm2-muted)" }}>
          {helper}
        </p>
      )}
    </div>
  );
}