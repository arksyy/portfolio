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
  onNavigate: (id: string) => void;
}

export function Tabs({ activeSection, onNavigate }: TabsProps) {
  return (
    <div className="flex bg-editor-sidebar border-b border-editor-border">
      {Object.entries(tabMap).map(([id, label]) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          className={`px-4 py-2 text-xs border-r border-editor-border flex items-center gap-1.5 cursor-pointer transition-colors ${
            id === activeSection
              ? "bg-editor-bg text-editor-text"
              : "text-editor-muted hover:text-editor-text"
          }`}
        >
          <span className="text-[10px]">◇</span>
          {label}
          {id === activeSection && (
            <span className="text-[10px] text-editor-faint ml-1">×</span>
          )}
        </button>
      ))}
    </div>
  );
}
