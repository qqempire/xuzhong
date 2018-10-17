<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="info" size="small">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    
                </Breadcrumb>
                <Card>
                    <div style="height: 600px;">
                        <div class="wrop">
                             <div class="left">
                                 <div class="title"><span>审核数据</span></div>
                                 <div class="tab">
                                       表格

                                 </div>
                            </div>
                            <div class="right">
                                <div class="top">
                                    <div class="title"><span>访问资料</span><Button type="success" size="small">下载资料</Button></div>
                                    <ul class="img">
                                         
                                             <li></li>
                                             <li></li>
                                             <li></li>
                                             <li></li>
                                             <li></li>
                                             <li></li>
                                         
                                    </ul>
                                </div>
                                <div class="xia">
                                     <div class="title"><span>访问资料</span></div>
                                     <ul class="xia1">
                                          <li></li>
                                          <li></li>
                                          <li></li>
                                     </ul>
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
export default {
  name: 'Details_jia',
  data () {
    return {
       
  }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.wrop{width: 100%;height: 600px;display: flex;justify-content: space-between;
   .left{width: 55%;height: 100%; }
   .tab{width: 100%;height: 570px;border: 1px solid green;}
   .right{width: 43%;height: 100%;
       .top{height: 400px;width: 100%;
            
            ul{width: 100%;height: 380px;display: flex;flex-wrap:wrap;overflow: auto;border: 1px solid orange;
               li{width: 48%;height: 150px;border: 1px solid red;margin: 3px}
             }
        }
       .xia{height: 180px;width: 100%;border: 1px solid red;margin-top:20px;
             .xia1{width: 100%;border: 1px solid blue}
             li{width: 100%;height: 49px;border: 1px solid red}
       }
   }
}

.title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 10px;display:flex;justify-content: space-between;align-items:center;
       
    }
 
    
</style>