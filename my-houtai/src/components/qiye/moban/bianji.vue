<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}">
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="info" size="small" @click="backtomoban">&nbsp;&nbsp;返回&nbsp;&nbsp;</el-button>
                    <!-- <Button type="success" @click="newadd" size="small">保存新增</Button> -->
                    <el-button type="success" size="small" @click="btn">&nbsp;&nbsp;保存&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                          <div class="aaa">
                            <!-- 左边 -->
                             <div class="bbb">
                               <div class="tit">配置模板信息</div>
                               <div class="sou">
                                  <Input v-model="mname" placeholder="请输入模板名称" /> 
                                  <Select v-model="jiashi1" style="width:400px;margin-left:60px" placeholder="请选择项目类型" @on-change="jiashi">
                                        <Option v-for="item in productlei" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                               </div>
                               <el-input
                                  type="textarea"
                                  :autosize="{ minRows: 6, maxRows: 20}"
                                  placeholder="备注信息"
                                  v-model="beizhu">
                                </el-input>
                            
                             </div>
                             <!-- 右边 -->
                             <div class="bbb">
                               <div class="tit">app功能</div>
                               <div class="content">
                                  
                                  <CheckboxGroup  v-model="checked" @on-change="son">
                                     
                                      <Checkbox label="APP扫描"></Checkbox>
                                      <Checkbox label="扫描后填写价格"></Checkbox><br>
                                      <Checkbox label="app录音"></Checkbox>
                                      &nbsp;<Checkbox label="开始任务自动录音"></Checkbox>
                                      <Checkbox label="APP摄像"></Checkbox>
                                      
                                      <Checkbox label="拍照后手动定位自定义记录位置(实效)"></Checkbox>
                                      <Checkbox label="APP拍照"></Checkbox>
                                      
                                  </CheckboxGroup>

                                  <Select v-model="model2" size="small" style="width:150px;margin-top:15px" placeholder="请选择图片类型">
                                      <Option v-for="item in pictype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                  </Select>
                               </div>
                             
                             </div>
                          </div>
                          <div class="table">
                               <div class="other"><span>app其他功能</span> <Button type="success" @click="addtr" size="small">添加表格</Button></div>
                               
                               
                                <!-- 表格 -->
                            <!-- <Table border ref="selection" :columns="columns4" :data="data1"></Table>
                            <Button @click="handleSelectAll(true)">Set all selected</Button>
                            <Button @click="handleSelectAll(false)">Cancel all selected</Button> -->
              
                             <table  border="1" width="100%" cellpadding='0' cellspacing='0' id="tables" >
                                 
                                  <tr class="header">
                                      <td>选择</td>
                                      
                                      <td>显示名称</td>
                                      <td>选择题</td>
                                      <td>填空题</td>
                                      <td>选择值</td>
                                      <td>未选择值</td>
                                      
                                  </tr>
                                
                                     <tr v-for="(item,index) in lists" :key="index">
                                        <td style="width:5%"><input type="checkbox" :value='item.lid'/> {{item.lid}}</td>                                     
                                        <td style="width:30%"><input type="text" style="width:100%" v-model="item.name"></td>
                                        <td style="width:5%"><input type="radio" :name="item.lid" value="1" v-model="item.xuan" class="radiocheck"/></td>
                                        <td style="width:5%"><input type="radio" :name="item.lid" value="2" v-model="item.tian" class="radiocheck"/></td>
                                        <td style="width:10%"><input type="text" style="width:30%" v-model="item.select"></td>
                                        <td style="width:10%"><input type="text" style="width:30%" v-model="item.noval"></td>                                    
                                     </tr>
                                           
                              </table>
                            

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
        lists:[
             {
           lid:1, name:"",select:"",noval:"",xuan:"",tian:""                 
          },
           {
           lid:2, name:"",select:"",noval:"",xuan:"",tian:""                 
          },
          {
           lid:3, name:"",select:"",noval:"",xuan:"",tian:""                 
          },
           {
           lid:4, name:"",select:"",noval:"",xuan:"",tian:""                 
          },
           {
           lid:5, name:"",select:"",noval:"",xuan:"",tian:""                 
          },
          {
           lid:6, name:"",select:"",noval:"",xuan:"",tian:""                 
          },       
           {
           lid:7, name:"",select:"",noval:"",xuan:"",tian:""                 
          },
           {
           lid:8, name:"",select:"",noval:"",xuan:"",tian:""                 
          },
           {
           lid:9, name:"",select:"",noval:"",xuan:"",tian:""                 
          },
           {
           lid:10, name:"",select:"",noval:"",xuan:"",tian:""                 
          },
          
        ],
        animal: '',
        dan:false,
        
         mname:"",
         jiashi1:"",
         beizhu:"",
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
       input10: '',
       single: false,
       single1: false,
       single2: false,
       single3: false,
       pictype: [
                    {
                        value: '1',
                        label: '门头照'
                    },
                    {
                        value: '2',
                        label: '问题照片'
                    },
                    {
                        value: 'New York',
                        label: '货架'
                    },
                   
                ],
                model2: '',
                model3: '',
                model4: '',      

         model1: '',
         textarea2: '',
         value2:""      ,
          social: ['facebook', 'github'],
          checked: []  ,
          j:7,
    }
  },
  methods:{
       jiashi(val){
          
           this.jiashi1=val
           console.log(this.jiashi1)
       },
       handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
       },
       
      addtr(){
        //  var i = this.j++
           
        //   var str = `<tr>
        //                 <td style="width:5%"><input type="checkbox" :value='item.lid'/> ${i}</td>                                     
        //                 <td style="width:30%"><input type="text" style="width:100%" v-model="item.name"></td>
        //                 <td style="width:5%"><input type="radio" :name="item.lid" value="1" v-model="item.xuan" class="radiocheck"/></td>
        //                 <td style="width:5%"><input type="radio" :name="item.lid" value="2" v-model="item.tian" class="radiocheck"/></td>
        //                 <td style="width:10%"><input type="text" style="width:30%" v-model="item.select"></td>
        //                 <td style="width:10%"><input type="text" style="width:30%" v-model="item.noval"></td>        
        //             </tr>`
        //   $("#tables").append(str);
      },
    //   新增
    //  newadd(){
        
    //  },
      //保存
      btn(){
        
          var arr = this.lists;
      
          var newarr = [];
          for(var i in arr){ 
                 var aa=arr[i].xuan
                 var bb=arr[i].tian
                 var cc;             
                cc= aa==""?bb:aa
                 console.log(cc)
              var obj = {
                  apname:arr[i].name,
                  aptype:cc,
                  optiona:arr[i].select,
                  optionb:arr[i].noval
              }
              newarr.push(obj)         
          }

           console.log(newarr)
           var pname = this.mname
           var sele = this.jiashi1
           var bz = this.beizhu
           var ck = this.checked.toString()
        //    console.log(pname,sele,bz,ck)

        var that = this;
            //  var aaaaa={
            //     apptemplate:{atname:pname,attype:sele,atmark:bz},
            //     appfunction:{atmark:ck},
            //     plist:newarr
            //     } 
                
             //console.log(aaaaa)
        axios({         
            url:"http://192.168.0.134:8080/SavaAppFunction",
            params:{
                apptemplate:{atname:pname,attype:sele,atmark:bz},
                appfunction:{atmark:ck},
                plist:newarr
                }       
            })
            .then(function(data){
                console.log(data.data)
                // var arr = data.data
                // that.positionzhi=[]
                // for(var i in arr){                  
                //     that.obj={value:arr[i].pid,label:arr[i].pname}
                //     that.positionzhi.push(that.obj)
                   
                // }
            });

      },

























    // 集合
      son(data){
            // console.log(data)
            if (data.length >1 || data.length===1) {                
                // this.single3 = true;
                this.checked=data
              console.log(this.checked)
            } 
            else {
                // this.single3 = false;
            }
      },
      backtomoban(){
          this.$router.push("./moban")
      },
      
       //jiashi1,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    // .radio{display:flex;align-items:center;justify-content:center;
    //     input{width:15px;height:15px;}
    //  }
    .aaa{
      width: 100%;height: 300px;display:flex;justify-content:space-between;
      .bbb{
        width: 49%;height: 260px;background: #F5F7F9;
        .tit{
           width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box
        }
      }

    }

 .sou{width: 100%;height: 36px;display: flex;justify-content: space-around;margin: 15px 0;}
 .content{width: 360px;height: 200px;margin-top: 15px;padding: 20px}

.table{width: 100%;height:320px;margin-top:-10px;border:1px solid red;overflow: auto;
    .other{width: 100%;height:30px;background: #5BC0DE;line-height: 30px;color: #fff;padding-left: 10px;box-sizing: border-box;margin-bottom: 5px;display: flex;justify-content: space-between;padding: 0 10px;
          p{background: gray;padding: 0 20px;cursor: pointer;border-radius: 10px}
    }
}
 table{text-align: center;border:1px solid #D2D4D5;margin-top:5px;margin:5px 0 0 0;padding:0;
   td{height: 25px}
  }
.header{background: #1D95C9;color: #fff}
</style>
