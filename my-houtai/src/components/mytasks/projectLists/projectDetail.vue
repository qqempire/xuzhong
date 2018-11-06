<template>
    <div class="projectDetail">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">                   
                    <el-button type="info" size="small" @click="goBack">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <el-button  type="success" size="small" @click="modal1 = true">&nbsp;&nbsp;重新指派&nbsp;&nbsp;</el-button>
                    <Modal
                        v-model="modal1"
                        title="重新指派"
                        @on-ok="ok"
                        @on-cancel="cancel">
                        <Select v-model="account" style="width:300px;margin-top:5px" placeholder="选择账户">
                            <Option v-for="(item,index) in accounts" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                    </Modal>                    
                </Breadcrumb> 
                <div class="title"><span>基本信息</span></div>
                <div class="table1">                             
                    <Table border :columns="columns7" :data="data7" size="small"></Table>
                    <Table border :columns="columns4" :data="data4" size="small"></Table>                
                </div>                                            
                <Card> 
                    <div class="title"><span>状态列表</span></div>
                    <!-- 表格内容 -->
                    <div class="table2">
                        <div class="accessData">
                            <span>基础数据</span><br>
                            <Table border :columns="base" :data="baseData" size="small"></Table><br>                                                       
                        </div>
                        <div class="accessData">
                           <span>详细列表</span>&nbsp;<span>展开</span><br>
                            <div class="row" v-show=false>
                                <Card>
                                    <div class="rowDetail">
                                        <img :src=img alt="" >                                   
                                        <ul>
                                            <li>类型:342</li>
                                            <li>归类:234</li>
                                            <li>经度:234</li>
                                            <li>纬度:234</li>
                                            <li>拍摄时间:2342</li>
                                        </ul>
                                    </div>                                    
                                </Card>
                                <Card>
                                    <div class="rowDetail">
                                        <img :src=img alt="" >                                   
                                        <ul>
                                            <li>类型:342</li>
                                            <li>归类:234</li>
                                            <li>经度:234</li>
                                            <li>纬度:234</li>
                                            <li>拍摄时间:2342</li>
                                        </ul>
                                    </div>                                    
                                </Card>                                                                                                  
                            </div><br> 
                           <span>访问资料</span>&nbsp;<span>展开</span><br>
                            <Table v-show=false border :columns="audio" :data="audioData" size="small"></Table><br>
                           <span>自定义数据</span>&nbsp;<span>展开</span><br>
                            <Table v-show=false border :columns="custom" :data="customData" size="small"></Table>
                        </div>   
                    </div>                                      
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
import img from '../../../assets/img/login/logo.png'
export default {
  name: 'projectDetail',
  data () {
    return {
        //选择账户
        modal1:false,
        accounts:['jj','dd'],
        account:'', 
        // 表格数据 
        columns7: [{title: '录入账号', align: 'center', key: 'researchobject'},{title: '联系方式', align: 'center', key: 'researchnum'},{title: '开始时间', align: 'center', key: 'entryaccountnum',},{title: '结束时间', align: 'center', key: 'taskstate'},{title: '上传时间', align: 'center', key: 'auditstate'},{title: '一审时间', align: 'center', key: 'deadline',},
            {title: '二审时间', align: 'center', key: 'oprate'}
        ],
        data7:[{researchobject:12,researchnum:12,entryaccountnum:12,taskstate:12,auditstate:12,deadline:12,oprate:12,}],

        columns4: [{title: '上传图片', align: 'center', key: 'researchobject'},{title: '上传视频', align: 'center', key: 'researchnum'},{title: '上传编码', align: 'center', key: 'entryaccountnum',},{title: '上传录音', align: 'center', key: 'taskstate'},],
        data4:[{researchobject:12,researchnum:12,entryaccountnum:12,taskstate:12,}], 
        
        // 基础数据
        base: [{title: '录音', align: 'center', key: 'researchobject'},{title: '时间', align: 'center', key: 'researchnum'},{title: '播放录音', align: 'center', key: 'entryaccountnum',},{title: '文字转换', align: 'center', key: 'taskstate'},],
        baseData:[{researchobject:12,researchnum:12,entryaccountnum:12,taskstate:12,},{researchobject:12,researchnum:12,entryaccountnum:12,taskstate:12,}],        
        
        // 详细列表
        picture: [{title: '图片', align: 'center', key: 'researchobject'},{title: '类型', align: 'center', key: 'researchnum'},{title: '归类', align: 'center', key: 'entryaccountnum',},{title: '经度', align: 'center', key: 'taskstate'},{title: '纬度', align: 'center', key: 'auditstate'},{title: '拍摄时间', align: 'center', key: 'deadline',},],
        pictureData:[{researchobject:12,researchnum:12,entryaccountnum:12,taskstate:12,auditstate:12,deadline:12,}],
       
       // 访问数据
        audio: [{title: '录音', align: 'center', key: 'researchobject'},{title: '时间', align: 'center', key: 'researchnum'},{title: '播放录音', align: 'center', key: 'entryaccountnum',},{title: '文字转换', align: 'center', key: 'taskstate'},],
        audioData:[{researchobject:12,researchnum:12,entryaccountnum:12,taskstate:12,}], 
        
        // 自定义数据
        custom: [{title: '录音', align: 'center', key: 'researchobject'},{title: '时间', align: 'center', key: 'researchnum'},{title: '播放录音', align: 'center', key: 'entryaccountnum',},{title: '文字转换', align: 'center', key: 'taskstate'},],
        customData:[{researchobject:12,researchnum:12,entryaccountnum:12,taskstate:12,},{researchobject:12,researchnum:12,entryaccountnum:12,taskstate:12,}], 
                   
        img: img,         
    }
  },
  mounted(){

            // axios({
            //     url:"http://192.168.0.134:8080/queryPjLiTask",  
            //     method:'get',
                // params:{researchnum:this.$route.query.researchnum}  //路由接参                         
            // }).then((res)=>{
            //     // 初始页面数据
            //     this.detailData = res.data
            // });       
  },
  methods:{
    // 返回按钮
    goBack(){
          this.$router.push('/projectLists')
    },
    //指派人员
    ok () {
        this.$Message.info('指派成功');
    },
    cancel () {
        this.$Message.info('指派失败');
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.projectDetail{
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    }
    .table1{width: 100%; display: flex; justify-content:space-between; padding-bottom: 10px;
        .data{width: 60%;} 
        .upload{width: 38%;}               
    }
    .table2{width: 100%; display: flex; justify-content: space-between;
        span{display: inline-block; width: 80px; height: 20px; line-height: 20px; text-align: center; border-radius: 3px; background: #5BC0DE; color: white;}
        .accessData{width: 49%;
            .row{width: 100%; display: flex; justify-content: space-between; margin-bottom: 5px; margin-top: 5px;
                .rowDetail{display: flex;justify-content: space-around;  overflow: hidden;
                    img{ width: 100px;height: 100px; margin-right: 20px;}
                }
            }
        }           
    }   
}
</style>