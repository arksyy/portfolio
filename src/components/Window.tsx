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
