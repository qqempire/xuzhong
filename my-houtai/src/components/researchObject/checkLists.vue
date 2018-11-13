<template>
    <div class="checkLists">
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
                            ok-text='保存'
                            v-model="details"
                            @on-ok="handleSuccess()"
                            @on-cancel="cancel()"
                            draggable
                            width=880
                            class-name="vertical-center-modal">
                            <div :style="{width:'880px',height:'600px',display:'flex',justifyContent:'space-around',alignItems:'center'}">
                                <Carousel v-model=value1 loop :style="{width:'600px',height:'600px',textAlign:'center',lineHeight:'300px',border:'1px solid #cccccc'}">
                                    <CarouselItem>
                                        <div  :style="{width:'600px',height:'600px',backgroundSize: '100% 100%',backgroundImage:'url(' + img + ')',}">1</div>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <div  :style="{width:'600px',height:'600px',backgroundSize: '100% 100%',backgroundImage:'url(' + img1 + ')',}">2</div>
                                    </CarouselItem>
                                </Carousel>                                                                       
                                <ul :style="{width:'200px',height:'600px',listStyle:'none',fontSize:'14px'}">
                                    <li :style="{height:'50px',}">
                                        类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:&nbsp;&nbsp;
                                        <Select v-model="detailsData.type" :style="{width:'100px'}" filterable >
                                            <Option v-for="(item,index) in detailsDatas.photoTypes" :value="item" :key="index">{{ item }}</Option>
                                        </Select>              
                                    </li>
                                    <li :style="{height:'50px',}">
                                        问题归类:&nbsp;&nbsp;<Select v-model="detailsData.classify" :style="{width:'100px'}" filterable >
                                            <Option v-for="(item,index) in detailsDatas.problemsClassify" :value="item" :key="index">{{ item }}</Option>
                                        </Select>                                            
                                    </li>                                   
                                    <li :style="{height:'40px',}">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间:&nbsp;&nbsp;{{detailsData.shoottime}}</li>
                                    <li :style="{height:'40px',}">经&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度:&nbsp;&nbsp;{{detailsData.longitude}}</li>
                                    <li :style="{height:'40px',}">纬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度:&nbsp;&nbsp;{{detailsData.latitude}}</li>
                                    <li :style="{height:'50px',}">
                                        问题类型:&nbsp;&nbsp;<Select v-model="detailsData.problemtypes" :style="{width:'100px'}" filterable >
                                            <Option v-for="(item,index) in detailsDatas.problemsTypes" :value="item" :key="index">{{ item }}</Option>
                                        </Select>                                            
                                    </li>                                   
                                    <li :style="{height:'150px',overflow:'hidden', }">
                                        地点备注:&nbsp;&nbsp;<Input type="textarea" v-model="detailsData.placenotes" :style="{height:'100px'}"></Input>
                                    </li>
                                    <li :style="{height:'150px',overflow:'hidden',}">
                                        问题备注:&nbsp;&nbsp;<Input type="textarea" v-model="detailsData.questionnotes" :style="{height:'100px'}" ></Input>
                                    </li>
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
    name: 'checkLists',
    data () {
        return {
            portA: ports.a,
            // 表格数据
            img: img,
            img1: img1,
            // right数据
            rightData:[],
            // 弹出详情页            
            detailsDatas:{
                photoTypes:["门头照","问题照片"],
                problemsClassify:["已审核","问题照片","已改善"],
                problemsTypes:["垃圾不清扫","垃圾未归类"],
            },
            obj:{},
            detailsData:{},            
            // 轮播
            details: false,
            value1:0,         
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
                 
  },    
    methods:{
        // 返回按钮
        goBack(){
            this.$router.push('/updateRecordLists')
        },
        // 查看详情(对象不能应用)
        goDetail(obj){
            this.details = true
            this.detailsData={}
            this.obj = {}
            
            this.obj = obj
            this.detailsData = obj
            console.log(this.detailsData.type)
            console.log(this.obj)
        },
        // 详情查看成功
        handleSuccess(){
            axios({
                url:this.portA+"revisionProblem",
                method:'post',
                params:{pc:this.detailsData}                          
            }).then((res)=>{
                this.$Message.success(res.data.msg)
            })
        },
        cancel(){
            this.detailsData = this.obj
            console.log(this.detailsData.type)
            this.$Message.success("已取消")
        },
        // 查看地图
        goLocation(lat,long,apid){
            this.$router.push({path:'/mapDetails',query:{lat:lat,long:long,resource:'/checkLists',apid:apid}})
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.checkLists{width: 100%; min-width: 1366px;
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    } 
    .table2{width: 100%; display: flex; justify-content: space-between; 
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