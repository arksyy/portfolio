"use client";

import { Link, usePathname } from "@/i18n/navigation";

const tabs = [
  { href: "/", label: "README.md" },
  { href: "/projects", label: "projects/" },
  { href: "/projects/canopia", label: "canopia.md" },
  { href: "/projects/crm", label: "crm.md" },
  { href: "/projects/entreprise", label: "entreprise.md" },
  { href: "/experience", label: "experience.md" },
  { href: "/contact", label: "contact.json" },
];

export function Tabs() {
  const pathname = usePathname();

  // Only show tabs relevant to current context
  const visibleTabs = tabs.filter((tab) => {
    // Always show main tabs
    if (!tab.href.startsWith("/projects/")) return true;
    // Show project sub-tabs only when on a project page
    return pathname.startsWith("/projects/");
  });

  return (
    <div className="flex bg-editor-sidebar border-b border-editor-border overflow-x-auto">
      {visibleTabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={`px-4 py-2 text-xs border-r border-editor-border flex items-center gap-1.5 shrink-0 transition-colors ${
            pathname === tab.href
              ? "bg-editor-bg text-editor-text"
              : "text-editor-muted hover:text-editor-text"
          }`}
        >
          <span className="text-[10px]">◇</span>
          {tab.label}
          {pathname === tab.href && (
            <span className="text-[10px] text-editor-faint ml-1">×</span>
          )}
        </Link>
      ))}
    </div>
  );
}
