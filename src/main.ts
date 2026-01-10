import './assets/main.css'

import { createApp } from 'vue'
import pinia from '@/stores'

import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import { i18n } from '@/locales'

import 'normalize.css/normalize.css'

const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: '83208203612-b3cd1i9v8oltu6q86sakeka4mdv7q2sd.apps.googleusercontent.com',
})

app.mount('#app')
