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

      if (progress < 0.35) {
        // Phase 1: Bird's eye → start tilting toward viewer, begin opening lid
        const p = ease(progress / 0.35);
        const rotX = 85 - p * 55;
        const lidAngle = p * 60;
        const scale = 0.55 + p * 0.15;
        const nameOpacity = 1 - p;

        macbook.style.transform = `rotateX(${rotX}deg) scale(${scale})`;
        lid.style.transform = `rotateX(${lidAngle}deg)`;
        name.style.opacity = `${nameOpacity}`;
        name.style.transform = `translateY(${-p * 30}px)`;
      } else if (progress < 0.6) {
        // Phase 2: Face camera, finish opening lid
        const p = ease((progress - 0.35) / 0.25);
        const rotX = 30 - p * 30;
        const lidAngle = 60 + p * 65;
        const scale = 0.7 + p * 0.3;

        macbook.style.transform = `rotateX(${rotX}deg) scale(${scale})`;
        lid.style.transform = `rotateX(${lidAngle}deg)`;
        name.style.opacity = "0";
      } else {
        // Phase 3: Zoom into screen
        const p = ease((progress - 0.6) / 0.4);
        const scale = 1.0 + p * 5.5;
        const translateY = p * 350;

        macbook.style.transform = `rotateX(0deg) scale(${scale}) translateY(${translateY}px)`;
        lid.style.transform = `rotateX(125deg)`;
        name.style.opacity = "0";

        if (p >= 0.98 && !animationDone) {
          setAnimationDone(true);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [animationDone]);

  if (animationDone) {
    return <>{children}</>;
  }

  return (
    <>
      <div ref={sceneRef} className="relative" style={{ height: "500vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black" style={{ perspective: "1800px" }}>
          {/* Name above MacBook */}
          <div
            ref={nameRef}
            className="absolute top-[15%] text-center z-10 pointer-events-none"
          >
            <div className="text-7xl md:text-9xl font-extrabold tracking-tighter text-white leading-none">
              ALEXANDRE
            </div>
            <div
              className="text-7xl md:text-9xl font-extrabold tracking-tighter leading-none"
              style={{ WebkitTextStroke: "1.5px white", color: "transparent" }}
            >
              ROY
            </div>
          </div>

          {/* MacBook */}
          <div
            ref={macbookRef}
            className="relative"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(85deg) scale(0.55)",
            }}
          >
            {/* Lid */}
            <div
              ref={lidRef}
              className="absolute bottom-full left-0 w-full"
              style={{
                width: "clamp(280px, 50vw, 500px)",
                height: "clamp(190px, 34vw, 340px)",
                transformOrigin: "bottom center",
                transform: "rotateX(0deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Lid back (visible from bird's eye) */}
              <div
                className="absolute inset-0 rounded-t-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(0deg, #2a2a2a, #333 50%, #2a2a2a)",
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
              {/* Lid front (screen side) */}
              <div
                className="absolute inset-0 rounded-t-xl p-3 pb-5"
                style={{
                  background: "#111",
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="w-full h-full rounded-t-md bg-editor-bg overflow-hidden">
                  <div className="p-1">
                    <div className="flex items-center gap-1 px-2 py-1 border-b border-editor-border">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                      <span className="flex-1 text-center text-[4px] text-editor-muted">
                        alexandre-roy — ~/portfolio
                      </span>
                    </div>
                    <div className="flex mt-0.5">
                      <div className="w-[60px] border-r border-editor-border p-1">
                        <div className="text-[3px] text-editor-faint tracking-wider mb-1">
                          EXPLORER
                        </div>
                        <div className="text-[4px] text-editor-text bg-editor-border/50 px-1 py-0.5 rounded-sm">
                          ◇ README.md
                        </div>
                        <div className="text-[4px] text-editor-muted px-1 py-0.5">
                          ◇ about.md
                        </div>
                        <div className="text-[4px] text-editor-muted px-1 py-0.5">
                          ▸ projects/
                        </div>
                        <div className="text-[4px] text-editor-muted px-1 py-0.5">
                          ◇ experience.md
                        </div>
                        <div className="text-[4px] text-editor-muted px-1 py-0.5">
                          ◇ contact.json
                        </div>
                      </div>
                      <div className="flex-1 p-1">
                        <div className="text-[4px] text-syntax-comment">
                          # Alexandre Roy
                        </div>
                        <div className="text-[4px] text-syntax-comment mt-0.5">
                          ## Développeur · Québec
                        </div>
                        <div className="text-[4px] text-syntax-string mt-0.5">
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
              className="relative rounded-b-xl"
              style={{
                width: "clamp(280px, 50vw, 500px)",
                height: "clamp(179px, 32vw, 320px)",
                background: "linear-gradient(180deg, #2a2a2a, #1a1a1a)",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute top-2 left-24 right-24 h-2 rounded-full"
                style={{ background: "#111" }}
              />
              <div
                className="absolute top-5 left-10 right-10 bottom-8 grid gap-[3px]"
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
                className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-24 h-1.5 rounded"
                style={{ background: "#333" }}
              />
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
