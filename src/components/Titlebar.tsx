import { ThemeToggle } from "./ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";

interface TitlebarProps {
  terminalOpen: boolean;
  onToggleTerminal: () => void;
}

export function Titlebar({ terminalOpen, onToggleTerminal }: TitlebarProps) {
  return (
    <div className="flex items-center px-4 py-2.5 bg-editor-sidebar border-b border-editor-border">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 text-center text-xs text-editor-muted">
        alexandre roy
      </div>
      <div className="flex items-center gap-3">
        <LocaleSwitcher />
        <button
          onClick={onToggleTerminal}
          aria-label="Toggle terminal"
          className={`font-mono text-[11px] transition-colors ${
            terminalOpen
              ? "text-editor-text"
              : "text-editor-muted hover:text-editor-text"
          }`}
        >
          ❯_
        </button>
        <ThemeToggle />
      </div>
    </div>
  );
}
