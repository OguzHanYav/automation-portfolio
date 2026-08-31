import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import { translations, Lang } from './translations';

export type { Lang } from './translations';

const STORAGE_KEY = 'site-lang';
const SUPPORTED: Lang[] = ['de', 'en', 'tr'];

function detectInitialLang(): Lang {
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && SUPPORTED.includes(saved)) {
      return saved;
    }
  }
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language?.slice(0, 2).toLowerCase();
    if (SUPPORTED.includes(browserLang as Lang)) {
      return browserLang as Lang;
    }
  }
  return 'en';
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly doc = inject(DOCUMENT);

  readonly supported = SUPPORTED;
  readonly lang = signal<Lang>(detectInitialLang());

  constructor() {
    // Bug fix: the site had no way to reflect the active language on <html lang="">
    // or to persist the user's choice across visits. This keeps both in sync
    // reactively whenever `lang` changes, anywhere in the app.
    effect(() => {
      const current = this.lang();
      this.doc.documentElement.lang = current;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, current);
      }
    });
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
  }

  /** Returns a translated string for a dot-separated path, e.g. "home.title". */
  t(path: string): string {
    const value = this.lookup(path);
    return typeof value === 'string' ? value : path;
  }

  /** Returns a translated list (strings or objects) for a dot-separated path. */
  list<T = any>(path: string): T[] {
    const value = this.lookup(path);
    return Array.isArray(value) ? value : [];
  }

  private lookup(path: string): unknown {
    const dict = translations[this.lang()];
    return path.split('.').reduce<any>((acc, key) => (acc == null ? undefined : acc[key]), dict);
  }
}
