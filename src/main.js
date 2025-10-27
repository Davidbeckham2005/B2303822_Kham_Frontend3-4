import router from './router';
import { createApp } from 'vue'
import App from './App.vue'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./main.css"
const app = createApp(App)
app.use(router)
app.mount('#app')
