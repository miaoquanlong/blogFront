
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
            name: 'Home',
            component: dashboard,
        },
        {
            path: '/Codebox',
            name: 'Codebox',
            component: Codebox,
        },
        {
            path: '/Aboutme',
            name: 'Aboutme',
            component: Aboutme,
        },
        {
            path: '/Aboutblog',
            name: 'About Blog',
            component: Aboutblog,
        },
        {
            path: '/Gustbook',
            name: 'Gustbook',
            component: Gustbook,
        },
        {
            path: '/Donate',
            name: 'Donate',
            component: Donate,
        },
        {
            path: '/Archives',
            name: 'Archives',
            component: Archives,
        },
        {
            path: '/login',
            name: 'login',
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