
import dashboard from '../views/dashboard'
// import navbar from '../views/layout/navbar'
import TechnologyCenter from '../views/TechnologyCenter'

import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default  new Router({
  mode:'history',
  routes: [
   {
    path : '/dashboard',
    name : '首页',
    component : dashboard,
    // meta: { title: '首页', icon: 'el-icon-menu',cache:false,hiden:false},
   },
  //  {
  //   path : '/',
  //   name : '导航信息',
  //   component : navbar,
  //   // meta: { title: '首页', icon: 'el-icon-menu',cache:false,hiden:false},
  //  },
   {
    path : '/TechnologyCenter',
    name : '技术中心',
    component : TechnologyCenter,
    // meta: { title: '技术中心', icon: 'el-icon-tickets',cache:false,hiden:false},
   }
  ]
  
})