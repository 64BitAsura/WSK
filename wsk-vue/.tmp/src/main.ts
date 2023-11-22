import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { ComponentLibrary } from 'vue-library';
// createApp(App).use(ComponentLibrary).mount('#app');

const app = createApp(App)
app.use(ComponentLibrary)
app.use(createPinia())
app.use(router)

app.mount('#app')
