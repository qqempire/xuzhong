<template>
    <div class="accountError">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',display:'flex', justifyContent: 'space-between',}">                  
                    <div class="title">
                        <!-- 导航 -->
                        <ul class="nav">
                            <li @click="feedBack">消息反馈</li>
                            <li @click="accountError" class="active">账号异常</li>
                        </ul>
                        <el-button type="info" @click="exportData">导出表格</el-button>
                    </div>
                </Breadcrumb>                
                <Card>
                    <div class="content">
                         <div class="select">                             
                            <Row>
                                <Col span="12">
                                    <DatePicker type="date" placeholder="开始日期" style="width: 200px" @on-change="getStartTime"></DatePicker>
                                </Col>
                                <Col span="12">
                                    <DatePicker type="date" placeholder="截止日期" style="width: 200px" @on-change="getOverTime"></DatePicker>
                                </Col>
                            </Row>&nbsp;&nbsp;
                            <Select v-model="sortList.projectname" style="width:100px" placeholder="报告名称">
                                <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{item}}</Option>
                            </Select>&nbsp;                           
                            <Button type="success" @click="sortData">&nbsp;&nbsp;搜索&nbsp;&nbsp;</Button>
                        </div>
                        <!-- 表格 -->
                        <Table border :columns="columns9" :data="data9"></Table>
                        <!-- 换页 -->
                        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />   
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'accountError',
    data () {
        return {
        // 筛选框内容
            sortLists:{
                projectNameLists: ["河南","广东","江西","湖南","湖北","河北","东北"],
            },
            sortList:{projectname:null,starttime:null,endtime:null},
        //表格内容
            columns9: [{title: '项目名称',key: 'projectname'},{title: '地区',key: 'area'},{title: '调研对象',key: 'researchobject',},{title: '调研编号',key: 'researchnum'},{title: '区域代理人',key: 'regionalagent'},
                {title: '录入人员',key: 'entrypersonnel'},{title: '录入人员IP数量',key: 'entrypersonnelipnum'},{title: '绑定手机号',key: 'bindphonenum'}],
            data9: [],
        // 分页数据
            dataTotal:10,
            pageNum:10,
            dataPage:[]          
        }
    },
    //预加载数据
    mounted(){
        // 筛选框列表
            axios({
                url:"http://192.168.0.134:8080/queryProjectname",  
                method:'get'                           
            }).then((res)=>{
                // 初始页面数据
                this.sortLists.projectNameLists = res.data
            });         
        
        //表格信息
            this.data9=[],
            axios({
                url:"http://192.168.0.134:8080/accountAbnor",  
                method:'get'                           
            }).then((res)=>{
                this.dataPage = res.data;
                this.dataTotal = res.data.length;
                // 初始页面数据
                if (this.dataTotal<10) {
                    for (let index = 0; index < this.dataTotal; index++) {
                        this.data9.push(this.dataPage[index])
                    }
                } else {
                    for (let index = 0; index < 10; index++) {
                        this.data9.push(this.dataPage[index])
                    }                
                }                                
            });
    },

    methods:{
        // 切换反馈
            feedBack(){
                this.$router.push("/feedBack");            
            },
        // 切换账号异常
            accountError(){
                this.$router.push("/accountError")
            },
        // 导出数据
            exportData(){
                console.log("导出数据")
                // window.location.href=""
            },
        // 获取搜索日期
            getStartTime(value){
                this.sortList.starttime = value
            },
            getOverTime(value){
                this.sortList.endtime = value
            },
        // 搜索
            sortData(){
                this.data9=[]
                axios({
                    url:"http://192.168.0.134:8080/accountAbnor",  
                    method:'get',
                    params:this.sortList                           
                }).then((res)=>{
                    this.dataPage = res.data;
                    this.dataTotal = res.data.length;
                    // 初始页面数据
                    if (this.dataTotal<10) {
                        for (let index = 0; index < this.dataTotal; index++) {
                            this.data9.push(this.dataPage[index])
                        }
                    } else {
                        for (let index = 0; index < 10; index++) {
                            this.data9.push(this.dataPage[index])
                        }                
                    }                                
                });
            },

        // 换页操作
            changPage(page){
            //切换页码时更改表格相应数据
                this.data9 = []
                if (page*10 < this.dataTotal) {
                    for (var index = (page-1)*10; index < (page)*10; index++) {
                        this.data9.push(this.dataPage[index])          
                    }  
                } else {
                    for (var index = (page-1)*10; index < this.dataTotal; index++) {
                        this.data9.push(this.dataPage[index])          
                    }                     
                }                                  
            }        

        }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .accountError{
        .title{width: 100%;height: 40px;background: #cccccc;line-height: 40px;color: #fff; display:flex;justify-content: space-between;align-items:center; margin-bottom: 10px;
            span:nth-child{display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
            .nav{display: flex; width: 600px; height: 40px; text-align: center; line-height: 40px; color: white;
                li{display:block; width: 200px; height: 40px; background: #C1C1C1;}
                li:hover{background: #5BB85D;}
                .active{background: #5BB85D;}
            }
        }
        .content{overflow: hidden;
            .select{display: flex; width: 650px; justify-content: space-between; align-items: center; margin-bottom: 10px;}
            .page{float: right; margin-top: 10px; margin-bottom: 5px;}
        }   
    }
</style>