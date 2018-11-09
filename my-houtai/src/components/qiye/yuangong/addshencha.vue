
<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}">
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    <router-link to="./yuangong" tag="span">
                       <Button type="warning" >返回</Button>
                    </router-link>
                    <Button type="success">保存</Button>
                    <Button type="success">删除</Button>
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                          <div class="aaa">
                            
                             <div class="bbb">
                               <div class="tit">基本信息</div>
                               
                              <Table border :columns="columns1" :data="data1"></Table>
                           
                             </div>
                            
                            
                          </div>


                          <!-- 下 -->
                          <div class="xia">
                              <!-- 表格左 -->
                            <div class="table">
                               <div class="other">添加调研对象</div>
                               <br/>
                                 <div>
                              
                                       <Select v-model="sheng" style="width:80px" placeholder="省" @on-change="change1">
                                            <Option v-for="item in select1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Select v-model="shi" style="width:80px" placeholder="市" @on-change="change2">
                                            <Option v-for="item in select2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Select v-model="qu" style="width:80px" placeholder="县/区" @on-change="change3">
                                            <Option v-for="item in select3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Input v-model="proname2" placeholder="项目名称" style="width: 100px" />
                                        <Input v-model="pronum2" placeholder="调研编号" style="width: 100px" />
                                        <Button type="success" @click="search">搜索</Button>
                                 </div>
                                <!-- 批量操作 -->
                                
                            
                            <!-- <Button @click="handleSelectAll(true)" type="success" style="margin:5px 0">全选</Button> -->
                            <!-- <Button @click="handleSelectAll(false)">取消全选</Button> -->
                            <!-- <Button type="success">批量添加</Button> <br/><br/> -->
                             <Table border ref="selection" :columns="columns4" :data="message" @on-select-all="selectAbb" @on-select="selectone" 
                              style="margin-top:5px" 
                                     @on-row-click="rowval"></Table>
                            

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
  name: 'Bianji',
  data () {
    return {
        pageTotal1: 10,  //数据总数
        pageNum1: 1,  //初始页
        pageSize1: 2,  //每页条数
        dataArr1 :[],   //页面显示的数组

        pageTotal: 10,  //数据总数
        pageNum: 1,  //初始页
        pageSize: 3,  //每页条数
        dataArr :[],   //页面显示的数组

        proname2:"",
        pronum2:"",
        sheng:"",
        shi:"",
        qu:"",
        select1:[
            {
                value: '门头照',
                label: '门头照'
            },
            {
                value: '问题照片',
                label: '问题照片'
            },
            {
                value: '货架',
                label: '货架'
            }
        ],
        select2:[
            {
                value: '门头照',
                label: '门头照'
            },
            {
                value: '问题照片',
                label: '问题照片'
            },
            {
                value: '货架',
                label: '货架'
            }
        ],
        select3:[
            {
                value: '门头照',
                label: '门头照'
            },
            {
                value: '问题照片',
                label: '问题照片'
            },
            {
                value: '货架',
                label: '货架'
            }
        ],
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
                    {  id:0,
                        obj: 'sssss',
                        address: "xxxxxxx",                      
                    },
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
                        obj: '000',
                        num: '111',
                        address:"222",                
                    },
                    {   id:2,
                        province: '河南1',
                        shi: '郑州1',
                        qu: '二七区1',
                        proname: '呵呵呵1',
                        obj: '0000',
                        num: '1111',
                        address:"2222",                
                    },
                     {  id:3,
                        province: '河北',
                        shi: '石家庄',
                        qu: '解放区',
                        proname: '的方式规范呵1',
                        obj: '00都是00',
                        num: '十多个',
                        address:"三个地方好地方",                
                    },
                ],
        columns1: [
                    {
                        title: '访问员账户',
                        key: 'username',
                       
                    },
                    {
                        title: '访问员密码',
                        key: 'password',
                       
                    },
                    {
                        title: '已绑定手机号',
                        key: 'phone',
                      
                    },
                    {
                        title: '姓名',
                        key: 'name',
                       
                    },
                    {
                        title: '性别',
                        key: 'sex',
                      
                    },
                   
                ],
                data1: [
                    {
                        username: 'John Brown',
                        password: 18000000,
                        phone:"222222",
                        name:"sss",
                        sex:"dd"                      
                    },
                    
                ],
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
        cityList2: [
                    {
                        value: '门头照',
                        label: '门头照'
                    },
                    {
                        value: '问题照片',
                        label: '问题照片'
                    },
                    {
                        value: '货架',
                        label: '货架'
                    }
                    
                ],
                model2: '',
                model3: '',
                model4: '',      

         model1: '',
         textarea2: '',
         textarea3: '',
         value:"",
         value2:""      ,
          social: ['facebook', 'github'],
          fruit: ['苹果']  
    }
  },

methods: {
            remove (index) {
                this.shows.splice(index, 1);
            },
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
               console.log(value)
               this.shows=[]
               for(var i in value){
                   var obj1 = {
                       obj:value[i].obj,
                       address:value[i].address
                   }        
                  this.shows.push(obj1)
               }
            },
            change1(val){
               console.log(val)
            },
            change2(val){
               console.log(val)
            },
            change3(val){
               console.log(val)
            },
            search(){
               console.log("000")
               var that = this;
             console.log("00")
             console.log(that.sheng,that.shi,that.qu,that.proname2,that.pronum2)
            
                axios({ 
                    method:"post",
                    url:"http://192.168.0.135:8080/queryByResearchobjectId",
                    params:{
                        researchobject:{
                            provinceid:that.sheng,
                            cityid:that.shi,
                            districtid:that.qu,
                            projectname:that.proname2,
                            researchnum:that.pronum2
                        },
                        // researchobject:{},
                        page:that.pageNum
                    }
                })
                .then(function(data){
                    console.log(data.data)       
                    //var arr = data.data
                    //  for(var i in arr){                      
                    //       var obj={name:arr[i].producttype,diaoyan:arr[i].projectname,pic:arr[i].projectname}
                    //        that.data1.push(obj)                                          
                    //  }
                    //    that.pageTotal = that.data1.length;
                    //         var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                    //         var _end = that.pageNum * that.pageSize;
                    //         that.dataArr = that.data1.slice(_start,_end);
                        
                })
            },
            //单选
            selectone(value){
                 console.log(value)
               this.shows=[]   
               for(var i in value){
                   var obj1 = {
                       obj:value[i].obj,
                       address:value[i].address
                   } 
                              
               this.shows.push(obj1)               
              } 
               
            },
            rowval(val){
               console.log(val)
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
          handlePage2(value){
            console.log(value)
            this.pageNum1 = value;
            var _start = ( value - 1 ) * this.pageSize1;
            var _end = value * this.pageSize1;
            this.dataArr1 = this.shows .slice(_start,_end);
        },

       }




  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .aaa{
      width: 100%;height: 150px;display:flex;justify-content:space-between;
      .bbb{
        width: 100%;height: 150px;
        .tit{
           width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box
        }
      }

    }

 
 .content{width: 360px;height: 200px;margin-top: 15px;padding: 20px}

.table{width: 68%;height:440px;border:1px solid red;overflow:auto;
    .other{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px}
}
.table2{width: 29%;height:440px;border:1px solid red;overflow:auto;
    .other{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px}
}
 table{text-align: center;border:1px solid #D2D4D5;margin-top:5px;margin:5px 0 0 0;padding:0;
   td{height: 25px}
  }
.header{background: #1D95C9;color: #fff}

.xia{display: flex;justify-content: space-between}


</style>
