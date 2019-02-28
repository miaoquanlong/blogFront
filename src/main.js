import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './Axios/index'
import "./assets/css/index.scss"; // css重置。

Vue.use(ElementUI)
Vue.prototype.$request = axios

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
