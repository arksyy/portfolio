"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const projects = [
  { slug: "canopia", label: "canopia.md" },
  { slug: "crm", label: "crm.md" },
  { slug: "entreprise", label: "entreprise.md" },
];

export function Sidebar() {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();
  const [projectsOpen, setProjectsOpen] = useState(
    pathname.startsWith("/projects")
  );

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href;
  }

  const sidebarContent = (
    <div className="w-[200px] bg-editor-sidebar border-r border-editor-border py-3 flex-shrink-0 h-full">
      <div className="px-4 pb-3 text-[10px] tracking-widest text-editor-faint">
        {t("explorer")}
      </div>
      <div className="text-[13px]">
        <div className="px-4 py-1.5 flex items-center gap-2 text-editor-muted">
          <span className="text-xs">▾</span>
          <span>~/alexandre-roy</span>
        </div>

        {/* README.md */}
        <Link
          href="/"

          className={`w-full text-left pl-8 py-1.5 flex items-center gap-2 transition-colors hover:bg-editor-border/50 ${
            isActive("/") ? "bg-editor-border/50 text-editor-text" : "text-editor-muted"
          }`}
        >
          <span className="w-4 text-center text-xs">◇</span>
          <span>README.md</span>
        </Link>

        {/* about.md */}
        <Link
          href="/"

          className={`w-full text-left pl-8 py-1.5 flex items-center gap-2 transition-colors hover:bg-editor-border/50 ${
            isActive("/") ? "bg-editor-border/50 text-editor-text" : "text-editor-muted"
          }`}
        >
          <span className="w-4 text-center text-xs">◇</span>
          <span>about.md</span>
        </Link>

        {/* projects/ folder */}
        <button
          onClick={() => setProjectsOpen((prev) => !prev)}
          className={`w-full text-left pl-8 py-1.5 flex items-center gap-2 transition-colors hover:bg-editor-border/50 ${
            pathname.startsWith("/projects")
              ? "text-editor-text"
              : "text-editor-muted"
          }`}
        >
          <span className="w-4 text-center text-xs">
            {projectsOpen ? "▾" : "▸"}
          </span>
          <span>projects/</span>
        </button>

        {/* project sub-items */}
        {projectsOpen &&
          projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
    
              className={`w-full text-left pl-14 py-1.5 flex items-center gap-2 transition-colors hover:bg-editor-border/50 ${
                isActive(`/projects/${project.slug}`)
                  ? "bg-editor-border/50 text-editor-text"
                  : "text-editor-muted"
              }`}
            >
              <span className="w-4 text-center text-xs">◇</span>
              <span>{project.label}</span>
            </Link>
          ))}

        {/* experience.md */}
        <Link
          href="/experience"

          className={`w-full text-left pl-8 py-1.5 flex items-center gap-2 transition-colors hover:bg-editor-border/50 ${
            isActive("/experience") ? "bg-editor-border/50 text-editor-text" : "text-editor-muted"
          }`}
        >
          <span className="w-4 text-center text-xs">◇</span>
          <span>experience.md</span>
        </Link>

        {/* contact.json */}
        <Link
          href="/contact"

          className={`w-full text-left pl-8 py-1.5 flex items-center gap-2 transition-colors hover:bg-editor-border/50 ${
            isActive("/contact") ? "bg-editor-border/50 text-editor-text" : "text-editor-muted"
          }`}
        >
          <span className="w-4 text-center text-xs">◇</span>
          <span>contact.json</span>
        </Link>

        {/* cv.pdf */}
        <a
          href="/cv.pdf"
          target="_blank"

          className="w-full text-left pl-8 py-1.5 flex items-center gap-2 transition-colors hover:bg-editor-border/50 text-editor-muted mt-2 pt-2 border-t border-editor-border"
        >
          <span className="w-4 text-center text-xs">↓</span>
          <span>cv.pdf</span>
        </a>
      </div>
    </div>
  );

  return sidebarContent;
}
