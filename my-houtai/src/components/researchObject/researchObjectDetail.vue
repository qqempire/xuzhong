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
                            <div v-for="(item,index) in leftData" :key="index">
                                <br>
                                <div class="row">
                                    <!-- <img :src=item.image alt="" >-->
                                    <p>二维码位置:<br/>
                                        {{item.remark}}
                                    </p>
                                     
                                </div><br><hr :style="{width:'360px'}"> 
                            </div>                                                                                                                                                                                                                                                                                        
                        </div>
                        <div class="right">
                           <span>所有问题</span>
                           <div v-for="(item,index) in rightData" :key="index">
                               <br>
                                <div class="row">
                                    <div class="rowDetail" >                                   
                                        <!-- <img :src=item.laoobject.photo alt="" >   -->
                                        <ul class="list">
                                            <li>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:{{item.laoobject.type}}</li> 
                                            <li>归&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类:{{item.laoobject.classify}}</li>
                                            <li>拍摄时间:{{item.laoobject.shoottime}}</li>
                                            <li>问题类型:{{item.laoobject.problemtypes}}</li>
                                            <li>地点备注:{{item.laoobject.placenotes}}</li>
                                            <li>问题备注:{{item.laoobject.questionnotes}}</li>
                                            <li><el-button type="success" @click="goDetail(item.laoobject)" size="small">详情</el-button></li>
                                            <li><el-button type="success" @click="goLocation(item.laoobject.latitude,item.laoobject.longitude,item.laoobject.pid)" size="small">查看定位</el-button></li>                                        
                                        </ul>                                                                        
                                    </div>
                                     <div class="rowDetail">                                   
                                        <!-- <img :src=item.xinobject.photo alt="" > -->
                                        <ul class="list">
                                            <li>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:{{item.xingobject.type}}</li>
                                            <li>归&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类:{{item.xingobject.classify}}</li>
                                            <li>拍摄时间:{{item.xingobject.shoottime}}</li>
                                            <li>问题类型:{{item.laoobject.problemtypes}}</li>                                            
                                            <li>地点备注:{{item.xingobject.placenotes}}</li>
                                            <li>问题备注:{{item.xingobject.questionnotes}}</li>
                                            <li><el-button type="success" @click="goDetail(item.xingobject)" size="small">详情</el-button></li>
                                            <li><el-button type="success" @click="goLocation(item.xingobject.latitude,item.xingobject.longitude,item.xingobject.pid)" size="small">查看定位</el-button></li>                                        
                                        </ul>                                                                        
                                    </div>                                                                                                                                   
                                </div><br><hr> 
                           </div>
                        </div>   
                    </div>
 
                        <Modal
                            title="查看详情"                            
                            v-model="details"                            
                            draggable
                            width=880
                            class-name="vertical-center-modal">
                            <div :style="{width:'880px',height:'600px',display:'flex',justifyContent:'space-around',alignItems:'center'}">
                                <Carousel v-model="value1"  loop :style="{width:'600px',height:'600px',textAlign:'center',lineHeight:'300px',border:'1px solid #cccccc'}">
                                    <CarouselItem>
                                        <div class="demo-carousel" :style="{width:'600px',height:'600px',backgroundSize: '100% 100%',backgroundImage:'url(' + img + ')',}">1</div>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <div class="demo-carousel" :style="{width:'600px',height:'600px',backgroundSize: '100% 100%',backgroundImage:'url(' + img1 + ')',}">2</div>
                                    </CarouselItem>
                                </Carousel>                                                                       
                                <ul :style="{width:'180px',height:'600px',listStyle:'none',fontSize:'14px'}">
                                    <li :style="{height:'40px',}">照片类型:&nbsp;&nbsp;{{detailsData.type}}</li>
                                    <li :style="{height:'40px',}">问题归类:&nbsp;&nbsp;{{detailsData.classify}}</li>
                                    <li :style="{height:'40px',}">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间:&nbsp;&nbsp;{{detailsData.shoottime}}</li>
                                    <li :style="{height:'40px',}">经&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度:&nbsp;&nbsp;{{detailsData.longitude}}</li>
                                    <li :style="{height:'40px',}">纬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度:&nbsp;&nbsp;{{detailsData.latitude}}</li>
                                    <li :style="{height:'100px',overflow:'hidden', marginBottom:'10px', textOverflow:'ellipsis',whiteSpace:'wrap', }">问题类型:&nbsp;&nbsp;{{detailsData.problemtypes}}</li>                                    
                                    <li :style="{height:'100px',overflow:'hidden', marginBottom:'10px', textOverflow:'ellipsis',whiteSpace:'wrap', }">地点备注:&nbsp;&nbsp;{{detailsData.placenotes}}</li>
                                    <li :style="{height:'100px',overflow:'hidden', textOverFlow:'ellipsis',whiteSpace:'wrap',}">问题备注:&nbsp;&nbsp;{{detailsData.questionnotes}}</li>
                                </ul>
                            </div> 
                        </Modal>

                </Card>                                                    
            </Content>
        </Layout>
    </div>
</template>
<script>
import axios from "axios"
import ports from "../../assets/js/ports"
import img from '../../assets/img/login/logo.png'
import img1 from '../../assets/img/login/earth.png'
export default {
    name: 'researchObjectDetail',
    data () {
        return {
            portA: ports.a,
            // 表格数据
            img: img,
            img1: img1,
            // left数据
            leftData:[{image:img,remark:"南门"},],
            // right数据
            rightData:[],
        // 弹出详情页
            detailsData:{type:"无",classify:"无",shoottime:"无",longitude:"无",latitude:"无",problemtypes:"无",placenotes:"无",questionnotes:"无",},
            details: false, 
            // 走马灯
            value1: 0,                      
        }
    },
  mounted(){
            axios({
                url:this.portA+"queryByProjectDetails",  
                method:'get',
                params:{apid:this.$route.query.apid}  //路由接参                         
            }).then((res)=>{
                // 初始页面数据
                let datas = res.data;
                for(var i = 0 ; i < datas.length ; i++){
                    if (datas[i].laoobject.classify == 0) {
                        datas[i].laoobject.classify = "门头"
                    }else{
                        datas[i].laoobject.classify = "问题照片"
                    }
                    if (datas[i].xingobject.classify == 0) {
                        datas[i].xingobject.classify = "门头"
                    }else{
                        datas[i].xingobject.classify = "问题照片"
                    }
                    if (datas[i].laoobject.type == 0) {
                        datas[i].laoobject.type = "照片"
                    }else{
                        datas[i].laoobject.type = "视频"
                    }
                    if (datas[i].xingobject.type == 0) {
                        datas[i].xingobject.type = "照片"
                    }else{
                        datas[i].xingobject.type = "视频"
                    }                                         

                }                
                this.rightData = datas

            }); 
            axios({
                url:this.portA+"queryTwoDimsCdAddr",  
                method:'get',
                params:{apid:this.$route.query.apid}  //路由接参                         
            }).then((res)=>{
                // 初始页面数据
                this.leftData = res.data
            });                  
  },    
    methods:{
        // 返回按钮
        goBack(){
            this.$router.push('/researchObjectLists')
        },
        // 查看详情
        goDetail(obj){
            this.details = true
            this.detailsData = obj
        },
        // 查看地图
        goLocation(lat,long,apid){
            this.$router.push({path:'/mapDetails',query:{lat:lat,long:long,resource:'/researchObjectDetail',apid:apid}})
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.researchObjectDetail{width: 100%; min-width: 1366px;
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    } 
    .table2{width: 100%; display: flex; justify-content: space-between; 
        .left{width: 32%;
            span{display: inline-block; width: 80px; height: 20px; line-height: 20px; text-align: center; border-radius: 3px; background: #5BC0DE; color: white;} 
            .row{width: 360px; height: 220px; margin-bottom: 5px; margin-top: 5px; display: flex; justify-content: space-around; align-items: center; border: 1px solid #cccccc; border-radius: 3px;
                img{display: block; width: 160px;height: 160px;}
                p{width: 180px; height: 200px; text-align: center;line-height: 80px;}             
            }                      
        } 
        .right{width: 66%;
            span{display: inline-block; width: 80px; height: 20px; line-height: 20px; text-align: center; border-radius: 3px; background: #5BC0DE; color: white;}            
            .row{width: 100%; display: flex; justify-content: space-between; margin-bottom: 5px; margin-top: 5px;
                .rowDetail{width: 360px; height: 220px; display: flex; justify-content: space-between; align-items: center; 
                    img{display: block; width: 160px;height: 160px; margin-right: 20px;}
                    .list{width: 180px; height: 200px; list-style: none; 
                        li{height: 24px; line-height: 24px; width: 160px; overflow:hidden; text-overflow:ellipsis;white-space:nowrap;}
                        li:nth-last-child(1){height: 40px; line-height: 40px;}
                        li:nth-last-child(2){height: 40px; line-height: 40px;}
                    }   
                }                               
            }
        } 
    }                
}
</style>