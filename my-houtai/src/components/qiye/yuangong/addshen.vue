<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}">
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <router-link to="./ygrecheck" tag="span">
                       <el-button type="info" size="small">返回</el-button>
                    </router-link>
                    
                    <Button type="success" @click="save" size="default">保存</Button>
                    
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                          <div class="aaa">
                            
                             <div class="bbb">
                               <div class="tit">基本信息</div>
                               
                              <!-- <Table border :columns="columns1" :data="data1"></Table> -->
                                <Input v-model="visiter" placeholder="访问员账户" style="width: 200px" />
                                <Input v-model="visiterpassword" placeholder="访问员密码" style="width: 200px" />

                             </div>
                            
                            
                          </div>

                          <!-- 下 -->
                          <div class="xia">
                              <!-- 表格左 -->
                            <div class="table">
                               <div class="other">添加调研对象</div>
                              
                               <div>
                              
                                        <Select v-model="model1" style="width:80px" placeholder="省" @on-change="change1">
                                            <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Select v-model="model2" style="width:80px" placeholder="市" @on-change="change2">
                                            <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Select v-model="model3" style="width:80px" placeholder="县/区" @on-change="change3">
                                            <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Input v-model="proname" placeholder="项目名称" style="width: 100px" />
                                        <Input v-model="pronum" placeholder="调研编号" style="width: 100px" />
                                        <Button type="success" @click="search" style="margin:8px">搜索</Button>
                                </div>
                                <!-- 批量操作 -->
                                
                                
                            <!-- <Button @click="handleSelectAll(true)">全选</Button> -->
                            <!-- <Button @click="handleSelectAll(false)">取消全选</Button> -->
                            <!-- <Button type="success">批量添加</Button>  -->
                           
                            <Table border ref="selection" :columns="columns4" :data="message" @on-select-all="selectAbb" @on-select="selectone" style="margin-top:5px"></Table>
                            <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" 
                                show-elevator  show-total placement="top" @on-change="handlePage" style="margin-top:8px">
                            </Page>


                           </div>
                        <!-- 表格右 -->
                           <div class="table2">
                               <div class="other">可见调研对象</div>
                               <Table border :columns="col" :data="dataArr1"></Table>
                               <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" 
                                   placement="top" @on-change="handlePage2" style="margin-top:8px">
                               </Page>
                           </div>
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
  name: 'Addrecheck',
  data () {
    return {
        ptypeid:"",
        visiter:"",
        visiterpassword:"",
        proname:"",
        pronum:"",
        pageTotal1:"",  //数据总数
        pageNum1: 1,  //初始页
        pageSize1: 6,  //每页条数
        dataArr1 :[],   //页面显示的数组

        pageTotal: 10,  //数据总数
        pageNum: 1,  //初始页
        pageSize: 3,  //每页条数
        dataArr :[],   //页面显示的数组

            col: [
                    {
                        title: '调研对象',
                        key: 'obj'
                    },
                    {
                        title: '详细地址',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'do',
                        render: (h, params) => {
                            return h('div', [
                                
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                shows: [
                    // {
                    //     obj: 'sssss',
                    //     address: "xxxxxxx",                      
                    // },
                    //  {
                    //     obj: 'ddddd',
                    //     address: "ggggggg",                      
                    // },
                    
                ],
        columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '省',
                        key: 'province'
                    },
                    {
                        title: '市',
                        key: 'shi'
                    },
                    {
                        title: '区',
                        key: 'qu'
                    },
                    {
                        title: '项目名称',
                        key: 'proname'
                    },
                    {
                        title: '调研对象',
                        key: 'obj'
                    },
                    {
                        title: '调研编号',
                        key: 'num'
                    },
                    {
                        title: '详细地址',
                        key: 'address'
                    },
                   
                ],
                message: [
                    {   id:1,
                        province: '河南',
                        shi: '郑州',
                        qu: '二七区',
                        proname: '呵呵呵',
                        obj: '111',
                        num: '111',
                        address:"222",                
                    },
                    {   id:2,
                        province: '河南1',
                        shi: '郑州1',
                        qu: '二七区1',
                        proname: '呵呵呵1',
                        obj: '222',
                        num: '1111',
                        address:"2222",                
                    },
                     {  id:3,
                        province: '河北',
                        shi: '石家庄',
                        qu: '解放区',
                        proname: '的方式规范呵1',
                        obj: '333',
                        num: '十多个',
                        address:"三个地方好地方",                
                    },
                    {  id:3,
                        province: '河北',
                        shi: '石家庄',
                        qu: '解放区',
                        proname: '的方式规范呵1',
                        obj: '333',
                        num: '十多个',
                        address:"三个地方好地方",                
                    },
                    {  id:3,
                        province: '河北',
                        shi: '石家庄',
                        qu: '解放区',
                        proname: '的方式规范呵1',
                        obj: '333',
                        num: '十多个',
                        address:"三个地方好地方",                
                    },
                    {  id:3,
                        province: '河北',
                        shi: '石家庄',
                        qu: '解放区',
                        proname: '的方式规范呵1',
                        obj: '333',
                        num: '十多个',
                        address:"三个地方好地方",                
                    },
                   
                ],
        // columns1: [
        //             {
        //                 title: '访问员账户',
        //                 key: 'username',
        //                 width:"200px",
                       
        //             },
        //             {
        //                 title: '访问员密码',
        //                 key: 'password',
        //                 width:"200px"
        //             },
                   
        //         ],
        //         data1: [
        //             {
        //                 username: 'John Brown',
        //                 password: 18000000,
                       
        //             },
                    
        //         ],
        // 全选
         indeterminate: true,
                checkAll: false,
                checkAllGroup: ['香蕉', '西瓜'],

       input10: '',
       single: false,
       single1: false,
       single2: false,
       single3: false,
       cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                ],
            cityList1: [
                    // {
                    //     value: '门头照',
                    //     label: '门头照'
                    // },
                    // {
                    //     value: '问题照片',
                    //     label: '问题照片'
                    // },
                    // {
                    //     value: '货架',
                    //     label: '货架'
                    // }
                    
                ],
                 cityList2: [
                    // {
                    //     value: '门头照',
                    //     label: '门头照'
                    // },
                    // {
                    //     value: '问题照片',
                    //     label: '问题照片'
                    // },
                    // {
                    //     value: '货架',
                    //     label: '货架'
                    // }
                    
                ],
                 cityList3: [
                    // {
                    //     value: '门头照',
                    //     label: '门头照'
                    // },
                    // {
                    //     value: '问题照片',
                    //     label: '问题照片'
                    // },
                    // {
                    //     value: '货架',
                    //     label: '货架'
                    // }
                    
                ],
                model2: '',
                model3: '',
                model4: '',      

         model1: '',
         model2: '',
         model3: '',

         textarea2: '',
         textarea3: '',
         value:"",
         value2:""      ,
          social: ['facebook', 'github'],
          fruit: ['苹果']  
    }
  },

methods: {
            
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.message[index].province}<br>Age：${this.message[index].province}<br>Address：${this.message[index].province}`
                })
            },
            
            // handleSelectAll (status) {
            //     this.$refs.selection.selectAll(status);
            // },

            //全选
            selectAbb(value){
                this.shows=[]
            //    console.log(value)
               var objj=value
               for(var i in value){
                   var obj1 = {
                       obj:value[i].obj,
                       address:value[i].address,
                       pid:value[i].pid
                   }
                //    console.log(obj1)
                  this.shows.push(obj1)
                  this.pageTotal1 = this.shows.length;
                  //console.log(that.data1.length)
                        var _start = ( this.pageNum1 - 1 ) * this.pageSize1;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = this.pageNum1 * this.pageSize1;
                        this.dataArr1 = this.shows.slice(_start,_end);
               }
            },
            //单选
            selectone(value){
               console.log(value);
            //    var objj=value;
            //    var oldarr = this.shows;
            //    console.log(oldarr);
            //    var newarr = [];
            //   for(var j in oldarr){
            //        newarr.push(oldarr[j].pid);                              
            //   }
            //   console.log(newarr)
               var newarr1 = []
               for(var i in value){
                   var obj1 = {
                       obj:value[i].obj,
                       address:value[i].address,
                       pid:value[i].pid
                   }
                //    newarr1.push(value[i].pid)
                //    console.log(value)
                  this.shows.push(obj1)
               }
                // console.log(newarr1)
            },
            //删除
            remove (index) {
                this.shows.splice(index, 1);
            },

            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },
        change1(val){
            console.log(val)
            this.model1 = val
        },
        change2(val){
            console.log(val)
            this.model2 = val
        },
        change3(val){
            console.log(val)
            this.model3 = val
        },
        //搜索
         search(){
             var that = this;        
            //  console.log("00")
            //  console.log(that.model1,that.model2,that.model3,that.proname,that.pronum)
            // that.pageTotal
            axios({ 
                method:"post",
                url:"http://192.168.0.134:8080/queryByResearchobjectId",
                params:{
                    researchobject:{
                        provinceid:that.model1,
                        cityid:that.model2,
                        districtid:that.model3,
                        projectname:that.proname,
                        researchnum:that.pronum
                    },
                    page:that.pageNum
                }
            })
            .then(function(data){
                console.log(data.data)       
                 var arr = data.data
                 that.message=[]
                 var newarr = arr.list;
                 that.pageTotal = arr.totalCount;//总页数
                 that.pageNum = arr.page;//当前页
                 that.pageSize = arr.limit;//每页显示
                //  that.pageTotal = arr.totalCount; //数据总树

                 for(var i in newarr){                      
                      var obj={
                            province:newarr[i].provinceid,
                            shi:newarr[i].cityid,
                            qu:newarr[i].projectname,
                            proname:newarr[i].districtid,
                            obj:newarr[i].researchobject,
                            num:newarr[i].researchnum,
                            address:newarr[i].address,
                            pid:newarr[i].pid                   
                      }

                       that.message.push(obj) 

                 }
                   
                        var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                        var _end = that.pageNum * that.pageSize;
                        that.dataArr = that.message.slice(_start,_end);
                       
            })

        },
        //分页1
         handlePage(value){
            console.log(value)
            // this.pageNum = value;
          
            var that = this; 
            that.pageTotal
            axios({ 
                method:"post",
                url:"http://192.168.0.134:8080/queryByResearchobjectId",
                params:{ 
                 researchobject:{
                        provinceid:that.model1,
                        cityid:that.model2,
                        districtid:that.model3,
                        projectname:that.proname,
                        researchnum:that.pronum
                    },
                    page:value}
            })
            .then(function(data){
                that.message=[]
                  var arr = data.data
                  var newarr = arr.list;
                   console.log(arr.list)
                 for(var i in newarr){                      
                      var obj={
                            province:newarr[i].provinceid,
                            shi:newarr[i].cityid,
                            qu:newarr[i].projectname,
                            proname:newarr[i].districtid,
                            obj:newarr[i].researchobject,
                            num:newarr[i].researchnum,
                            address:newarr[i].address,
                            pid:newarr[i].pid
                      }    
                      console.log(obj)                 
                     that.message.push(obj)                                           
                                         
                 }       
                 
                //   var _start = ( value - 1 ) * that.pageSize;
                //   var _end = value * that.pageSize;
                //   that.dataArr = that.message .slice(_start,_end);

                    that.dataArr = that.message;
                  
            })
        },
         //分页2
         handlePage2(value){
            console.log(value)
            this.pageNum1 = value;
            var _start = ( value - 1 ) * this.pageSize1;
            var _end = value * this.pageSize1;
            this.dataArr1 = this.shows .slice(_start,_end);
        },
        //保存
        save(){
            var that = this;
            var zhanghao = that.visiter
            var arr = that.shows;
           console.log(that.shows)
           var newarr = []
           for(var i in arr){
               var pidd = arr[i].pid
               newarr.push(pidd)
           }
            var str = newarr.toString()
            
           console.log(that.ptypeid,that.visiter,that.visiterpassword, str,)
            axios({ 
                method:"post",
                url:"http://192.168.0.134:8080/savaByInterviewProject",
                params:{
                    //  reviewInterview:{}, 
                     root:that.visiter,
                     password:that.visiterpassword,                                     
                     pid:str,
                     columu1:that.ptypeid
                }
            })
            .then(function(data){
                console.log(data.data)       
               if(data.data.msg=="添加成功"){
                   alert("添加成功")
               }
            })

           }
           
       
       

       },
       mounted(){
        //    var that = this;
        //     axios({ 
        //         url:"http://192.168.0.134:8080/queryPastHousepj",
        //         // params:{projectname:that.proname,projectnum:that.pronum}
        //     })
        //     .then(function(data){
        //         console.log(data.data)       
        //         var arr = data.data
        //         //  for(var i in arr){                      
        //         //       var obj={name:arr[i].producttype,diaoyan:arr[i].projectname,pic:arr[i].projectname}
        //         //        that.data1.push(obj)                                          
        //         //  }
        //            that.pageTotal = that.data1.length;
        //                 var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
        //                 var _end = that.pageNum * that.pageSize;
        //                 that.dataArr = that.data1.slice(_start,_end);
                       
        //     })
          var ptypeid =  localStorage.getItem('ptypeid')
          this.ptypeid = ptypeid;
          console.log(ptypeid)
       },
      watch: {    
        shows:{
            handler: function (newarr,oldarr) {
                console.log("000"+ newarr.obj, oldarr.obj); 
            },      
           deep: true    //深度监听
        } 
      }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .aaa{
      width: 100%;height: 90px;display:flex;justify-content:space-between;
      .bbb{
        width: 100%;height: 150px;
        .tit{
           width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 10px;
        }
      }

    }

 
 .content{width: 360px;height: 200px;margin-top: 15px;padding: 20px}

.table{width: 68%;height:520px;border:1px solid red;overflow:auto;
    .other{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px}
}
.table2{width: 29%;height:520px;border:1px solid red;overflow:auto;
    .other{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px}
}
 table{text-align: center;border:1px solid #D2D4D5;margin-top:5px;margin:5px 0 0 0;padding:0;
   td{height: 25px}
  }
.header{background: #1D95C9;color: #fff}

.xia{display: flex;justify-content: space-between}


</style>
