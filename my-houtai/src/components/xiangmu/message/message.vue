<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!-- 消息反馈 -->
                        <el-tab-pane label="消息反馈" name="first">
                             <Card>
                                <div style="height: 600px">
                                    <div class="top">
                                        <div class="ipt">
                                            <Col span="12" style="width: 130px">
                                                <DatePicker type="date" placeholder="开始日期" @on-change="handleChange1"></DatePicker>
                                            </Col>
                                            <Col span="12" style="width: 130px">
                                                <DatePicker type="date" placeholder="结束日期" @on-change="handleChange2"></DatePicker>
                                            </Col>
                                            <Select v-model="model1" style="width:100px" placeholder="项目名称" @on-change="change">
                                                <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        <Button type="success" @click="search">搜索</Button>
                                        <el-button type="info" size="small" style="margin-left:90px" @click="outexcel1">导出表格</el-button>
                                        </div>
                                        <div class="tab">
                                             <Table border :columns="columns6" :data="dataArr"></Table>
                                             <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator  show-total placement="top" 
                                                @on-change="handlePage" style="margin:10px"></Page>

                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </el-tab-pane>
                        <!-- 账户异常 -->
                        <el-tab-pane label="账户异常" name="second">
                            <Card>
                                <div style="height: 600px">
                                    <div class="top">
                                        <div class="ipt">
                                            <Col span="12" style="width: 130px">
                                                <DatePicker type="date" placeholder="开始日期" @on-change="handleChange3"></DatePicker>
                                            </Col>
                                            <Col span="12" style="width: 130px">
                                                <DatePicker type="date" placeholder="结束日期" @on-change="handleChange4"></DatePicker>
                                            </Col>
                                            <Select v-model="model2" style="width:100px" placeholder="项目名称" @on-change="change2">
                                                <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                        <Button type="success" @click="sousuo2">搜索</Button>
                                        <el-button type="info" size="small" style="margin-left:90px">导出表格</el-button>
                                        </div>
                                        <div class="tab">
                                            <Table border :columns="columns7" :data="data7"></Table>
                                            <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator  show-total placement="top" 
                                                @on-change="handlePage2" style="margin:10px"></Page>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </el-tab-pane>
                        
                    </el-tabs>
                </Breadcrumb>
               
            </Content>
        </Layout>
  </div> 
</template>

<script>
import $ from "jquery"
import axios from "axios"


export default {
  name: 'Message',
  data () {
    return {
         //分页1
        pageTotal: 10,
        pageNum: 1,
        pageSize: 5,
        //分页2
        pageTotal2: 10,
        pageNum2: 1,
        pageSize2: 5,

       activeName: 'first',
        cityList1: [
                    // {
                    //     value: '家化',
                    //     label: '家化'
                    // },
                    // {
                    //     value: '时效',
                    //     label: '时效'
                    // },
                   
                ],
         model1: "",
         model2: "",
         datastart:"",
         dataend:"",
         datastart2:"",
         dataend2:"",

       cityList2: [
                    {
                        value: '1',
                        label: '家化'
                    },
                    {
                        value: '2',
                        label: '时效'
                    },
                   
                ],
         model2: '',
         //表格1
         columns6: [
                    {
                        title: '项目名称',
                        key: 'proname',
                    },
                    {
                        title: '地区',
                        key: 'address'
                    },
                    {
                        title: '调研对象',
                        key: 'object',
                        
                    },
                    {
                        title: '调研编号',
                        key: 'number',
                        
                    },
                     {
                        title: '区域代理人',
                        key: 'areaer'
                    },
                    {
                        title: '访问员',
                        key: 'visiter'
                    },
                    {
                        title: '访问员联系方式',
                        key: 'tel',
                        
                    },
                    {
                        title: '反馈类型',
                        key: 'type',
                        
                    },
                     {
                        title: '时间',
                        key: 'time',
                        
                    }
                ],
                data5: [
                    // {
                    //     proname: '电视广告',
                    //     address: "分公司股份",
                    //     object: '规范 ',
                    //     number: '555555',
                    //     areaer: '撒的风格',
                    //     visiter: '十多个',
                    //     tel: '13566665555 ',
                    //     type: '第三方',
                    //     time: '2016-10-03'
                    // },
                    // {
                    //      proname: '电视广告2',
                    //     address: "分公司股份",
                    //     object: '规范 ',
                    //     number: '555555',
                    //     areaer: '撒的风格',
                    //     visiter: '十多个',
                    //     tel: '13566665555 ',
                    //     type: '第三方',
                    //     time: '2016-10-03'
                    // },
                    // {
                    //     proname: '电视广告3',
                    //     address: "分公司股份",
                    //     object: '规范 ',
                    //     number: '555555',
                    //     areaer: '撒的风格',
                    //     visiter: '十多个',
                    //     tel: '13566665555 ',
                    //     type: '第三方',
                    //     time: '2016-10-03'
                    // },
                    // {
                    //      proname: '电视广告4',
                    //     address: "分公司股份",
                    //     object: '规范 ',
                    //     number: '555555',
                    //     areaer: '撒的风格',
                    //     visiter: '十多个',
                    //     tel: '13566665555 ',
                    //     type: '第三方',
                    //     time: '2016-10-03'
                    // }
                ],
        dataArr:[],
        //表格2
         columns7: [
                    {
                        title: '项目名称',
                        key: 'proname',
                    },
                    {
                        title: '地区',
                        key: 'address'
                    },
                    {
                        title: '调研对象',
                        key: 'object',
                        
                    },
                    {
                        title: '调研编号',
                        key: 'number',
                        
                    },
                     {
                        title: '区域代理人',
                        key: 'areaer'
                    },
                    {
                        title: '访问员',
                        key: 'visiter'
                    },
                    {
                        title: '访问员员IP数量',
                        key: 'ipnum',
                        
                    },
                    {
                        title: '访问员联系方式',
                        key: 'tel',
                        
                    },
                     
                ],
                data7: [
                    {
                        proname: '电视广告',
                        address: "分公司股份",
                        object: '规范 ',
                        number: '555555',
                        areaer: '撒的风格',
                        visiter: '十多个',
                        ipnum: '13566665555 ',
                        tel: '第三方',
                    },
                     {
                        proname: '电视广告',
                        address: "分公司股份",
                        object: '规范 ',
                        number: '555555',
                        areaer: '撒的风格',
                        visiter: '十多个',
                        ipnum: '13566665555 ',
                        tel: '第三方',
                    },
                    {
                        proname: '电视广告',
                        address: "分公司股份",
                        object: '规范 ',
                        number: '555555',
                        areaer: '撒的风格',
                        visiter: '十多个',
                        ipnum: '13566665555 ',
                        tel: '第三方',
                    },
                     {
                        proname: '电视广告',
                        address: "分公司股份",
                        object: '规范 ',
                        number: '555555',
                        areaer: '撒的风格',
                        visiter: '十多个',
                        ipnum: '13566665555 ',
                        tel: '第三方',
                    },
                ],
                dataArr2:[]
    }
 },
 methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
        //日期改变的函数1
      handleChange1(daterange) {
            this.datastart = daterange;
            console.log(daterange)
      },
      handleChange2(daterange) {
            this.dataend = daterange;
            console.log(daterange)
      },
       //日期改变的函数2
      handleChange3(daterange) {
            this.datastart2 = daterange;
            console.log(daterange)
      },
      handleChange4(daterange) {
            this.dataend2 = daterange;
            console.log(daterange)
      },
      change(val){
        console.log(val)
        this.model1 = val
      },
       change2(val){
        console.log(val)
        this.model1 = val
      },
      //搜索1
      search(){
           var that = this;
           
            axios({ 
                url:"http://192.168.0.134:8080/queryMsgfb",
                params:{starttime:that.datastart,
                       endtime:that.dataend,
                       projectname:that.model1
                       }
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data
                 for(var i in arr){                      
                      var obj={proname:arr[i].producttype,
                               address:arr[i].projectname,
                               object:arr[i].projectnum,
                               number:arr[i].projecttemp,
                               areaer:arr[i].researchprocag,
                               visiter:arr[i].scoretemplate,
                               tel:arr[i].scoretemplate,
                               type:arr[i].scoretemplate,
                               time:arr[i].earlywarndate
                               }
                       // console.log(obj)
                       that.data5=[];
                       that.data5.push(obj)                                          
                 }
                    that.pageTotal = that.data5.length;
                  //console.log(that.data1.length)
                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = that.pageNum * that.pageSize;
                        that.dataArr = that.data5.slice(_start,_end);
                       
            })
      },
      //分页1
         handlePage(value){
           console.log(value)
           this.pageNum = value;
           var _start = ( value - 1 ) * this.pageSize;
           var _end = value * this.pageSize;
           this.dataArr = this.data5 .slice(_start,_end);

        },
         //导出表格
         outexcel1(){
            var starttime = this.datastart;
            var endtime = this.dataend;
            var projectname = this.model1;
            //console.log(producttype,projectnum)
            window.location.href="http://192.168.0.134:8080/msgFddownload?starttime="+starttime+"&endtime="+endtime+"&projectname="+projectname;
         },
       //搜索2
        sousuo2(){
           var that = this;
           
            axios({ 
                url:"http://192.168.0.134:8080/queryMsgfb",
                params:{starttime:that.datastart,
                       endtime:that.dataend,
                       projectname:that.model1
                       }
            })
            .then(function(data){
                console.log(data.data)       
                // var arr = data.data
                //  for(var i in arr){                      
                //       var obj={proname:arr[i].producttype,
                //                address:arr[i].projectname,
                //                object:arr[i].projectnum,
                //                number:arr[i].projecttemp,
                //                areaer:arr[i].researchprocag,
                //                visiter:arr[i].scoretemplate,
                //                tel:arr[i].scoretemplate,
                //                type:arr[i].scoretemplate,
                //                time:arr[i].earlywarndate
                //                }
                //        // console.log(obj)
                //        that.data5=[];
                //        that.data5.push(obj)                                          
                //  }
                //     that.pageTotal = that.data5.length;
                //   //console.log(that.data1.length)
                //         var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                //         var _end = that.pageNum * that.pageSize;
                //         that.dataArr = that.data5.slice(_start,_end);
                       
            })
        },
        //分页2
         handlePage2(value){
           console.log(value)
           this.pageNum = value;
           var _start = ( value - 1 ) * this.pageSize;
           var _end = value * this.pageSize;
           this.dataArr = this.data5 .slice(_start,_end);
         },
        
  
  },
    mounted(){
       var that = this;
           axios({ 
               
                 url:"http://192.168.0.134:8080/queryProjectname",
                
                })
                .then(function(data){
                  console.log(data.data)
                  var arr = data.data
                  for(var i in arr){
                      var obj={value:arr[i],label:arr[i]}
                       that.cityList1.push(obj)
                     }
                });

    }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .top{width: 100%;height: 600px;
        .ipt{width: 100%;height: 40px;display: flex;justify-content: space-between}
    }
    .tab{width: 100%;height: 550px;border: 1px solid red;margin-top: 10px}
</style>