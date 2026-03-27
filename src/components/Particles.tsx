"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = resolvedTheme !== "light";
    let animationId: number;

    let stars: Array<{ x: number; y: number; z: number }> = [];

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function init() {
      resize();
      stars = Array.from({ length: 150 }, () => ({
        x: (Math.random() - 0.5) * canvas!.width,
        y: (Math.random() - 0.5) * canvas!.height,
        z: Math.random() * canvas!.width,
      }));
    }

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx!.fillStyle = isDark ? "rgba(0,0,0,0.15)" : "rgba(232,232,232,0.15)";
      ctx!.fillRect(0, 0, w, h);

      const rgb = isDark ? "255,255,255" : "0,0,0";

      for (const s of stars) {
        s.z -= 1.5;
        if (s.z <= 0) {
          s.z = w;
          s.x = (Math.random() - 0.5) * w;
          s.y = (Math.random() - 0.5) * h;
        }

        const sx = (s.x / s.z) * 300 + cx;
        const sy = (s.y / s.z) * 300 + cy;
        const r = Math.max(0, (1 - s.z / w) * 2);
        const alpha = 1 - s.z / w;

        ctx!.beginPath();
        ctx!.arc(sx, sy, r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${rgb},${alpha})`;
        ctx!.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    init();
    draw();

    window.addEventListener("resize", init);
    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(animationId);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
