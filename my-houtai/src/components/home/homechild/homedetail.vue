<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="info" size="small" @click="tohome">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <!-- <Button type="info">Primary</Button> -->
                </Breadcrumb>
                <Card style="min-width:1150px">
                    <div style="height: 600px;" class="wrop">
                        <div class="left">
                             <div class="tit">修改资料</div>
                             <div class="xia">
                                 <div class="row">
                                     <div class="picwwrop">
                                         <p class="pic"><img src="../../../assets/aaa.jpg"></p>
                                         <div class="zi">
                                             <p>类型：照片</p>
                                             <p>归类：门头</p>
                                             <p>经纬：110,120</p>
                                             <p>拍照时间：2018/11/11</p>
                                             <p>问题类型：XXX</p>
                                             <p>地点备注：南门</p>
                                             <p>问题备注：无问题</p>
                                             <Button type="success" size="small" style="margin-left:5px">点定位</Button>
                                         </div>
                                     </div>
                                     <div class="picwwrop">
                                         <p class="pic"><img src="../../../assets/aaa.jpg"></p>
                                         <div class="zi">
                                             <p>类型：照片</p>
                                             <p>归类：门头</p>
                                             <p>经纬：110,120</p>
                                             <p>拍照时间：2018/11/11</p>
                                             <p>问题类型：XXX</p>
                                             <p>地点备注：南门</p>
                                             <p>问题备注：无问题</p>
                                             <Button type="success" size="small" style="margin-left:5px">点定位</Button>
                                         </div>
                                     </div>
                                 </div>

                                 <hr style= "border: 1px dotted #5BC0DE" /> 

                                 <div class="row">
                                     <div class="picwwrop">
                                         <p class="pic"><img src="../../../assets/aaa.jpg"></p>
                                         <div class="zi">
                                             <p>类型：照片</p>
                                             <p>归类：门头</p>
                                             <p>经纬：110,120</p>
                                             <p>拍照时间：2018/11/11</p>
                                             <p>问题类型：XXX</p>
                                             <p>地点备注：南门</p>
                                             <p>问题备注：无问题</p>
                                             <Button type="success" size="small" style="margin-left:5px">点定位</Button>
                                         </div>
                                     </div>
                                     <div class="picwwrop">
                                         <p class="pic"><img src="../../../assets/aaa.jpg"></p>
                                         <div class="zi">
                                             <p>类型：照片</p>
                                             <p>归类：门头</p>
                                             <p>经纬：110,120</p>
                                             <p>拍照时间：2018/11/11</p>
                                             <p>问题类型：XXX</p>
                                             <p>地点备注：南门</p>
                                             <p>问题备注：无问题</p>
                                             <Button type="success" size="small" style="margin-left:5px">点定位</Button>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                        </div>
                        <div class="right">
                             <div class="tit">所有问题</div>
                             <div class="xia">
                                 <div class="row">
                                     <div class="picwwrop">
                                         <p class="pic"><img src="../../../assets/aaa.jpg"></p>
                                         <div class="zi">
                                             <p>类型：照片</p>
                                             <p>归类：门头</p>
                                             <p>经纬：110,120</p>
                                             <p>拍照时间：2018/11/11</p>
                                             <p>问题类型：XXX</p>
                                             <p>地点备注：南门</p>
                                             <p>问题备注：无问题</p>
                                             <Button type="success" size="small" style="margin-left:5px">点定位</Button>
                                         </div>
                                     </div>

                                     

                                     <div class="picwwrop">
                                         <p class="pic"><img src="../../../assets/aaa.jpg"></p>
                                         <div class="zi">
                                             <p>类型：照片</p>
                                             <p>归类：门头</p>
                                             <p>经纬：110,120</p>
                                             <p>拍照时间：2018/11/11</p>
                                             <p>问题类型：XXX</p>
                                             <p>地点备注：南门</p>
                                             <p>问题备注：无问题</p>
                                             <Button type="success" size="small" style="margin-left:5px">点定位</Button>
                                         </div>
                                     </div>
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
  name: 'homeDetail',
  data () {
    return {
       
  }
 },
  methods: {
      tohome(){
        //   this.$router.push("/home")
           axios({
                    // method: 'post',
                    url:"http://192.168.0.135:8080/queryByProvinces",
                    // params:{jtype:str,jname:jname}
                })
                .then(function(data){
                     console.log(data.data)     
                    // if(data.data.msg=="添加成功"){
                    //     alert("添加成功")
                    //      window.location.reload()
                    // }
                       
                })
      },

  },
  mounted(){

      var obj = this.$route.params.id ;   
      console.log(obj)

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
   .wrop{
       display: flex;justify-content: space-between;
       .left,.right{width:50%;height: 600px;border: 1px solid red;overflow: auto;;
       .row{width:100%;height:190px;border: 1px solid greenyellow;display:flex;justify-content: space-between;margin:10px 0 ;
            .picwwrop{width:50%;height: 190px;border: 1px solid #000;display: flex;justify-content: space-between;
                     .pic{width:160px ;height: 190px;
                         img{width:160px ;height: 190px;}
                      }
                     .zi{width: 200px;height:190px;background: #fff;font-size: 10px;
                        p{padding: 1px}
                     }
            }
        }
       }
       .xia{width: 100%;height: 570px;border: 1px solid blue}
   }
    .tit{
        width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;padding-left:5px;color: #fff;
    }
</style>