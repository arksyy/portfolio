"use client";

import { useState } from "react";
import { Titlebar } from "./Titlebar";
import { Sidebar } from "./Sidebar";
import { Tabs } from "./Tabs";

export function EditorShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-editor-bg overflow-hidden font-mono text-[13px]">
      <Titlebar />
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile hamburger */}
        <button
          className="md:hidden absolute top-10 left-2 z-50 p-1.5 rounded text-editor-muted hover:text-editor-text hover:bg-editor-border/50 transition-colors"
          onClick={() => setSidebarOpen((prev) => !prev)}
          aria-label="Toggle sidebar"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="1" y="3" width="14" height="1.5" rx="0.75" />
            <rect x="1" y="7.25" width="14" height="1.5" rx="0.75" />
            <rect x="1" y="11.5" width="14" height="1.5" rx="0.75" />
          </svg>
        </button>

        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-30 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <div className="flex flex-1 flex-col overflow-hidden">
          <Tabs />
          <div className="flex-1 overflow-y-auto bg-editor-bg">
            <main className="max-w-3xl mx-auto px-6 md:px-12 pb-20">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
