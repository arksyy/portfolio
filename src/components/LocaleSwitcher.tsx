"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale() {
    const next = locale === "fr" ? "en" : "fr";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <button
      onClick={switchLocale}
      disabled={isPending}
      className="text-[11px] text-editor-muted border border-editor-border px-2 py-0.5 rounded hover:text-editor-text transition-colors"
    >
      {locale === "fr" ? "FR / EN" : "EN / FR"}
    </button>
  );
}
