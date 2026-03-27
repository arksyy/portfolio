import { useTranslations } from "next-intl";

export function Contact() {
  const t = useTranslations("Contact");

  const links = [
    { label: t("email"), href: `mailto:${t("email")}` },
    { label: "linkedin", href: "#" },
    { label: "github", href: "#" },
    { label: `↓ ${t("downloadCv")}`, href: "/cv.pdf" },
  ];

  return (
    <section id="section-contact" className="py-12">
      <h2 className="text-xs tracking-widest text-editor-faint uppercase mb-6">
        {t("heading")}
      </h2>
      <div className="flex flex-wrap gap-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href === "/cv.pdf" ? "_blank" : undefined}
            className="text-sm text-editor-muted hover:text-editor-text transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
