"use client";

import { Titlebar } from "./Titlebar";
import { Sidebar } from "./Sidebar";
import { Tabs } from "./Tabs";

export function EditorShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-editor-bg overflow-hidden font-mono text-[13px]">
      <Titlebar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
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
