import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './css/main.scss'

const app = createApp(App)
app.use(createPinia())
app.use(router)

window.addEventListener
('load', 
    () => app.mount('#app')  
)