import { ThemeToggle } from "./ThemeToggle";

export function Titlebar() {
  return (
    <div className="flex items-center px-4 py-2.5 bg-editor-sidebar border-b border-editor-border">
      <div className="flex-1 text-left text-xs text-editor-muted">
        alexandre roy
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </div>
  );
}
