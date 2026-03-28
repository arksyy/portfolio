"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useCallback } from "react";

export function Terminal() {
  const t = useTranslations();
  const terminalRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    currentStep: -1,
    isAnimating: false,
    state: "idle" as "idle" | "waiting_for_enter" | "done",
    currentBlock: null as HTMLDivElement | null,
    currentCmdEl: null as HTMLSpanElement | null,
    currentCursorEl: null as HTMLSpanElement | null,
    hintTimeout: null as ReturnType<typeof setTimeout> | null,
    hintInterval: null as ReturnType<typeof setInterval> | null,
    hintEl: null as HTMLSpanElement | null,
  });

  const getOutputHtml = useCallback(
    (cmd: string): string => {
      const projects = ["canopia", "crm", "site-delajoie", "bram"] as const;
      const items = t.raw("Experience.items") as Array<{
        date: string;
        role: string;
        place: string;
      }>;

      switch (cmd) {
        case "whoami":
          return `<h1>${t("Hero.name")}</h1><p class="terminal-subtitle">${t("Hero.title")}</p><p class="terminal-bio">${t("Hero.bio")}</p>`;

        case "ls ~/projets/": {
          const tryGet = (k: string) => { try { const v = t(k); return v === k ? "" : v; } catch { return ""; } };
          return projects
            .map((key) => {
              const tags = t.raw(`Projects.${key}.tags`) as string[];
              const images = t.raw(`Projects.${key}.images`) as string[];
              const url = tryGet(`Projects.${key}.url`);
              const favicon = tryGet(`Projects.${key}.favicon`);
              const photosBtn = images.length > 0 ? `<span class="terminal-screenshots" data-images='${JSON.stringify(images)}'>[ photos ]</span>` : "";
              const linkIcon = `<svg class="terminal-ext-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
              const linkBtn = url ? `<a href="${url}" target="_blank" rel="noopener" class="terminal-ext-link">${linkIcon}</a>` : "";
              const faviconImg = favicon ? `<img src="${favicon}" class="terminal-project-favicon" alt="" />` : "";
              const arrow = url ? `<span class="terminal-arrow">→</span> ` : "";
              return `<div class="terminal-project"><h3>${faviconImg}${t(`Projects.${key}.name`)}${linkBtn}</h3><p>${t(`Projects.${key}.description`)}</p><div class="terminal-tags">${tags.map((tag) => `<span class="terminal-tag">${tag}</span>`).join("")}${photosBtn}</div></div>`;
            })
            .join("");
        }

        case "cat experience.md":
          return items
            .map(
              (item) =>
                `<div class="terminal-exp"><div class="terminal-exp-date">${item.date}</div><div><div class="terminal-exp-role">${item.role}</div><div class="terminal-exp-place">${item.place}</div></div></div>`
            )
            .join("");

        case "cat formation.md": {
          const edu = t.raw("Education.items") as Array<{
            date: string;
            diploma: string;
            place: string;
          }>;
          return edu
            .map(
              (item) =>
                `<div class="terminal-exp"><div class="terminal-exp-date">${item.date}</div><div><div class="terminal-exp-role">${item.diploma}</div><div class="terminal-exp-place">${item.place}</div></div></div>`
            )
            .join("");
        }

        case "cat contact.json":
          return `<div class="terminal-contact"><a href="mailto:${t("Contact.email")}"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> email</a><a href="https://github.com/arksyy" target="_blank"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg> github</a><a href="https://www.linkedin.com/in/alexandreroyy/" target="_blank"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> linkedin</a><a href="/cv.pdf" target="_blank"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> cv.pdf</a></div>`;

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

    let cancelled = false;

    // Reset state on re-run (React Strict Mode)
    terminal.innerHTML = "";
    s.currentStep = -1;
    s.isAnimating = false;
    s.state = "idle";
    s.currentBlock = null;
    s.currentCmdEl = null;
    s.currentCursorEl = null;
    if (s.hintTimeout) clearTimeout(s.hintTimeout);
    s.hintEl = null;

    const commands = t.raw("Terminal.commands") as string[];

    let skipResolve: (() => void) | null = null;

    function skippableDelay(ms: number): Promise<void> {
      return new Promise((resolve) => {
        const timeout = setTimeout(() => {
          skipResolve = null;
          resolve();
        }, ms);
        skipResolve = () => {
          clearTimeout(timeout);
          skipResolve = null;
          resolve();
        };
      });
    }

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
            skipResolve = null;
            resolve();
          }
        }, speed);
        skipResolve = () => {
          clearInterval(interval);
          element.textContent = text;
          skipResolve = null;
          resolve();
        };
      });
    }

    function skip() {
      if (skipResolve) skipResolve();
    }

    function scrollDown() {
      window.scrollTo(0, document.body.scrollHeight);
    }

    async function showNextPrompt() {
      s.currentStep++;
      if (s.currentStep > commands.length) {
        s.state = "done";
        return;
      }
      if (s.currentStep === commands.length) {
        // Goodbye step — type it like a regular command
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
        await skippableDelay(1500);
        if (cancelled) return;
        await typeText(s.currentCmdEl, t("Terminal.goodbye"), 45);
        if (cancelled) return;
        s.currentCursorEl.classList.add("terminal-cursor-blink");
        s.isAnimating = false;
        s.state = "waiting_for_enter";
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
        await skippableDelay(1500);
        if (cancelled) return;
      }

      await typeText(s.currentCmdEl, commands[s.currentStep], 45);
      if (cancelled) return;

      s.currentCursorEl.classList.add("terminal-cursor-blink");
      s.isAnimating = false;
      s.state = "waiting_for_enter";

      {
        const cmdEl = s.currentCmdEl;
        const cursorEl = s.currentCursorEl;
        s.hintTimeout = setTimeout(() => {
          s.hintEl = document.createElement("span");
          s.hintEl.className = "terminal-inline-hint";
          cmdEl.parentElement!.insertBefore(s.hintEl, cursorEl);
          const hintText = "  " + t("Terminal.hint");
          let hi = 0;
          s.hintInterval = setInterval(() => {
            s.hintEl!.textContent += hintText[hi];
            hi++;
            if (hi >= hintText.length) { clearInterval(s.hintInterval!); s.hintInterval = null; }
          }, 45);
        }, 3000);
      }
    }

    async function revealChildren(container: HTMLDivElement) {
      const children = Array.from(container.children) as HTMLElement[];
      for (const child of children) {
        child.style.visibility = "visible";
        scrollDown();
        await new Promise((r) => setTimeout(r, 50));
      }
    }

    async function executeCurrentCommand() {
      if (s.state !== "waiting_for_enter" || s.isAnimating) return;
      s.state = "idle";
      s.isAnimating = true;

      if (s.hintTimeout) { clearTimeout(s.hintTimeout); s.hintTimeout = null; }
      if (s.hintInterval) { clearInterval(s.hintInterval); s.hintInterval = null; }
      if (s.hintEl) { s.hintEl.remove(); s.hintEl = null; }

      if (s.currentCursorEl) s.currentCursorEl.remove();

      // Goodbye — just stop, nothing else happens
      if (s.currentStep >= commands.length) {
        s.isAnimating = false;
        s.state = "done";
        return;
      }

      const output = document.createElement("div");
      output.className = "terminal-output";
      output.innerHTML = getOutputHtml(commands[s.currentStep]);

      // Hide all children initially
      const children = Array.from(output.children) as HTMLElement[];
      for (const child of children) {
        child.style.visibility = "hidden";
      }

      s.currentBlock!.appendChild(output);
      scrollDown();

      // Reveal children one by one with random delays
      await revealChildren(output);

      s.isAnimating = false;
      showNextPrompt();
    }

    async function boot() {
      s.isAnimating = true;
      const bootData = [
        `${t("Terminal.boot1")}`,
        `${t("Terminal.boot2")} <span class="terminal-string">${t("Terminal.ok")}</span>`,
        `${t("Terminal.boot3")} <span class="terminal-string">${t("Terminal.ok")}</span>`,
        `${t("Terminal.boot4")} <span class="terminal-string">${t("Terminal.username")}</span>`,
      ];

      for (const line of bootData) {
        if (cancelled) return;
        const div = document.createElement("div");
        div.className = "terminal-boot-line";
        div.innerHTML = line;
        terminal.appendChild(div);
        scrollDown();
        await new Promise((r) => setTimeout(r, 250));
      }
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 400));
      if (cancelled) return;
      s.isAnimating = false;
      showNextPrompt();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        e.preventDefault();
        if (s.isAnimating) {
          skip();
        } else if (s.state === "waiting_for_enter") {
          executeCurrentCommand();
        }
      }
    }

    function handleScreenshotClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.classList.contains("terminal-screenshots")) return;
      const images = JSON.parse(target.dataset.images || "[]") as string[];
      if (!images.length) return;

      let currentIndex = 0;

      const overlay = document.createElement("div");
      overlay.className = "terminal-lightbox";

      const img = document.createElement("img");
      img.src = images[0];
      img.className = "terminal-lightbox-img";

      const counter = document.createElement("div");
      counter.className = "terminal-lightbox-counter";
      counter.textContent = `1 / ${images.length}`;

      const prevBtn = document.createElement("button");
      prevBtn.className = "terminal-lightbox-btn terminal-lightbox-prev";
      prevBtn.textContent = "‹";

      const nextBtn = document.createElement("button");
      nextBtn.className = "terminal-lightbox-btn terminal-lightbox-next";
      nextBtn.textContent = "›";

      function updateImage() {
        img.src = images[currentIndex];
        counter.textContent = `${currentIndex + 1} / ${images.length}`;
      }

      prevBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
      });

      nextBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
      });

      overlay.addEventListener("click", (ev) => {
        if (ev.target === overlay) overlay.remove();
      });

      function handleLightboxKey(ev: KeyboardEvent) {
        if (ev.key === "Escape") { overlay.remove(); document.removeEventListener("keydown", handleLightboxKey); }
        if (ev.key === "ArrowLeft") { currentIndex = (currentIndex - 1 + images.length) % images.length; updateImage(); }
        if (ev.key === "ArrowRight") { currentIndex = (currentIndex + 1) % images.length; updateImage(); }
      }
      document.addEventListener("keydown", handleLightboxKey);

      const closeBtn = document.createElement("button");
      closeBtn.className = "terminal-lightbox-close";
      closeBtn.textContent = "✕";
      closeBtn.addEventListener("click", () => { overlay.remove(); document.removeEventListener("keydown", handleLightboxKey); });

      overlay.appendChild(closeBtn);
      overlay.appendChild(prevBtn);
      overlay.appendChild(img);
      overlay.appendChild(nextBtn);
      overlay.appendChild(counter);
      document.body.appendChild(overlay);
    }

    terminal.addEventListener("click", handleScreenshotClick);
    document.addEventListener("keydown", handleKeyDown);
    boot();

    return () => {
      cancelled = true;
      terminal.removeEventListener("click", handleScreenshotClick);
      document.removeEventListener("keydown", handleKeyDown);
      if (s.hintTimeout) clearTimeout(s.hintTimeout);
      if (s.hintInterval) clearInterval(s.hintInterval);
    };
  }, [t, getOutputHtml]);

  return <div ref={terminalRef} id="terminal" />;
}
