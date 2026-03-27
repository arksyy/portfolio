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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        {/* Mobile hamburger button */}
        <button
          className="md:hidden absolute top-10 left-2 z-50 p-1.5 rounded text-editor-muted hover:text-editor-text hover:bg-editor-border/50 transition-colors"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle sidebar"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <rect x="1" y="3" width="14" height="1.5" rx="0.75" />
            <rect x="1" y="7.25" width="14" height="1.5" rx="0.75" />
            <rect x="1" y="11.5" width="14" height="1.5" rx="0.75" />
          </svg>
        </button>

        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Mobile overlay backdrop */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-30 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

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
