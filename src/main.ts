import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from '@/app'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import '@/assets/css/input.css'

const pinia = createPinia()

createApp(App).use(pinia).use(autoAnimatePlugin).use(router).mount('#app')
