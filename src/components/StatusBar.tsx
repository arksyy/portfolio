import { useTranslations } from "next-intl";

export function StatusBar() {
  const t = useTranslations("StatusBar");

  return (
    <div className="flex justify-between px-4 py-1 bg-editor-sidebar border-t border-editor-border text-[11px] text-editor-muted">
      <div className="flex gap-4">
        <span>◉ {t("branch")}</span>
        <span>{t("encoding")}</span>
        <span>{t("fileType")}</span>
      </div>
      <div className="flex gap-4">
        <span>Ln 1, Col 1</span>
        <span>© 2026</span>
      </div>
    </div>
  );
}
