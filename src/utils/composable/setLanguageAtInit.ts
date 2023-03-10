import { useLocaleStore } from '@store/locale'
import { DEFAULT_LOCALE, SUPPORT_LOCALES } from '../plugins/i18n'

const isLanguageSupported = ( locale: string ) => SUPPORT_LOCALES.findIndex( ( supportedLocale ) => supportedLocale === locale ) !== -1

export const setLanguageAtInit = (): void => {  
  const storageLocale = localStorage.getItem( window.storageNames.LOCALE )

  const localeStore = useLocaleStore()
  if ( storageLocale && isLanguageSupported( storageLocale  ) ) {
    localeStore.setLocale( storageLocale, false )
    return
  }

  const browserLocale = navigator.language
  if ( isLanguageSupported( browserLocale ) ) {
    localeStore.setLocale( browserLocale, false )
    return
  }

  localeStore.setLocale( DEFAULT_LOCALE, false )
}
