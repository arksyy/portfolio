import { Window } from "@/components/Window";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <Window>
      <div className="pb-20">
        <Hero />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </Window>
  );
}
