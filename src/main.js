import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

createApp(App).use(store).use(router).use(VueSidebarMenu).mount('#app').component('VueDatePicker', VueDatePicker)
