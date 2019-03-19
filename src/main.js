import Vue from 'vue'
import App from './App.vue'
import router from './router/'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import axios from './Axios/index'
import message from './components/message'//配置antd的message消息

import store from "./store";
import Cookies from 'js-cookie';
import * as filters from "./filter"; // 全局过滤器
import { momentTime } from "@/filter";
import * as _ from "lodash";
import "./assets/css/index.scss"; // css重置。
import Antd from 'ant-design-vue'//使用antd
import "ant-design-vue/dist/antd.css";
//socket
// import VueSocketio from 'vue-socket.io';

import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';

Vue.use(new VueSocketIO({
    debug: false,
    connection: 'http://localhost:9003/',
}))

// Vue.mixin({

//     methods: {
//         tooltips () {
//             this.$message.success(this.$Cookies.get('name') + "加入了聊天室")
//         }
//     },

//     beforeRouteLeave: ((to, from, next) => {
//         next()
//     }),
//     beforeRouteEnter: ((to, from, next) => {
//         if (to.fullPath === '/TechnologyCenter') {
//             next(vm => {
//                 vm.tooltips()
//             })
//         }
//         next()

//     })
// })



Vue.use(Antd)
Vue.prototype.$request = axios
Vue.prototype.$message = message
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
