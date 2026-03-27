"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

interface Step {
  path: string;
  cmd: string;
  output?: string[];
  clear?: boolean;
  hold?: number;
  nextPath?: string;
}

export function Terminal() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Projects");
  const items = t.raw("items") as Array<{ name: string }>;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl flex items-center justify-center font-mono text-sm transition-all border cursor-pointer"
        style={{
          background: "rgba(26, 28, 35, 0.9)",
          backdropFilter: "blur(12px)",
          borderColor: open ? "#444" : "#2a2a2a",
          color: open ? "#fff" : "#888",
        }}
      >
        ❯_
      </button>

      {/* Terminal overlay */}
      <div
        className={`fixed bottom-20 right-6 z-40 transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-2 pointer-events-none"
        }`}
      >
        <div
          className="w-[700px] max-w-[calc(100vw-48px)] rounded-xl overflow-hidden font-mono text-sm border"
          style={{
            background: "rgba(26, 28, 35, 0.85)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255,255,255,0.06)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: "rgba(22, 24, 31, 0.8)" }}
          >
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>

          {/* Body */}
          <TerminalBody
            projects={items.map((p) => p.name)}
            active={open}
          />
        </div>
      </div>
    </>
  );
}

function TerminalBody({
  projects,
  active,
}: {
  projects: string[];
  active: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cancelRef = useRef(false);

  useEffect(() => {
    if (!active) {
      cancelRef.current = true;
      return;
    }

    cancelRef.current = false;
    const el = ref.current;
    if (!el) return;

    const steps: Step[] = [
      {
        path: "~",
        cmd: "whoami",
        output: ["alexandre roy"],
      },
      {
        path: "~",
        cmd: "cat about.txt",
        output: [
          "étudiant en technique informatique",
          "cégep garneau · québec",
          "bilingue français / anglais",
        ],
      },
      { path: "~", cmd: "clear", clear: true, hold: 300 },
      {
        path: "~",
        cmd: "cd projects && ls",
        output: projects.map(
          (p, i) =>
            `<span style="color:#6cb6ff">projet-0${i + 1}/</span>  ${p}`
        ),
        nextPath: "~/projects",
      },
      { path: "~/projects", cmd: "clear", clear: true, hold: 300 },
      {
        path: "~/projects",
        cmd: "cat contact.json",
        output: [
          "{",
          '  "email": "alexandre15roy@gmail.com",',
          '  "github": "github.com/alexandreroy",',
          '  "linkedin": "linkedin.com/in/alexandreroy"',
          "}",
        ],
      },
      {
        path: "~/projects",
        cmd: "cd ~",
        output: [],
        nextPath: "~",
        hold: 200,
      },
      { path: "~", cmd: "clear", clear: true, hold: 300 },
    ];

    function sleep(ms: number) {
      return new Promise<void>((r) => setTimeout(r, ms));
    }

    function removeCursor() {
      const c = el!.querySelector(".t-cursor");
      if (c) c.remove();
    }

    function addCursor() {
      const span = document.createElement("span");
      span.className = "t-cursor";
      span.style.cssText =
        "display:inline-block;width:8px;height:15px;background:#e0e0e0;vertical-align:text-bottom;margin-left:1px;animation:t-blink 1s step-end infinite";
      el!.appendChild(span);
    }

    function addText(html: string) {
      removeCursor();
      const span = document.createElement("span");
      span.innerHTML = html;
      el!.appendChild(span);
    }

    async function typeText(text: string) {
      for (let i = 0; i < text.length; i++) {
        if (cancelRef.current) return;
        removeCursor();
        const span = document.createElement("span");
        span.textContent = text[i];
        el!.appendChild(span);
        addCursor();
        await sleep(50 + Math.random() * 30);
      }
    }

    function showPrompt(path: string) {
      addText(`<span style="color:#6cb6ff">${path}</span>\n`);
      addText(`<span style="color:#f778ba">❯</span> `);
      addCursor();
    }

    async function run() {
      while (!cancelRef.current) {
        for (const step of steps) {
          if (cancelRef.current) return;

          showPrompt(step.path);
          await sleep(400);
          if (cancelRef.current) return;

          await typeText(step.cmd);
          await sleep(300);
          if (cancelRef.current) return;

          if (step.clear) {
            removeCursor();
            await sleep(step.hold || 300);
            el!.innerHTML = "";
          } else {
            removeCursor();
            addText("\n");
            if (step.output) {
              for (const line of step.output) {
                addText(`<span style="color:#8b8b8b">${line}</span>\n`);
              }
            }
            addText("\n");
            await sleep(step.hold || 1800);
          }

          if (cancelRef.current) return;
        }
      }
    }

    el!.innerHTML = "";
    run();

    return () => {
      cancelRef.current = true;
    };
  }, [active, projects]);

  return (
    <>
      <style>{`@keyframes t-blink { 50% { opacity: 0; } }`}</style>
      <div
        ref={ref}
        className="p-5 h-[420px] whitespace-pre-wrap leading-7 overflow-hidden"
      />
    </>
  );
}
