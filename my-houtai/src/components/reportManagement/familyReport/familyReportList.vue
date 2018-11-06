<template>
    <div class="familyReportList">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}"> 
                    <div class="title"><span>条件筛选</span></div>
                    <div>                             
                            <Select v-model="sortList.province" style="width:150px" placeholder="省" filterable @on-change="getProvince">
                                <Option v-for="(item,index) in sortLists.provinceLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>
                            <Select v-model="sortList.city" style="width:150px" placeholder="市" filterable @on-change="getCity">
                                <Option v-for="(item,index) in sortLists.cityLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>
                            <Select v-model="sortList.district" style="width:150px" placeholder="县/区" filterable>
                                <Option v-for="(item,index) in sortLists.districtLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Select v-model="sortList.scorestate" style="width:100px" placeholder="得分状态" filterable>
                                <Option v-for="(item,index) in sortLists.scorestateLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>&nbsp;&nbsp;
                            <Select v-model="sortList.projectname" style="width:100px" placeholder="项目名称" filterable >
                                <Option v-for="(item,index) in sortLists.projectnameLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>&nbsp;&nbsp;
                            <Select v-model="sortList.reportstatus" style="width:100px" placeholder="报告状态" filterable >                           
                                <Option v-for="(item,index) in sortLists.reportstatusLists" :value="item" :key="index">{{ item }}</Option>
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
                        <!-- 表格 -->
                        <Table border :columns="familyReport" :data="familyReportData" size="small"></Table>
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
  name: 'familyReportList',
    data () {
        return {
        // 查询功能
            sortLists:{
                provinceLists: ["河南","广东","江西","湖南","湖北","河北","东北"],
                cityLists:["安阳"],
                districtLists: ["文峰"],
                scorestateLists:['手动输入'],
                projectnameLists:["AA"],
                reportstatusLists:[333]
            },

            // 点击查询按钮发送的参数 
            sortList:{province:null,city:null,district:null,scorestate:null,projectname:null,reportstatus:null},


            // 表格数据
            familyReport: [{title: '项目名称', align: 'center', key: '项目名称'},{title: '报告状态', align: 'center', key: '报告状态'},{title: '得分状态', align: 'center', key: '得分状态'},{title: '调研对象数量', align: 'center', key: '调研对象数量'},{title: '调研产品数量', align: 'center', key: '调研产品数量'},
                {title: '详情', align: 'center', key: '详情', 
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
            familyReportData: [{项目名称: 'John Brown',报告状态: 18,得分状态:999,调研对象数量: 'New York No. 1 Lake Park',调研产品数量: 55,详情: "查看"}],
        // 分页数据
            dataTotal:10,
            pageNum:10,
            dataPage:[]   
                   
        }
    },
    mounted(){
    // 筛选框列表
        axios({
            url:"http://192.168.0.134:8080/queryProjectname",  
            method:'get'                           
        }).then((res)=>{
            // 初始页面数据
            this.sortLists.projectNameLists = res.data
        });         
    
    //表格信息
        this.familyReportData=[],
        axios({
            url:"http://192.168.0.134:8080/accountAbnor",  
            method:'get'                           
        }).then((res)=>{
            this.dataPage = res.data;
            this.dataTotal = res.data.length;
            // 初始页面数据
            if (this.dataTotal<10) {
                for (let index = 0; index < this.dataTotal; index++) {
                    this.familyReportData.push(this.dataPage[index])
                }
            } else {
                for (let index = 0; index < 10; index++) {
                    this.familyReportData.push(this.dataPage[index])
                }                
            }                                
        });


    // 三级联动——省(拿数据)
        axios({
            url:"http://192.168.0.133:8080/provinceinfo",  
            method:'get'                           
        }).then((res)=>{
            this.sortLists.provinceLists = res.data;
        }) 
    },
    methods: {
        // 跳转详情页面
        show (index) {
            this.$router.push("/districtReport")
        },
    //导出表格数据
    //     exportData(){
    //         window.location.href="http://192.168.0.133:8080/storestatedownload?province="+this.sortList.province+"&city="+this.sortList.city+"&district="+this.sortList.district+"&storename="+this.sortList.storename+"&storelevel="+this.sortList.storelevel+"&storearea="+this.sortList.storearea
    //     },
    // // 三级联动——省(发送)
    //     getProvince(value){
    //         axios({
    //             url:"http://192.168.0.133:8080/querycity",  
    //             params:{province:value},
    //         }).then((res)=>{
    //             this.sortLists.cityLists = res.data;
    //         }) 
    //     },
    // // 三级联动——市(发送)
    //     getCity(value){
    //         axios({
    //             url:"http://192.168.0.133:8080/querydistrict",  
    //             method:'get',
    //             params:{city:value},
    //         }).then((res)=>{
    //             this.sortLists.districtLists = res.data;
    //         })             
    //     },
    // 条件搜索
            sortData(){
                this.familyReportData=[]
                axios({
                    url:"http://192.168.0.134:8080/accountAbnor",  
                    method:'get',
                    params:this.sortList                           
                }).then((res)=>{
                    this.dataPage = res.data;
                    this.dataTotal = res.data.length;
                    // 初始页面数据
                    if (this.dataTotal<10) {
                        for (let index = 0; index < this.dataTotal; index++) {
                            this.familyReportData.push(this.dataPage[index])
                        }
                    } else {
                        for (let index = 0; index < 10; index++) {
                            this.familyReportData.push(this.dataPage[index])
                        }                
                    }                                
                });
            },
        // 换页操作
            changPage(page){
            //切换页码时更改表格相应数据
                this.familyReportData = []
                if (page*10 < this.dataTotal) {
                    for (var index = (page-1)*10; index < (page)*10; index++) {
                        this.familyReportData.push(this.dataPage[index])          
                    }  
                } else {
                    for (var index = (page-1)*10; index < this.dataTotal; index++) {
                        this.familyReportData.push(this.dataPage[index])          
                    }                     
                }                                  
            } 


    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.familyReportList{
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    }
    .content{overflow: hidden;
        .page{float: right; margin-top: 10px;}
    }
}
</style>