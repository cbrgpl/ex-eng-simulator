import { createVuetify } from 'vuetify'

import { useI18n } from 'vue-i18n'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { i18nWrapper } from '../i18n'

import { iconify } from './iconify'

export const vuetify = createVuetify( {
  icons: {
    defaultSet: 'mdi',
    sets: {
      mdi: iconify( 'mdi' ),
    },
  },

  locale: {
    adapter: createVueI18nAdapter( { i18n: i18nWrapper.i18n, useI18n } ),
  },
  
  theme: {
    defaultTheme: 'light',
    variations: {
      colors: [ 'primary', 'secondary' ],
      lighten: 1,
      darken: 1,
    },
    themes: {
      colors: {
        dark: false,
        colors: {
          background: '#efeff9',

          white: '#f7f8fc',
          black: '#212121',

          placeholder: '#b2b2b2',
          divider: '#BDBDBD',

          primary: '#5f5fc4',
          secondary: '#ffa726',

          success: '#10b348',
          warning: '#facc15',
          error: '#DB5461',
          info: '#fafafa',
        },
      },
    },
  },
} )
