// ============================================================
// FM2 EMPIRE — BUTTON COMPONENT
// Single reusable button used everywhere on the platform.
// Variants: primary (gold fill), secondary (outlined), ghost.
// Sizes: sm, md (default), lg.
// Supports: links (href), buttons (onClick), loading state.
// ============================================================

"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";

// ------------------------------------------------------------
// TYPES
// ------------------------------------------------------------

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
    isExternal?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
    isExternal?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

// ------------------------------------------------------------
// STYLE MAP
// ------------------------------------------------------------

const variantStyles: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  ghost: "btn btn-ghost",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
};

// ------------------------------------------------------------
// COMPONENT
// ------------------------------------------------------------

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    variantStyles[variant],
    sizeStyles[size],
    isLoading && "opacity-70 cursor-not-allowed pointer-events-none",
    className
  );

  const content = (
    <>
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && (
        <span className="shrink-0">{rightIcon}</span>
      )}
    </>
  );

  // Render as Next.js Link if href is provided
  if ("href" in props && props.href) {
    const { href, isExternal, ...rest } = props as ButtonAsLink;
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(rest as object)}>
        {content}
      </Link>
    );
  }

  // Render as button
  const { ...rest } = props as ButtonAsButton;
  return (
    <button
      className={classes}
      disabled={isLoading}
      {...rest}
    >
      {content}
    </button>
  );
}