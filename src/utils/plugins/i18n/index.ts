import { createI18n, I18nOptions, I18n  } from 'vue-i18n'
import { ref, readonly, nextTick, WritableComputedRef } from 'vue'
import { en, ru } from 'vuetify/locale'

import { useLocaleStore } from '@store/locale'

const DEFAULT_LOCALE = 'en'
const SUPPORT_LOCALES = [ 'en', 'ru' ]

const vuetifyTranslations = { 
  en, ru,
}

const i18nWrapper = new class I18nWrapper {
  i18n: I18n
  private _locale = ref( DEFAULT_LOCALE )

  get locale() {
    return readonly( this._locale )
  }
  
  setupI18n( options: I18nOptions ): void {
    this.i18n = createI18n( options )

    this.setI18nLocale( options.locale || DEFAULT_LOCALE )
    this.uploadMessages( this._locale.value )
  }

  subscribeOnLocaleStore() {
    const localeStore = useLocaleStore()
    localeStore.$subscribe( ( mutation, state ) => {
      if ( state.activeLanguage?.locale && state.activeLanguage.locale !== this.i18n.global.locale ) {
        this.setI18nLocale( state.activeLanguage.locale )
        this.uploadMessages( ( this.i18n.global.locale as WritableComputedRef<string> ).value )
      }
    } )
  }

  setI18nLocale( locale: string ): void {
    ( this.i18n.global.locale as WritableComputedRef<string> ).value = locale
    this._locale.value = locale
    document.querySelector( 'html' )?.setAttribute( 'lang', locale )
  }

  async uploadMessages( locale: string ) {
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

export {
  i18nWrapper,
  DEFAULT_LOCALE,
  SUPPORT_LOCALES,
}
