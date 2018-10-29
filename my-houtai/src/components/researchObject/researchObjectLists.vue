<template>
    <div class="researchObjectLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">  
                    <div class="title"><span>条件筛选</span></div>
                    <div class="select">                             
                        <Select v-model="sortList.regionalAgency" style="width:150px" placeholder="区域代理">
                            <Option v-for="(item,index) in regionalAgencyLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.projectName" style="width:150px" placeholder="项目名称">
                            <Option v-for="(item,index) in projectNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.taskState" style="width:150px" placeholder="任务状态">
                            <Option v-for="(item,index) in taskStateLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.auditStatus" style="width:150px" placeholder="审核状态">
                            <Option v-for="(item,index) in auditStatusLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.researchNumber" style="width:200px" placeholder="调研编号">
                            <Option v-for="(item,index) in researchNumberLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;&nbsp;
                        <Button type="success" @click="sort">&nbsp;&nbsp;搜索&nbsp;&nbsp;</Button>
                    </div>
                </Breadcrumb>
                <Card>
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
                        <Table border ref="selection" :columns="columns4" :data="data1"></Table>
                        <!-- 换页 -->
                        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />                            
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
export default {
  name: 'researchObjectLists',
  data () {
    return {
    // 筛选框内容
        // 查询功能
        sortLists:{
            regionalAgencyLists: ["河南","广东","江西","湖南","湖北","河北","东北"],
            projectNameLists:["安阳"],
            taskStateLists: ["文峰"],
            auditStatusLists:['手动输入'],
            researchNumberLists:[111]
        },
        // 点击查询按钮发送的参数 
        sortList:{regionalAgency:'',projectName:'',taskState:'',auditStatus:'',researchNumber:''},
        // 表格内容
        columns4: [{type: 'selection',width: 60,align: 'center'},{title: '项目名称',key: '项目名称'},{title: '调研对象',key: '调研对象'},{title: '调研编号',key: '调研编号'},{title: '审核状态',key: '审核状态'},{title: '审核时间',key: '审核时间'},                                        
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
                data1: [{项目名称: 'John Brown',调研对象: 18,调研编号: 'New York No. 1 Lake Park',审核状态: '2016-10-03', 审核时间: '2016-10-03'},{项目名称: 'John Brown',调研对象: 18,调研编号: 'New York No. 1 Lake Park',审核状态: '2016-10-03', 审核时间: '2016-10-03'}],
    }
  },
  methods:{
    // 跳转相应的位置（家化或实效）
        show (index) {
                // this.$router.push("/domestication1")
                this.$router.push("/prescription1")  // 跳转到相应项目的位置
            }
        },
    // 搜索
        sort(){
            console.log('搜索功能')
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
            for (var index = (page-1)*5; index < (page)*5; index++) {
                this.secondInstanceData.push(this.dataPage[index])          
            }       
        } 


}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .researchObjectLists{
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
        }
        .select{width: 80%;}
        .content{height: 600px; overflow: hidden;
            .power{margin-bottom: 10px; width: 100%; display: flex; justify-content: flex-end;}
            .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
            .page{float: right; margin-top: 10px;}
        }
    }
</style>