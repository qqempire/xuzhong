<template>
  <div class="hello">
     <Layout :style="{marginLeft: '200px'}">
            <tabs :animated="false">

                <!-- 产品模板 -->
                <tab-pane label="产品模板">
                    <Content :style="{padding: '0 16px 16px'}">
                        
                        <Card>
                            <div style="height: 500px">
                                <div class="sou">
                                    &nbsp;&nbsp;&nbsp;
                                    <Select v-model="model1" style="width:200px" @on-change="change">
                                        <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                   
                                    &nbsp;&nbsp;
                                    <el-button type="success" @click="search()">搜索</el-button>
                                    <el-button type="success" @click="leibie()">产品类别管理</el-button>
                                    
                                </div>
                               
                          <!-- 表格树 -->
                          
                            <div class="tree">
                                <table-tree :columns="columns" :tree-structure="true" :data-source="menuData" ></table-tree>
                            </div>  
                           
                            <!-- 添加弹出 -->
                            <Modal
                                title="添加子目录"
                                v-model="modal10"
                                class-name="vertical-center-modal">
                                  <Select v-model="addchild" style="width:300px" placeholder="项目调查产品类别 " @on-ok="addchildselect">
                                     <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select><br/><br />
                                 <Input v-model="productname" placeholder="产品名称" style="width: 300px" /><br><br />
                                 <Input v-model="sortnum" placeholder="排 序 值 " style="width: 150px" />                                      
                            </Modal>   
                             <!-- 修改弹出 -->
                            <Modal
                                title="修改产品信息"
                                v-model="modal11"
                                class-name="vertical-center-modal">
                                <Select v-model="xiugai" style="width:300px" placeholder="项目调查产品类别 " @on-ok="xiugaiselect">
                                     <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select><br/><br />
                                 <Input v-model="productname2" placeholder="产品名称" style="width: 300px" /><br><br />
                                 <Input v-model="sortnum2" placeholder="排 序 值 " style="width: 150px" />               
                            </Modal>                    
                        <!-- 弹出层模板 -->

                                <Modal
                                    v-model="modal4"
                                    title="Modal Title"
                                    ok-text="OK"
                                    cancel-text="Cancel">
                                    <div class="tankuang">
                                        <Select v-model="model1" style="width:300px" placeholder="请选择类别名称 ">
                                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    
                                        <Input v-model="value5" type="textarea" :rows="4" placeholder="备注 / 描述"  class="beizhu"/>

                                        <Input v-model="value" placeholder="请输入排序值:" style="width: 300px" />

                                    </div>
                                </Modal>
                                


                            </div>
                        </Card>
                    </Content>
                </tab-pane>

         <!-- app项目模板 -->
                <tab-pane label="app项目模板">
                    <Content :style="{padding: '0 16px 16px'}">
                        
                        <Card>
                            <div style="height: 600px">
                                <div class="sou">
                                    项目类型&nbsp;&nbsp;&nbsp;
                                     <Select v-model="jiashi1" style="width:200px" @on-change="jiashi">
                                        <Option v-for="item in productlei" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    &nbsp;&nbsp;
                                    <el-button type="success" @click="appsou">搜索</el-button>
                                    <el-button type="success" @click="tobianji">添加模板</el-button>
                                    <!-- <router-link to="/moban/bianji" ><el-button type="success" >添加模板</el-button></router-link> -->
                                    
                                </div>
                                <!-- 表格 -->
                                <el-table
                                    :data="app"
                                    border
                                    style="width: 100%;"
                                    >
                                    <el-table-column
                                    prop="type"
                                    label="项目类型"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="title"
                                    label="模板名称"
                                    width="180">
                                    </el-table-column>
                                    <el-table-column
                                    prop="miaoshu"
                                    label="备注描述">
                                    </el-table-column>
                                     <el-table-column
                                    prop="caozuo"
                                    label="操作">
                                    </el-table-column>
                                     
                                </el-table>
                            </div>
                        </Card>
                    </Content>
                </tab-pane>

                <!-- 算分模板 -->
                <tab-pane label="算分模板">
                    <Content :style="{padding: '0 16px 16px'}">
                        
                        <Card>
                            <div style="height: 600px">
                                <div style="height: 600px">
                                    <div class="sou">
                                        项目类型&nbsp;&nbsp;&nbsp;
                                        <el-select v-model="value8" filterable placeholder="请选择" style="width:280px">
                                            <el-option
                                            v-for="item in options3"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                        &nbsp;&nbsp;
                                        <el-button type="success" >搜索</el-button>
                                        <el-button type="success" @click="tonew">添加模板</el-button>
                                    </div>
                                    <!-- 表格 -->
                                    <el-table
                                        :data="suanfa"
                                        border
                                        style="width: 100%;"
                                        >
                                        <el-table-column
                                        prop="type"
                                        label="项目类型"
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="title"
                                        label="模板名称"
                                        width="180">
                                        </el-table-column>
                                        <el-table-column
                                        prop="miaoshu"
                                        label="备注描述">
                                        </el-table-column>
                                        <el-table-column
                                        prop="caozuo"
                                        label="操作">
                                        </el-table-column>
                                        
                                    </el-table>
                                </div>
                            </div>
                        </Card>
                    </Content>
                </tab-pane>
            </tabs>
            
            
        </Layout>
    
  </div> 
</template>

<script>
import $ from "jquery"
import axios from "axios"
import tableTree from './tableTree'
 import {mapGetters,mapActions} from "vuex"
export default {
  name: 'Moban',
//   methods: {
//       tableRowClassName({row, rowIndex}) {
//         if (rowIndex === 1) {
//           return 'warning-row';
//         } else if (rowIndex === 3) {
//           return 'success-row';
//         }
//         return '';
//       }
//     },

  data () {
    return {
        columns: [{
          text: '名称',
          dataIndex: 'event',
          textAlign:"center"
        },
        {
          text: '编号',
          dataIndex: 'id'
        },
        {
          text: '条形码',
          dataIndex: 'timeLine'
        },
        {
          text: '是否需要价格',
          dataIndex: 'comment'
        },
        {
          text: '排序',
          dataIndex: 'num1'
        }
      ],
      menuData: [
        {
          id: 0,
          event: "事件1",
          timeLine: 50,
          comment: "否",
          num1:60
        },
        {
          id: 1,
          event: "事件1",
          timeLine: 100,
          comment: "否",
           num1:60,
          children: [
            {
              id: 2,
              event: "事件2",
              timeLine: 10,
              comment: "否",
               num1:60
            },
            {
              id: 3,
              event: "事件3",
              timeLine: 90,
              comment: "否",
                num1:60,
              children: [
                {
                  id: 4,
                  event: "事件4",
                  timeLine: 5,
                  comment: "否",
                    num1:60
                },
                {
                  id: 5,
                  event: "事件5",
                  timeLine: 10,
                  comment: "否",
                    num1:60
                },
                {
                  id: 6,
                  event: "事件6",
                  timeLine: 75,
                  comment: "否",
                    num1:60,
                  children: [
                    {
                      id: 7,
                      event: "事件7",
                      timeLine: 50,
                      comment: "否",
                        num1:60,
                      children: [
                        {
                          id: 71,
                          event: "事件71",
                          timeLine: 25,
                          comment: "xx",
                            num1:60
                        },
                        {
                          id: 72,
                          event: "事件72",
                          timeLine: 5,
                          comment: "xx",
                            num1:60
                        }
                      ]
                    },
                    {
                      id: 8,
                      event: "事件8",
                      timeLine: 25,
                      comment: "否",
                        num1:60
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
        addchild:"",
        sortnum2:"",
        productname2:"",
        sortnum:"",
        productname:"",
        addchild:"",
        xiugai:"",
       modal10: false,  
       modal11: false,  
        // 表格树
    data: [
        //1111
        //     {
        //     label: '一级 1',
        //     children: [
        //         {
        //         label: '二级 1-1',
        //         children: [{
        //         label: '三级 1-1-1'
        //         }]
        //     }
        //     ]
        //     }, 
        // //2222
        //     {
        //         label: '一级 2',
        //         children: [
        //                 {
        //                 label: '二级 2-1',
        //                 children: [{
        //                 label: '三级 2-1-1'
        //                 }
        //             ]
        //         }, 
        //         {
        //             label: '二级 2-2',
        //             children: [{
        //             label: '三级 2-2-1'
        //             }]
        //         }]
        //     }, 
        //3333
            // {
            //     label: '一级 3',
            //     children: [{
            //         label: '二级 3-1',
            //         children: [{
            //         label: '三级 3-1-1'
            //         }]
            //     }, {
            //         label: '二级 3-2',
            //         children: [{
            //         label: '三级 3-2-1'
            //         }]
            //     }]
            //  }
        
        ],
        // defaultProps: {
        //   children: 'children',
        //   label: 'label'
        // },


        
        cityList:[],
        value5:"",
        value:"",
        //app项目模板
        jiashi1:"",
        productlei: [
            {
                value: '2',
                label: '实效'
            },
            {
                value: '1',
                label: '家化'
            },  
        ],
         options: [
            {
                value: '实效',
                label: '实效'
            },
            {
                value: '家化',
                label: '家化'
            },  
        ],
        value8: '项目调查产品类别',
        select:"",
        model1:"",
       

// 弹出
       modal4: false,


        //222
        options2: [{
          value: '选项1',
          label: '实化'
        }, {
          value: '选项2',
          label: '家化'
        }, {
          value: '选项3',
          label: '问卷'
        }],
        //333
        options3: [{
          value: '选项1',
          label: '111'
        }, {
          value: '选项2',
          label: '222'
        }, {
          value: '选项3',
          label: '333'
        }],



        //表格树
       //111
       

        // 222
        app: [{
          type: '2016-05-02',
          pname: '但vs方法是拜拜',
          miaoshu: '496288+65656',
          caozuo:"编辑",
          
        }],
        //333
        suanfa: [{
          type: 'adfdafdfd',
          pname: 'ggggggggg',
          miaoshu: 'ggggg+65656',
          caozuo:"编辑",
          
        }],

      }
  },
  methods:{
     ...mapActions(["login","add","jian"]), //mapActions（[]）为store里的函数名
      handleClick(row) {
        console.log(row);
      },
       //产品类别管理

       leibie(){
           
           this.$router.push("/leibie")
       },

        tobianji(){
        this.$router.push("/bianji")
        },
        tonew(){
        this.$router.push("/new")

        },
        //下拉框
        change(val){
          console.log(val)
           this.value1=val
        },
        search(){
            // console.log(this.data5[0].children)      
                var that = this;
                axios({
                    url:"http://192.168.0.135:8080/QueryByProduct",
                    params:{column1:that.value1}
                })
                .then(function(data){
                    console.log(data.data[0]) 
                   
                    // var arr = data.data;
                    // var aaa = that.data5[0].children.push(arr[0])
                   // console.log(that.data5[0].children)
                })
        
        },

        obtainValue(value){   
            console.log(value)
            this.select=value     
        },
        // 到查看编辑页面
        tochange(){
          this.$router.push("/change")
        },
        //树状
        handleNodeClick(data) {
            console.log(data);
        },
       
       //树状表
        

            //弹出框添加
            addchildselect(val){
                console.log(val)
            },
            xiugaiselect(val){
                console.log(val)
            },
            //添加
            append (data) {             
                console.log(data)
                this.modal10=true;
            },

            //修改
            remove(root, node, data) {
                console.log( data.pname)
                this.productname2=data.pname
                this.sortnum2 = data.psort;
                this.xiugai = this.model1
                this.modal11=true;
                console.log( data.pname)
            },
// app模板  
        jiashi(val){
          
           this.jiashi1=val
           console.log(this.jiashi1)
        },
        appsou(){
            var that = this
            axios({               
                url:"http://192.168.0.135:8080/QueryByApptemplateId", 
                params:{attype:that.jiashi1}
            })
            .then(function(data){
                console.log(data.data)       
                // var arr = data.data;
                // for(var i in arr){
                //       var obj={value:arr[i].tid,label:arr[i].tname}
                //        that.options.push(obj)
                // }
               
            })
        }

    
  },
  mounted(){
           var that = this
        	
            axios({               
                url:"http://192.168.0.135:8080/QueryByTypes",                    
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data;
                for(var i in arr){
                      var obj={value:arr[i].tid,label:arr[i].tname}
                       that.options.push(obj)
                }
                //  that.pageTotal = that.data1.length;
                // var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                // var _end = that.pageNum * that.pageSize;
                // that.dataArr = that.data1.slice(_start,_end);
            })
    },
  components: {
    tableTree
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
   .tree{border: 1px solid red;height: 420px;overflow: auto}
    .sou{
        width: 100%;height: 50px;display: flex;align-items: center;margin-bottom: 25px
    }
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .tankuang{
        width: 100%;height: 220px;
        .beizhu{margin: 20px 0}
    }
</style>
