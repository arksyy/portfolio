"use client";

import { Link, usePathname } from "@/i18n/navigation";

const allTabs: Record<string, string> = {
  "/": "README.md",
  "/about": "about.md",
  "/projects": "projects/",
  "/projects/canopia": "canopia.md",
  "/projects/crm": "crm.md",
  "/projects/entreprise": "entreprise.md",
  "/experience": "experience.md",
  "/contact": "contact.json",
};

export function Tabs() {
  const pathname = usePathname();
  const label = allTabs[pathname] || "README.md";

  return (
    <div className="flex bg-editor-sidebar border-b border-editor-border">
      <div className="px-4 py-2 text-xs border-r border-editor-border flex items-center gap-1.5 bg-editor-bg text-editor-text">
        <span className="text-[10px]">◇</span>
        {label}
        <span className="text-[10px] text-editor-faint ml-1">×</span>
      </div>
    </div>
  );
}
