import { Titlebar } from "@/components/Titlebar";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-editor-bg font-mono text-[13px]">
      <Titlebar />
      <main className="max-w-3xl mx-auto px-6 md:px-12 pb-20">
        <Hero />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="border-t border-editor-border py-6 text-center text-xs text-editor-faint">
        © 2026 alexandre roy
      </footer>
    </div>
  );
}
