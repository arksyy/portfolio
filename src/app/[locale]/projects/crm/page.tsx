import { useTranslations } from "next-intl";

export default function CrmPage() {
  const t = useTranslations("Projects.crm");

  return (
    <section className="pt-12 pb-20">
      <h1 className="text-2xl font-bold text-editor-text">{t("name")}</h1>
      <p className="text-editor-muted text-sm mt-3 leading-relaxed">
        {t("description")}
      </p>
      <div className="flex gap-2 mt-4">
        {(t.raw("tags") as string[]).map((tag) => (
          <span
            key={tag}
            className="text-[10px] text-editor-faint bg-editor-sidebar px-2.5 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
