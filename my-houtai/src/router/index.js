

import Vue from 'vue'
import Router from 'vue-router'


//import HelloWorld from '@/components/HelloWorld'

import Login from "../components/login.vue" 
import Home from "../components/home.vue" 

import Xiangmu from "../components/xiangmu/xiangmu.vue" 

import Diaoyan from "../components/diaoyan/diaoyan.vue" 

import Shenhe from "../components/shenhe/shenhe.vue" 
//企业
import Moban from "../components/qiye/moban.vue" 

import Bianji from "../components/qiye/moban/bianji.vue" 
//import Canpin from "../components/qiye/moban/canpin.vue" 




Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    
    {  
      path: '/home',
      component: Home
    },
    {     
      path: '/xiangmu',
      component: Xiangmu
    },
    {
      path: '/diaoyan',
      component: Diaoyan
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shenhe',
      component: Shenhe
    },
    //企业管理
    {
      path: '/moban',
      component: Moban,
        //   children:[
        //     {
        //     path:"/canpin",
        //     component:Canpin
        //    },
        //  ]
    },
    {
      path: '/bianji',
      component: Bianji
    },

    











    {
      path:"/",
      redirect:"/home"
    }
    
  ]
})
