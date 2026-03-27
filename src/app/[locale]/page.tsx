import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Particles } from "@/components/Particles";

export default function Home() {
  return (
    <div className="min-h-screen bg-page-bg flex items-center justify-center p-6 md:p-12 font-mono text-[14px]">
      <Particles />

      {/* Terminal window */}
      <div className="relative z-10 w-full max-w-3xl rounded-xl overflow-hidden border border-editor-border shadow-2xl shadow-black/30 bg-terminal-bg backdrop-blur-xl">
        {/* Terminal bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-editor-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex items-center gap-5">
            <a href="#about" className="text-editor-faint hover:text-editor-text transition-colors text-[12px]">
              à propos
            </a>
            <a href="#projets" className="text-editor-faint hover:text-editor-text transition-colors text-[12px]">
              projets
            </a>
            <a href="#experience" className="text-editor-faint hover:text-editor-text transition-colors text-[12px]">
              expérience
            </a>
            <a href="#contact" className="text-editor-faint hover:text-editor-text transition-colors text-[12px]">
              contact
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Terminal body */}
        <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
          <Hero />
          <Projects />
          <Experience />
          <Contact />

          {/* Idle prompt */}
          <div className="mt-8 text-editor-faint">
            <span className="text-syntax-property">~</span>{" "}
            <span className="text-syntax-keyword">❯</span>{" "}
            <span className="inline-block w-2 h-[14px] bg-editor-text align-text-bottom animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
