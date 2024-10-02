import './bootstrap';
import { createApp } from 'vue';
import '../css/app.css';
import App from './app.vue'
import router from './routes/routes.js'
import store from './store/index.js';  


const app = createApp(App);

app.use(store);
app.use(router)
app.mount('#app');
