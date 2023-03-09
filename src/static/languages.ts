export interface ILanguage {
  icon: string;
  locale: ESupportLanguages;
  name: string;
}

export enum ESupportLanguages {
  RU = 'ru',
  EN = 'en'
}

export const languages: ILanguage[] = [
  {
    icon: new URL( '@/static/icons/russian-flag.svg', import.meta.url ).href,
    locale: ESupportLanguages.RU,
    name: 'Русский',
  },
  {
    icon: new URL( '@/static/icons/english-flag.svg', import.meta.url ).href,
    locale: ESupportLanguages.EN,
    name: 'English',
  },
]
