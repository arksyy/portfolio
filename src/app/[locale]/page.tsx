import { Window } from "@/components/Window";

export default function Home() {
  return (
    <main className="min-h-screen bg-editor-bg-deep p-0">
      <Window>
        <div className="p-6">
          <p className="text-editor-muted">Content goes here...</p>
        </div>
      </Window>
    </main>
  );
}
