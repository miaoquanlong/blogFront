import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './Axios/index'
import store from "./store";
import Cookies from 'js-cookie';


import "./assets/css/index.scss"; // css重置。
import { from } from 'rxjs';

Vue.use(ElementUI)

Vue.prototype.$request = axios
Vue.prototype.$Cookies = Cookies


Vue.config.productionTip = false



new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
