import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Titlebar() {
  return (
    <div className="flex items-center px-4 py-2.5 bg-editor-sidebar border-b border-editor-border">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 text-center text-xs text-editor-muted">
        alexandre-roy — ~/portfolio
      </div>
      <div className="flex items-center gap-3">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
    </div>
  );
}
