<template>
    <div class="performanceReport">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}"> 
                    <div class="title"><span>条件筛选</span></div>
                    <div class="select">                             
                        <Select v-model="sortList.province" style="width:150px" placeholder="省" filterable @on-change="getProvince">
                            <Option v-for="(item,index) in sortLists.provinceLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                        <Select v-model="sortList.city" style="width:150px" placeholder="市" filterable @on-change="getCity">
                            <Option v-for="(item,index) in sortLists.cityLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                        <Select v-model="sortList.district" style="width:150px" placeholder="县/区" filterable>
                            <Option v-for="(item,index) in sortLists.districtLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        
                        <Select v-model="sortList.agentstatus" style="width:100px" placeholder="代理状态">
                            <Option v-for="(item,index) in sortLists.agentstatusLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;&nbsp;
                        <Button type="success" @click="sort">&nbsp;&nbsp;搜索&nbsp;&nbsp;</Button>
                    </div>
                </Breadcrumb>
                <Card>
                    <div class="content">
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <!-- 导航 -->
                        <Menu mode="horizontal" :theme="theme1" active-name="1" class="nav">
                            <MenuItem name="1">
                                <Icon type="ios-people" />
                                <router-link  to="/performanceReport/performanceReportVisitor" active-class="active" :examineData="examineData">访问员绩效</router-link>
                            </MenuItem>

                            <MenuItem name="2">
                                <Icon type="ios-paper" />
                                <router-link  to="/performanceReport/performanceReportExamine" active-class="active" :agentData="agentData">审核绩效</router-link>
                            </MenuItem>

                            <MenuItem name="3">
                                <Icon type="md-paper" />
                                <router-link to="/performanceReport/performanceReportAgent" active-class="active" :visitorData="visitorData">代理绩效</router-link>
                            </MenuItem>
                        </Menu>

                        <!-- <ul class="nav">
                            <router-link tag="li" to="/performanceReport/performanceReportVisitor" active-class="active" :examineData="examineData">访问员绩效</router-link>
                            <router-link tag="li" to="/performanceReport/performanceReportExamine" active-class="active" :agentData="agentData">审核绩效</router-link>
                            <router-link tag="li" to="/performanceReport/performanceReportAgent" active-class="active" :visitorData="visitorData">代理绩效</router-link>
                        </ul> -->
                        <router-view ></router-view>                     
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'visitor',
  data () {
    return {
    // 筛选框内容
        // 查询功能
            sortLists:{
                provinceLists: ["河南","广东","江西","湖南","湖北","河北","东北"],
                cityLists:["安阳"],
                districtLists: ["文峰"],
                agentstatusLists:['手动输入'],
            },
            // 点击查询按钮发送的参数 
            sortList:{province:null,city:null,district:null,agentstatus:null},
    // 传出去的数据 
            examineData:'',agentData:'',visitorData:'',
    // 
           
    }
  },
  created(){
    // 三级联动——省(拿数据)
        // axios({
        //     url:"http://192.168.0.133:8080/provinceinfo",  
        //     method:'get'                           
        // }).then((res)=>{
        //     this.sortLists.provinceLists = res.data;
        // }) 
  },

  methods:{
        // 导出表格数据（怎么样才能区分导出不同能容）
        exportData(){
            window.location.href="http://192.168.0.133:8080/storestatedownload?province="+this.sortList.province+"&city="+this.sortList.city+"&district="+this.sortList.district+"&storename="+this.sortList.storename+"&storelevel="+this.sortList.storelevel+"&storearea="+this.sortList.storearea
        },
    // // 三级联动——省(发送)
    //     getProvince(value){
    //         axios({
    //             url:"http://192.168.0.133:8080/querycity",  
    //             params:{province:value},
    //         }).then((res)=>{
    //             this.sortLists.cityLists = res.data;
    //         }) 
    //     },
    // // 三级联动——市(发送)
    //     getCity(value){
    //         axios({
    //             url:"http://192.168.0.133:8080/querydistrict",  
    //             method:'get',
    //             params:{city:value},
    //         }).then((res)=>{
    //             this.sortLists.districtLists = res.data;
    //         })             
    //     },

    // 条件搜索,将请求过来的三组数据分别发给子组件
        // sort(){
        //     this.data9 = [];
        //     axios({
        //             url:"http://192.168.0.133:8080/querystorestate",              
        //             params:this.sortList                           
        //         }).then((res)=>{
        //             this.dataPage = res.data;
        //             this.dataTotal = res.data.length;
        //             // 初始页面数据
        //             if (this.dataTotal<5) {
        //                 for (let index = 0; index < this.dataTotal; index++) {
        //                     this.data9.push(this.dataPage[index])
        //                     this.data9[index].area = this.dataPage[index].province+this.dataPage[index].city+this.dataPage[index].district           
        //                 }
        //             } else {
        //                 for (let index = 0; index < 5; index++) {
        //                     this.data9.push(this.dataPage[index])
        //                     this.data9[index].area = this.dataPage[index].province+this.dataPage[index].city+this.dataPage[index].district                      
        //                 }                
        //             }                                     
        //         }) 
        // },
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .performanceReport{
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        }
        .select{display: flex; width: 700px; justify-content: space-between; align-items: center;}
        .content{height: 600px;
            .nav{margin-bottom: 5px; height: 30px; line-height: 30px;}
        }          
    }
</style>