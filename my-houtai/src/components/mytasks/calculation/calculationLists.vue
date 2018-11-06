<template>
    <div class="calculationLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">  
                    <div class="title"><span>条件筛选</span></div>
                    <div>                             
                        <Select v-model="sortList.projectname" style="width:150px" placeholder="项目名称">
                            <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.taskstate" style="width:150px" placeholder="任务状态">
                            <Option v-for="(item,index) in sortLists.taskStateLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.auditstate" style="width:150px" placeholder="审核状态">
                            <Option v-for="(item,index) in sortLists.auditStatusLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Select v-model="sortList.researchnum" style="width:200px" placeholder="调研编号">
                            <Option v-for="(item,index) in sortLists.researchNumberLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;&nbsp;
                        <Button type="success" @click="sortData">&nbsp;&nbsp;搜索&nbsp;&nbsp;</Button>
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
                        <Table border ref="selection" :columns="columns10" :data="data10" size="small"></Table>
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
    name: 'calculationLists',
    data () {
        return {
        // 查询功能
            sortLists:{
                projectNameLists:["安阳"],
                taskStateLists: ["文峰"],
                auditStatusLists:['手动输入'],
                researchNumberLists:[22],
            },
            // 点击查询按钮发送的参数 
            sortList:{projectname:'',taskstate:'',auditstate:'',researchnum:''},
        // 表格内容
            columns10: [{type: 'selection',align: 'center',width:50},{title: '区', align: 'center', key: 'district'},{title: '调研对象', align: 'center', key: 'researchobject'},{title: '调研编号', align: 'center', key: 'researchnum'},{title: '任务状态', align: 'center', key: 'taskstate'},                                                           
                        {title: '得分核对状态', align: 'center', key: 'auditstate'},{title: '原始得分', align: 'center', key: 'originalscore',sortable: true},{title: '一审后得分',  align: 'center', key: 'firstinstancescore',sortable: true},{title: '二审后得分', align: 'center', key: 'secondinstancescore',sortable: true},
                        {title: '核对得分', align: 'center', key: 'checkscore',sortable: true},                                                              
                        {title: '操作', align: 'center', key: '操作', 
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
            data10: [],
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
                url:"http://192.168.0.134:8080/subTaskSortLists",  
                method:'get'                           
            }).then((res)=>{
                // 初始页面数据
                this.sortLists = res.data.sortLists
            });         
        
        //表格信息
            axios({
                url:"http://192.168.0.134:8080/queryCalculusTask",  
                method:'get'                           
            }).then((res)=>{
                this.dataPage = res.data;
                this.dataTotal = res.data.length;
                // 初始页面数据
                if (this.dataTotal<10) {
                    for (let index = 0; index < this.dataTotal; index++) {
                        this.data10.push(this.dataPage[index])
                    }
                } else {
                    for (let index = 0; index < 10; index++) {
                        this.data10.push(this.dataPage[index])
                    }                
                }                                
            });
    }, 
    methods:{
        show (index) {
            // 根据index找到相应的data数据，传给后台，让后台返回详情数据
            console.log(index)
            // this.$router.push("/prescriptionC")   //跳转到相应项目的位置
            this.$router.push("/domesticationC")   //跳转到相应项目的位置
        },
        //导出表格数据
        exportData(){
            console.log('导出数据')
        },

        // 搜索
            sortData(){
                this.data10=[]
                console.log(this.sortList)
                axios({
                    url:"http://192.168.0.134:8080/queryCalculusTask",  
                    method:'get',
                    params:this.sortList                           
                }).then((res)=>{
                    this.dataPage = res.data;
                    this.dataTotal = res.data.length;
                    // 初始页面数据
                    if (this.dataTotal<10) {
                        for (let index = 0; index < this.dataTotal; index++) {
                            this.data10.push(this.dataPage[index])
                        }
                    } else {
                        for (let index = 0; index < 10; index++) {
                            this.data10.push(this.dataPage[index])
                        }                
                    }                                
                });
            },

        // 换页操作
            changPage(page){
            //切换页码时更改表格相应数据
                this.data10 = []
                if (page*10 < this.dataTotal) {
                    for (var index = (page-1)*10; index < (page)*10; index++) {
                        this.data10.push(this.dataPage[index])          
                    }  
                } else {
                    for (var index = (page-1)*10; index < this.dataTotal; index++) {
                        this.data10.push(this.dataPage[index])          
                    }                     
                }                                  
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
        .content{overflow: hidden;
            .power{margin-bottom: 10px; width: 100%; display: flex; justify-content: flex-end;}
            .page{float: right; margin-top: 10px;}
        }
    }
</style>