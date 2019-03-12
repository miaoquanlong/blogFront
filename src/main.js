import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from './Axios/index'
import store from "./store";
import Cookies from 'js-cookie';
import * as filters from "./filter"; // 全局过滤器
import { momentTime } from "@/filter";
import * as _ from "lodash";
import "./assets/css/index.scss"; // css重置。

import Antd from 'ant-design-vue'//使用antd
import 'ant-design-vue/dist/antd.css'//antd的样式

Vue.use(ElementUI)
Vue.use(Antd)
Vue.prototype.$request = axios
Vue.prototype.$Cookies = Cookies
Vue.prototype.momentTime = momentTime;


Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
