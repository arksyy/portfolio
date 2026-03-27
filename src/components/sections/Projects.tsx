import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const projects = [
  { slug: "canopia", key: "canopia" },
  { slug: "crm", key: "crm" },
  { slug: "entreprise", key: "entreprise" },
];

export function Projects() {
  const t = useTranslations("Projects");

  return (
    <section className="pt-12 pb-20">
      <h2 className="text-xs tracking-widest text-editor-faint uppercase mb-6">
        {t("heading")}
      </h2>
      <div className="space-y-4">
        {projects.map((project) => {
          const name = t(`${project.key}.name`);
          const description = t(`${project.key}.description`);
          const tags = t.raw(`${project.key}.tags`) as string[];

          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="block border border-editor-border rounded-lg p-5 hover:border-editor-muted transition-colors"
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
            </Link>
          );
        })}
      </div>
    </section>
  );
}
