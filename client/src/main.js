import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import { io } from 'socket.io-client';

const socket = io();
socket.on('message', message => console.log(message));

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
