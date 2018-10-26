<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}" style="background:#fff;">
                <Breadcrumb :style="{margin: '16px 0'}" >
                    
                    <!-- <div class="back">返回</div> -->
                </Breadcrumb>
                <Card style="background:#F2F4F4;">
                    <div style="height: 600px">
                      <!-- 个人信息 -->
                        <div id="top">

                          <div class="title"><span>筛选条件</span></div>
                           <div class="ipt">
                                <Select v-model="model" style="width:200px" placeholder="权限组" @on-change="change">
                                    <Option v-for="item in cityList" :value="item.value"  label-in-value='true' :key="item.value">{{ item.label }}</Option>
                                </Select>
                                
                                <Button type="success" @click="search">&nbsp;&nbsp;搜索&nbsp;&nbsp;</Button>

                                <Button type="success" @click="modal1 = true">&nbsp;&nbsp;添加&nbsp;&nbsp;</Button>
                                
                                   
                                        <Modal
                                            title="添加权限"
                                            v-model="modal1"
                                            @on-ok="clickok"
                                            
                                            ok-text="保存"
                                            :styles="{top: '20px'}">
                                            <div class="addquanxian">
                                                 <!-- <Select v-model="model"  placeholder="权限组名称" class="select1">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                 </Select> -->
                                                 <Input v-model="quanname" placeholder="填写权限组名称" style="width: 300px" />

                                                 <hr/>
                                                 <!-- 分配权限 -->
                                                 <div class="fenpei"> 分配权限</div>
                                                 <div class="check">
                                                      <!-- 首页 -->
                                                    <Checkbox v-model="single1" class="tit">首页</Checkbox>
                                                    <CheckboxGroup v-model="checked" @on-change="son1" class="padding">
                                                        <Checkbox label="查看详情功能"></Checkbox>                                                      
                                                     </CheckboxGroup><hr>
                                                      <!-- 调研对象管理 -->
                                                     <Checkbox v-model="single2" class="tit">调研对象管理</Checkbox><hr>
                                                      <!-- 调研对象列表 -->
                                                    <Checkbox v-model="single3" class="tit">调研对象列表</Checkbox>
                                                    <CheckboxGroup v-model="checked" @on-change="son3" class="padding">
                                                        <Checkbox label="查看详情功能(调研)"></Checkbox> 
                                                        <Checkbox label="导入调研对象功能"></Checkbox> 
                                                        <Checkbox label="生成二维码功能"></Checkbox>                                                      
                                                    </CheckboxGroup><hr>
                                                       <!-- 更新记录 -->
                                                    <Checkbox v-model="single4" class="tit">更新记录</Checkbox>
                                                    <CheckboxGroup v-model="checked" @on-change="son4" class="padding">
                                                        <Checkbox label="查看功能"></Checkbox> 
                                                         <Checkbox label="认证功能"></Checkbox>                                                 
                                                    </CheckboxGroup><hr>
                                                       <!-- 企业管理 -->
                                                    <Checkbox v-model="single5" class="tit">更新记录</Checkbox><hr>
                                                       <!-- 员工管理 -->
                                                    <Checkbox v-model="single6" class="tit">员工管理</Checkbox>
                                                    <CheckboxGroup v-model="checked" @on-change="son6" class="padding">
                                                         <Checkbox label="添加部门"></Checkbox> 
                                                         <Checkbox label="添加职位"></Checkbox> 
                                                         <Checkbox label="添加员工"></Checkbox> 
                                                         <Checkbox label="编辑员工"></Checkbox> 
                                                         <Checkbox label="添加审查访问员"></Checkbox> 
                                                         <Checkbox label="编辑审查访问员"></Checkbox>                                                           
                                                    </CheckboxGroup><hr>

                                                    <!-- 权限管理 -->
                                                    <Checkbox v-model="single7" class="tit">权限管理</Checkbox>
                                                    <CheckboxGroup v-model="checked" @on-change="son7" class="padding">
                                                         <Checkbox label="添加权限"></Checkbox> 
                                                         <Checkbox label="编辑权限"></Checkbox>                                                                                                    
                                                    </CheckboxGroup><hr>

                                                     <!-- 操作日志 -->
                                                    <Checkbox v-model="single8" class="tit">操作日志</Checkbox>
                                                    <CheckboxGroup v-model="checked" @on-change="son8" class="padding">
                                                         <Checkbox label="删除功能"></Checkbox>                                                                                                                                                         
                                                    </CheckboxGroup><hr>

                                                     <!-- 操作日志 -->
                                                    <Checkbox v-model="single9" class="tit">可视化数据</Checkbox>
                                                    <CheckboxGroup v-model="checked" @on-change="son9" class="padding">
                                                         <Checkbox label="导出表格"></Checkbox>                                                                                                                                                         
                                                    </CheckboxGroup><hr>

                                                     <!-- <Input v-model="value5" type="textarea" placeholder="备注" class="beizhu"/> -->
                                              
                                                 </div>
                                            </div>
                                        </Modal>

                                         <Modal
                                            title="添加权限"
                                            v-model="modal2"
                                            @on-ok="clickok2"
                                            ok-text="修改"
                                            :styles="{top: '20px'}">
                                            <div class="addquanxian">
                                                 <!-- <Select v-model="model"  placeholder="权限组名称" class="select1">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                                 </Select> -->
                                                 <Input v-model="quanname2" placeholder="填写权限组名称" style="width: 300px" />

                                                 <hr/>
                                                 <!-- 分配权限 -->
                                                 <div class="fenpei"> 分配权限</div>
                                                 <div class="check">
                                                      <!-- 首页 -->
                                                    <span  class="tit">首页</span>
                                                    <CheckboxGroup v-model="checked" @on-change="son1" class="padding">
                                                        <Checkbox label="查看详情功能"></Checkbox>                                                      
                                                     </CheckboxGroup><hr>
                                                      <!-- 调研对象管理 -->
                                                     <span class="tit">调研对象管理</span><hr>
                                                      <!-- 调研对象列表 -->
                                                    <span  class="tit">调研对象列表</span>
                                                    <CheckboxGroup v-model="checked" @on-change="son3" class="padding">
                                                        <Checkbox label="查看详情功能(调研)"></Checkbox> 
                                                        <Checkbox label="导入调研对象功能"></Checkbox> 
                                                        <Checkbox label="生成二维码功能"></Checkbox>                                                      
                                                    </CheckboxGroup><hr>
                                                       <!-- 更新记录 -->
                                                    <span class="tit">更新记录</span>
                                                    <CheckboxGroup v-model="checked" @on-change="son4" class="padding">
                                                        <Checkbox label="查看功能"></Checkbox> 
                                                         <Checkbox label="认证功能"></Checkbox>                                                 
                                                    </CheckboxGroup><hr>
                                                       <!-- 企业管理 -->
                                                    <span  class="tit">更新记录</span><hr>
                                                       <!-- 员工管理 -->
                                                    <span  class="tit">员工管理</span>
                                                    <CheckboxGroup v-model="checked" @on-change="son6" class="padding">
                                                         <Checkbox label="添加部门"></Checkbox> 
                                                         <Checkbox label="添加职位"></Checkbox> 
                                                         <Checkbox label="添加员工"></Checkbox> 
                                                         <Checkbox label="编辑员工"></Checkbox> 
                                                         <Checkbox label="添加审查访问员"></Checkbox> 
                                                         <Checkbox label="编辑审查访问员"></Checkbox>                                                           
                                                    </CheckboxGroup><hr>

                                                    <!-- 权限管理 -->
                                                    <span  class="tit">权限管理</span>
                                                    <CheckboxGroup v-model="checked" @on-change="son7" class="padding">
                                                         <Checkbox label="添加权限"></Checkbox> 
                                                         <Checkbox label="编辑权限"></Checkbox>                                                                                                    
                                                    </CheckboxGroup><hr>

                                                     <!-- 操作日志 -->
                                                    <span  class="tit">操作日志</span>
                                                    <CheckboxGroup v-model="checked" @on-change="son8" class="padding">
                                                         <Checkbox label="删除功能"></Checkbox>                                                                                                                                                         
                                                    </CheckboxGroup><hr>

                                                     <!-- 操作日志 -->
                                                    <span  class="tit">可视化数据</span>
                                                    <CheckboxGroup v-model="checked" @on-change="son9" class="padding">
                                                         <Checkbox label="导出表格"></Checkbox>                                                                                                                                                         
                                                    </CheckboxGroup><hr>

                                                     <!-- <Input v-model="value5" type="textarea" placeholder="备注" class="beizhu"/> -->
                                              
                                                 </div>
                                            </div>
                                        </Modal>
                   
                                 
                           </div>

                        </div>

                        <!-- 更新报告 -->
                        <div id="update">
                             <div class="title title2"><span>状态列表</span><el-button type="info">导出表格</el-button></div>
                             
                             <!-- 表格 -->
                              
                               <el-table :data="tableData" stripe border style="width:100%" highlight-current-row>
                                　　
                                　　<el-table-column prop="jid" label="权限组编号" align="center" min-width="120">
                                　　</el-table-column>
                                　　<el-table-column prop="jname" label="权限组名称" align="center" min-width="100">
                                　　</el-table-column>
                                　　<el-table-column prop="jtype" label="包含权限" align="center" min-width="120">
                                　　</el-table-column>
                                　
                                　　<el-table-column label="操作" align="center" min-width="100">
                                　　　　<template slot-scope="scope">
                                　　　　　　<el-button type="info" @click="modifyUser(scope.row.jid,scope.row.jname,scope.row.jtype);modal2 = true" >修改</el-button>
                                　　　　</template>
                                　　</el-table-column>
                                </el-table>
                                <!-- 分页 -->
                                <Page :total="100" />
                        </div>

                         <Page :total="100" style="margin-top:10px"/>





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
  name: 'Quanxian',
   data() {
      return {
        tableData:[
           {
               jid:"1",
               jname:"对方",
               jtype:"查看详情功能,认证功能,编辑权限,导出表格",           
           },
            {
               jid:"2",
               jname:"送给对方",
               jtype:"认证功能,编辑权限",           
           },
            {
               jid:"3",
               jname:"大蛋糕",
               jtype:"编辑权限,导出表格",           
           }
        ],
        quanxianzu:[],
        jid:"",
        select:"",
        single:false,
        single1:false, 
        single2:false, 
        single3:false, 
        single4:false,       
        single5:false, 
        single6:false,
        single7:false, 
        single8:false,
        single9:false,    
        checked: [],     
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
        quanname:"", 
        quanname2:"", 
        modal1: false, 
        modal2: false,         
        model: '',
        modal9: false,
        value5: '',
       
        value: '',
        modal9: false,
        modal10: false,
        social: ['facebook', 'github'],
        fruit: ['苹果']
      }
    },
    methods:{
        shencha(){
            this.$router.push("./addshencha")
        },
        ok () {
                this.$Message.info('添加成功');
            },
        cancel () {
            this.$Message.info('取消');
        },
         son1(data){
                 console.log(data)
                if (data.length >1 || data.length===1) {                
                    this.single1 = true;
                    this.checked=data
                //   console.log(this.checked)
                } 
                else {
                    this.single1 = false;
                }
            },
          
          son3(data){
                 console.log(data)
                if (data.length >1 || data.length===1) {                
                    this.single3 = true;
                    this.checked=data
                //   console.log(this.checked)
                } 
                else {
                    this.single3 = false;
                }
            },
            son4(data){
                 console.log(data)
                if (data.length >1 || data.length===1) {                
                    this.single4 = true;
                    this.checked=data
                //   console.log(this.checked)
                } 
                else {
                    this.single4 = false;
                }
            },
           
            son6(data){
                 console.log(data)
                if (data.length >1 || data.length===1) {                
                    this.single6 = true;
                    this.checked=data
                //   console.log(this.checked)
                } 
                else {
                    this.single6 = false;
                }
            },
           son7(data){
                 console.log(data)
                if (data.length >1 || data.length===1) {                
                    this.single7 = true;
                    this.checked=data
                //   console.log(this.checked)
                } 
                else {
                    this.single7 = false;
                }
            },
           son8(data){
                 console.log(data)
                if (data.length >1 || data.length===1) {                
                    this.single8 = true;
                    this.checked=data
                //   console.log(this.checked)
                } 
                else {
                    this.single8 = false;
                }
            },
            son9(data){
                 console.log(data)
                if (data.length >1 || data.length===1) {                
                    this.single9 = true;
                    this.checked=data
                //   console.log(this.checked)
                } 
                else {
                    this.single9 = false;
                }
            },
            // 权限组选中值
            change(val){
                 console.log(val)
                 //把选中的值放到全局变量上select
                 //this.select = val
            },
            //搜索
            search(){
                     
            },
            //添加权限组
            clickok(){
               
                var checkedarr = this.checked;
                var str = checkedarr.toString(); 
                var jname = this.quanname;
                console.log(str,jname)
                
                axios({
                    method: 'post',
                    url:"http://192.168.0.135:8080/addJuisdiction",
                    params:{jtype:str,jname:jname}
                })
                .then(function(data){
                     console.log(data.data)     
                    if(data.data.msg=="添加成功"){
                        alert("添加成功")
                        // window.location.reload()
                    }
                       
                })
            },
            
           //点击修改按钮获取对应行
            modifyUser(val,aaa,bbb){
                var arr = bbb.split(",")
                this.checked = arr;
                this.jid = val;
                this.quanname2 = aaa

                console.log(val,aaa,bbb)

            },
             //修改用户
             clickok2(){
               
                var checkedarr = this.checked;
                var str = checkedarr.toString(); 
                var jname = this.quanname2;
                console.log(jname)
                console.log(str,jname)
                var that = this;
                  axios({
                        method: 'post',
                        url:"http://192.168.0.135:8080/updateJuisdiction",
                        params:{jid:that.jid,jtype:str,jname:jname}
                    })
                    .then(function(data){
                        console.log(data.data)     
                        // window.location.reload()
                    })
            },
           
                        
            
    },
    // created(){
    //      var that = this
    //      axios({
                   
    //             url:"http://192.168.0.135:8080/selectJuisdiction",
                   
    //             })
    //             .then(function(data){
    //                  var arr = that.tableData.concat(data.data)
    //                  that.tableData=arr
    //             })
    // },
                    // {
                    //     value: 'New York',
                    //     label: 'New York'
                    // },
    mounted(){
          var that = this
         axios({
                   
                url:"http://192.168.0.135:8080/selectJuisdiction",
                   
                })
                .then(function(data){
                    //  console.log(data.data)                      
                    //  console.log(that.tableData)
                     var arr = that.tableData.concat(data.data);
                     that.tableData=arr;
                     var obj = {}
                     for(var i in arr){
                         obj.value=arr[i].jid
                         obj.label=arr[i].jname
                         that.cityList.push(obj)
                         console.log(that.quanxianzu)
                     }
                     
                })
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .back{width:80px;height:30px;background:#39435B;color: #fff;text-align: center;line-height: 30px;border-radius: 5px}
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding:0 0 0 10px;display: flex;justify-content: space-between;}
    .title2{margin-bottom: 10px; }
    .ipt{width: 400px;height: 60px;display: flex;justify-content: space-around;align-items: center}

     #top{height: 100px;width: 100%;background:#fff;box-shadow: 0 1px 1px rgba(0,0,0,.1);border-radius:5px;overflow: hidden;
        
        p{
          width: 100%;height: 40px;line-height: 40px;font-weight: bold;padding-left: 10px
        }
     }
     #update{
        width: 100%;height: 440px;background:#fff;box-shadow: 0 1px 1px rgba(0,0,0,.1);margin-top: 8px;border-radius: 5px;overflow: hidden;
       
     }
table{text-align: center;
   td{height: 25px}
  }
.header{background: #1D95C9;color: #fff}

.yuangong{
    width: 100%;height: 330px;display: flex;justify-content: space-between;
    .addyuan{
    width: 49%;height: 330px;border: 1px dotted red;background:#FFFCED;padding-left: 15px
    }
}
.tit1{font-size: 14px;font-weight: bold}


.addquanxian{
    width: 100%;height: 550px;
}
.select1{width: 300px;margin-bottom: 5px}
.fenpei{width: 100%;height: 30px;line-height: 30px;font-weight: bold}
.tit{color: #2D8CF0;font-weight: bold}
hr{background-color:#E2E1E1;height:1px;border:none;margin:6px 0}
.padding{padding-left: 40px}
</style>
