

import Vue from 'vue'
import Router from 'vue-router'


//import HelloWorld from '@/components/HelloWorld'

import Login from "../components/login.vue" 
import Home from "../components/home.vue" 

import Xiangmu from "../components/xiangmu/xiangmu.vue" 

import Diaoyan from "../components/diaoyan/diaoyan.vue" 

import Shenhe from "../components/shenhe/shenhe.vue" 

//企业管理

//模板
import Moban from "../components/qiye/moban/moban.vue" 

import Bianji from "../components/qiye/moban/bianji.vue" 
import Jiahua from "../components/qiye/moban/chakan_jia.vue" 
import Shixiao from "../components/qiye/moban/chakan_shi.vue" 
//员工
import Yuangong from "../components/qiye/yuangong/yuangong.vue" 
import Addshencha from "../components/qiye/yuangong/addshencha.vue" 
//代理
import Daili from "../components/qiye/daili/daili.vue" 
//访问员
import Fangwenyuan from "../components/qiye/fangwenyuan/fangwenyuan.vue" 
//权限
import Quanxian from "../components/qiye/quanxian/quanxian.vue" 
//操作日志
import Dodata from "../components/qiye/dodata/dodata.vue" 
// 新建
import New from "../components/qiye/moban/new.vue" 
// 家化
 //import Jiahua from "../components/qiye/moban/chakan_jia.vue" 
// //实效
// import Shixiao from "../components/qiye/moban/chakan_shi.vue" 









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
        //       path: 'bianji',
        //       component: Bianji
        //     },
        //  ]
    },
    
      {
        path: '/bianji',
        component: Bianji
      },
   
    //查看
    {
      path: '/chakan_jia',
      component: Jiahua
    },
    {
      path: '/chakan_shi',
      component: Shixiao
    },
    //员工
    {
      path: '/yuangong',
      component: Yuangong
    },
    {
      path: '/addshencha',
      component: Addshencha
    },
    //代理
    {
      path: '/daili',
      component: Daili
    },
  //访问员
  {
    path: '/fangwenyuan',
    component: Fangwenyuan
  },
  //权限
  {
    path: '/quanxian',
    component: Quanxian
  },
  //操作日志
  {
    path: '/dodata',
    component: Dodata
  },
  //新建
  {
    path: '/new',
    component: New
  },
  










    {
      path:"/",
      redirect:"/home"
    }
    
  ]
})
