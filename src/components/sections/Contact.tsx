import { useTranslations } from "next-intl";

export function Contact() {
  const t = useTranslations("Contact");

  const links = [
    { label: t("email"), href: `mailto:${t("email")}` },
    { label: "github", href: "#" },
    { label: "linkedin", href: "#" },
    { label: `↓ ${t("downloadCv")}`, href: "/cv.pdf" },
  ];

  return (
    <section id="contact" className="py-8">
      <div className="text-editor-muted mb-4">
        <span className="text-syntax-keyword">$</span> cat contact.json
      </div>
      <div className="flex flex-wrap gap-5">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href === "/cv.pdf" ? "_blank" : undefined}
            className="text-[13px] text-editor-muted hover:text-editor-text transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
