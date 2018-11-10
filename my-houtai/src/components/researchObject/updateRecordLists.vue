<template>
    <div class="updateRecordLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">  
                    <div class="title">
                        <span>条件筛选</span>  
                    </div>
                    <div class="select">                             
                        <Select v-model="sortList.province" style="width:100px" placeholder="省" filterable @on-change="getProvince">
                            <Option v-for="(item,index) in sortLists.provinceLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                        <Select v-model="sortList.city" style="width:100px" placeholder="市" filterable @on-change="getCity">
                            <Option v-for="(item,index) in sortLists.cityLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                        <Select v-model="sortList.district" style="width:100px" placeholder="县/区" filterable>
                            <Option v-for="(item,index) in sortLists.districtLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;&nbsp;                     
                        <DatePicker type="date" placeholder="认证开始日期" style="width: 150px" @on-change="getStartTime"></DatePicker>                                                       
                        <DatePicker type="date" placeholder="认证截止日期" style="width: 150px" @on-change="getOverTime"></DatePicker>&nbsp;&nbsp;                         
                        <Select v-model="sortList.auditStatus" style="width:150px" placeholder="认证状态">
                            <Option v-for="(item,index) in sortLists.auditStatusLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                        <Select v-model="sortList.projectname" style="width:150px" placeholder="项目名称">
                            <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                        <Input v-model="sortList.importObj" placeholder="调研编号" style="width:150px"/>
                        <Button type="success" @click="sort">搜索</Button>
                    </div>
                </Breadcrumb>
                <Card>
                    <div class="content">                       
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info">导出表格</el-button>
                        </div>
                        <div class="power">
                            <Button type="success" @click="batchThrough">&nbsp;&nbsp;批量认证&nbsp;&nbsp;</Button>
                        </div>
                        <!-- 表格 -->
                        <Table border ref="selection" :columns="updateRecord" :data="updateRecordData" size="small" @on-select="selectData" @on-select-cancel="cancelData" @on-select-all="selectAllData"></Table>
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
    name: 'updateRecordLists',
    data () {
        return {

        // 筛选框内容
            // 查询功能
            sortLists:{
                provinceLists: ["河南","广东","江西","湖南","湖北","河北","东北"],
                cityLists:["安阳"],
                districtLists: ["文峰"],
                auditStatusLists:['手动输入'],
                projectNameLists:['手动输入']
            },
            // 点击查询按钮发送的参数 
            sortList:{province:null,city:null,district:null,startTime:'',overTime:'',auditStatus:'',projectname:"",importObj:""},
            // 批量认证
            attestatioData:[],
            // 表格内容
            updateRecord: [{type: 'selection',width: 50,align: 'center'},{title: '项目名称', align: 'center', key: 'projectname'},{title: '调研对象', align: 'center', key: 'researchobject'},{title: '调研编号', align: 'center', key: 'researchnum'},{title: '详细地址', align: 'center', key: 'address'},{title: '复查访问员', align: 'center', key: 'name'},                                        
                        {title: '更新时间', align: 'center', key: 'updatetime'},{title: '认证员', align: 'center', key: 'attestationuser'},{title: '确认时间', align: 'center', key: 'attestationtime'},{title: '认证状态', align: 'center', key: 'attestationstate'},
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
                                        }, '查看/认证')
                                ])             
                            }                              
                        }
                    ],
            updateRecordData: [],       
        // 分页数据
            dataTotal:10,
            pageNum:10,
            dataPage:[]          
        }
    },
    mounted(){
    // 请求列表总数据
        axios({
            url:"http://192.168.0.106:8080/queryReseObjCertRecord",  
            method:'get',
            params:{currPage:1}                          
        }).then((res)=>{
            let datas = res.data.datas;
            for(var i = 0 ; i < datas.length ; i++){
                if (datas[i].attestationstate == 1) {
                    datas[i].attestationstate = "已认证"
                }else{
                    datas[i].attestationstate = "未认证"
                }
                if(datas[i].address == undefined){
                    datas[i].address = "无"
                }
                if(datas[i].name == undefined){
                    datas[i].name = "无"
                }
                if(datas[i].updatetime == undefined){
                    datas[i].updatetime = "无"
                }                
                if(datas[i].attestationuser == undefined){
                    datas[i].attestationuser = "无"
                }
                if(datas[i].attestationtime == undefined){
                    datas[i].attestationtime = "无"
                }

            }
            this.updateRecordData = datas;
            this.dataTotal = res.data.count;
        });
    // 三级联动——省(拿数据)
        axios({
            url:"http://192.168.0.134:8080/provinceinfo",  
            method:'get'                           
        }).then((res)=>{
            this.sortLists.provinceLists = res.data;
        }) 
    },
  methods:{
    // 三级联动——省(发送)
        getProvince(value){
            axios({
                url:"http://192.168.0.134:8080/querycity",  
                params:{province:value},
            }).then((res)=>{
                this.sortLists.cityLists = res.data;
            }) 
        },
    // 三级联动——市(发送)
        getCity(value){
            axios({
                url:"http://192.168.0.134:8080/querydistrict",  
                method:'get',
                params:{city:value},
            }).then((res)=>{
                this.sortLists.districtLists = res.data;
            })             
        },

    // 跳转详情页
        show (index) {
                this.$router.push("/checkLists")  
        },
    // 获取搜索日期
        getStartTime(value){
            this.sortList.startTime = value
        },
        getOverTime(value){
            this.sortList.overTime = value
        },

    // 搜索
        sort(){
            console.log('搜索功能')
        },
    // 批量通过
        selectData(name){
            this.attestatioData = []
            name.forEach((item,index)=>{
                this.attestatioData.push(item.pid)
            })
        },
        selectAllData(name){
            this.attestatioData = []
            name.forEach((item,index)=>{
                this.attestatioData.push(item.pid)
            })
        },
        cancelData(name){
            this.attestatioData = []
            name.forEach((item,index)=>{
                this.attestatioData.push(item.pid)
            })
        },
        batchThrough(){
            let pid = ''
            this.attestatioData.forEach((item)=>{
                pid += item + ','
            })
            axios({
                url:"http://192.168.0.106:8080/attestationResObj",  
                method:'post',
                params:{
                    pids : pid.slice(0,pid.length-1)
                }                          
            }).then((res)=>{
                this.$Message.info(res.msg);
            })
        },
  

    // 换页操作
        changPage(page){
        //切换页码时更改表格相应数据
            axios({
                url:"http://192.168.0.106:8080/queryReseObjCertRecord",  
                method:'get',
                params:{currPage:page}                          
            }).then((res)=>{
                console.log(res)
                this.updateRecordData = res.data.datas;
            });                                  
        }
}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .updateRecordLists{
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
        .select{width: 100%;}
        .content{overflow: hidden;
            .power{margin-bottom: 10px;}
            .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
            .page{float: right; margin-top: 10px; margin-bottom: 5px;}
        }
    }
</style>