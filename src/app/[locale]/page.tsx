import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-editor-bg font-mono text-[14px]">
      {/* Nav as prompt */}
      <nav className="sticky top-0 z-50 flex items-center gap-6 px-8 py-4 bg-editor-bg/85 backdrop-blur-md border-b border-editor-border">
        <span>
          <span className="text-syntax-property">~/alexandre-roy</span>{" "}
          <span className="text-syntax-keyword">❯</span>
        </span>
        <a href="#about" className="text-editor-faint hover:text-editor-text transition-colors text-[13px]">
          à propos
        </a>
        <a href="#projets" className="text-editor-faint hover:text-editor-text transition-colors text-[13px]">
          projets
        </a>
        <a href="#experience" className="text-editor-faint hover:text-editor-text transition-colors text-[13px]">
          expérience
        </a>
        <a href="#contact" className="text-editor-faint hover:text-editor-text transition-colors text-[13px]">
          contact
        </a>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-8 pb-20">
        <Hero />
        <Projects />
        <Experience />
        <Contact />

        {/* Idle prompt at bottom */}
        <div className="mt-8 text-editor-faint">
          <span className="text-syntax-property">~</span>{" "}
          <span className="text-syntax-keyword">❯</span>{" "}
          <span className="inline-block w-2 h-[14px] bg-editor-text align-text-bottom animate-pulse" />
        </div>
      </main>
    </div>
  );
}
