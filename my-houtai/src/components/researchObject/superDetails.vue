<template>
    <div class="researchObjectDetail">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}"> 
                <Breadcrumb :style="{margin: '16px 0'}"> 
                    <div class="title">
                        <span>基本信息</span>
                        <el-button type="info" @click="goBack">返&nbsp;回</el-button>                     
                    </div>                
                </Breadcrumb>
                <Card>                     
                    <!-- 表格内容 -->
                    <div class="table2">
                        <div class="left">
                           <span>二维码信息</span>
                            <div class="row" >

                                    <div class="rowDetail">
                                        <img :src=img alt="" >                                   
                                        <p>二维码位置:南门</p>
                                    </div>                                    

                                    <div class="rowDetail">
                                        <img :src=img alt="" >                                   
                                        <p>二维码位置:南门</p>
                                    </div>                                    
                                                                                                                               
                            </div><br>                                                     
                        </div>
                        <div class="right">
                           <span>所有问题</span>
                            <div class="row" >
                                <div class="rowDetail">                                   
                                    <img :src=img alt="" >                                   
                                    <ul class="list">
                                        <li>类型:342</li>
                                        <li>归类:234</li>
                                        <li>拍摄时间:2342</li>                                            
                                        <li>地点备注:234</li>
                                        <li>问题备注:234</li>
                                        <li><el-button type="success" @click="goLocation" size="small">定位</el-button></li>
                                        <li><el-button type="success" @click="goDetail" size="small">详情</el-button></li>
                                    </ul>                                                                        
                                </div>

                                <div class="rowDetail">
                                    <img :src=img alt="" >                                   
                                    <ul class="list">
                                        <li>类型:342</li>
                                        <li>归类:234</li>
                                        <li>经度:234</li>
                                        <li>纬度:234</li>
                                        <li>拍摄时间:2342</li>
                                    </ul>
                                </div>                                    
                                                                                                
                            </div><br><hr> 
                        </div>   
                    </div>                                      
                </Card>                                                    
            </Content>
        </Layout>
    </div>
</template>
<script>
import img from '../../assets/img/login/logo.png'
export default {
    name: 'researchObjectDetail',
    data () {
        return {
            // 表格数据
            img: img,
            // left数据

            // right数据

        }
    },
    methods:{
        // 返回按钮
        goBack(){
            this.$router.push('/researchObjectLists')
        },
        // 查看详情
        goDetail(){
            console.log("查看详情")
        },
        // 查看地图
        goLocation(){
            console.log("查看地图")
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.researchObjectDetail{
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    } 
    .table2{width: 100%; display: flex; justify-content: space-between; 
        .left, .right{width: 48%;
            span{display: inline-block; width: 80px; height: 20px; line-height: 20px; text-align: center; border-radius: 3px; background: #5BC0DE; color: white;}            
            .row{width: 100%; display: flex; justify-content: space-between; margin-bottom: 5px; margin-top: 5px;
                .rowDetail{width: 360px; height: 250px; display: flex; justify-content: space-around; align-items: center; border: 1px solid #cccccc; border-radius: 3px;
                    img{display: block; width: 200px;height: 200px; margin-right: 20px; }
                    .list{width: 150px; height: 200px; } 
                }                               
            }
        } 
    }  
               
}
</style>