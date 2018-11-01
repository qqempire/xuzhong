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
                            <el-button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <div class="tables">
                            <div id="table" v-for="(item,index) in dataTitle" :key="index" >
                                <!-- 表格下拉-->                               
                                <div class="title">
                                    <Button type="success" @click="open(index)">&nbsp;&nbsp;{{item.tip}}&nbsp;&nbsp;</Button>
                                    <Button type="success" @click="downloadAccount(index)">下载访问员账号</Button>
                                    <Button type="info" >项目名称：&nbsp;{{item.projectName}}</Button>
                                    <Button type="info" >DSR进度：&nbsp;{{item.DSR}}</Button>
                                </div>
                                <!-- 数据表 -->
                                <Table v-show="item.boo" :columns="columns7" :data="data[index]"></Table>
                            </div>
                        </div>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import axios from 'axios'
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
        // table数据
            // 是否展开
            boo:'展开', 
            // 表头数据
            dataTitle:[{projectName:'家化项目',DSR:"69%",boo:true,tip:'展开'},{projectName:'家化项目bgdfg',DSR:"44%",boo:false,tip:'展开'},],
            // 表格数据
            columns7: [{title: '调研对象',key: 'researchObject'},{title: '调研编号',key: 'researchNumber'},{title: '访问员账号',key: 'visitorAccount',},{title: '任务状态',key: 'taskState'},{title: '审核状态',key: 'auditStatus'},{title: '截至日期',key: 'deadline',sortable: true},
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
            data: [[{researchObject: 'John Brown',researchNumber: 18,visitorAccount: 999999,taskState: "完成",auditStatus: "未完成",deadline: "18-12"}],[{researchObject: 'John Brown',researchNumber: 18,visitorAccount: 999999,taskState: "完成",auditStatus: "未完成",deadline: "18-12"}]],
        }
    },

    //预加载数据
    // 动态
    mounted(){        
        //表格信息
            // axios({
            //     url:"http://192.168.0.134:8080/queryMyTask",  
            //     method:'get'                           
            // }).then((res)=>{
            //     // 初始页面数据
            //     console.log(res.data)
            //     this.dataTitle = res.data.title;
            //     for(var i = 0;i<this.dataTitle.length;i++){
            //         this.dataTitle[i]['boo']=false;
            //         this.dataTitle[i]["tip"]="展开";
            //     }
            //     this.data = res.data.data        
            // });
    },
    methods:{
        //   展示相应的detail
        show (index) {
                this.$router.push("/projectDetail")  
        },
        
        //导出表格数据
        exportData(){
            console.log('导出数据')
        },

        // 条件搜索
        queryProject(){
            console.log("条件搜索")
        },

    // 表格操作
        // 展开收缩
        open(index){
            if (this.dataTitle[index].boo == false) {
                this.dataTitle[index].boo = true;
                this.dataTitle[index].tip = "收起"
            } else {
               this.dataTitle[index].boo = false;
               this.dataTitle[index].tip = "展开"
            }           
        },
        // 下载访问员账号
        downloadAccount(index){
            console.log(index)
        }
    },
        
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .projectLists{
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        } 
        .content{overflow: hidden;
            .tables{overflow: hidden;
                #table{border: 1px solid #cccccc; border-radius: 5px; margin-bottom: 10px; 
                    .title{width: 50%; display: flex; justify-content: space-between; align-items: center; border-radius: 5px; background: white;}
                }
            } 
        }  
    } 
</style>