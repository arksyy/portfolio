"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface MacbookIntroProps {
  children: React.ReactNode;
}

export function MacbookIntro({ children }: MacbookIntroProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lidRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const [settled, setSettled] = useState(false);

  const onScroll = useCallback(() => {
    const scene = sceneRef.current;
    const wrapper = wrapperRef.current;
    const lid = lidRef.current;
    const name = nameRef.current;
    if (!scene || !wrapper || !lid || !name) return;

    const scrollTop = window.scrollY;
    const sceneHeight = scene.offsetHeight - window.innerHeight;
    if (sceneHeight <= 0) return;
    const progress = Math.min(Math.max(scrollTop / sceneHeight, 0), 1);

    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Whole MacBook rotation (bird's eye → front view)
    // and lid opening happen together
    let wrapperRotX: number;
    let lidRotX: number;
    let scale: number;
    let nameOpacity: number;

    if (progress < 0.5) {
      // Phase 1: Bird's eye → tilting forward, lid starts opening
      const p = ease(progress / 0.5);
      wrapperRotX = 80 - p * 60; // 80° → 20°
      lidRotX = p * 60; // 0° → 60°
      scale = 0.5 + p * 0.2; // 0.5 → 0.7
      nameOpacity = Math.max(0, 1 - p * 2);
    } else if (progress < 0.85) {
      // Phase 2: Face camera, finish opening
      const p = ease((progress - 0.5) / 0.35);
      wrapperRotX = 20 - p * 20; // 20° → 0°
      lidRotX = 60 + p * 50; // 60° → 110°
      scale = 0.7 + p * 0.3; // 0.7 → 1.0
      nameOpacity = 0;
    } else {
      // Phase 3: Settled
      const p = ease((progress - 0.85) / 0.15);
      wrapperRotX = 0;
      lidRotX = 110;
      scale = 1.0;
      nameOpacity = 0;
    }

    wrapper.style.transform = `rotateX(${wrapperRotX}deg) scale(${scale})`;
    lid.style.transform = `rotateX(-${lidRotX}deg)`;
    name.style.opacity = `${nameOpacity}`;
    name.style.transform = `translateY(${-(1 - nameOpacity) * 40}px)`;

    if (progress >= 0.9 && !settled) setSettled(true);
    else if (progress < 0.85 && settled) setSettled(false);
  }, [settled]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return (
    <div ref={sceneRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black"
        style={{ perspective: "2000px" }}
      >
        {/* Name */}
        <div
          ref={nameRef}
          className="absolute top-[8%] text-center z-10 pointer-events-none"
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

        {/* MacBook wrapper — rotates the whole laptop */}
        <div
          ref={wrapperRef}
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(80deg) scale(0.5)",
          }}
        >
          {/*
            Layout: lid sits on top of base, hinged at the connection point.
            We use a flex column-reverse so the base is at the bottom
            and the lid rotates from its bottom edge (the hinge).
          */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Lid — rotates around bottom edge (the hinge) */}
            <div
              ref={lidRef}
              style={{
                width: "clamp(340px, 70vw, 900px)",
                transformOrigin: "bottom center",
                transform: "rotateX(0deg)",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Lid outer (back — aluminum) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "12px 12px 0 0",
                  background: "linear-gradient(170deg, #3a3a3a 0%, #2c2c2c 30%, #262626 70%, #222 100%)",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Apple logo */}
                <div style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotateZ(180deg)",
                }}>
                  <svg width="28" height="34" viewBox="0 0 24 24" fill="#555" opacity="0.6">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
              </div>

              {/* Lid inner (screen — faces user when open) */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 10.5",
                  borderRadius: "12px 12px 0 0",
                  background: "#0a0a0a",
                  padding: "8px 8px 12px 8px",
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                {/* Screen bezel */}
                <div style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px 8px 2px 2px",
                  background: "#0e0e0e",
                  overflow: "hidden",
                  position: "relative",
                }}>
                  {/* Notch */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "25%",
                    maxWidth: "160px",
                    height: "24px",
                    background: "#0a0a0a",
                    borderRadius: "0 0 14px 14px",
                    zIndex: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {/* Camera */}
                    <div style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#1e1e1e",
                      border: "1px solid #333",
                    }} />
                  </div>

                  {/* Content area */}
                  <div className="h-full" style={{ paddingTop: "24px" }}>
                    {settled ? children : <MiniPreview />}
                  </div>
                </div>
              </div>
            </div>

            {/* Hinge */}
            <div style={{
              width: "clamp(340px, 70vw, 900px)",
              height: "6px",
              background: "linear-gradient(to bottom, #444, #2a2a2a)",
              borderRadius: "0 0 2px 2px",
            }} />

            {/* Base — keyboard and trackpad */}
            <div style={{
              width: "clamp(340px, 70vw, 900px)",
              aspectRatio: "16 / 10",
              background: "linear-gradient(170deg, #353535 0%, #2a2a2a 30%, #252525 70%, #202020 100%)",
              borderRadius: "0 0 12px 12px",
              position: "relative",
              boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
            }}>
              {/* Speaker grille top */}
              <div style={{
                position: "absolute",
                top: "3%",
                left: "4%",
                right: "4%",
                height: "2.5%",
                display: "flex",
                justifyContent: "space-between",
              }}>
                <div style={{
                  width: "30%",
                  height: "100%",
                  background: "repeating-linear-gradient(90deg, #1a1a1a 0px, #1a1a1a 1px, transparent 1px, transparent 3px)",
                  borderRadius: "2px",
                  opacity: 0.6,
                }} />
                <div style={{
                  width: "30%",
                  height: "100%",
                  background: "repeating-linear-gradient(90deg, #1a1a1a 0px, #1a1a1a 1px, transparent 1px, transparent 3px)",
                  borderRadius: "2px",
                  opacity: 0.6,
                }} />
              </div>

              {/* Keyboard area */}
              <div style={{
                position: "absolute",
                top: "10%",
                left: "5%",
                right: "5%",
                height: "52%",
                display: "grid",
                gridTemplateColumns: "repeat(14, 1fr)",
                gridTemplateRows: "repeat(5, 1fr)",
                gap: "2px",
              }}>
                {Array.from({ length: 70 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      background: "linear-gradient(180deg, #2e2e2e, #262626)",
                      borderRadius: "3px",
                      boxShadow: "inset 0 -1px 0 #1a1a1a, inset 0 1px 0 #333",
                    }}
                  />
                ))}
              </div>

              {/* Trackpad */}
              <div style={{
                position: "absolute",
                bottom: "6%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "38%",
                height: "28%",
                background: "linear-gradient(180deg, #2c2c2c, #272727)",
                borderRadius: "8px",
                border: "1px solid #1f1f1f",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
              }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniPreview() {
  return (
    <div className="h-full bg-editor-bg p-3 font-mono overflow-hidden">
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-editor-sidebar border-b border-editor-border rounded-t">
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
        <span className="flex-1 text-center text-[8px] text-editor-muted">
          alexandre-roy — ~/portfolio
        </span>
      </div>
      <div className="flex border-x border-b border-editor-border bg-editor-bg" style={{ height: "calc(100% - 40px)" }}>
        <div className="w-[80px] border-r border-editor-border p-2 bg-editor-sidebar">
          <div className="text-[5px] text-editor-faint tracking-wider mb-2">EXPLORER</div>
          <div className="text-[7px] text-editor-text bg-editor-border/50 px-1.5 py-0.5 rounded mb-0.5">◇ README.md</div>
          <div className="text-[7px] text-editor-muted px-1.5 py-0.5">◇ about.md</div>
          <div className="text-[7px] text-editor-muted px-1.5 py-0.5">▸ projects/</div>
          <div className="text-[7px] text-editor-muted px-1.5 py-0.5">◇ experience.md</div>
          <div className="text-[7px] text-editor-muted px-1.5 py-0.5">◇ contact.json</div>
        </div>
        <div className="flex-1 p-3">
          <div className="text-[8px] text-syntax-comment font-semibold"># Alexandre Roy</div>
          <div className="text-[7px] text-syntax-comment mt-1">## Développeur · Québec</div>
          <div className="text-[7px] text-syntax-string mt-2 leading-relaxed">
            Étudiant en technique informatique au Cégep Garneau...
          </div>
        </div>
      </div>
    </div>
  );
}
