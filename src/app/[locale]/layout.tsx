import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "@/components/Providers";
import { EditorShell } from "@/components/EditorShell";
import "../globals.css";

export const metadata: Metadata = {
  title: "alexandre roy",
  description: "développeur · québec",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased">
        <NextIntlClientProvider>
          <Providers>
            <EditorShell>{children}</EditorShell>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
