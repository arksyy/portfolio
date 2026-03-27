import { useTranslations } from "next-intl";
import { Line } from "./Line";

export function Experience() {
  const t = useTranslations("Experience");
  const items = t.raw("items") as Array<{
    date: string;
    role: string;
    place: string;
    description: string;
  }>;

  return (
    <section id="section-experience" className="px-6 py-4">
      <Line num={12}>
        <span className="text-syntax-comment">## {t("heading")}</span>
      </Line>
      <Line num={13} />
      <div className="ml-10 my-3 space-y-1">
        {items.map((item, i) => (
          <div
            key={i}
            className="pl-4 py-3 border-l-2 border-editor-border hover:border-editor-muted transition-colors"
          >
            <div className="font-semibold text-editor-text">{item.role}</div>
            <div className="text-xs text-editor-faint mt-0.5">
              {item.place} · {item.date}
            </div>
            <div className="text-xs text-editor-muted mt-1.5">
              {item.description}
            </div>
          </div>
        ))}
      </div>
      <Line num={14} />
      <Line num={15}>
        <span className="text-syntax-comment">---</span>
      </Line>
    </section>
  );
}
