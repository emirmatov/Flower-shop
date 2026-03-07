import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice'
import './assets/main.css'
import App from './App.vue'
import router from './router'
import { createHead } from '@unhead/vue'

const head = createHead()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
app.use(head)
app.use(ToastService)
app.mount('#app')
