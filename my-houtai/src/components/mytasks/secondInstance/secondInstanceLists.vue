<template>
    <div class="secondInstanceLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">  
                    <div class="title"><span>条件筛选</span></div>
                    <div class="select">                             
                        <Select v-model="sortList.projectname" style="width:150px" placeholder="项目名称">
                            <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.taskstate" style="width:150px" placeholder="任务状态">
                            <Option v-for="(item,index) in sortLists.taskStateLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.firstinstance" style="width:150px" placeholder="一审状态">
                            <Option v-for="(item,index) in sortLists.firstInstanceLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.secondinstance" style="width:150px" placeholder="二审状态">
                            <Option v-for="(item,index) in sortLists.secondInstanceLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                            <Input v-model="sortList.researchnum" placeholder="调研编号" style="width:150px"/>&nbsp;&nbsp;
                        <Button type="success" @click="sortData">&nbsp;&nbsp;搜索&nbsp;&nbsp;</Button>
                    </div>
                </Breadcrumb>                
                <Card>
                    <!-- 下表 -->
                    <div class="content">                       
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info">导出表格</el-button>
                        </div>
                        <div class="power">
                            <Button type="success" @click="batchThrough">&nbsp;&nbsp;批量通过&nbsp;&nbsp;</Button>
                            <Button type="success" @click="downloadData">&nbsp;&nbsp;下载资料&nbsp;&nbsp;</Button>
                            <Button type="success" @click="downloadPicture">&nbsp;&nbsp;下载照片&nbsp;&nbsp;</Button>
                            <Button type="success" @click="downloadAudioVideo">&nbsp;&nbsp;下载录音录像&nbsp;&nbsp;</Button>
                        </div>
                        <!-- 表格 -->
                        <Table border ref="selection" :columns="secondInstance" :data="secondInstanceData"></Table>
                        <!-- 换页 -->
                        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />                    
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'secondInstanceLists',
    data () {
        return {
    // 筛选框内容
        // 查询功能
            sortLists:{
                projectNameLists:["安阳"],
                taskStateLists: ["河南","广东","江西","湖南","湖北","河北","东北"],
                firstInstanceLists:["一审"],
                secondInstanceLists: ["二审"],
            },
            // 点击查询按钮发送的参数 
            sortList:{projectname:'',taskstate:'',firstinstance:'',secondinstance:'',researchnum:''},
            // 表格内容
            secondInstance: [{type: 'selection',width: 60,align: 'center'},{title: '区',key: 'district'},{title: '调研对象',key: 'researchobject'},{title: '调研编号',key: 'researchnum'},{title: '一审状态',key: 'firstinstancestate'},{title: '二审负责人',key: 'secondinstanceperson'},{title: '二审状态',key: 'secondinstancestate'},                                       
                        {title: '操作',key: '操作', 
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
                                        }, '审核')
                                ])             
                            }                              
                        }
                    ],
            secondInstanceData: [],

        // 分页数据
            dataTotal:10,
            pageNum:10,
            dataPage:[]   
        }
    },
    //预加载数据
    mounted(){
        // 筛选框列表
            axios({
                url:"http://192.168.0.134:8080/secondIceTasksortLists",  
                method:'get'                           
            }).then((res)=>{
                // 初始页面数据
                this.sortLists = res.data.sortLists
            });         
        
        //表格信息
            axios({
                url:"http://192.168.0.134:8080/queryFIResearchsitua",  
                method:'get'                           
            }).then((res)=>{
                this.dataPage = res.data;
                this.dataTotal = res.data.length;
                // 初始页面数据
                if (this.dataTotal<10) {
                    for (let index = 0; index < this.dataTotal; index++) {
                        this.secondInstanceData.push(this.dataPage[index])
                    }
                } else {
                    for (let index = 0; index < 10; index++) {
                        this.secondInstanceData.push(this.dataPage[index])
                    }                
                }                                
            });
    },
    methods:{
        //跳转
            show (index) {
                this.$router.push("/domestication2") //跳转到相应项目的位置
            },
        // 搜索
            sortData(){
                this.secondInstanceData=[]
                axios({
                    url:"http://192.168.0.134:8080/querySecondIncTask",  
                    method:'get',
                    params:this.sortList                           
                }).then((res)=>{
                    this.dataPage = res.data;
                    this.dataTotal = res.data.length;
                    // 初始页面数据
                    if (this.dataTotal<10) {
                        for (let index = 0; index < this.dataTotal; index++) {
                            this.secondInstanceData.push(this.dataPage[index])
                        }
                    } else {
                        for (let index = 0; index < 10; index++) {
                            this.secondInstanceData.push(this.dataPage[index])
                        }                
                    }                                
                });
            },
        // 批量通过
            batchThrough(){
                console.log("批量通过")
            },
        // 下载资料
            downloadData(){
                console.log("下载资料")
            },
        // 下载照片
            downloadPicture(){
                console.log('下载照片')
            },
        // 下载录音录像
            downloadAudioVideo(){
                console.log('下载录音录像')
            },
        // 换页操作
            changPage(page){
            //切换页码时更改表格相应数据
                this.secondInstanceData = []
                if (page*10 < this.dataTotal) {
                    for (var index = (page-1)*10; index < (page)*10; index++) {
                        this.secondInstanceData.push(this.dataPage[index])          
                    }  
                } else {
                    for (var index = (page-1)*10; index < this.dataTotal; index++) {
                        this.secondInstanceData.push(this.dataPage[index])          
                    }                     
                }                                  
            }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .secondInstanceLists{
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
        }
        .select{width: 80%;}
        .content{overflow: hidden;
            .power{margin-bottom: 10px; width: 100%; display: flex; justify-content: flex-end;}
            .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
            .page{float: right; margin-top: 10px; margin-bottom: 5px;}
        }
    }
</style>