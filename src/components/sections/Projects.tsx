import { useTranslations } from "next-intl";
import { Line } from "./Line";

export function Projects() {
  const t = useTranslations("Projects");
  const items = t.raw("items") as Array<{
    file: string;
    name: string;
    description: string;
    tags: string[];
  }>;

  return (
    <section id="section-projects" className="px-6 py-4">
      <Line num={8}>
        <span className="text-syntax-comment">## {t("heading")}</span>
      </Line>
      <Line num={9} />
      <div className="space-y-3 ml-10 my-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="border border-editor-border rounded-md p-4 hover:border-editor-muted transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-editor-muted text-xs">◇</span>
              <span className="font-semibold text-editor-text">
                {item.file}
              </span>
            </div>
            <p className="text-editor-muted text-xs leading-relaxed">
              {item.description}
            </p>
            <div className="flex gap-1.5 mt-3">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-editor-faint bg-editor-sidebar px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Line num={10} />
      <Line num={11}>
        <span className="text-syntax-comment">---</span>
      </Line>
    </section>
  );
}
