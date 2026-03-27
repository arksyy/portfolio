import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section id="section-hero" className="pt-16 pb-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-editor-text">
        {t("name")}
      </h1>
      <p className="text-editor-muted mt-2 text-sm">
        {t("title")}
      </p>
      <p className="text-editor-muted mt-6 text-sm leading-relaxed max-w-lg">
        {t("bio")}
      </p>
    </section>
  );
}
