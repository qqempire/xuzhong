<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                        <div class="shang">
                           <div class="ipt">
                                <Select v-model="model1" style="width:150px" placeholder="项目类别" @on-change="change">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                &nbsp; &nbsp; &nbsp;
                                 <Select v-model="leibie" style="width:150px" placeholder="产品类别" @on-change="change2">
                                    <Option v-for="item in productclass" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                 &nbsp; &nbsp;
                                <!-- <Button type="success">搜索</Button>&nbsp; &nbsp;&nbsp; &nbsp; -->
                                <Button type="warning" style="float:right" @click="outtable">导出表格</Button>
                           </div>
                           <div class="ipt">
                               <Input v-model="bianhao" placeholder="调研编号" style="width: 300px" /> &nbsp; &nbsp;
                               <Button type="success" @click="search">搜索</Button>
                           </div>
                        </div>
                        <!-- 表格 -->
                        <div class="xia">
                            
                            
                            <Table border :columns="columns1" :data="dataArr"></Table>
                            <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator  show-total placement="top" @on-change="handlePage" style="margin:10px"></Page>
                        </div>
                    </div>
                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
import $ from "jquery"
import axios from "axios"

export default {
  name: 'Listjia',
  data () {
    return {
        //分页
        pageTotal: 10,
        pageNum: 1,
        pageSize: 5,
        //表格
        columns1: [
                    {
                        title: '项目类别',
                        key: 'name'
                    },
                    {
                        title: '产品类型',
                        key: 'type'
                    },
                    {
                        title: '项目名称',
                        key: 'proname'
                    },
                     {
                        title: 'DSR进度',
                        key: 'dsr'
                    },
                     {
                        title: '一审进度',
                        key: 'one'
                    },
                     {
                        title: '二审进度',
                        key: 'two'
                    },
                     {
                        title: '预警日期',
                        key: 'warningdate'
                    },
                     {
                        title: '操作',
                        key: 'do',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看详情'),
                               
                            ]);
                        }    
                    }

                ],
                data1: [
                    // {
                    //     name: 'John Brown',
                    //     type: 18,
                    //     proname: 'New York No. 1 Lake Park',
                    //     dsr: '2016-10-03',
                    //     one:"000",
                    //     two:"3222",
                    //     warningdate:"333",
                       
                    // },
                    // {
                    //    name: 'John Brown',
                    //     type: 18,
                    //     proname: 'New York No. 1 Lake Park',
                    //     dsr: '2016-10-03',
                    //     one:"000",
                    //     two:"3222",
                    //     warningdate:"333",
                        
                    // },
                    // {
                    //     name: 'John Brown',
                    //     type: 18,
                    //     proname: 'New York No. 1 Lake Park',
                    //     dsr: '2016-10-03',
                    //     one:"000",
                    //     two:"3222",
                    //     warningdate:"333",
                       
                    // },
                    // {
                    //     name: 'John Brown',
                    //     type: 18,
                    //     proname: 'New York No. 1 Lake Park',
                    //     dsr: '2016-10-03',
                    //     one:"000",
                    //     two:"3222",
                    //     warningdate:"333",
                       
                    // }
                ],
         dataArr:[],       

        bianhao: '',
       cityList: [
                    {
                        value: '家化',
                        label: '家化'
                    },
                    {
                        value: '时效',
                        label: '时效'
                    },
                   
                ],
                model1: '家化',
        productclass:[
                //  {
                //         value: '家化',
                //         label: '家化'
                //     },
                //     {
                //         value: '时效',
                //         label: '时效'
                //     },
                 ],
                 leibie: '',        
     }
   },
    methods:{
        change(val){
           console.log(val)
           if(val=="家化"){
               this.$router.push("/listjia")
           }else{
              this.$router.push("/listshi")
           }
        },
        //产品类别
        change2(val){
           console.log(val)
           this.leibie=val
        },
        //查看详情
        show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data1[index].name}<br>Age：${this.data1[index].type}<br>Address：${this.data1[index].proname}`
                })
        },
        search(){
            var that = this;
            axios({ 
                url:"http://192.168.0.134:8080/queryProjectinfo",
                params:{producttype:that.leibie,projectnum:that.bianhao}
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data
                 for(var i in arr){                      
                      var obj={name:arr[i].producttype,type:arr[i].projectname,proname:arr[i].projectnum,dsr:arr[i].projecttemp,one:arr[i].researchprocag,two:arr[i].scoretemplate}
                       // console.log(obj)
                       that.data1.push(obj)                                          
                 }
                    that.pageTotal = that.data1.length;
                  //console.log(that.data1.length)
                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = that.pageNum * that.pageSize;
                        that.dataArr = that.data1.slice(_start,_end);
                       
            })
        },
         //分页
         handlePage(value){
           console.log(value)
           this.pageNum = value;
           var _start = ( value - 1 ) * this.pageSize;
           var _end = value * this.pageSize;
           this.dataArr = this.data1 .slice(_start,_end);
       },
       //导出表格
       outtable(){
           var producttype = this.leibie;
           var projectnum = this.bianhao;
           console.log(producttype,projectnum)
            window.location.href="http://192.168.0.134:8080/projectInfoDownload?producttype="+producttype+"&projectnum="+projectnum;
            
       }
    },
    mounted(){
           var that = this;
           axios({ 
                 url:"http://192.168.0.134:8080/queryproducttype", 
                })
                .then(function(data){
                  console.log(data.data)
                  var arr = data.data
                  for(var i in arr){
                      var obj={value:arr[i],label:arr[i]}
                       that.productclass.push(obj)
                     }
                });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .shang{width: 100%;height: 100px;background: #F5F7F9;padding: 5px;box-sizing: border-box;
       .ipt{width: 100%;height: 46px;}
    }
    .xia{width: 100%;height: 490px;border:1px solid red;margin-top: 10px}
</style>