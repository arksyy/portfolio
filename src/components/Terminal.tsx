"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useCallback } from "react";

export function Terminal() {
  const t = useTranslations();
  const terminalRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    currentStep: -1,
    isAnimating: false,
    state: "idle" as "idle" | "waiting_for_enter",
    currentBlock: null as HTMLDivElement | null,
    currentCmdEl: null as HTMLSpanElement | null,
    currentCursorEl: null as HTMLSpanElement | null,
    hintTimeout: null as ReturnType<typeof setTimeout> | null,
    hintEl: null as HTMLSpanElement | null,
  });

  const getOutputHtml = useCallback(
    (cmd: string): string => {
      const projects = ["canopia", "crm", "entreprise"] as const;
      const items = t.raw("Experience.items") as Array<{
        date: string;
        role: string;
        place: string;
      }>;

      switch (cmd) {
        case "whoami":
          return `<h1>${t("Hero.name")}</h1><p class="terminal-subtitle">${t("Hero.title")}</p><p class="terminal-bio">${t("Hero.bio")}</p>`;

        case "ls ~/projets/":
          return projects
            .map((key) => {
              const tags = t.raw(`Projects.${key}.tags`) as string[];
              return `<div class="terminal-project"><h3><span class="terminal-arrow">→</span> ${t(`Projects.${key}.name`)}</h3><p>${t(`Projects.${key}.description`)}</p><div class="terminal-tags">${tags.map((tag) => `<span class="terminal-tag">${tag}</span>`).join("")}</div></div>`;
            })
            .join("");

        case "cat experience.md":
          return items
            .map(
              (item) =>
                `<div class="terminal-exp"><div class="terminal-exp-date">${item.date}</div><div><div class="terminal-exp-role">${item.role}</div><div class="terminal-exp-place">${item.place}</div></div></div>`
            )
            .join("");

        case "cat contact.json":
          return `<div class="terminal-contact"><a href="mailto:${t("Contact.email")}">${t("Contact.email")}</a><a href="#">github</a><a href="#">linkedin</a><a href="/cv.pdf" target="_blank">↓ ${t("Contact.downloadCv")}</a></div>`;

        default:
          return "";
      }
    },
    [t]
  );

  useEffect(() => {
    if (!terminalRef.current) return;
    const terminal = terminalRef.current as HTMLDivElement;
    const s = stateRef.current;

    const commands = t.raw("Terminal.commands") as string[];

    function typeText(
      element: HTMLSpanElement,
      text: string,
      speed = 45
    ): Promise<void> {
      return new Promise((resolve) => {
        let i = 0;
        element.textContent = "";
        const interval = setInterval(() => {
          element.textContent += text[i];
          i++;
          if (i >= text.length) {
            clearInterval(interval);
            resolve();
          }
        }, speed);
      });
    }

    function scrollDown() {
      window.scrollTo(0, document.body.scrollHeight);
    }

    async function showNextPrompt() {
      s.currentStep++;
      if (s.currentStep >= commands.length) {
        const div = document.createElement("div");
        div.className = "terminal-cmd-block";
        div.innerHTML = `<div class="terminal-prompt-line"><span class="terminal-prefix">~</span><span class="terminal-arrow-prompt"> ❯ </span><span class="terminal-cursor"></span></div>`;
        terminal.appendChild(div);
        scrollDown();
        return;
      }

      s.isAnimating = true;

      s.currentBlock = document.createElement("div");
      s.currentBlock.className = "terminal-cmd-block";

      const promptLine = document.createElement("div");
      promptLine.className = "terminal-prompt-line";

      const prefix = document.createElement("span");
      prefix.className = "terminal-prefix";
      prefix.textContent = t("Terminal.promptPrefix");

      const arrow = document.createElement("span");
      arrow.className = "terminal-arrow-prompt";
      arrow.textContent = " ❯ ";

      s.currentCmdEl = document.createElement("span");
      s.currentCmdEl.className = "terminal-cmd";

      s.currentCursorEl = document.createElement("span");
      s.currentCursorEl.className = "terminal-cursor";

      promptLine.appendChild(prefix);
      promptLine.appendChild(arrow);
      promptLine.appendChild(s.currentCmdEl);
      promptLine.appendChild(s.currentCursorEl);
      s.currentBlock.appendChild(promptLine);
      terminal.appendChild(s.currentBlock);
      scrollDown();

      if (s.currentStep > 0) {
        await new Promise((r) => setTimeout(r, 1500));
      }

      await typeText(s.currentCmdEl, commands[s.currentStep], 45);

      s.isAnimating = false;
      s.state = "waiting_for_enter";

      const cmdEl = s.currentCmdEl;
      const cursorEl = s.currentCursorEl;
      s.hintTimeout = setTimeout(() => {
        s.hintEl = document.createElement("span");
        s.hintEl.className = "terminal-inline-hint";
        cmdEl.parentElement!.insertBefore(s.hintEl, cursorEl);
        const hintText = "  " + t("Terminal.hint");
        let hi = 0;
        const hintInterval = setInterval(() => {
          s.hintEl!.textContent += hintText[hi];
          hi++;
          if (hi >= hintText.length) clearInterval(hintInterval);
        }, 45);
      }, 3000);
    }

    function executeCurrentCommand() {
      if (s.state !== "waiting_for_enter" || s.isAnimating) return;
      s.state = "idle";

      if (s.hintTimeout) clearTimeout(s.hintTimeout);
      if (s.hintEl) {
        s.hintEl.remove();
        s.hintEl = null;
      }

      if (s.currentCursorEl) s.currentCursorEl.remove();

      const output = document.createElement("div");
      output.className = "terminal-output";
      output.innerHTML = getOutputHtml(commands[s.currentStep]);
      s.currentBlock!.appendChild(output);
      scrollDown();

      showNextPrompt();
    }

    async function boot() {
      s.isAnimating = true;
      const bootData = [
        `${t("Terminal.boot1")}`,
        `${t("Terminal.boot2")} <span class="text-syntax-string">${t("Terminal.ok")}</span>`,
        `${t("Terminal.boot3")} <span class="text-syntax-string">${t("Terminal.ok")}</span>`,
        `${t("Terminal.boot4")} <span class="text-syntax-string">${t("Terminal.username")}</span>`,
      ];

      for (const line of bootData) {
        const div = document.createElement("div");
        div.className = "terminal-boot-line";
        div.innerHTML = line;
        terminal.appendChild(div);
        scrollDown();
        await new Promise((r) => setTimeout(r, 250));
      }
      await new Promise((r) => setTimeout(r, 400));
      s.isAnimating = false;
      showNextPrompt();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        e.preventDefault();
        executeCurrentCommand();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    boot();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (s.hintTimeout) clearTimeout(s.hintTimeout);
    };
  }, [t, getOutputHtml]);

  return <div ref={terminalRef} id="terminal" />;
}
