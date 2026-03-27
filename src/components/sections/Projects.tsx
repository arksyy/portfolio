import { useTranslations } from "next-intl";

const projects = [
  { key: "canopia" },
  { key: "crm" },
  { key: "entreprise" },
];

export function Projects() {
  const t = useTranslations("Projects");

  return (
    <section id="projets" className="py-16">
      <h2 className="text-xs tracking-widest text-editor-faint uppercase mb-8">
        {t("heading")}
      </h2>
      <div className="space-y-4">
        {projects.map((project) => {
          const name = t(`${project.key}.name`);
          const description = t(`${project.key}.description`);
          const tags = t.raw(`${project.key}.tags`) as string[];

          return (
            <div
              key={project.key}
              className="border border-editor-border rounded-lg p-5 hover:border-editor-muted transition-colors"
            >
              <h3 className="text-sm font-semibold text-editor-text">
                {name}
              </h3>
              <p className="text-editor-muted text-xs mt-1.5 leading-relaxed">
                {description}
              </p>
              <div className="flex gap-2 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-editor-faint bg-editor-sidebar px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
