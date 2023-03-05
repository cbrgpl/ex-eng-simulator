import { createApp } from 'vue'
import App from './App.vue'

import { router } from './router/index'
import { createPinia } from 'pinia'
import { vuetify } from './utils/plugins/vuetify'
import { i18nWrapper } from './utils/plugins/i18n'

import './scss/_predefined.scss'

const app = createApp( App )
const pinia = createPinia()

app.use( router )
app.use( pinia )
app.use( vuetify )
app.use( i18nWrapper.i18n )


app.mount( '#app' )
