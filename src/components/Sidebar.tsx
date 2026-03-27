"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const files = [
  { href: "/", label: "README.md", icon: "◇" },
  { href: "/", label: "about.md", icon: "◇" },
  { href: "/projects", label: "projects/", icon: "▸" },
  { href: "/experience", label: "experience.md", icon: "◇" },
  { href: "/contact", label: "contact.json", icon: "◇" },
  { href: "/cv.pdf", label: "cv.pdf", icon: "↓", external: true, separated: true },
];

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const t = useTranslations("Sidebar");
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
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
        {files.map((file) =>
          file.external ? (
            <a
              key={file.label}
              href={file.href}
              target="_blank"
              onClick={onClose}
              className={`w-full text-left pl-8 px-4 py-1.5 flex items-center gap-2 transition-colors hover:bg-editor-border/50 text-editor-muted ${
                file.separated ? "mt-2 pt-2 border-t border-editor-border" : ""
              }`}
            >
              <span className="w-4 text-center text-xs">{file.icon}</span>
              <span>{file.label}</span>
            </a>
          ) : (
            <Link
              key={file.label}
              href={file.href}
              onClick={onClose}
              className={`w-full text-left pl-8 px-4 py-1.5 flex items-center gap-2 transition-colors hover:bg-editor-border/50 ${
                isActive(file.href)
                  ? "bg-editor-border/50 text-editor-text"
                  : "text-editor-muted"
              }`}
            >
              <span className="w-4 text-center text-xs">{file.icon}</span>
              <span>{file.label}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:block h-full">{sidebarContent}</div>
      {open && (
        <div className="md:hidden fixed inset-y-0 left-0 z-40">
          {sidebarContent}
        </div>
      )}
    </>
  );
}
