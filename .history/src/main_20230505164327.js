import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router';
import VueMaplibreGl from 'vue-maplibre-gl'


createApp(App)
.use(router)
.use(VueMaplibreGl)
.mount('#app')
