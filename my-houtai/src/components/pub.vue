<template>
  <div id="app" class="layout">
    <!-- <img src="./assets/logo.png"> -->
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}" style="background:#39435B">
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" accordion style="background:#39435B">
               
               <div class="logo" :style ="logo" >上海旭中调研系统</div>

               

                
                    <Submenu name="1"  >
                        <template slot="title">
                            <router-link to="/home" tag="span">
                                <Icon type="ios-compass" />
                                旭中首页
                            </router-link>
                        </template>
                        
                    </Submenu>
                
                
                <Submenu name="2" class="xmgl">
                    <template slot="title">
                        <Icon type="md-list-box" />
                        项目管理
                    </template>
                    <!-- <div @click="toaddjia()">00000</div> -->
                    <!-- <div @click="toaddjia()" style="border:1px solid red"><MenuItem name="2-1"  >添加项目</MenuItem></div> -->
                    <MenuItem name="2-1"  class="xmgl1">
                        <router-link to="/base" tag="span">添加项目</router-link>
                    </MenuItem>
                    <MenuItem name="2-2"  class="xmgl2">
                        <router-link to="/listjia" tag="span">项目列表</router-link>                   
                    </MenuItem>
                    <MenuItem name="2-3"  class="xmgl3">                    
                        <router-link to="/message" tag="span">消息反馈</router-link>  
                    </MenuItem>
                </Submenu>
               
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="md-pricetags" />
                        调研对象管理
                    </template>
                    <MenuItem name="3-1" class="dydx1">
                        <router-link to="/researchObjectLists" tag="span">调研对象列表</router-link>                     
                    </MenuItem>
                    <MenuItem name="3-2" class="dydx2">
                        <router-link to="/updateRecordLists" tag="span">更新记录</router-link>                                        
                    </MenuItem>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="md-checkbox-outline" />
                        审核管理
                    </template>
                    
                    <MenuItem name="4-1" class="shgl1">
                        <router-link to="/shenhe" tag="span">审核安排</router-link>
                    </MenuItem>    
                    <MenuItem name="4-2" class="shgl2">
                        <router-link to="/tuihui" tag="span">审核退回</router-link>
                    </MenuItem>    
                    <MenuItem name="4-3" class="shgl3">
                        <router-link to="/list" tag="span">审核列表</router-link>
                    </MenuItem>    
                </Submenu>
               <Submenu name="5">
                    <template slot="title">
                        <Icon type="md-pie" />
                         门店管理
                    </template>
                    <MenuItem name="5-1" class="mdgl">
                        <router-link to="/shopLists" tag="span">门店列表</router-link>
                    </MenuItem>
                </Submenu>
                <Submenu name="6">
                    <template slot="title">                     
                            <Icon type="ios-cube" />
                            企业管理                       
                    </template>

                    
                    <MenuItem name="6-1" class="qygl1">
                        <router-link to="/moban" tag="span">模板管理</router-link>
                    </MenuItem>
                       
                    <MenuItem name="6-2" class="qygl2">
                        <router-link to="/yuangong" tag="span">员工管理</router-link>
                    </MenuItem>
                
                    
                    <MenuItem name="6-3" class="qygl3">
                       <router-link to="/daili" tag="span">代理管理</router-link>
                       
                    </MenuItem>
                    <MenuItem name="6-4" class="qygl4">
                        <router-link to="/fangwenyuan" tag="span">访问员管理</router-link>
                    </MenuItem>

                    <MenuItem name="6-5" class="qygl5">
                       <router-link to="/quanxian" tag="span">权限管理</router-link>
                    </MenuItem>
                    <MenuItem name="6-6" class="qygl6">
                        <router-link to="/dodata" tag="span">操作日志</router-link>
                    </MenuItem>
                </Submenu>
                <Submenu name="7">
                <template slot="title">
                    <Icon type="ios-create" />
                    报告管理
                </template>
                <MenuItem name="7-1" class="bggl1">                  
                    <router-link to="/performanceReport" tag="span">业绩报告</router-link>                                                                 
                </MenuItem>
                <MenuItem name="7-2" class="bggl2">
                    <router-link to="/reportTemplateList" tag="span">报告模板</router-link>
                </MenuItem>
                <MenuItem name="7-3" class="bggl3">
                    <router-link to="/prescriptionReportList" tag="span">实效报告</router-link>
                </MenuItem>
                <MenuItem name="7-4" class="bggl4">
                <router-link to="/familyReportList" tag="span">家化报告</router-link>
                </MenuItem>
                <MenuItem name="7-5" class="bggl5">
                    <router-link to="/generatedReportList" tag="span">已生成报告</router-link>
                </MenuItem>               
            </Submenu>
                <Submenu name="8">
                    <template slot="title">
                        <Icon type="md-eye" />
                        可视化管理
                    </template>
                   
                </Submenu>
              <Submenu name="9">
                    <template slot="title">
                        <Icon type="ios-contact" />
                        我的任务
                    </template>
                    <MenuItem name="9-1" class="mytask1">
                        <router-link to="/projectLists" tag="span">项目列表</router-link>                    
                    </MenuItem>
                    <MenuItem name="9-2" class="mytask2">
                        <router-link to="/firstInstanceLists" tag="span">一审任务</router-link>                    
                    </MenuItem>
                    <MenuItem name="9-3" class="mytask3">
                        <router-link to="/secondInstanceLists" tag="span">二审任务</router-link>                    
                    </MenuItem>
                    <MenuItem name="9-4" class="mytask4">
                        <router-link to="/calculationLists" tag="span">算分任务</router-link>                                       
                    </MenuItem>
                    <MenuItem name="9-5" class="mytask5">
                        <router-link to="/feedBack" tag="span">消息反馈</router-link>
                    </MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}" style="background:red;" class="head">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
               <ul class="loader">
                  <li class="username"></li>
                  <li class="zhiwei"></li>
                  <li>【修改密码】</li>
                  <li @click="outloading">【退出登录】</li>
                </ul>

            </Header>
        </Layout>
        <div class="kong"></div>
    <router-view/>
  </div>
</template>

<script>
import $ from "jquery"
import axios from "axios"
import {mapGetters,mapActions} from "vuex"

export default {
  name: 'Pub',
  data(){
      return{
         logo:{
          backgroundImage: "url(" + require("../../src/assets//img/login/logo.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto",
          backgroundPosition:"5px  ",
          backgroundSize:"30px 30px"
          }
      }
  },
  methods:{
     aaa(){
         console.log("222")
        // this.$router.push("/home")
     },
     toaddjia(){
         console.log("222")
     },
     outloading(){
         localStorage.clear()
         this.$router.push("/login")
     }
  },
  mounted(){
    //   console.log( localStorage.getItem('username'))
       $(".username").text("【"+localStorage.getItem('username')+"】")
       $(".zhiwei").text("【"+localStorage.getItem('job')+"】")
       if(localStorage.getItem('username')==null||localStorage.getItem('username')==""){
           this.$router.push("/login")
       };

    function ifquan(biaoqian){
       var text = $.trim(biaoqian.text());
       var str =  localStorage.getItem('Jurisdiction')
       var arr = str.split(',')
       var num = $.inArray(text, arr);  //返回 -1则不存在

       if(num==-1){
           biaoqian.css({'display':'none'})
       }else{
           biaoqian.css({'display':'block'})
       }
    //    console.log(arr)
    //    console.log(text)
    //    console.log(num)           
    }
    // 项目管理
       ifquan($(".xmgl1"))
       ifquan($(".xmgl2"))
       ifquan($(".xmgl3"))
    //  调研对象管理
       ifquan($(".dydx1"))
       ifquan($(".dydx2"))
    // 审核管理
       ifquan($(".shgl1"))
       ifquan($(".shgl2"))
       ifquan($(".shgl3"))
    // 门店管理mdgl
       ifquan($(".mdgl"))
    // 企业管理
       ifquan($(".qygl1"))
       ifquan($(".qygl2"))
       ifquan($(".qygl3"))
       ifquan($(".qygl4"))
       ifquan($(".qygl5"))
       ifquan($(".qygl6"))
    // 报告管理
       ifquan($(".bggl1"))
       ifquan($(".bggl2"))
       ifquan($(".bggl3"))
       ifquan($(".bggl4"))
       ifquan($(".bggl5"))
    // 我的任务
       ifquan($(".mytask1"))
       ifquan($(".mytask2"))
       ifquan($(".mytask3"))
       ifquan($(".mytask4"))
       ifquan($(".mytask5"))   
  }
}
</script>
    
<style scoped  lang="scss">
#app {
  
        /* body,ul,li,dl,dt,dd,p,ol,h1,h2,h3,h4,h5,h6,form,img,table,fieldset,legend,menu,input,button{
          margin:0;padding:0;
          }
        ul,li,ol{list-style:none;}
        img,fieldset{border:0; }
        img{display:block;}
        a{text-decoration:none; color:#333;}
        h1,h2,h3,h4,h5,h6{font-weight:500;}
        body{ font-family:"微软雅黑";}
        input,a{outline:none;} */
  
}


.layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
  .logo{
     width: 200px;height: 40px;background:#293743;color: #00ADEE;text-align: center;line-height: 40px;font-weight: 500;font-size: 14px;padding-left: 10px
  }
   ul,li,ol{list-style:none;}
.ivu-layout-header{height: 40px;}
  .loader{float:right;
           width: 350px;
           height: 40px;
           font-weight: bold;
           font-size: 14px;
           display: flex;
           justify-content: space-around;
           margin-right:180px;
           line-height: 40px;
  }
  li {cursor: pointer;}
.kong{height: 40px;width: 100%}
.head{width: 100%;height: 40px;position: fixed;top:0;left: 0;z-index: 99;}

/* 项目管理 */


  
</style>
