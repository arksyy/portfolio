"use client";

import { useTranslations } from "next-intl";

const files = [
  { id: "hero", label: "README.md", icon: "◇", indent: 1 },
  { id: "hero", label: "about.md", icon: "◇", indent: 1 },
  { id: "projects", label: "projects/", icon: "▸", indent: 1, isFolder: true },
  { id: "experience", label: "experience.md", icon: "◇", indent: 1 },
  { id: "contact", label: "contact.json", icon: "◇", indent: 1 },
  { id: "cv", label: "cv.pdf", icon: "↓", indent: 1, isSeparated: true },
];

interface SidebarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ activeSection, onNavigate, open, onClose }: SidebarProps) {
  const t = useTranslations("Sidebar");

  function handleClick(id: string) {
    if (id === "cv") {
      window.open("/cv.pdf", "_blank");
    } else {
      onNavigate(id);
    }
    if (onClose) onClose();
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
        {files.map((file) => (
          <button
            key={file.id}
            onClick={() => handleClick(file.id)}
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

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block h-full">{sidebarContent}</div>
      {/* Mobile overlay */}
      {open && (
        <div className="md:hidden fixed inset-y-0 left-0 z-40">
          {sidebarContent}
        </div>
      )}
    </>
  );
}
