<template>
    <div class="projectLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">                  
                    <div class="title"><span>条件筛选</span></div>
                    <div>                             
                        <Select v-model="sortList.regionalAgency" style="width:150px" placeholder="区域代理">
                            <Option v-for="(item,index) in sortLists.regionalAgencyLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.projectName" style="width:150px" placeholder="项目名称">
                            <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.taskState" style="width:150px" placeholder="任务状态">
                            <Option v-for="(item,index) in sortLists.taskStateLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.auditStatus" style="width:150px" placeholder="审核状态">
                            <Option v-for="(item,index) in sortLists.auditStatusLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;&nbsp;
                        <Button type="success" @click="queryProject">&nbsp;&nbsp;搜索&nbsp;&nbsp;</Button>
                    </div>
                </Breadcrumb> 
                <Card>                    
                    <div class="content">
                        <!-- 下表 -->
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info">导出表格</el-button>
                        </div>
                        <!-- 表格 -->
                        
                        <table class="elastic" border="1">
                            <thead>
                                <th>
                                    <td>项目名称</td>
                                    <td>xxxx</td>
                                    <td>收起</td>
                                    <td>DSR进度</td>
                                    <td><Button type="success">下载访问员账号</Button></td>
                                </th>
                            </thead>
                        </table>
                        <Table :columns="columns7" :data="data7"></Table>
                        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />                            
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
export default {
  name: 'visitor',
  data () {
    return {
    // 查询功能
        sortLists:{
            regionalAgencyLists: ["河南","广东","江西","湖南","湖北","河北","东北"],
            projectNameLists:["安阳"],
            taskStateLists: ["文峰"],
            auditStatusLists:['手动输入']
        },
        // 点击查询按钮发送的参数 
        sortList:{regionalAgency:'',projectName:'',taskState:'',auditStatus:''},

        // 表格数据
        columns7: [{title: '调研对象',key: '调研对象'},{title: '调研编号',key: '调研编号'},{title: '访问员账号',key: '访问员账号',},{title: '任务状态',key: '任务状态'},{title: '审核状态',key: '审核状态'},{title: '截至日期',key: '截至日期',sortable: true},
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
                            }, '查看')
                    ])             
                }                              
            }
        ],
        data7: [{调研对象: 'John Brown',调研编号: 18,访问员账号: 999999,任务状态: "完成",审核状态: "未完成",截至日期: "18-12"}],
        // 分页数据
            dataTotal:5,
            pageNum:5,
            dataPage:[]
    }
  },
  methods:{
    //   展示相应的
    show (index) {
            this.$router.push("/projectDetail")  
        }
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
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .projectLists{
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        } 
        .content{ height: 600px;
            .elastic{ border-collapse: collapse;}
            .page{float: right; margin-top: 10px;}
        }  
    } 
</style>