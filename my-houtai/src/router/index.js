

import Vue from 'vue'
import Router from 'vue-router'


//import HelloWorld from '@/components/HelloWorld'
//全局
 import Pub from "../components/pub.vue" 

//登录
import Login from "../components/login/login.vue" 
//首页
import Home from "../components/home/home.vue" 


import Xiangmu from "../components/xiangmu/xiangmu.vue" 

import Diaoyan from "../components/diaoyan/diaoyan.vue" 


//审核管理

    //安排
     import Shenhe from "../components/shenhe/shenanpai/shenhe.vue" 
     import Anpai from "../components/shenhe/shenanpai/anpai.vue" 
    //列表
     import List from "../components/shenhe/shenlist/list.vue" 
        
    //退回
     import Tuihui from "../components/shenhe/shentui/tuihui.vue" 


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


// 报告模板

      // 业绩报告
      import performanceReportAgent from "../components/reportManagement/performanceReport/agent.vue"
      import performanceReportExamine from "../components/reportManagement/performanceReport/examine.vue"
      import performanceReportVisitor from "../components/reportManagement/performanceReport/visitor.vue"
      // 报告模板
      import reportTemplateAdd from "../components/reportManagement/reportTemplate/add.vue"
      import reportTemplateEdit from "../components/reportManagement/reportTemplate/edit.vue"
      import reportTemplateList from "../components/reportManagement/reportTemplate/list.vue"
      import reportTemplateProblem from "../components/reportManagement/reportTemplate/problem.vue"

      // 时效报告
      import prescriptionReportList from "../components/reportManagement/prescriptionReport/list.vue"
      import prescriptionReportTemplate from "../components/reportManagement/prescriptionReport/template.vue"
      import prescriptionReportDetailedList from "../components/reportManagement/prescriptionReport/detailedList.vue"

      // 家化报告
      import familyReportList from "../components/reportManagement/familyReport/familyReportList.vue"
      import customerReport from "../components/reportManagement/familyReport/customerReport.vue"
      import detailsReport from "../components/reportManagement/familyReport/detailsReport.vue"
      import districtReport from "../components/reportManagement/familyReport/districtReport.vue"
      import provinceReport from "../components/reportManagement/familyReport/provinceReport.vue"
      import salesPersonReport from "../components/reportManagement/familyReport/salesPersonReport.vue"
      import subReport from "../components/reportManagement/familyReport/subReport.vue"

      // 已生成报告
      import generatedReportList from "../components/reportManagement/generatedReport/generatedReportList.vue"






Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/login',
      component: Login
    },
    {
      path:"/pub",
      component:Pub,
          children:[
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

    //审核管理
            {
              path: '/shenhe',
              component: Shenhe
            },
            {
              path: '/anpai',
              component: Anpai
            },
            
            {
              path: '/tuihui',
              component: Tuihui,
             
            },
            {
              path: '/list',
              component: List,
             
            },
           
        
     //企业管理
            {
              path: '/moban',
              component: Moban,
             
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
          
   // 报告管理(一级)
        // 绩效报告
        {
          path: '/performanceReportAgent',
          component: performanceReportAgent
        },
        {
          path: '/performanceReportExamine',
          component: performanceReportExamine
        },{
          path: '/performanceReportVisitor',
          component: performanceReportVisitor
        },
        // 报告模板
        {
          path: '/reportTemplateAdd',
          component: reportTemplateAdd
        },
        {
          path: '/reportTemplateEdit',
          component: reportTemplateEdit
        },
        {
          path: '/reportTemplateList',
          component: reportTemplateList
        },
        {
          path: '/reportTemplateProblem',
          component: reportTemplateProblem
        },
        // 时效报告
        {
          path: '/prescriptionReportList',
          component: prescriptionReportList
        },
        {
          path: '/prescriptionReportTemplate',
          component: prescriptionReportTemplate
        },
        {
          path: '/prescriptionReportDetailedList',
          component: prescriptionReportDetailedList
        },
        
        // 家化报告
        {
          path: '/familyReportList',
          component: familyReportList
        },
        {
          path: '/customerReport',
          component: customerReport
        },
        {
          path: '/detailsReport',
          component: detailsReport
        },
        {
          path: '/districtReport',
          component: districtReport
        },
        {
          path: '/provinceReport',
          component: provinceReport
        },
        {
          path: '/salesPersonReport',
          component: salesPersonReport
        },
        {
          path: '/subReport',
          component: subReport
        },

        // 已生成列表
        {
          path: '/generatedReportList',
          component: generatedReportList
        },
         ]
    },


    
    








    {
      path:"/",
      redirect:"/home"
    }
    
  ]
})
