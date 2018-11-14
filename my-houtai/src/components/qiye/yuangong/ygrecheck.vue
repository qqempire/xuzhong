<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}" style="background:#fff;">
                <Breadcrumb :style="{margin: '16px 0'}" >
                    <router-link to="/yuangong" tag="span">
                       <el-button type="info" size="small">返回</el-button>
                    </router-link>
                    
                </Breadcrumb>
                <Card style="background:#F2F4F4;">
                    <div style="height: 600px">
                      <!-- 个人信息 -->
                        <div id="top">

                          <div class="title"><span>筛选条件</span></div>
                           <div class="ipt">
                               <Input v-model="searchipt" placeholder="请输入查询内容" style="width: 300px" />
                                <Button type="success" @click="search">搜索</Button>                       
                                <Button type="success" @click="addvisiter">添加访问员</Button>                                 
                           </div>

                        </div>

                        <!-- 更新报告 -->
                        <div id="update">
                             <div class="title title2"><span>状态列表</span><el-button type="info" size="small">导出表格</el-button></div>
                            
                             <!-- 表格 -->
                             <Table border :columns="columns1" :data="data1"></Table>

                            


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
  name: 'ygrecheck',
   data() {
      return {
          searchipt:"",
          aaa:"mid",
          tablebianji:false,
          columns1: [
                    {
                        title: '员工编号',
                        key: 'id'
                    },
                    {
                        title: '员工姓名',
                        key: 'name'
                    },
                     {
                        title: '性别',
                        key: 'sex'
                    },
                    {
                        title: '账户',
                        key: 'root'
                    },
                     

                    {
                        title: '手机号',
                        key: 'iphone'
                    },
                    
                    {
                        title: '编辑',
                        key: 'ydo',
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
                                }, '编辑'),
                               
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        id: '001',
                        name: '张三',
                        sex:"男",  
                        root:"6668888",
                        iphone: '1288856',                  
                    },
                     {
                        id: '001',
                        name: '张三',
                        sex:"男",  
                        root:"6668888",
                        iphone: '1288856',   
                                      
                    },                   
                ],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        input: '',
        
        quanxian:[],
       
         obj :{},
        intime:"",
        outtime:"",
        email:"",
        yname:"",
        ysex:"",
        yage:"",
        yxueli:"",
        yphone:"",
        yzhang:"",
        ymima:"",
        
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
               
              
               
                 model2: '',
                  model3: '',
                  addvalue1:"",
                   addvalue2:"",
                    addvalue3:"",
                     addvalue4:"",
             
               
                modal13: false,
                value: ''
      }
    },
    methods:{
        show (index) {
                // this.$Modal.info({
                //     title: 'User Info',
                //     content: `Name：${this.data1[index].name}<br>Age：${this.data1[index].id}<br>Address：${this.data1[index].sex}`
                // })
                var id = this.data1[index].id;
                var root = this.data1[index].root;
                var password = this.data1[index].password;
                var iphone  = this.data1[index].iphone;
                var name = this.data1[index].name;
                var sex = this.data1[index].sex;
                console.log(root,password,iphone,name,sex)
                
             this.$router.push({
                name: 'Addrecheck',
                params: {
                    id: {id:id,root:root,password:password,iphone:iphone,name:name,sex:sex}
                }
             })
                // console.log(index)
         },
        instance (type) {
                const title = '注意';
                const content = '<p>输入框值不能为空</p>';
                switch (type) {
                   
                   case 'info':
                        this.$Modal.info({
                            title: title,
                            content: "<p>部门/职位/账户名称不能重复</p>"
                        });
                        break;
                    case 'success':
                        this.$Modal.success({
                            title: "ok",
                            content: '<p>添加成功</p>'
                        });
                        break;
                    case 'warning':
                        this.$Modal.warning({
                            title: title,
                            content: content
                        });
                        break;
                    case 'error':
                        this.$Modal.error({
                            title: title,
                            content: content
                        });
                        break;
                }
            },
            youxiangerr (type) {
                const title = '注意';
                const content = '<p>邮箱格式错误</p>';
                switch (type) {
                   
                    case 'error':
                        this.$Modal.error({
                            title: title,
                            content: content
                        });
                        break;
                }
            },
    
        //搜索
        search(){
            var that = this;
            console.log(that.searchipt)
            axios({        
                url:"http://192.168.0.134:8080/queryByReviewInterviewName",
                params:{root:that.searchipt}
            })
            .then(function(data){
                console.log(data.data)
                var arr = data.data;
                for(var i in arr){
                    var obj = {
                        id: arr[i].id,
                        name: arr[i].name,
                        sex: arr[i].sex,  
                        root: arr[i].root,
                        iphone: arr[i].iphone, 
                    }
                    that.data1.push(obj)
                }
                
            });
        },
        addvisiter(){
            this.$router.push("/addshen")
        }
    },
    mounted(){
         var that = this;
            //权限类型
             axios({         
            url:"http://192.168.0.134:8080/selectJuisdiction",        
            })
            .then(function(data){
                console.log(data.data)
                var arr = data.data
                for(var i in arr){
                    var obj={value:arr[i].jid,label:arr[i].jname}
                    that.quanxian.push(obj)
                }
            });

            //按钮权限判断         
            function ifquan(biaoqian){
                var text = $.trim(biaoqian.text());
                 console.log(text)                             
                var str =  localStorage.getItem('Jurisdiction')
                var arr = str.split(',');
                var num = $.inArray(text, arr);  //返回 -1则不存在               
                console.log(num)
                if(num==-1){
                    biaoqian.css({'display':'none'})
                }else{
                    biaoqian.css({'display':'block'})
                }
              
             }
             
             ifquan($(".addbtn"))
             ifquan($(".bjbtn"))


    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .back{width:80px;height:30px;background:#39435B;color: #fff;text-align: center;line-height: 30px;border-radius: 5px}
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 0 0 10px;display: flex;justify-content: space-between;}
    .title2{margin-bottom: 10px; }
    .ipt{width: 100%;height: 60px;display: flex;justify-content: space-around;align-items: center}

     #top{height: 100px;width: 100%;background:#fff;box-shadow: 0 1px 1px rgba(0,0,0,.1);border-radius:5px;overflow: hidden;
        
        p{
          width: 100%;height: 30px;line-height: 30px;font-weight: bold;padding-left: 10px
        }
     }
     #update{
        width: 100%;height: 500px;background:#fff;box-shadow: 0 1px 1px rgba(0,0,0,.1);margin-top: 8px;border-radius: 5px;overflow: hidden;border: 1px solid red
       
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
// .bumenbtn{display: block}

</style>
