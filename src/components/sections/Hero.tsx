import { useTranslations } from "next-intl";
import { Line } from "./Line";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section id="section-hero" className="px-6 py-8">
      <Line num={1}>
        <span className="text-syntax-comment font-semibold text-lg">
          # {t("name")}
        </span>
      </Line>
      <Line num={2} />
      <Line num={3}>
        <span className="text-syntax-comment">## {t("title")}</span>
      </Line>
      <Line num={4} />
      <Line num={5}>
        <span className="text-syntax-string">{t("bio")}</span>
      </Line>
      <Line num={6} />
      <Line num={7}>
        <span className="text-syntax-comment">---</span>
      </Line>
    </section>
  );
}
