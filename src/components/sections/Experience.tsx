import { useTranslations } from "next-intl";

export function Experience() {
  const t = useTranslations("Experience");
  const items = t.raw("items") as Array<{
    date: string;
    role: string;
    place: string;
    description: string;
  }>;

  return (
    <section id="experience" className="py-16">
      <h2 className="text-xs tracking-widest text-editor-faint uppercase mb-6">
        {t("heading")}
      </h2>
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="flex gap-6">
            <div className="w-28 shrink-0 text-xs text-editor-faint pt-0.5">
              {item.date}
            </div>
            <div>
              <div className="text-sm font-semibold text-editor-text">
                {item.role}
              </div>
              <div className="text-xs text-editor-muted mt-0.5">
                {item.place}
              </div>
              <div className="text-xs text-editor-muted mt-2 leading-relaxed">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
