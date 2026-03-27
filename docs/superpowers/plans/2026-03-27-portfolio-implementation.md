# Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-page portfolio site styled as a code editor/file explorer, with a scroll-driven MacBook opening animation intro, bilingual FR/EN support, and dark/light mode.

**Architecture:** Next.js 15 App Router with `[locale]` routing via next-intl. The page has two phases: (1) a scroll-driven MacBook 3D animation that opens and zooms into the screen, then (2) the editor UI (titlebar, sidebar, tabs, content area, status bar) becomes the full viewport. All content is in JSON translation files.

**Tech Stack:** Next.js 15, Tailwind CSS v4, next-intl, next-themes, TypeScript

---

## File Structure

```
src/
  app/
    [locale]/
      layout.tsx              # Root layout: html, body, providers
      page.tsx                # Main page: MacbookIntro + Window
  components/
    MacbookIntro.tsx          # Scroll-driven MacBook opening animation
    Window.tsx                # Editor window container (titlebar + sidebar + main)
    Titlebar.tsx              # macOS dots, title, lang toggle, theme toggle
    Sidebar.tsx               # File tree navigation
    Tabs.tsx                  # Editor tabs reflecting active section
    StatusBar.tsx             # Git branch, encoding, file type, copyright
    ThemeToggle.tsx           # Dark/light mode toggle button
    LocaleSwitcher.tsx        # FR/EN language toggle
    sections/
      Hero.tsx                # README.md content (name, title, bio)
      Projects.tsx            # Project cards grid
      Experience.tsx          # Timeline
      Contact.tsx             # Key-value contact info + CV download
  i18n/
    routing.ts                # Locale routing config
    request.ts                # Per-request locale resolution
    navigation.ts             # Locale-aware Link, useRouter, etc.
  middleware.ts               # next-intl locale middleware
messages/
  fr.json                     # French translations
  en.json                     # English translations
public/
  cv.pdf                      # Downloadable CV
  macbook-photo.jpg           # User's MacBook photo (placeholder until provided)
```

---

### Task 1: Scaffold Next.js 15 + Tailwind v4

**Files:**
- Create: entire project scaffold via `create-next-app`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Next.js project in current directory**

Run: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --turbopack --yes`

Expected: Project scaffolded with Next.js 15, Tailwind v4, TypeScript, App Router, src directory.

- [ ] **Step 2: Verify the scaffold works**

Run: `npm run dev` (then stop it after confirming it starts)

Expected: Dev server starts on localhost:3000 without errors.

- [ ] **Step 3: Configure Tailwind dark mode and custom theme**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --font-mono: "SF Mono", "Fira Code", "Cascadia Code", "Consolas", monospace;
  --color-editor-bg: #0e0e0e;
  --color-editor-bg-deep: #050505;
  --color-editor-sidebar: #111111;
  --color-editor-border: #1a1a1a;
  --color-editor-text: #d4d4d4;
  --color-editor-muted: #555555;
  --color-editor-faint: #333333;
  --color-syntax-comment: #444444;
  --color-syntax-string: #a8d4a2;
  --color-syntax-property: #7ab0df;
  --color-syntax-keyword: #c9a0dc;
  --color-syntax-type: #e0c285;
}
```

- [ ] **Step 4: Clean up default page**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen bg-editor-bg-deep text-editor-text font-mono">
      <p>Portfolio scaffold works.</p>
    </main>
  );
}
```

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alexandre Roy — Portfolio",
  description: "Développeur · Québec",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 5: Verify custom theme works**

Run: `npm run dev`

Expected: Page shows "Portfolio scaffold works." with dark background (#050505) and monospace font.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 + Tailwind v4 with editor theme"
```

---

### Task 2: Set up i18n with next-intl

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/i18n/navigation.ts`
- Create: `src/middleware.ts`
- Create: `messages/fr.json`
- Create: `messages/en.json`
- Modify: `next.config.ts`
- Create: `src/app/[locale]/layout.tsx`
- Create: `src/app/[locale]/page.tsx`
- Delete: `src/app/layout.tsx` (moved to `[locale]`)
- Delete: `src/app/page.tsx` (moved to `[locale]`)

- [ ] **Step 1: Install next-intl**

Run: `npm install next-intl`

- [ ] **Step 2: Create i18n routing config**

Create `src/i18n/routing.ts`:

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
});
```

- [ ] **Step 3: Create i18n request config**

Create `src/i18n/request.ts`:

```ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 4: Create i18n navigation helpers**

Create `src/i18n/navigation.ts`:

```ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

- [ ] **Step 5: Create middleware**

Create `src/middleware.ts`:

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
```

- [ ] **Step 6: Update next.config.ts**

Replace `next.config.ts` with:

```ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

- [ ] **Step 7: Create translation files**

Create `messages/fr.json`:

```json
{
  "Hero": {
    "name": "Alexandre Roy",
    "title": "Développeur · Québec",
    "bio": "Étudiant en technique informatique au Cégep Garneau, passionné par le développement web et la résolution de problèmes. Bilingue français-anglais avec une forte éthique de travail."
  },
  "Projects": {
    "heading": "Projets",
    "items": [
      {
        "file": "projet-01.md",
        "name": "Projet exemple",
        "description": "Description courte du projet et de ce qu'il accomplit.",
        "tags": ["React", "Node.js"]
      },
      {
        "file": "projet-02.md",
        "name": "Projet exemple",
        "description": "Description courte du projet et de ce qu'il accomplit.",
        "tags": ["Java", "SQL"]
      }
    ]
  },
  "Experience": {
    "heading": "Expérience",
    "items": [
      {
        "date": "2023 — Présent",
        "role": "Arbitre de dekhockey",
        "place": "DDLC — Québec, QC",
        "description": "Arbitrage de parties, résolution de conflits, application des règlements."
      },
      {
        "date": "Été 2025",
        "role": "Accompagnateur",
        "place": "Camp Kéno — Québec, QC",
        "description": "Accompagnement d'un jeune avec des besoins spéciaux, gestion de groupe."
      },
      {
        "date": "Été 2024",
        "role": "Laveur à pression",
        "place": "Qualité Étudiants — Québec, QC",
        "description": "Nettoyage résidentiel, service personnalisé chez les clients."
      },
      {
        "date": "2019 — 2022",
        "role": "Commis à la boulangerie",
        "place": "IGA — Québec, QC",
        "description": "Production, service à la clientèle, gestion de l'espace de travail."
      }
    ]
  },
  "Contact": {
    "heading": "Contact",
    "email": "alexandre15roy@gmail.com",
    "downloadCv": "télécharger cv.pdf"
  },
  "Sidebar": {
    "explorer": "EXPLORER"
  },
  "StatusBar": {
    "branch": "main",
    "encoding": "UTF-8",
    "fileType": "Markdown"
  }
}
```

Create `messages/en.json`:

```json
{
  "Hero": {
    "name": "Alexandre Roy",
    "title": "Developer · Québec",
    "bio": "Computer Science student at Cégep Garneau, passionate about web development and problem-solving. Bilingual French-English with a strong work ethic."
  },
  "Projects": {
    "heading": "Projects",
    "items": [
      {
        "file": "project-01.md",
        "name": "Example project",
        "description": "Short description of the project and what it achieves.",
        "tags": ["React", "Node.js"]
      },
      {
        "file": "project-02.md",
        "name": "Example project",
        "description": "Short description of the project and what it achieves.",
        "tags": ["Java", "SQL"]
      }
    ]
  },
  "Experience": {
    "heading": "Experience",
    "items": [
      {
        "date": "2023 — Present",
        "role": "Dek hockey referee",
        "place": "DDLC — Québec, QC",
        "description": "Game officiating, conflict resolution, rule enforcement."
      },
      {
        "date": "Summer 2025",
        "role": "Camp counselor",
        "place": "Camp Kéno — Québec, QC",
        "description": "Support for a youth with special needs, group management."
      },
      {
        "date": "Summer 2024",
        "role": "Pressure washer",
        "place": "Qualité Étudiants — Québec, QC",
        "description": "Residential cleaning, personalized client service."
      },
      {
        "date": "2019 — 2022",
        "role": "Bakery clerk",
        "place": "IGA — Québec, QC",
        "description": "Production, customer service, workspace management."
      }
    ]
  },
  "Contact": {
    "heading": "Contact",
    "email": "alexandre15roy@gmail.com",
    "downloadCv": "download cv.pdf"
  },
  "Sidebar": {
    "explorer": "EXPLORER"
  },
  "StatusBar": {
    "branch": "main",
    "encoding": "UTF-8",
    "fileType": "Markdown"
  }
}
```

- [ ] **Step 8: Move layout and page to [locale] route**

Delete `src/app/layout.tsx` and `src/app/page.tsx`.

Create `src/app/[locale]/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

export const metadata: Metadata = {
  title: "Alexandre Roy — Portfolio",
  description: "Développeur · Québec",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Create `src/app/[locale]/page.tsx`:

```tsx
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Hero");

  return (
    <main className="min-h-screen bg-editor-bg-deep text-editor-text font-mono">
      <h1>{t("name")}</h1>
      <p>{t("title")}</p>
    </main>
  );
}
```

- [ ] **Step 9: Verify i18n works**

Run: `npm run dev`

Expected: Visiting `/fr` shows "Alexandre Roy / Développeur · Québec". Visiting `/en` shows "Alexandre Roy / Developer · Québec". Root `/` redirects to `/fr`.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: add i18n with next-intl (FR/EN)"
```

---

### Task 3: Set up dark/light mode with next-themes

**Files:**
- Create: `src/components/Providers.tsx`
- Create: `src/components/ThemeToggle.tsx`
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Install next-themes**

Run: `npm install next-themes`

- [ ] **Step 2: Create Providers component**

Create `src/components/Providers.tsx`:

```tsx
"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}
```

- [ ] **Step 3: Create ThemeToggle component**

Create `src/components/ThemeToggle.tsx`:

```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[18px] w-[18px]" />;
  }

  return (
    <button
      aria-label="Toggle theme"
      className="text-editor-muted hover:text-editor-text transition-colors"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? "☀" : "☾"}
    </button>
  );
}
```

- [ ] **Step 4: Add light mode tokens to globals.css**

Append to `src/app/globals.css` after the `@theme` block:

```css
:root.light {
  --color-editor-bg: #ffffff;
  --color-editor-bg-deep: #fafafa;
  --color-editor-sidebar: #f5f5f5;
  --color-editor-border: #e5e5e5;
  --color-editor-text: #333333;
  --color-editor-muted: #888888;
  --color-editor-faint: #cccccc;
  --color-syntax-comment: #999999;
  --color-syntax-string: #4e7a42;
  --color-syntax-property: #2a6496;
  --color-syntax-keyword: #7b5fa5;
  --color-syntax-type: #a07030;
}
```

Note: The `@theme` block defines the dark (default) values. The `:root.light` block overrides them when next-themes applies the `light` class.

- [ ] **Step 5: Wire Providers into layout**

Update `src/app/[locale]/layout.tsx` — wrap children with Providers:

```tsx
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "@/components/Providers";
import "../globals.css";

export const metadata: Metadata = {
  title: "Alexandre Roy — Portfolio",
  description: "Développeur · Québec",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify dark/light toggle**

Temporarily add `<ThemeToggle />` to page.tsx and test toggling. Background should switch between #050505 (dark) and #fafafa (light).

Run: `npm run dev`

Expected: Clicking the toggle switches theme. Page reloads preserve the choice.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add dark/light mode with next-themes"
```

---

### Task 4: Build the editor Window shell

**Files:**
- Create: `src/components/Window.tsx`
- Create: `src/components/Titlebar.tsx`
- Create: `src/components/Sidebar.tsx`
- Create: `src/components/Tabs.tsx`
- Create: `src/components/StatusBar.tsx`
- Create: `src/components/LocaleSwitcher.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create LocaleSwitcher**

Create `src/components/LocaleSwitcher.tsx`:

```tsx
"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale() {
    const next = locale === "fr" ? "en" : "fr";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="text-[11px] text-editor-muted border border-editor-border px-2 py-0.5 rounded hover:text-editor-text transition-colors"
    >
      {locale === "fr" ? "FR / EN" : "EN / FR"}
    </button>
  );
}
```

- [ ] **Step 2: Create Titlebar**

Create `src/components/Titlebar.tsx`:

```tsx
import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Titlebar() {
  return (
    <div className="flex items-center px-4 py-2.5 bg-editor-sidebar border-b border-editor-border">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 text-center text-xs text-editor-muted">
        alexandre-roy — ~/portfolio
      </div>
      <div className="flex items-center gap-3">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create Sidebar**

Create `src/components/Sidebar.tsx`:

```tsx
"use client";

import { useTranslations } from "next-intl";

const files = [
  { id: "hero", label: "README.md", icon: "◇", indent: 1 },
  { id: "about", label: "about.md", icon: "◇", indent: 1 },
  { id: "projects", label: "projects/", icon: "▸", indent: 1, isFolder: true },
  { id: "experience", label: "experience.md", icon: "◇", indent: 1 },
  { id: "contact", label: "contact.json", icon: "◇", indent: 1 },
  { id: "cv", label: "cv.pdf", icon: "↓", indent: 1, isSeparated: true },
];

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const t = useTranslations("Sidebar");

  return (
    <div className="w-[200px] bg-editor-sidebar border-r border-editor-border py-3 flex-shrink-0 hidden md:block">
      <div className="px-4 pb-3 text-[10px] tracking-widest text-editor-faint">
        {t("explorer")}
      </div>
      <div className="text-[13px]">
        <div className="px-4 py-1.5 flex items-center gap-2 text-editor-muted">
          <span className="text-xs">▾</span>
          <span>~/alexandre-roy</span>
        </div>
        {files.map((file) => (
          <button
            key={file.id}
            onClick={() => {
              if (file.id === "cv") {
                window.open("/cv.pdf", "_blank");
              } else {
                onNavigate(file.id);
              }
            }}
            className={`w-full text-left px-4 py-1.5 flex items-center gap-2 transition-colors hover:bg-editor-border/50 ${
              file.indent === 1 ? "pl-8" : ""
            } ${
              activeSection === file.id
                ? "bg-editor-border/50 text-editor-text"
                : "text-editor-muted"
            } ${file.isSeparated ? "mt-2 pt-2 border-t border-editor-border" : ""}`}
          >
            <span className="w-4 text-center text-xs">{file.icon}</span>
            <span>{file.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create Tabs**

Create `src/components/Tabs.tsx`:

```tsx
"use client";

const tabMap: Record<string, string> = {
  hero: "README.md",
  about: "about.md",
  projects: "projects/",
  experience: "experience.md",
  contact: "contact.json",
};

interface TabsProps {
  activeSection: string;
}

export function Tabs({ activeSection }: TabsProps) {
  const activeFile = tabMap[activeSection] || "README.md";

  return (
    <div className="flex bg-editor-sidebar border-b border-editor-border">
      {Object.entries(tabMap).map(([id, label]) => (
        <div
          key={id}
          className={`px-4 py-2 text-xs border-r border-editor-border flex items-center gap-1.5 ${
            id === activeSection
              ? "bg-editor-bg text-editor-text"
              : "text-editor-muted"
          }`}
        >
          <span className="text-[10px]">◇</span>
          {label}
          {id === activeSection && (
            <span className="text-[10px] text-editor-faint ml-1">×</span>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Create StatusBar**

Create `src/components/StatusBar.tsx`:

```tsx
import { useTranslations } from "next-intl";

export function StatusBar() {
  const t = useTranslations("StatusBar");

  return (
    <div className="flex justify-between px-4 py-1 bg-editor-sidebar border-t border-editor-border text-[11px] text-editor-muted">
      <div className="flex gap-4">
        <span>◉ {t("branch")}</span>
        <span>{t("encoding")}</span>
        <span>{t("fileType")}</span>
      </div>
      <div className="flex gap-4">
        <span>Ln 1, Col 1</span>
        <span>© 2026</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: Create Window container**

Create `src/components/Window.tsx`:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Titlebar } from "./Titlebar";
import { Sidebar } from "./Sidebar";
import { Tabs } from "./Tabs";
import { StatusBar } from "./StatusBar";

interface WindowProps {
  children: React.ReactNode;
}

export function Window({ children }: WindowProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const contentRef = useRef<HTMLDivElement>(null);

  function handleNavigate(id: string) {
    const el = document.getElementById(`section-${id}`);
    if (el && contentRef.current) {
      contentRef.current.scrollTo({
        top: el.offsetTop - contentRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const sections = ["hero", "projects", "experience", "contact"];

    function onScroll() {
      if (!container) return;
      const scrollTop = container.scrollTop + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(`section-${sections[i]}`);
        if (el && el.offsetTop - container.offsetTop <= scrollTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    }

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-editor-bg border border-editor-border rounded-lg overflow-hidden font-mono text-[13px]">
      <Titlebar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Tabs activeSection={activeSection} />
          <div className="flex-1 overflow-hidden">
            <div
              ref={contentRef}
              className="h-full overflow-y-auto bg-editor-bg"
            >
              {children}
            </div>
          </div>
          <StatusBar />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Wire Window into page**

Update `src/app/[locale]/page.tsx`:

```tsx
import { Window } from "@/components/Window";

export default function Home() {
  return (
    <main className="min-h-screen bg-editor-bg-deep p-0">
      <Window>
        <div className="p-6">
          <p className="text-editor-muted">Content goes here...</p>
        </div>
      </Window>
    </main>
  );
}
```

- [ ] **Step 8: Verify the editor shell renders**

Run: `npm run dev`

Expected: Full editor UI with titlebar (dots, title, toggles), sidebar with file tree, tabs, content area, and status bar. Dark mode by default. Lang and theme toggles work.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: build editor window shell (titlebar, sidebar, tabs, status bar)"
```

---

### Task 5: Build content sections

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Create: `src/components/sections/Projects.tsx`
- Create: `src/components/sections/Experience.tsx`
- Create: `src/components/sections/Contact.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create line number helper**

This is a shared pattern used in all sections — lines of "code" with line numbers.

Create `src/components/sections/Line.tsx`:

```tsx
interface LineProps {
  num: number;
  children?: React.ReactNode;
}

export function Line({ num, children }: LineProps) {
  return (
    <div className="flex leading-7">
      <span className="w-10 text-right pr-4 text-editor-faint text-xs select-none shrink-0">
        {num}
      </span>
      <span className="flex-1">{children}</span>
    </div>
  );
}
```

- [ ] **Step 2: Create Hero section**

Create `src/components/sections/Hero.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Line } from "./Line";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section id="section-hero" className="px-6 py-8">
      <Line num={1}>
        <span className="text-syntax-comment font-semibold text-lg">
          # {t("name")}
        </span>
      </Line>
      <Line num={2} />
      <Line num={3}>
        <span className="text-syntax-comment">## {t("title")}</span>
      </Line>
      <Line num={4} />
      <Line num={5}>
        <span className="text-syntax-string">{t("bio")}</span>
      </Line>
      <Line num={6} />
      <Line num={7}>
        <span className="text-syntax-comment">---</span>
      </Line>
    </section>
  );
}
```

- [ ] **Step 3: Create Projects section**

Create `src/components/sections/Projects.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Line } from "./Line";

export function Projects() {
  const t = useTranslations("Projects");
  const items = t.raw("items") as Array<{
    file: string;
    name: string;
    description: string;
    tags: string[];
  }>;

  return (
    <section id="section-projects" className="px-6 py-4">
      <Line num={8}>
        <span className="text-syntax-comment">## {t("heading")}</span>
      </Line>
      <Line num={9} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-10 my-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="border border-editor-border rounded-md p-4 hover:border-editor-muted transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-editor-muted text-xs">◇</span>
              <span className="font-semibold text-editor-text">
                {item.file}
              </span>
            </div>
            <p className="text-editor-muted text-xs leading-relaxed">
              {item.description}
            </p>
            <div className="flex gap-1.5 mt-3">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-editor-faint bg-editor-sidebar px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Line num={10} />
      <Line num={11}>
        <span className="text-syntax-comment">---</span>
      </Line>
    </section>
  );
}
```

- [ ] **Step 4: Create Experience section**

Create `src/components/sections/Experience.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Line } from "./Line";

export function Experience() {
  const t = useTranslations("Experience");
  const items = t.raw("items") as Array<{
    date: string;
    role: string;
    place: string;
    description: string;
  }>;

  return (
    <section id="section-experience" className="px-6 py-4">
      <Line num={12}>
        <span className="text-syntax-comment">## {t("heading")}</span>
      </Line>
      <Line num={13} />
      <div className="ml-10 my-3 space-y-1">
        {items.map((item, i) => (
          <div
            key={i}
            className="pl-4 py-3 border-l-2 border-editor-border hover:border-editor-muted transition-colors"
          >
            <div className="font-semibold text-editor-text">{item.role}</div>
            <div className="text-xs text-editor-faint mt-0.5">
              {item.place} · {item.date}
            </div>
            <div className="text-xs text-editor-muted mt-1.5">
              {item.description}
            </div>
          </div>
        ))}
      </div>
      <Line num={14} />
      <Line num={15}>
        <span className="text-syntax-comment">---</span>
      </Line>
    </section>
  );
}
```

- [ ] **Step 5: Create Contact section**

Create `src/components/sections/Contact.tsx`:

```tsx
import { useTranslations } from "next-intl";
import { Line } from "./Line";

export function Contact() {
  const t = useTranslations("Contact");

  const links = [
    { key: "email", value: t("email"), href: `mailto:${t("email")}` },
    { key: "linkedin", value: "linkedin.com/in/alexandreroy", href: "#" },
    { key: "github", value: "github.com/alexandreroy", href: "#" },
    { key: "cv", value: `↓ ${t("downloadCv")}`, href: "/cv.pdf" },
  ];

  return (
    <section id="section-contact" className="px-6 py-4">
      <Line num={16}>
        <span className="text-syntax-comment">## {t("heading")}</span>
      </Line>
      <Line num={17} />
      <div className="ml-10 my-3">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            target={link.key === "cv" ? "_blank" : undefined}
            className="flex py-2 border-b border-editor-border/50 hover:text-editor-text transition-colors"
          >
            <span className="w-[120px] text-syntax-property">{link.key}</span>
            <span className="text-syntax-string">
              &quot;{link.value}&quot;
            </span>
          </a>
        ))}
      </div>
      <Line num={18} />
    </section>
  );
}
```

- [ ] **Step 6: Assemble sections in page**

Update `src/app/[locale]/page.tsx`:

```tsx
import { Window } from "@/components/Window";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <Window>
      <div className="pb-20">
        <Hero />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </Window>
  );
}
```

- [ ] **Step 7: Copy CV to public directory**

Run: `cp docs/cv.pdf public/cv.pdf`

- [ ] **Step 8: Verify all sections render**

Run: `npm run dev`

Expected: Full editor UI with all 4 content sections. Sidebar highlights active section on scroll. Clicking sidebar items scrolls to the section. Tabs update. Content renders as styled Markdown with line numbers. FR/EN toggle switches all text. Dark/light works.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add content sections (hero, projects, experience, contact)"
```

---

### Task 6: Build MacBook intro animation

**Files:**
- Create: `src/components/MacbookIntro.tsx`
- Modify: `src/app/[locale]/page.tsx`

- [ ] **Step 1: Create MacbookIntro component**

Create `src/components/MacbookIntro.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface MacbookIntroProps {
  children: React.ReactNode;
}

export function MacbookIntro({ children }: MacbookIntroProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const macbookRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scene = sceneRef.current;
      const macbook = macbookRef.current;
      const lid = lidRef.current;
      const name = nameRef.current;
      if (!scene || !macbook || !lid || !name) return;

      const scrollTop = window.scrollY;
      const sceneHeight = scene.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / sceneHeight, 0), 1);

      // Easing
      const ease = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      if (progress < 0.35) {
        // Phase 1: Bird's eye → start tilting toward viewer, begin opening lid
        const p = ease(progress / 0.35);
        const rotX = 85 - p * 55; // 85° → 30°
        const lidAngle = p * 60; // 0° → 60°
        const scale = 0.55 + p * 0.15; // 0.55 → 0.70
        const nameOpacity = 1 - p;

        macbook.style.transform = `rotateX(${rotX}deg) scale(${scale})`;
        lid.style.transform = `rotateX(${lidAngle}deg)`;
        name.style.opacity = `${nameOpacity}`;
        name.style.transform = `translateY(${-p * 30}px)`;
      } else if (progress < 0.6) {
        // Phase 2: Face camera, finish opening lid
        const p = ease((progress - 0.35) / 0.25);
        const rotX = 30 - p * 30; // 30° → 0°
        const lidAngle = 60 + p * 65; // 60° → 125°
        const scale = 0.7 + p * 0.3; // 0.70 → 1.0

        macbook.style.transform = `rotateX(${rotX}deg) scale(${scale})`;
        lid.style.transform = `rotateX(${lidAngle}deg)`;
        name.style.opacity = "0";
      } else {
        // Phase 3: Zoom into screen
        const p = ease((progress - 0.6) / 0.4);
        const scale = 1.0 + p * 5.5;
        const translateY = p * 350;

        macbook.style.transform = `rotateX(0deg) scale(${scale}) translateY(${translateY}px)`;
        lid.style.transform = `rotateX(125deg)`;
        name.style.opacity = "0";

        if (p >= 0.98 && !animationDone) {
          setAnimationDone(true);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [animationDone]);

  if (animationDone) {
    return <>{children}</>;
  }

  return (
    <>
      <div ref={sceneRef} className="relative" style={{ height: "500vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black" style={{ perspective: "1800px" }}>
          {/* Name above MacBook */}
          <div
            ref={nameRef}
            className="absolute top-[15%] text-center z-10 pointer-events-none"
          >
            <div className="text-7xl md:text-9xl font-extrabold tracking-tighter text-white leading-none">
              ALEXANDRE
            </div>
            <div
              className="text-7xl md:text-9xl font-extrabold tracking-tighter leading-none"
              style={{ WebkitTextStroke: "1.5px white", color: "transparent" }}
            >
              ROY
            </div>
          </div>

          {/* MacBook */}
          <div
            ref={macbookRef}
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(85deg) scale(0.55)",
            }}
          >
            {/* Lid */}
            <div
              ref={lidRef}
              className="absolute bottom-full left-0 w-full"
              style={{
                width: "500px",
                height: "340px",
                transformOrigin: "bottom center",
                transform: "rotateX(0deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Lid back (visible from bird's eye) */}
              <div
                className="absolute inset-0 rounded-t-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(0deg, #2a2a2a, #333 50%, #2a2a2a)",
                  backfaceVisibility: "hidden",
                }}
              >
                <svg
                  width="36"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{ opacity: 0.2, transform: "rotateZ(180deg)" }}
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              {/* Lid front (screen side) */}
              <div
                className="absolute inset-0 rounded-t-xl p-3 pb-5"
                style={{
                  background: "#111",
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="w-full h-full rounded-t-md bg-editor-bg overflow-hidden">
                  {/* Mini editor preview inside the screen */}
                  <div className="p-1">
                    <div className="flex items-center gap-1 px-2 py-1 border-b border-editor-border">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                      <span className="flex-1 text-center text-[4px] text-editor-muted">
                        alexandre-roy — ~/portfolio
                      </span>
                    </div>
                    <div className="flex mt-0.5">
                      <div className="w-[60px] border-r border-editor-border p-1">
                        <div className="text-[3px] text-editor-faint tracking-wider mb-1">
                          EXPLORER
                        </div>
                        <div className="text-[4px] text-editor-text bg-editor-border/50 px-1 py-0.5 rounded-sm">
                          ◇ README.md
                        </div>
                        <div className="text-[4px] text-editor-muted px-1 py-0.5">
                          ◇ about.md
                        </div>
                        <div className="text-[4px] text-editor-muted px-1 py-0.5">
                          ▸ projects/
                        </div>
                        <div className="text-[4px] text-editor-muted px-1 py-0.5">
                          ◇ experience.md
                        </div>
                        <div className="text-[4px] text-editor-muted px-1 py-0.5">
                          ◇ contact.json
                        </div>
                      </div>
                      <div className="flex-1 p-1">
                        <div className="text-[4px] text-syntax-comment">
                          # Alexandre Roy
                        </div>
                        <div className="text-[4px] text-syntax-comment mt-0.5">
                          ## Développeur · Québec
                        </div>
                        <div className="text-[4px] text-syntax-string mt-0.5">
                          Étudiant en technique informatique...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Base */}
            <div
              className="relative rounded-b-xl"
              style={{
                width: "500px",
                height: "320px",
                background: "linear-gradient(180deg, #2a2a2a, #1a1a1a)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Touchbar */}
              <div
                className="absolute top-2 left-24 right-24 h-2 rounded-full"
                style={{ background: "#111" }}
              />
              {/* Keyboard grid */}
              <div
                className="absolute top-5 left-10 right-10 bottom-8 grid gap-[3px]"
                style={{
                  gridTemplateColumns: "repeat(14, 1fr)",
                  gridTemplateRows: "repeat(5, 1fr)",
                }}
              >
                {Array.from({ length: 70 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-[2px]"
                    style={{
                      background: "#222",
                      border: "1px solid #1a1a1a",
                    }}
                  />
                ))}
              </div>
              {/* Trackpad */}
              <div
                className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-24 h-1.5 rounded"
                style={{ background: "#333" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Actual site content below the animation */}
      {children}
    </>
  );
}
```

- [ ] **Step 2: Wire MacbookIntro into page**

Update `src/app/[locale]/page.tsx`:

```tsx
import { MacbookIntro } from "@/components/MacbookIntro";
import { Window } from "@/components/Window";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <MacbookIntro>
      <Window>
        <div className="pb-20">
          <Hero />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </Window>
    </MacbookIntro>
  );
}
```

- [ ] **Step 3: Verify animation works**

Run: `npm run dev`

Expected: Page loads with bird's eye view of MacBook on black background. "ALEXANDRE ROY" in large text above. Scrolling opens the lid, rotates to face camera, then zooms into the screen. Once fully zoomed, the editor UI is visible and scrollable.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add scroll-driven MacBook intro animation"
```

---

### Task 7: Responsive design + mobile sidebar

**Files:**
- Modify: `src/components/Window.tsx`
- Modify: `src/components/Sidebar.tsx`
- Modify: `src/components/MacbookIntro.tsx`

- [ ] **Step 1: Add mobile menu toggle to Window**

Update `src/components/Window.tsx` — add a hamburger button that toggles sidebar visibility on mobile. Add state:

```tsx
const [sidebarOpen, setSidebarOpen] = useState(false);
```

Add a button before the content area (visible only on mobile):

```tsx
<button
  onClick={() => setSidebarOpen(!sidebarOpen)}
  className="md:hidden fixed top-14 left-3 z-50 p-2 bg-editor-sidebar border border-editor-border rounded text-editor-muted text-xs"
>
  {sidebarOpen ? "×" : "☰"}
</button>
```

- [ ] **Step 2: Make Sidebar responsive**

Update `src/components/Sidebar.tsx` — accept an `open` prop and show/hide on mobile:

Change the container div class to:

```tsx
className={`w-[200px] bg-editor-sidebar border-r border-editor-border py-3 flex-shrink-0 ${
  open ? "fixed inset-y-0 left-0 z-40 md:relative" : "hidden md:block"
}`}
```

Add `open` and `onClose` to the props interface. Call `onClose()` after navigating on mobile.

- [ ] **Step 3: Scale MacBook for mobile**

In `MacbookIntro.tsx`, make the MacBook size responsive. Use `w-[300px] md:w-[500px]` on the base and lid containers, and scale the name text down with `text-5xl md:text-9xl`.

- [ ] **Step 4: Verify responsive behavior**

Run: `npm run dev`

Test at 375px width (mobile). Expected: sidebar hidden, hamburger menu toggles it as an overlay. MacBook animation scaled down. All sections stack vertically.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add responsive design and mobile sidebar"
```

---

### Task 8: Polish and final verification

**Files:**
- Various touch-ups across components

- [ ] **Step 1: Add smooth scroll behavior**

In `src/app/globals.css`, add:

```css
html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 2: Add page transition for locale switch**

Verify that switching FR/EN preserves scroll position and theme.

- [ ] **Step 3: Verify all functionality end-to-end**

Run: `npm run dev`

Checklist:
- MacBook animation: bird's eye → open → zoom → editor UI
- Editor UI: titlebar, sidebar, tabs, status bar all render
- Content: hero, projects, experience, contact with line numbers
- Sidebar: click navigates, scroll highlights active section
- Tabs: reflect active section
- FR/EN toggle: all text switches
- Dark/light toggle: all colors switch
- Mobile: sidebar collapses, hamburger works
- CV download: opens PDF

- [ ] **Step 4: Run build**

Run: `npm run build`

Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: polish and final touches"
```
