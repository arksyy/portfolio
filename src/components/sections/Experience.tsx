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
    <section id="experience" className="py-8">
      <div className="text-editor-muted mb-4">
        <span className="text-syntax-keyword">$</span> cat expérience.md
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-5">
            <div className="w-24 shrink-0 text-[12px] text-editor-faint pt-0.5">
              {item.date}
            </div>
            <div>
              <div className="text-[13px] font-semibold text-editor-text">
                {item.role}
              </div>
              <div className="text-[12px] text-editor-faint mt-0.5">
                {item.place}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
