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
                                    <img :src=item.img alt="" >                                   
                                    <p>二维码位置:<br/>
                                        {{item.address}}
                                    </p>
                                     
                                </div><br><hr :style="{width:'360px'}"> 
                            </div>                                                                                                                                                                                                                                                                                        
                        </div>
                        <div class="right">
                           <span>所有问题</span>
                           <div>
                               <br>
                                <div class="row" >
                                    <div class="rowDetail">                                   
                                        <img :src=img alt="" >                                   
                                        <ul class="list">
                                            <li>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:2342dsafsddddfasdvfdafdasfasdfasdfasdgdas</li>
                                            <li>归&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类:234</li>
                                            <li>拍摄时间:2342</li>                                            
                                            <li>地点备注:234</li>
                                            <li>问题备注:234</li>
                                            <li><el-button type="success" @click="details = true" size="small">详情</el-button></li>
                                            <li><el-button type="success" @click="goLocation" size="small">查看定位</el-button></li>                                        
                                        </ul>                                                                        
                                    </div>
                                    <div class="rowDetail">                                   
                                        <img :src=img alt="" >                                   
                                        <ul class="list">
                                            <li>类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型:342</li>
                                            <li>归&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类:234</li>
                                            <li>拍摄时间:2342dsafsddddfasdvfdafdasfasdfasdfasdgdas</li>                                            
                                            <li>地点备注:234</li>
                                            <li>问题备注:234</li>
                                            <li><el-button type="success" @click="details = true" size="small">详情</el-button></li>
                                            <li><el-button type="success" @click="goLocation" size="small">查看定位</el-button></li>                                        
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
                            draggable
                            width=880
                            class-name="vertical-center-modal">
                            <div :style="{width:'880px',height:'600px',display:'flex',justifyContent:'space-around',alignItems:'center'}">
                                <Carousel :style="{width:'600px',height:'600px',textAlign:'center',lineHeight:'300px',border:'1px solid #cccccc'}"
                                    v-model="value1"
                                    :loop="setting.loop"
                                    :autoplay="setting.autoplay"
                                    :autoplay-speed="setting.autoplaySpeed"
                                    :dots="setting.dots"
                                    :radius-dot="setting.radiusDot"
                                    :trigger="setting.trigger"
                                    :arrow="setting.arrow"
                                >
                                    <CarouselItem>
                                        <div  :style="{width:'600px',height:'600px',backgroundSize: '100% 100%',backgroundImage:'url(' + img + ')',}">1</div>
                                    </CarouselItem>
                                    <CarouselItem>
                                        <div  :style="{width:'600px',height:'600px',backgroundSize: '100% 100%',backgroundImage:'url(' + img1 + ')',}">2</div>
                                    </CarouselItem>
                                </Carousel>                                                                       
                                <ul :style="{width:'240px',height:'600px',listStyle:'none',fontSize:'14px'}">
                                    <li :style="{height:'50px',}">
                                        照片类型:&nbsp;&nbsp;无问题照片
                                    </li>
                                    <li :style="{height:'50px',}">
                                        问题归类:&nbsp;&nbsp;门头照                                           
                                    </li>
                                    <li :style="{height:'40px',}">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间:&nbsp;&nbsp;234</li>
                                    <li :style="{height:'40px',}">经&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度:&nbsp;&nbsp;234</li>
                                    <li :style="{height:'40px',}">纬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度:&nbsp;&nbsp;234</li>
                                    <li :style="{height:'64px',}">
                                        地点备注:&nbsp;&nbsp;路不太好走                                          
                                    </li>
                                    <li :style="{height:'64px',}">
                                        问题备注:&nbsp;&nbsp;暂无                                                                                   
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
import img from '../../assets/img/login/logo.png'
import img1 from '../../assets/img/login/earth.png'
export default {
    name: 'researchObjectDetail',
    data () {
        return {
            // 表格数据
            img: img,
            img1: img1,
            // left数据
            leftData:[{img:img,address:"南门"},{img:img,address:"南门"}],
            // right数据
            rightData:[[],[]],
            // 弹出详情页
            details: false,
            setting: {
                loop:true,
                autoplay: false,
                autoplaySpeed: 2000,
                dots: 'outside',
                radiusDot: false,
                trigger: 'click',
                arrow: 'hover'
            }, 
        // 查询功能
            sortLists:{
                provinceLists: ["河南","广东","江西","湖南","湖北","河北","东北"],
                cityLists:["安阳"],
                districtLists: ["文峰"],
                storeNameLists:['手动输入'],
                storeLevelLists:["AA"],
                storeAreaLists:[333]
            },

            // 点击查询按钮发送的参数 
            sortList:{province:null,city:null,district:null,storename:null,storelevel:null,storearea:null},           

            // 走马灯
            value1:0,
        }
    },
  mounted(){
            axios({
                url:"http://192.168.0.106:8080/queryTwoDimsCdAddr",  
                method:'get',
                params:{pid:this.$route.query.pid}  //路由接参                         
            }).then((res)=>{
                // 初始页面数据
                console.log(res)
                // this.detailData = res.data
            });       
  },    
    methods:{
        // 返回按钮
        goBack(){
            this.$router.push('/researchObjectLists')
        },
        // 详情查看成功
        handleSuccess(){
            console.log("查看成功")
        },
        // 查看地图
        goLocation(){
            this.$router.push({path:'/mapDetails',query:{lat:120.496670,long:31.385815}})
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
                .rowDetail{width: 360px; height: 220px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #cccccc; border-radius: 3px;
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