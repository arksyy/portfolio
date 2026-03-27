import { useTranslations } from "next-intl";

export function Projects() {
  const t = useTranslations("Projects");
  const items = t.raw("items") as Array<{
    file: string;
    name: string;
    description: string;
    tags: string[];
  }>;

  return (
    <section id="section-projects" className="px-8 md:px-12 py-12">
      <h2 className="text-xs tracking-widest text-editor-faint uppercase mb-6">
        {t("heading")}
      </h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="border border-editor-border rounded-lg p-5 hover:border-editor-muted transition-colors cursor-pointer"
          >
            <h3 className="text-sm font-semibold text-editor-text">
              {item.name}
            </h3>
            <p className="text-editor-muted text-xs mt-1.5 leading-relaxed">
              {item.description}
            </p>
            <div className="flex gap-2 mt-3">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-editor-faint bg-editor-sidebar px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
