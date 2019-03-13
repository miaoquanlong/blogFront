
import dashboard from '../views/dashboard'
// import navbar from '../views/layout/navbar'
import TechnologyCenter from '../views/TechnologyCenter'
import Codebox from '../views/Codebox'
import Aboutme from '../views/Aboutme'
import Aboutblog from '../views/Aboutblog'
import Gustbook from '../views/Gustbook'
import Donate from '../views/Donate'
import Archives from '../views/Archives'
import Links from '../views/Links'
import login from '../views/admin'


import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: '首页',
            component: dashboard,
        },
        // {
        //     path: '/Codebox',
        //     name: 'Codebox',
        //     component: Codebox,
        // },
        {
            path: '/Aboutme',
            name: '关于我',
            component: Aboutme,
        },
        {
            path: '/Aboutblog',
            name: '关于博客',
            component: Aboutblog,
        },
        {
            path: '/Gustbook',
            name: '留言',
            component: Gustbook,
        },
        // {
        //     path: '/Donate',
        //     name: 'Donate',
        //     component: Donate,
        // },
        // {
        //     path: '/Archives',
        //     name: '文章列表',
        //     component: Archives,
        // },
        {
            path: '/login',
            name: '登陆',
            component: login,
        },
        // {
        //     path: '/Links',
        //     name: 'Links',
        //     component: Links,
        // },
        // {
        //     path: '/TechnologyCenter',
        //     name: '技术中心',
        //     component: TechnologyCenter,
        // }
    ]

})