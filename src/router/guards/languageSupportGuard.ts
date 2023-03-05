import { i18nWrapper, DEFAULT_LOCALE, SUPPORT_LOCALES } from '@/utils/plugins/i18n'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'

const isSupported = ( locale: string | null ): string | null => locale ? 
  SUPPORT_LOCALES.includes( locale ) ? locale : null 
  : null

export const languageSupportGuard = async ( 
  to: RouteLocationNormalized, 
  from: RouteLocationNormalized,
  next: NavigationGuardNext  ) => {
  const locale = isSupported( localStorage.getItem( 'locale' ) ) 
  ?? isSupported( navigator.language )
  ?? DEFAULT_LOCALE

 
  if ( !i18nWrapper.i18n.global.availableLocales.includes( locale ) ) {
    await i18nWrapper.uploadMessages( locale )
  }

  i18nWrapper.setI18nLocale( locale )

  return next()
} 
