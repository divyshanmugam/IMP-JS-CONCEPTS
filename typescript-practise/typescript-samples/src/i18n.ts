import { i18n } from '@lingui/core';

type Locales = "en" | "es" | "fr";

export const locales = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
} satisfies Record<Locales, string>;

export const defaultLocale = 'en'

export async function dynamicActivate(locale: Locales) {
  // Dynamically import the compiled production file
  const { messages } = await import(`./locales/${locale}/messages.js`)
  
  i18n.load(locale, messages);
  i18n.activate(locale);
}
