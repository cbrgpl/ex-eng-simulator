import { createI18n, I18nOptions, I18n, ComposerTranslation  } from 'vue-i18n'
import { nextTick, WritableComputedRef } from 'vue'
import { en, ru } from 'vuetify/locale'
import { MutationType } from 'pinia'

import { useLocaleStore } from '@store/locale'

const SUPPORT_LOCALES = [ 'en', 'ru' ]
const envDefaultLocaleSupported = SUPPORT_LOCALES.includes( import.meta.env.VITE_DEFAULT_LOCALE )
const DEFAULT_LOCALE = envDefaultLocaleSupported  ? import.meta.env.VITE_DEFAULT_LOCALE : 'en'

if ( import.meta.env.VITE_DEFAULT_LOCALE && !envDefaultLocaleSupported ) {
  console.warn( `Env locale variable "VITE_DEFAULT_LOCALE=${ import.meta.env.VITE_DEFAULT_LOCALE }" is not supported` )
}

const vuetifyTranslations = { 
  en, ru,
}

const i18nWrapper = new class I18nWrapper {
  i18n: I18n

  setupI18n( options: I18nOptions ): void {
    this.i18n = createI18n( options )
    const setupLocale = options.locale || DEFAULT_LOCALE

    this.setI18nLocale( setupLocale, false )
    this.uploadMessages( setupLocale )
  }

  subscribeOnLocaleStore() {
    const localeStore = useLocaleStore()
    localeStore.$subscribe( ( mutation, state ) => {
      if ( state.activeLanguage?.locale && state.activeLanguage.locale !== this.i18n.global.locale ) {
        const cacheLanguage = mutation.type === MutationType.patchObject ? mutation.payload.cacheLanguage : true

        this.setI18nLocale( state.activeLanguage.locale, cacheLanguage )
        this.uploadMessages( ( this.i18n.global.locale as WritableComputedRef<string> ).value )
      }

      localeStore.cacheLanguage = true
    } )
  }

  private setI18nLocale( locale: string, cache?: boolean ): void {
    ( this.i18n.global.locale as WritableComputedRef<string> ).value = locale
    document.querySelector( 'html' )?.setAttribute( 'lang', locale )

    if ( cache !== false ) {
      localStorage.setItem( window.storageNames.LOCALE, locale )
    }
  }

  private async uploadMessages( locale: string ) {
    const messages = ( await import( `@/localization/${ locale }.json` ) as { default: object } ).default

    this.i18n.global.setLocaleMessage( locale, {
      ...messages,
      ...( vuetifyTranslations[ locale as keyof typeof vuetifyTranslations ] ),
    } )
    return nextTick()
  }
} 
  
i18nWrapper.setupI18n( {
  locale: DEFAULT_LOCALE,
  legacy: false,
  availableLocales: SUPPORT_LOCALES,
} )

const t = i18nWrapper.i18n.global.t as ComposerTranslation

export {
  i18nWrapper,
  DEFAULT_LOCALE,
  SUPPORT_LOCALES,
  t,
}
