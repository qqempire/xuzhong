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

                          <div class="title"><span>个人信息</span></div>
                           <p>所属部门： <span class="bm"></span> </p> 
                           <p>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：  <span class="zw"></span></p>
                           <p>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：  <span class="mc"></span></p>
                           <!-- <p>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{this.$store.state.count}}</p>
                           <p>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：{{this.$store.state.name}}</p> -->

                          <!-- <input type="text" v-model="user">
                          <button @click="login1()">看看</button>
                          <button @click="add()">jia</button> -->
                        </div>

                        <!-- 更新报告 -->
                        <div id="update">
                             <div class="title"><span>状态列表</span></div>
                             <div class="data"> 
                                <p>
                                    <Row>
                                        <Col span="8">
                                            <DatePicker type="date" placeholder="开始统计日期" style="width: 120px;" @on-change="changedate"></DatePicker>
                                        </Col>
                                        
                                    </Row>
                                    &nbsp;—&nbsp;
                                    <Row>
                                        <Col span="8" style="margin-right:50px">
                                            <DatePicker type="date" placeholder="结束统计日期" style="width: 120px" @on-change="changedate2"></DatePicker>
                                        </Col>
                                        
                                    </Row>
                                    <Input v-model="proname" placeholder="请选择项目名称" style="width: 150px" />&nbsp;&nbsp;
                                
                                    <Input v-model="pronum" placeholder="请输入调研编号" style="width: 150px" /> 
                                    <Button type="success" @click="search" size="default" style="margin-left:5px">搜索</Button>
                                </p>
                               
                               
                             </div>
             
                           
                              <Table border :columns="tabval" :data="dataArr"></Table>
                               <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" 
                                    show-elevator  show-total placement="top" @on-change="handlePage" style="margin:8px"></Page>

                        </div>

                        



                    </div>
                </Card>
            </Content>
        </Layout>

  
     
    
  </div> 
</template>

<script>
  import {mapGetters,mapActions} from "vuex"
  import $ from "jquery"
  import axios from "axios"
	
export default {

  name: 'Home',
   data() {
      return {
         pronum:"",
         proname:"",
        startdate:"",
        enddate:"",   

        pageTotal: 10,  //数据总数
        pageNum: 1,  //初始页
        pageSize: 3,  //每页条数
        dataArr :[],   //页面显示的数组

                parindex: false,
                checkany: false,
                quanxuan: [],
                tabval: [
                    {
                        title: '项目名称',
                        key: 'projectname'
                    },
                    {
                        title: '调研对象',
                        key: 'researchobject'
                    },
                    {
                        title: '调研编号',
                        key: 'researchnum'
                    },
                    {
                        title: '详细地址',
                        key: 'address'
                    },
                    {
                        title: '访问员',
                        key: 'name'
                    },
                    {
                        title: '上传时间',
                        key: 'uploadtime'
                    },
                    {
                        title: '认证员',
                        key: 'uname'
                    },
                    {
                        title: '确认时间',
                        key: 'confirmtime'
                    },
                    {
                        title: '查看详情',
                        key: 'pro9',
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
                    },
                ],
                dataa: [
                   
                ],
        user:"",
        options: [
            {
                value: '选项1',
                label: '黄金糕'
            }, 
        // {
        //   value: '选项2',
        //   label: '双皮奶'
        // }, {
        //   value: '选项3',
        //   label: '蚵仔煎'
        // }, {
        //   value: '选项4',
        //   label: '龙须面'
        // }, {
        //   value: '选项5',
        //   label: '北京烤鸭'
        // }
        ],
        value: '',
        input: ''
      }
    },

     computed:mapGetters([]),

      methods:{
          //转换时间格式
             parserDate(date) {  
                    var t = Date.parse(date);  
                    if (!isNaN(t)) {  
                        return new Date(Date.parse(date.replace(/-/g, "/")));  
                    } else {  
                        return new Date();  
                    }  
              },          
                // ...mapActions(["login","add","jian","username"]), //mapActions（[]）为store里的函数名

                show(index) {
                        // this.$Modal.info({
                        //     title: 'User Info',
                        //     content: `Name：${this.dataa[index].pid}<br>`
                        // })
                    // this.$router.push({
                    //     name: 'homeDetail',
                    //     // params: {
                    //     //     // id: {id:this.dataa[index].pid}
                    //     //     id: "0000000"
                    //     // }

                    // })
                          this.$router.push({
                            name: 'homeDetail',
                            params: {
                             id: '000'
                            }
                         })

                },
                login1(){
                    this.login(this.user) //把this.user传参到store里的login
                },
                changedate(time){
                    console.log(time)
                   this.startdate=time;
                 
                },
                changedate2(time){
                    console.log(time)
                    this.enddate = time
                },
                //  ''''''''''''''''''''''''''''''''''''''''''''''''''''''
                //分页
                 handlePage(value){
                    var that = this;
                     console.log(that.proname,that.pronum)
                        axios({
                            url:"http://192.168.0.135:8080/queryByDetailsAll",
                            params:{
                                startime:that.startdate,
                                endtime:that.enddate,
                                projectname:that.proname,
                                researchnum:that.pronum,
                                page:value
                            }
                        })
                        .then(function(data){
                            console.log(data.data) 
                              that.dataa=[]
                             that.pageTotal = data.data.totalCount;
                             that.pageNum =data.data.page;
                             that.pageSize = data.data.limit;

                            var arr = data.data.list
                            for(var i in arr){
                                var obj = {
                                    pid:arr[i].pid,
                                    address:arr[i].address,
                                    confirmtime:arr[i].confirmtime,
                                    name:arr[i].name,
                                    projectname:arr[i].projectname,
                                    researchnum:arr[i].researchnum,
                                    researchobject:arr[i].researchobject,
                                    uname:arr[i].uname,
                                    uploadtime:arr[i].uploadtime
                                }
                               that.dataa.push(obj) 
                            }
                            that.dataArr = that.dataa;
                           
                        })
                },
                search(){
                     var that = this;
                     console.log(that.proname,that.pronum)
                    //    if()
                        axios({
                            url:"http://192.168.0.135:8080/queryByDetailsAll",
                            params:{
                                startime:that.startdate,
                                endtime:that.enddate,
                                projectname:that.proname,
                                researchnum:that.pronum,
                                page:that.pageNum
                            }
                        })
                        .then(function(data){
                            console.log(data.data) 
                                that.dataa=[]
                            that.pageTotal = data.data.totalCount;
                            that.pageNum =data.data.page;
                            that.pageSize = data.data.limit;
                            console.log( that.pageTotal)
                            var arr = data.data.list
                            for(var i in arr){
                                var obj = {
                                    pid:arr[i].pid,
                                    address:arr[i].address,
                                    confirmtime:arr[i].confirmtime,
                                    name:arr[i].name,
                                    projectname:arr[i].projectname,
                                    researchnum:arr[i].researchnum,
                                    researchobject:arr[i].researchobject,
                                    uname:arr[i].uname,
                                    uploadtime:arr[i].uploadtime
                                }
                               that.dataa.push(obj) 
                            }
                           
                            var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                            var _end = that.pageNum * that.pageSize;
                            that.dataArr = that.dataa.slice(_start,_end);

                        })
                }
        
        },
      
     mounted(){
       const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, .9)'
        });
       loading.close();

       $(".bm").text("【"+localStorage.getItem('dname')+"】")
       $(".zw").text("【"+localStorage.getItem('job')+"】")
       $(".mc").text("【"+localStorage.getItem('username')+"】")
     } 

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .back{width:80px;height:30px;background:#39435B;color: #fff;text-align: center;line-height: 30px;border-radius: 5px}
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 10px;display:flex;justify-content: space-between;align-items:center;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    }


     #top{height: 130px;width: 100%;background:#fff;box-shadow: 0 1px 1px rgba(0,0,0,.1);border-radius:5px;overflow: hidden;
        
        p{
          width: 100%;height: 30px;line-height: 30px;font-weight: bold;padding-left: 10px
        }
     }
     #update{
        width: 100%;height: 465px;background:#fff;box-shadow: 0 1px 1px rgba(0,0,0,.1);margin-top: 8px;border-radius: 5px;overflow: auto;
        .data{width: 100%;height: 40px;display: flex;justify-content:space-between;margin:10px 0;
             p{height: 40px}
             p:nth-child(1){
                width: 730px;display: flex;align-items: center;font-weight:bold;
                input{border-radius: 4px;width: 130px;height: 30px;}
             }
            //  p:nth-child(2){
            //     width: 330px;display: flex;align-items: center;font-weight:bold;
            //     select{border-radius: 4px;width: 150px;height: 30px}
            //  }
            //  p:nth-child(3){
            //     width: 430px;display: flex;align-items: center;font-weight:bold;margin-left:10px;
            //     input{border-radius: 4px;width: 150px;height: 30px}
            //     .search{display: block;width: 100px;height: 36px;background: #5BB85D;color: #fff;text-align: center;line-height: 36px;border-radius: 5px;margin-left: 10px;cursor: pointer}
            //  }
         }
     }
table{text-align: center;
   td{height: 25px}
  }
.header{background: #1D95C9;color: #fff}


</style>
