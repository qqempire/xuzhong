<template>
    <div class="calculationLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">  
                    <div class="title"><span>条件筛选</span></div>
                    <div>                             
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
                        <Button type="success" @click="queryProject">&nbsp;&nbsp;搜索&nbsp;&nbsp;</Button>
                    </div>
                </Breadcrumb>
                <Card>
                    <div class="content">
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <div class="power">
                            <Button type="success">&nbsp;&nbsp;核对通过&nbsp;&nbsp;</Button>
                            <Button type="error">&nbsp;&nbsp;核对不通过&nbsp;&nbsp;</Button>
                        </div>
                        <!-- 表格 -->
                        <Table border ref="selection" :columns="columns10" :data="data10"></Table>
                        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />                         
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
export default {
  name: 'calculationLists',
  data () {
    return {
    // 查询功能
        sortLists:{
            regionalAgencyLists: ["河南","广东","江西","湖南","湖北","河北","东北"],
            projectNameLists:["安阳"],
            taskStateLists: ["文峰"],
            auditStatusLists:['手动输入'],
            researchNumberLists:[22],
        },
        // 点击查询按钮发送的参数 
        sortList:{regionalAgency:'',projectName:'',taskState:'',auditStatus:'',researchNumber:''},

    // 表格内容
        columns10: [{type: 'selection',align: 'center'},{title: '区',key: '区'},{title: '调研对象',key: '调研对象'},{title: '调研编号',key: '调研编号'},{title: '任务状态',key: '任务状态'},                                                           
                    {title: '得分核对状态',width: 130,key: '得分核对状态'},{title: '原始得分',width: 120,key: '原始得分',sortable: true},{title: '一审后得分',width: 130, key: '一审后得分',sortable: true},{title: '二审后得分',width: 130,key: '二审后得分',sortable: true},
                    {title: '核对得分',width: 120,key: '核对得分',sortable: true},                                                              
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
        data10: [{区: 'John Brown',调研对象: 18,调研编号: 'New York No. 1 Lake Park',任务状态: '2016-10-03',得分核对状态: '2016-10-03',原始得分: 99,一审后得分:80,二审后得分:70,核对得分:78,操作:'审核'}],
    // 分页数据
        dataTotal:5,
        pageNum:5,
        dataPage:[]
    }
  },
  methods:{
    show (index) {
        this.$router.push("/prescriptionC")   //跳转到相应项目的位置
        //         this.$router.push("/domesticationC")   //跳转到相应项目的位置
    },
    //导出表格数据
    exportData(){
        console.log('导出数据')
    },

    // 条件搜索
    queryProject(){
        console.log("条件搜索")
    },

    // 换页操作
    changPage(page){
    //切换页码时更改表格相应数据
        // this.data7 = []
        // for (var index = (page-1)*5; index < (page)*5; index++) {
        //     this.data9.push(this.dataPage[index])          
        // } 
        console.log("换页操作")      
    }  

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .calculationLists{
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        }
        .content{height: 600px; overflow: hidden;
            .power{margin-bottom: 10px; width: 100%; display: flex; justify-content: flex-end;}
            .page{float: right; margin-top: 10px;}
        }
    }
</style>