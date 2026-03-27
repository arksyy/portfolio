"use client";

import { Link, usePathname } from "@/i18n/navigation";

const tabs = [
  { href: "/", label: "README.md" },
  { href: "/projects", label: "projects/" },
  { href: "/experience", label: "experience.md" },
  { href: "/contact", label: "contact.json" },
];

export function Tabs() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <div className="flex bg-editor-sidebar border-b border-editor-border">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-4 py-2 text-xs border-r border-editor-border flex items-center gap-1.5 transition-colors ${
            isActive(tab.href)
              ? "bg-editor-bg text-editor-text"
              : "text-editor-muted hover:text-editor-text"
          }`}
        >
          <span className="text-[10px]">◇</span>
          {tab.label}
          {isActive(tab.href) && (
            <span className="text-[10px] text-editor-faint ml-1">×</span>
          )}
        </Link>
      ))}
    </div>
  );
}
