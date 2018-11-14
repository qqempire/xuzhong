<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="info" size="small" @click="tohome">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>

                    <!-- <el-button type="text" @click="centerDialogVisible = true">点击打开</el-button> -->

                    <el-dialog
                        :visible.sync="centerDialogVisible"
                        width="65%"
                        center>
                        <div style="" class="modelwrop">
                            <div style="border:1px solid red;width:65%;height:350px ">
                                <img style="width:100%;height:100%" src="../../../assets/aaa.jpg">
                            </div>
                            <div style="" class="you">
                                <div>类型：<span>{{type}}</span></div>
                                <div>归类：<span>{{classify}}</span></div>
                                <div>经度：<span>{{longitude}}</span></div>
                                <div>维度：<span>{{latitude}}</span></div>
                                <div>拍摄时间：<span>{{shoottime}}</span></div>
                                <div>地点备注：<span>{{placenotes}}</span></div>
                                <div>问题备注：<span>{{questionnotes}}</span></div>

                              
                                    <el-button type="success" @click="tohomeposition" class="dposition" size="small">点定位</el-button>
                               
                            </div>

                        </div>
                        
                   </el-dialog>
                    <!-- <Button type="info">Primary</Button> -->
                </Breadcrumb>
                <Card >
                    <div style="height: 600px;" class="wrop">
                        <div class="left">
                             <div class="tit">修改资料</div>
                             <div class="xia">
                                 <div class="row" v-for="(item,i) in dataArr" :key="i"> 
                                     <div class="picwwrop" >
                                         <p class="pic" style="cursor:pointer" @click="imgclickold(i)"><img src="../../../assets/aaa.jpg"></p>
                                         <div class="zi" >
                                             <p>类型：{{item.laoobject.type}}</p>
                                             <p>归类：{{item.laoobject.classify}}</p>
                                             <p>经纬：{{item.laoobject.longitude}},{{item.laoobject.latitude}}</p>
                                             <p>拍照时间：{{item.laoobject.latitude}}</p>
                                             <p>问题类型：{{item.laoobject.problemtypes}}</p>
                                             <p>地点备注：{{item.laoobject.placenotes}}</p>
                                             <p>问题备注：{{item.laoobject.questionnotes}}</p>
                                             <Button type="success" size="small" style="margin-left:5px" @click="dingweiold(i)">{{ifding}}</Button>
                                         </div>
                                     </div>
                                     <div class="picwwrop" >
                                         <p class="pic" style="cursor:pointer" @click="imgclicknew(i)"><img src="../../../assets/aaa.jpg"></p>
                                         <div class="zi">
                                             <p>类型：{{item.xingobject.type}}</p>
                                             <p>归类：{{item.xingobject.classify}}</p>
                                             <p>经纬：{{item.xingobject.longitude}},{{item.laoobject.latitude}}</p>
                                             <p>拍照时间：{{item.xingobject.latitude}}</p>
                                             <p>问题类型：{{item.xingobject.problemtypes}}</p>
                                             <p>地点备注：{{item.xingobject.placenotes}}</p>
                                             <p>问题备注：{{item.xingobject.questionnotes}}</p>
                                             <Button type="success" size="small" style="margin-left:5px" @click="dingweinew(i)">点定位</Button>
                                         </div>
                                     </div>
                                 </div>

                                 <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" 
                                    show-elevator  show-total placement="top" @on-change="handlePage" 
                                 ></Page>

                                
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
  name: 'homeDetail',
  data () {
    return {
        ifding:"点定位",
        pageTotal: 10,  //数据总数
        pageNum: 1,  //初始页
        pageSize: 3,  //每页条数
        dataArr :[],   //页面显示的数组

       centerDialogVisible: false,
       pppid:"",
       rowdatelao:[ ],
       rowdatexin:[ ],
       shudata:[],
       pic :"",
       type:"",
       longitude:"",
       latitude:"",
       shoottime:"",
       questionnotes:"",
       placenotes:"",
       classify:"",
  }
 },
  methods: {
      tohome(){
           this.$router.push("/home")     
      },
      tohomeposition(){
          this.centerDialogVisible = false;
          this.$router.push({
                name: 'homemap',
                params: {
                  id: {jing:this.longitude,wei:this.latitude}
                }
          })
      },
      open(val){
         console.log(val)
      },
      //定位
      dingweiold(i){
         console.log(i)
        var longitude = this.shudata[i].laoobject.longitude //经
        var latitude = this.shudata[i].laoobject.latitude //纬
        
        this.$router.push({
                name: 'homemap',
                params: {
                  id: {jing:longitude,wei:latitude}
                }
          })
      },
      dingweinew(i){
         console.log(i)
         var longitude = this.shudata[i].laoobject.longitude //经
         var latitude = this.shudata[i].laoobject.latitude //纬
       
        this.$router.push({
                name: 'homemap',
                params: {
                  id: {jing:longitude,wei:latitude}
                }
          })
      },
      //图片
      imgclickold(i){
        // console.log(i)
        this.centerDialogVisible = true;
        var photo = this.shudata[i].laoobject.photo //图片
        var type = this.shudata[i].laoobject.type //归类
        var longitude = this.shudata[i].laoobject.longitude //经
        var latitude = this.shudata[i].laoobject.latitude //纬
        var shoottime = this.shudata[i].laoobject.shoottime //拍摄时间
        var questionnotes = this.shudata[i].laoobject.questionnotes //问题备注
        var placenotes = this.shudata[i].laoobject.placenotes  //地点备注
        var classify = this.shudata[i].laoobject.classify  //地点备注


        this.pic = photo
        this.type = type
        this.longitude = longitude
        this.latitude = latitude
        this.shoottime = shoottime
        this.questionnotes = questionnotes
        this.placenotes = placenotes
        this.classify = classify
        // console.log(pic)
      },
      imgclicknew(i){
         this.centerDialogVisible = true;
        var photo = this.shudata[i].xingobject.photo //图片
        var type = this.shudata[i].xingobject.type //归类
        var longitude = this.shudata[i].xingobject.longitude //经
        var latitude = this.shudata[i].xingobject.latitude //纬
        var shoottime = this.shudata[i].xingobject.shoottime //拍摄时间
        var questionnotes = this.shudata[i].xingobject.questionnotes //问题备注
        var placenotes = this.shudata[i].xingobject.placenotes  //地点备注
        var classify = this.shudata[i].xingobject.classify  //地点备注


        this.pic = photo
        this.type = type
        this.longitude = longitude
        this.latitude = latitude
        this.shoottime = shoottime
        this.questionnotes = questionnotes
        this.placenotes = placenotes
        this.classify = classify
        // console.log(pic)
      },
     //分页
         handlePage(value){
           console.log(value)
            var that = this;
          axios({
                    url:"http://192.168.0.134:8080/queryByProjectDetails",
                    params:{apid:1,page:value}
                })
                .then(function(data){
                     console.log(data.data)   
                     that.pageTotal = data.data.totalCount;
                     that.pageSize = data.data.limit; //每页条数
                
                     that.shudata=data.data.list
                     that.dataArr = that.shudata
                       
                })

       },


  },

  mounted(){
      var obj = this.$route.params.id ;   
    //    var apid;
    //      this.pppid = apid = obj.pid
        
      var xid = localStorage.getItem('apid')
       console.log(xid)
       
    //    var xid = 1
          var that = this;
          axios({
                    url:"http://192.168.0.134:8080/queryByProjectDetails",
                    params:{apid:xid,page:1}
                })
                .then(function(data){
                    //  console.log(data.data)   
                     that.pageTotal = data.data.totalCount;
                    //  that.pageNum = data.data.totalCount; //初始页
                     that.pageSize = data.data.limit; //每页条数
                     var arr = data.data.list
                     for(var i in arr){
                         var obj = arr[i].xingobject;
                         if(obj){
                             that.ifding = "已改善"
                         }else{
                             that.ifding = "点定位"
                         }
                     }
                    //  console.log(obj)
                     that.shudata=data.data.list
                    //  console.log(that.shudata)
                     var _start = ( that.pageNum - 1 ) * that.pageSize;  //pageNum 第几页  pageSize:每页几条数据
                     var _end = that.pageNum * that.pageSize;
                     that.dataArr = that.shudata
                       
                })
          
          
          

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
   .wrop{
       display: flex;justify-content: space-between;
       .left{width:100%;height: 600px;overflow: auto;
       .row{width:100%;height:190px;margin:10px 0 ;display:flex;justify-content: space-between;border-bottom: 1px dotted #5BC0DE;
            .picwwrop{width:50%;height: 190px;display: flex;justify-content: space-between;
                     .pic{width:190px ;height: 190px;
                         img{width:190px ;height: 190px;}
                      }
                     .zi{width: 45%;height:185px;background: #fff;font-size: 10px;box-sizing:border-box;
                        p{padding: 1px}
                     }
            }
         }
       }
       .xia{width: 100%;height: 570px;}
   }
    .tit{
        width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;padding-left:5px;color: #fff;
    }
    .modelwrop{display:flex;justify-content:space-between;margin:0;padding:0;
           .you{width:35%;height:350px;padding:10px;position: relative;
               div{margin:5px}
           }
    }
    .dposition{position: absolute;bottom: 5%;left: 10%;}
</style>