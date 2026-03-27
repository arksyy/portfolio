import { useTranslations } from "next-intl";
import { Line } from "./Line";

export function Contact() {
  const t = useTranslations("Contact");

  const links = [
    { key: "email", value: t("email"), href: `mailto:${t("email")}` },
    { key: "linkedin", value: "linkedin.com/in/alexandreroy", href: "#" },
    { key: "github", value: "github.com/alexandreroy", href: "#" },
    { key: "cv", value: `↓ ${t("downloadCv")}`, href: "/cv.pdf" },
  ];

  return (
    <section id="section-contact" className="px-6 py-4">
      <Line num={16}>
        <span className="text-syntax-comment">## {t("heading")}</span>
      </Line>
      <Line num={17} />
      <div className="ml-10 my-3">
        {links.map((link) => (
          <a
            key={link.key}
            href={link.href}
            target={link.key === "cv" ? "_blank" : undefined}
            className="flex py-2 border-b border-editor-border/50 hover:text-editor-text transition-colors"
          >
            <span className="w-[120px] text-syntax-property">{link.key}</span>
            <span className="text-syntax-string">
              &quot;{link.value}&quot;
            </span>
          </a>
        ))}
      </div>
      <Line num={18} />
    </section>
  );
}
