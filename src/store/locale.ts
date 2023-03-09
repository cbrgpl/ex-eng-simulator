import { defineStore } from 'pinia'
import { languages, type ILanguage } from '@/static/languages'
import { i18nWrapper } from '@/utils/plugins/i18n'

export const useLocaleStore = defineStore( 'locale', {
  state: () => {
    return {
      activeLanguage: languages.find( ( language ) => language.locale === i18nWrapper.locale.value ) ?? null  as ILanguage | null,
    }
  },
} )
