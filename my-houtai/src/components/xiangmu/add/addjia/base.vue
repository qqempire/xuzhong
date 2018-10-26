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
                                               <Select v-model="model" style="width:200px" placeholder="权限组" @on-change="change">
                                                    <Option v-for="item in xmlb" :value="item.value"  label-in-value='true' :key="item.value">{{ item.label }}</Option>
                                                </Select>
                                               <Select v-model="model2" style="width:180px" placeholder="产品类别">
                                                    <Option v-for="item in product" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                               </Select>
                                          </div>
                                          <div class="ipt">
                                              <Input v-model="value" placeholder="项目名称" style="width: 180px" />
                                              <Input v-model="value" placeholder="项目编号" style="width: 180px" />
                                          </div>
                                          <div class="ipt ipt1">
                                              <Col span="12" style="width: 120px" class="datawrop">
                                                <DatePicker type="date" placeholder="调查日期" ></DatePicker>
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
                                                  <Input v-model="value" placeholder="项目名称" style="width: 200px" />
                                                   <Input v-model="value" placeholder="项目编号" style="width: 200px;margin:10px 0" />
                                                   <Button class="btn" size="small">检测</Button>
                                              </div>
                                              
                                          </div>
                                          
                                      </div>
                                  </div>
                                  <div class="xia">
                                       <div class="title"><span>以往项目信息</span></div>
                                       <div class="tab">
                                              表格
                                       </div>
                                       <div class="but">
                                           <div class="fen">
                                               <el-pagination
                                                    background
                                                    layout="prev, pager, next"
                                                    :total="100">
                                                </el-pagination>
                                           </div>
                                           <div class="btncen">
                                               <Button type="error" size="small"> 取 消 </Button>
                                               
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
    //    tobmess(){
    //       this.$router.push("/mess")
    //   },
    //    tosuanfa(){
    //       this.$router.push("/suanfa")
    //   }
  },
  mounted(){
         var that = this;
       
      //产品类别下拉
          axios({ 
                  url:"http://192.168.0.134:8080/queryproducttype",
                   
                })
                .then(function(data){
                    //console.log(data.data)       
                    var arr = data.data;
                    
                   

                    for(var i in arr){
                        //  obj.value=arr[i].producttype
                        //  obj.label=arr[i].producttype
                         
                      var obj={value:arr[i].producttype,label:arr[i].producttype}
                       // console.log(obj)
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
    .xia{width: 100%;height: 390px;border: 1px solid red;margin-top: 10px;
       .tab{width: 100%;height: 260px;border: 1px solid blue}
       .but{width: 100%;height: 100px;display: flex;justify-content: center;flex-direction:column;align-items: center;
        .fen{width: 100%;height: 40px;display: flex;justify-content: center}
        .btncen{width: 120px;height: 30px;display: flex;justify-content: space-between;}
        }
      
    }
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 10px;}
</style>