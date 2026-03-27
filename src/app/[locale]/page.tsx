import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-editor-bg font-mono text-[13px]">
      {/* Simple nav */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-editor-bg/80 backdrop-blur-md">
        <span className="text-sm text-editor-text font-semibold">
          alexandre roy
        </span>
        <div className="flex items-center gap-6">
          <a href="#about" className="text-xs text-editor-muted hover:text-editor-text transition-colors">
            à propos
          </a>
          <a href="#projets" className="text-xs text-editor-muted hover:text-editor-text transition-colors">
            projets
          </a>
          <a href="#experience" className="text-xs text-editor-muted hover:text-editor-text transition-colors">
            expérience
          </a>
          <a href="#contact" className="text-xs text-editor-muted hover:text-editor-text transition-colors">
            contact
          </a>
          <ThemeToggle />
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 md:px-12 pb-20">
        <Hero />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
