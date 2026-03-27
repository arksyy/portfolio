import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Hero");

  return (
    <main className="min-h-screen bg-editor-bg-deep text-editor-text font-mono">
      <h1>{t("name")}</h1>
      <p>{t("title")}</p>
    </main>
  );
}
