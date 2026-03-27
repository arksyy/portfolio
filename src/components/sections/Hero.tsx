import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section id="section-hero" className="px-8 md:px-12 py-16">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-editor-text leading-tight">
        {t("name")}
      </h1>
      <p className="text-editor-muted mt-3 text-sm tracking-wide">
        {t("title")}
      </p>
      <p className="text-editor-muted mt-6 text-sm leading-relaxed max-w-lg">
        {t("bio")}
      </p>
    </section>
  );
}
