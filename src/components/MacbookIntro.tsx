"use client";

import { useEffect, useRef, useState } from "react";

interface MacbookIntroProps {
  children: React.ReactNode;
}

export function MacbookIntro({ children }: MacbookIntroProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const macbookRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    function onScroll() {
      const scene = sceneRef.current;
      const macbook = macbookRef.current;
      const lid = lidRef.current;
      const name = nameRef.current;
      if (!scene || !macbook || !lid || !name) return;

      const scrollTop = window.scrollY;
      const sceneHeight = scene.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max(scrollTop / sceneHeight, 0), 1);

      const ease = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      if (progress < 0.4) {
        // Phase 1: Bird's eye → tilt toward viewer, begin opening lid
        const p = ease(progress / 0.4);
        const rotX = 85 - p * 55;
        const lidAngle = p * 70;
        const scale = 0.45 + p * 0.15;
        const nameOpacity = 1 - p * 1.5;

        macbook.style.transform = `rotateX(${rotX}deg) scale(${scale})`;
        lid.style.transform = `rotateX(${lidAngle}deg)`;
        name.style.opacity = `${Math.max(0, nameOpacity)}`;
        name.style.transform = `translateY(${-p * 40}px)`;
      } else if (progress < 0.75) {
        // Phase 2: Face camera, finish opening lid
        const p = ease((progress - 0.4) / 0.35);
        const rotX = 30 - p * 30;
        const lidAngle = 70 + p * 55;
        const scale = 0.6 + p * 0.4;

        macbook.style.transform = `rotateX(${rotX}deg) scale(${scale})`;
        lid.style.transform = `rotateX(${lidAngle}deg)`;
        name.style.opacity = "0";
      } else {
        // Phase 3: Settle into final position (slight scale adjustment)
        const p = ease((progress - 0.75) / 0.25);
        macbook.style.transform = `rotateX(0deg) scale(${1.0})`;
        lid.style.transform = `rotateX(125deg)`;
        name.style.opacity = "0";

        if (p >= 0.95 && !animationDone) {
          setAnimationDone(true);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [animationDone]);

  // After animation: render the MacBook frame with real content inside
  if (animationDone) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 md:p-8">
        <MacbookFrame>{children}</MacbookFrame>
      </div>
    );
  }

  return (
    <div ref={sceneRef} className="relative" style={{ height: "400vh" }}>
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black"
        style={{ perspective: "1800px" }}
      >
        {/* Name above MacBook */}
        <div
          ref={nameRef}
          className="absolute top-[12%] text-center z-10 pointer-events-none"
        >
          <div className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white leading-none">
            ALEXANDRE
          </div>
          <div
            className="text-6xl md:text-8xl font-extrabold tracking-tighter leading-none"
            style={{ WebkitTextStroke: "1.5px white", color: "transparent" }}
          >
            ROY
          </div>
        </div>

        {/* MacBook 3D */}
        <div
          ref={macbookRef}
          className="relative"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(85deg) scale(0.45)",
          }}
        >
          {/* Lid */}
          <div
            ref={lidRef}
            className="absolute bottom-full left-0"
            style={{
              width: "clamp(320px, 70vw, 900px)",
              height: "clamp(210px, 46vw, 590px)",
              transformOrigin: "bottom center",
              transform: "rotateX(0deg)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Lid back */}
            <div
              className="absolute inset-0 rounded-t-2xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(0deg, #2a2a2a, #333 50%, #2a2a2a)",
                backfaceVisibility: "hidden",
              }}
            >
              <svg
                width="36"
                height="44"
                viewBox="0 0 24 24"
                fill="white"
                style={{ opacity: 0.2, transform: "rotateZ(180deg)" }}
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </div>
            {/* Lid front (screen side) — mini preview during animation */}
            <div
              className="absolute inset-0 rounded-t-2xl p-3 pb-5"
              style={{
                background: "#111",
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="w-full h-full rounded-t-lg bg-editor-bg overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[4%] bg-[#111] rounded-b-lg z-10" />
                {/* Mini editor preview */}
                <div className="p-2 pt-[5%]">
                  <div className="flex items-center gap-1 px-2 py-1 border-b border-editor-border">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                    <span className="flex-1 text-center text-[5px] text-editor-muted">
                      alexandre-roy — ~/portfolio
                    </span>
                  </div>
                  <div className="flex mt-1">
                    <div className="w-[70px] border-r border-editor-border p-1">
                      <div className="text-[4px] text-editor-faint tracking-wider mb-1">
                        EXPLORER
                      </div>
                      <div className="text-[5px] text-editor-text bg-editor-border/50 px-1 py-0.5 rounded-sm">
                        ◇ README.md
                      </div>
                      <div className="text-[5px] text-editor-muted px-1 py-0.5">
                        ◇ about.md
                      </div>
                      <div className="text-[5px] text-editor-muted px-1 py-0.5">
                        ▸ projects/
                      </div>
                      <div className="text-[5px] text-editor-muted px-1 py-0.5">
                        ◇ experience.md
                      </div>
                      <div className="text-[5px] text-editor-muted px-1 py-0.5">
                        ◇ contact.json
                      </div>
                    </div>
                    <div className="flex-1 p-1">
                      <div className="text-[5px] text-syntax-comment">
                        # Alexandre Roy
                      </div>
                      <div className="text-[5px] text-syntax-comment mt-0.5">
                        ## Développeur · Québec
                      </div>
                      <div className="text-[5px] text-syntax-string mt-1">
                        Étudiant en technique informatique...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Base */}
          <div
            className="relative rounded-b-2xl"
            style={{
              width: "clamp(320px, 70vw, 900px)",
              height: "clamp(200px, 44vw, 560px)",
              background: "linear-gradient(180deg, #2a2a2a, #1a1a1a)",
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute top-[3%] left-[15%] right-[15%] h-[3%] rounded-full"
              style={{ background: "#111" }}
            />
            <div
              className="absolute top-[8%] left-[6%] right-[6%] bottom-[8%] grid gap-[3px]"
              style={{
                gridTemplateColumns: "repeat(14, 1fr)",
                gridTemplateRows: "repeat(5, 1fr)",
              }}
            >
              {Array.from({ length: 70 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[2px]"
                  style={{
                    background: "#222",
                    border: "1px solid #1a1a1a",
                  }}
                />
              ))}
            </div>
            <div
              className="absolute bottom-[3%] left-1/2 -translate-x-1/2 w-[20%] h-[2%] rounded"
              style={{ background: "#333" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Static MacBook frame that wraps the real site content
function MacbookFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[1200px] flex flex-col items-center">
      {/* Screen / Lid */}
      <div className="w-full bg-[#111] rounded-t-2xl p-[6px] pb-[10px] relative">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[20px] bg-[#111] rounded-b-xl z-20" />
        {/* Screen bezel */}
        <div className="w-full rounded-t-xl bg-editor-bg overflow-hidden relative" style={{ height: "calc(100vh - 140px)" }}>
          {/* Notch inset into screen */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[14px] bg-[#111] rounded-b-lg z-10" />
          {/* Camera dot in notch */}
          <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-[#1a1a1a] border border-[#333] z-20" />
          {/* Site content inside screen */}
          <div className="h-full pt-[14px]">
            {children}
          </div>
        </div>
      </div>

      {/* Hinge */}
      <div className="w-[102%] h-[8px] bg-gradient-to-b from-[#333] to-[#222] rounded-b-sm" />

      {/* Base / Keyboard */}
      <div
        className="w-full rounded-b-2xl relative overflow-hidden"
        style={{
          height: "clamp(60px, 8vw, 100px)",
          background: "linear-gradient(180deg, #2a2a2a, #1e1e1e)",
        }}
      >
        {/* Keyboard area */}
        <div
          className="absolute top-[12%] left-[5%] right-[5%] bottom-[25%] grid gap-[2px]"
          style={{
            gridTemplateColumns: "repeat(14, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)",
          }}
        >
          {Array.from({ length: 42 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[1px]"
              style={{ background: "#252525", border: "1px solid #1a1a1a" }}
            />
          ))}
        </div>
        {/* Trackpad */}
        <div
          className="absolute bottom-[8%] left-1/2 -translate-x-1/2 rounded-md"
          style={{
            width: "25%",
            height: "35%",
            background: "#252525",
            border: "1px solid #1a1a1a",
          }}
        />
      </div>
    </div>
  );
}
