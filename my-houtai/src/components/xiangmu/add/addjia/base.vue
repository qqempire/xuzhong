<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="success" size="small" >&nbsp;&nbsp;基本信息&nbsp;&nbsp;</el-button>
                    <el-button type="info" size="small"  >&nbsp;&nbsp;选择产品&nbsp;&nbsp;</el-button>
                    <el-button type="info" size="small"  >&nbsp;&nbsp;导入信息&nbsp;&nbsp;</el-button>
                    <el-button type="info" size="small"  >&nbsp;&nbsp;编辑算法&nbsp;&nbsp;</el-button>
                </Breadcrumb>

                <Card>
                        <div style="height: 600px">
                                  <div class="shang">
                                      <div class="left">
                                          <div class="ipt">
                                               <Select v-model="model" style="width:180px" placeholder="权限组" @on-change="change">
                                                    <Option v-for="item in xmlb" :value="item.value"  label-in-value='true' :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                               <Select v-model="model2" style="width:180px" placeholder="产品类别" @on-change="changeleibie">
                                                    <Option v-for="item in product" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                               </Select>
                                          </div>
                                          <div class="ipt">
                                              <Input v-model="value" placeholder="项目名称" style="width: 180px" />
                                              <Input v-model="bianhao" placeholder="项目编号" style="width: 180px" />
                                          </div>
                                          <div class="ipt ipt1">
                                              <Col span="12" style="width: 120px" class="datawrop">
                                                <DatePicker type="date" placeholder="调查日期" @on-change="handleChange"></DatePicker>
                                              </Col>
                                              <Col span="12" style="width: 120px" class="datawrop">
                                                <DatePicker type="date" placeholder="截止日期"></DatePicker>
                                              </Col>
                                              <Col span="12" style="width: 120px" class="datawrop">
                                                <DatePicker type="date" placeholder="预警日期" ></DatePicker>
                                              </Col>
                                          </div>
                                          <div class="ipt">
                                              <Select v-model="model1" style="width:180px" placeholder="调研产品类别">
                                                    <Option v-for="item in diaoyan" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                               </Select>
                                               <Select v-model="model1" style="width:180px" placeholder="选择项目模板">
                                                    <Option v-for="item in select" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                               </Select>
                                          </div>
                                      </div>
                                      <div class="right">
                                          <div class="title"><span>调用以往项目信息</span></div>
                                          <div class="center">
                                              <div class="center2">
                                                  <Input v-model="proname" placeholder="项目名称" style="width: 200px" />
                                                   <Input v-model="pronum" placeholder="项目编号" style="width: 200px;margin:10px 0" />
                                                   <Button class="btn" size="small" @click="jiance()">检测</Button>
                                              </div>
                                              
                                          </div>
                                          
                                      </div>
                                  </div>
                                  <div class="xia">
                                       <div class="title"><span>以往项目信息</span></div>
                                       <div class="tab">
                                             <Button type="primary" @click="handleSelectAll(true);">全选</Button>
                                             <Button type="primary" @click="handleSelectAll(false)">取消</Button>
                                             <Button type="success">可见</Button>
                                             <Table border ref="selection" :columns="columns4" :data="dataArr"></Table>
                                             <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator  show-total placement="top" @on-change="handlePage" ></Page>
                                       </div>
                                       <div class="but">
                                           <div class="fen">
                                             

                                           </div>
                                           <div class="btncen">
                                               <Button type="error" size="small" > 取 消 </Button>
                                               
                                               <Button type="success" size="small" @click="toselect()"> 下 一 步 </Button>          
                                           </div>
                                            
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
  name: 'Addjia',
  data () {
    return {
        bianhao:"110", //项目编号
        pageTotal: 10,
        pageNum: 1,
        pageSize: 3,

        //检测
        proname:"",
        pronum:"",
        columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '区',
                        key: 'name',
                        align: 'center',
                    },
                    {
                        title: '调研对象',
                        key: 'diaoyan',
                        align: 'center',
                    },
                    {
                        title: '照片类型',
                        key: 'pic',
                        align: 'center',
                    },
                     {
                        title: '操作',
                        key: 'action',
                        align: 'center',
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
                                }, '可见'),
                                // h('Button', {
                                //     props: {
                                //         type: 'error',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.remove(params.index)
                                //         }
                                //     }
                                // }, 'Delete')
                            ]);
                        }
                    
                    }
                ],
                data1: [
                   
                     {
                        name: 'John Brown',
                        diaoyan: 18,
                        pic: 'New York ',
                       
                        Action:""
                    },
                    {
                        name: 'Jim Green',
                        diaoyan: 24,
                        pic: 'London ',
                        
                        Action:""
                    },
                    {
                        name: 'Joe Black',
                        diaoyan: 30,
                        pic: 'Sydney',
                       
                        Action:""
                    },
                   
                ],
                dataArr : [],
       
       dataValue: null,
        single: false,
        value6:"",
       activeName: 'first',
        value: '',
        xmlb: [
                    {
                        value: '家化',
                        label: '家化'
                    },
                     {
                        value: '时效',
                        label: '时效'
                    },
                    
                ],
        product:[
                    // {
                    //     value: '家化',
                    //     label: '家化'
                    // },
                    
                    
                ],  
        diaoyan:[

        ] ,      
        select:[],       
          model: '',
       cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                     {
                        value: 'New k',
                        label: 'New York2'
                    },
                    
                ],

        model1: '',
        model2: '',
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
  }
 },
  methods: {
      //产品类别选择
      changeleibie(val){
         var that = this;
            axios({
                url:"http://192.168.0.135:8080/QueryByProduct",
                params:{column1:val}
            })
            .then(function(data){            
                 var arr = data.data;
                for(var i in arr){    
                     console.log(arr[i])                  
                      var obj={value:arr[i].pid,label:arr[i].pname}
                       that.diaoyan.push(obj)                                          
                 }
                
            })
      },
      show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    // content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            remove (index) {
                // this.data6.splice(index, 1);
            },
      //全选
      handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
        },
       change(val){
          console.log(val)
          if(val=="时效"){
              this.$router.push("/base1")
          }else{
              this.$router.push("/base")
          }        
       },
     
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //头部导航
      
       toselect(){
          this.$router.push("/select")
      },
      //日期改变的函数
         handleChange(daterange) {
            this.dataValue = daterange;
            console.log(daterange)
        },

     //检测
        jiance(){
            var that = this;
            axios({ 
                url:"http://192.168.0.134:8080/queryPastHousepj",
                // params:{projectname:that.proname,projectnum:that.pronum}
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data
                 for(var i in arr){                      
                      var obj={name:arr[i].producttype,diaoyan:arr[i].projectname,pic:arr[i].projectname}
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
      
   
  },
  mounted(){
         var that = this;
      
      //产品类别下拉
         var that = this
        	
            axios({               
                url:"http://192.168.0.135:8080/QueryByTypes",                    
            })
            .then(function(data){
                console.log(data.data)       
                var arr = data.data;
                for(var i in arr){
                      var obj={value:arr[i].tid,label:arr[i].tname}
                       that.product.push(obj)
                }
               
            })
         //选择项目模板
          axios({ 
                  url:"http://192.168.0.134:8080/queryProjecttemp",
                   
                })
                .then(function(data){
                    //console.log(data.data)       
                    var arr = data.data;
            
                    for(var i in arr){
                       
                      var obj={value:arr[i].projecttemp,label:arr[i].projecttemp}
                       // console.log(obj)
                        that.select.push(obj)
                     }
                })
        //调研产品类别
         axios({ 
                  url:"http://192.168.0.134:8080/queryResearchprocag",
                   
                })
                .then(function(data){
                    console.log(data.data)       
                    var arr = data.data;
            
                    for(var i in arr){
                       
                      var obj={value:arr[i].researchprocag,label:arr[i].researchprocag}
                        console.log(obj)
                        that.diaoyan.push(obj)
                     }
                })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .shang{
        width: 100%;height: 200px;display: flex;justify-content: space-between;
        .left{width: 60%;height: 200px;background:#F5F7F9;
            .ipt{width: 100%;height: 50px;display: flex;align-items: center;justify-content: space-between;padding: 0 20px;          
            }
        }
        .right{width: 37%;height: 200px;background:#F5F7F9;
        
        .center{width: 100%;height: 170px;display:flex;justify-content: center;align-items:center;
            .center2{width: 200px;height: 150px;
               .btn{width: 100px;height: 30px;background: #39435B;float: right;border: 0;color: #fff}
            }
         }
        }
    }
    .xia{width: 100%;height: 590px;border: 1px solid red;margin-top: 10px;
       .tab{width: 100%;height: 260px;border: 1px solid blue}
       .but{width: 100%;height: 100px;display: flex;justify-content: center;flex-direction:column;align-items: center;
        .fen{width: 100%;height: 40px;display: flex;justify-content: center}
        .btncen{width: 120px;height: 30px;display: flex;justify-content: space-between;}
        }
      
    }
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 10px;}
</style>