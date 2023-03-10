import { defineStore } from 'pinia'
import { languages, type ILanguage } from '@/static/languages'

export const useLocaleStore = defineStore( 'locale', {
  state: () => {
    return {
      activeLanguage: null as ILanguage | null,
      cacheLanguage: true,
    }
  },
  actions: {
    setLocale( locale: string, cache = true ): void {
      const language: ILanguage | null = languages.find( ( language ) => language.locale === locale ) ?? null
      
      if ( language === null ) {
        console.warn( `Unexpected language locale "${ locale }"` )
        return
      }

      this.$patch( {
        activeLanguage: language,
        cacheLanguage: cache,
      } )
    },
  },
} )
