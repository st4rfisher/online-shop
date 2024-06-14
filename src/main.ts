import { createApp } from 'vue'
import App from '@/app'
import router from '@/router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import '@/assets/css/input.css'

createApp(App).use(autoAnimatePlugin).use(router).mount('#app')
