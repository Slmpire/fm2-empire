# FM2 Empire — Next.js Landing (Marketing) Site

A cinematic marketing landing site for **FM2 Empire** built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

This repository contains the **marketing landing page** at `/` along with reusable UI components and shared utilities used across the platform.

---

## Overview

FM2 Empire’s landing site is designed as a modern, responsive marketing experience with animated sections, reusable components, and a scalable project structure. It combines clean UI composition with motion effects and centralized styling tokens for easy maintenance and future expansion.

---

## Features

* **Responsive marketing landing page** built from reusable sections
* **Accessible UI structure** with clean component composition
* **Scroll-triggered animations** powered by Framer Motion
* **Tailwind CSS design tokens** defined in `app/globals.css`
* **Reusable utility helpers** in `lib/utils.ts`
* **Centralized shared TypeScript types** in `types/index.ts`

---

## Tech Stack

* **Framework:** Next.js
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animation:** Framer Motion
* **Linting:** ESLint

---

## Project Structure

```bash
.
├── app/
│   ├── (marketing)/
│   │   └── page.tsx              # Marketing landing entry page
│   ├── globals.css               # Global styles + design tokens
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Page wrapper
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Main navigation
│   │   └── Footer.tsx            # Footer
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Media.tsx
│   │   ├── Events.tsx
│   │   └── Team.tsx
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── AnimatedText.tsx
│       ├── SectionLabel.tsx
│       └── PlaceholderMedia.tsx
│
├── lib/
│   └── utils.ts                  # Utility helpers like cn() and formatDate()
│
├── types/
│   └── index.ts                  # Shared TypeScript types
│
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS config
├── package.json                  # Project scripts and dependencies
└── tsconfig.json                 # TypeScript config
```

---

## Important Files & Components

### App Entry

* **Root layout:** `app/layout.tsx`
* **Marketing landing page:** `app/(marketing)/page.tsx`
* **Page wrapper:** `app/page.tsx`

### Layout Components

* **Navbar:** `components/layout/Navbar.tsx`
* **Footer:** `components/layout/Footer.tsx`

### Landing Page Sections

* `components/sections/Hero.tsx`
* `components/sections/About.tsx`
* `components/sections/Services.tsx`
* `components/sections/Media.tsx`
* `components/sections/Events.tsx`
* `components/sections/Team.tsx`

### UI Primitives

* `components/ui/Button.tsx`
* `components/ui/AnimatedText.tsx`
* `components/ui/SectionLabel.tsx`
* `components/ui/PlaceholderMedia.tsx`

### Shared Utilities

* `lib/utils.ts`

  * `cn()` — merges Tailwind class names conditionally
  * `formatDate()` — date formatting helper

### Shared Types

* `types/index.ts`

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

or with another package manager:

```bash
pnpm install
# or
yarn install
```

---

### 2. Run the Development Server

```bash
npm run dev
```

The app will be available at:

```bash
http://localhost:3000
```

---

### 3. Build for Production

```bash
npm run build
```

---

### 4. Start the Production Server

```bash
npm run start
```

---

## Available Scripts

Common scripts are defined in `package.json`. Typical ones include:

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Run production build
npm run lint     # Run ESLint
```

---

## Styling & Design System

The project uses **Tailwind CSS** with **design tokens and CSS variables** defined in:

```bash
app/globals.css
```

### Styling Guidelines

* Prefer **design tokens / CSS variables** over hardcoded colors, spacing, or sizes
* Use `cn()` from `lib/utils.ts` to combine conditional Tailwind classes cleanly
* Keep section spacing and layout patterns consistent across the landing page

---

## Contributor Notes

When working on the project:

* **Update shared types** in `types/index.ts` when adding new data shapes
* **Use reusable UI components** where possible instead of duplicating patterns
* **Replace placeholder visuals** in `PlaceholderMedia` with actual media assets when available
* **Preserve Navbar behavior**, including:

  * mobile menu interactions
  * scroll-aware UI behavior
* Keep changes scoped and maintain consistent spacing, typography, and motion patterns

---

## Environment Variables

You can optionally define:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

This is used for site metadata in `app/layout.tsx`.

---

## Fonts

Fonts are loaded using **`next/font`** in:

```bash
app/layout.tsx
```

---

## Deployment

This app is ready to deploy on **Vercel** (recommended).

### Deploy with Vercel

1. Push the repository to GitHub
2. Import the project into Vercel
3. Set any required environment variables (e.g. `NEXT_PUBLIC_SITE_URL`)
4. Deploy

You can also deploy using standard Next.js hosting workflows if preferred.

---

## Troubleshooting

### Styles are not reflecting

* Make sure the Tailwind import remains at the top of `app/globals.css`
* Confirm Tailwind/PostCSS configuration files are intact

### Linting issues

Run:

```bash
npm run lint
```

Check the configuration in:

```bash
eslint.config.mjs
```

### Build issues

* Ensure all imports are correct and paths match the project structure
* Verify any new TypeScript types are properly exported from `types/index.ts`

---

## Contributing

Contributions are welcome.

### Suggested workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Contribution guidelines

* Keep changes focused and scoped
* Include screenshots or recordings for UI changes when possible
* Update relevant types, utilities, or documentation when needed

---

## License

MIT License

---

## Future Improvements

Potential areas for expansion:

* Replace placeholder media with production assets
* Add CMS or admin-backed content management for sections
* Improve SEO metadata and social sharing previews
* Add analytics and event tracking
* Expand reusable component documentation

---
