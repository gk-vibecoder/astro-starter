import { en } from './locales/en';
import { sv } from './locales/sv';

const translations = { en, sv } as const;

export type Lang = keyof typeof translations;
export type Translations = typeof en;

export function getLangFromUrl(url: URL): Lang {
  const [, firstSegment] = url.pathname.split('/');
  if (firstSegment === 'sv') return 'sv';
  return 'en';
}

export function useTranslations(lang: Lang): Translations {
  return translations[lang] as Translations;
}

/**
 * Returns a locale-prefixed path.
 * English stays at root (/about-us), Swedish gets /sv prefix (/sv/about-us).
 */
export function getLocalePath(lang: Lang, path: string): string {
  if (lang === 'en') return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/sv${cleanPath}`;
}
