import { useTranslations } from "next-intl";

const projects = [
  { key: "canopia" },
  { key: "crm" },
  { key: "entreprise" },
];

export function Projects() {
  const t = useTranslations("Projects");

  return (
    <section id="projets" className="py-8">
      <div className="text-editor-muted mb-4">
        <span className="text-syntax-keyword">$</span> ls projets/
      </div>
      <div className="space-y-0">
        {projects.map((project) => {
          const name = t(`${project.key}.name`);
          const description = t(`${project.key}.description`);
          const tags = t.raw(`${project.key}.tags`) as string[];

          return (
            <div
              key={project.key}
              className="py-3 border-b border-editor-border last:border-none"
            >
              <h3 className="text-[14px] text-editor-text font-semibold">
                <span className="text-syntax-property mr-2">→</span>
                {name}
              </h3>
              <p className="text-editor-faint text-[12px] mt-1 pl-5">
                {description}
              </p>
              <div className="flex gap-2 mt-2 pl-5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-editor-faint bg-editor-sidebar px-2 py-0.5 rounded"
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
