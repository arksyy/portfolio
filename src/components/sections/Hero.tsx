import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section id="about" className="pt-12 pb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-editor-text">
        {t("name")}
      </h1>
      <p className="text-editor-muted mt-2 text-[13px]">
        {t("title")}
      </p>
      <p className="text-editor-muted mt-5 text-[13px] leading-relaxed max-w-lg">
        {t("bio")}
      </p>
    </section>
  );
}
