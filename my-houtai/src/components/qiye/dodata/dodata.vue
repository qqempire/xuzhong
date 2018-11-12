<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                        <!-- 表格 -->
                          <Table border :columns="history"  align="right" :data="dataArr"></Table>    
                          <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" 
                            show-elevator  show-total placement="top" @on-change="handlePage" 
                            >
                            
                         </Page>

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
  name: 'Dodata',
  data () {
    return {
        pageTotal: 10,  //数据总数
        pageNum: 1,  //初始页
        pageSize: 3,  //每页条数
        dataArr :[],   //页面显示的数组

       history: [
                    {
                        title: '用户名',
                        key: 'uname'
                    },
                    {
                        title: '部门',
                        key: 'dname'
                    },
                    {
                        title: '职位',                        
                        key: 'pname'
                    },
                    {
                        title: '日志信息',                        
                        key: 'lmark'
                    },
                     {
                        title: 'IP',
                        key: 'lip'
                    },
                     {
                        title: '记录日期',
                        key: 'ltime'
                    },
                     {
                        title: '操作',
                        key: 'do',
                        render: (h, params) => {
                            return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'small'
                                //     },
                                //     style: {
                                //         marginRight: '5px'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.show(params.index)
                                //         }
                                //     }
                                // }, '编辑'),
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
                    },
                ],
                shuju: [
                    // {  
                    //     name: '张三',
                    //     bumen: '行政部',
                    //     position: '经理',
                    //     ip: '123456789',
                    //     date: '2016-10-03'
                    // },
                    // {  
                    //     name: '李四',
                    //     bumen: '市场部',
                    //     position: '总经理',
                    //     ip: '369258147',
                    //     date: '2016-10-03'
                    // },
                    
                ]

                
  }
 },
 methods:{
      
    // show (index) {
    //             // this.$Modal.info({
    //             //     title: 'User Info',
    //             //     content: `Name：${this.shuju[index].name}<br>Age：${this.shuju[index].bumen}<br>Address：${this.shuju[index].position}`
    //             // })
    //             console.log(this.shuju[index].name)
    //  },
   

    //分页
         handlePage(value){
           console.log(value)
           var that = this;
           axios({
                    url:"http://192.168.0.134:8080/queryByLog",
                    params:{page:value}
                })
                .then(function(data){
                     console.log(data.data)   
                      that.pageTotal = data.data.totalCount;
                    //  that.pageNum = data.data.totalCount; //初始页
                     that.pageSize = data.data.limit; //每页条数

                     var arr = data.data.list;
                       that.shuju = arr
                      console.log(arr)
                     for(var i in arr){
                       
                            that.shuju = arr
                       
                     }
                    //  var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                    //  var _end = that.pageNum * that.pageSize;
                     that.dataArr = that.shuju
                    
                })

       },
     remove (index) {
        console.log(this.shuju)
        // this.shuju.splice(index, 1);
        //   console.log(this.shuju[index])
          var lid = this.shuju[index].lid
          console.log(lid)
          var that = this;    
         axios({
                   method:"post",
                    url:"http://192.168.0.134:8080/deleteLog",
                    params:{lid:lid}
                })
                .then(function(data){
                     console.log(data.data)   
             })

    },

     
 },
 mounted(){
          var that = this;
          axios({
                    url:"http://192.168.0.134:8080/queryByLog",
                    params:{page:1}
                })
                .then(function(data){
                     console.log(data.data)   
                      that.pageTotal = data.data.totalCount;
                    //  that.pageNum = data.data.totalCount; //初始页
                     that.pageSize = data.data.limit; //每页条数

                     var arr = data.data.list;
                   
                            that.shuju = arr
                     
                    
                     that.dataArr = that.shuju
                     console.log(that.shuju)
                       
                })
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    table{text-align: center;
        td{height: 25px}
        }
    .header{background: #009DD9;color: #fff}
</style>