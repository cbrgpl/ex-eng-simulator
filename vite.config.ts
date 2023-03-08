import { defineConfig } from 'vite'
import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import vuetify  from 'vite-plugin-vuetify'
import dynamicImport from 'vite-plugin-dynamic-import'

export default defineConfig( {
  plugins: [ 
    vue(),
    dynamicImport(),
    vuetify( {
      autoImport: true,
      styles: {
        configFile: 'src/scss/libs/_vuetify.scss',
      },
    } ),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/scss/utils/_utils.scss";',
      },
    },
  },

  
  server: {
    port: 8080,
  },

  resolve: {
    alias: {
      '@': resolve( __dirname, 'src' ),
      '@store': resolve( __dirname, 'src', 'store' ),
      '@nav': resolve( __dirname, 'src', 'static', 'nav' ),
      '@modules': resolve( __dirname, 'src', 'utils', 'modules' ),
      '@api': resolve( __dirname, 'src', 'mocks' ),
      '@validations': resolve( __dirname, 'src', 'utils', 'validations' ),

      '@mprofile': resolve( __dirname, 'src', 'submodules', 'profile' ),
      '~vuetify': resolve( __dirname, 'src', 'scss', 'libs', '_vuetify.scss' ),
    },
  },
} )
