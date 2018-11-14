<template>
    <div class="updateRecordLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">  
                    <div class="title">
                        <span>条件筛选</span>  
                    </div>
                    <div class="select">                             
                        <Select v-model="sortList.provinceid" style="width:100px" placeholder="省" filterable @on-change="getProvince">
                            <Option v-for="item in sortLists.provinceLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="sortList.cityid" style="width:100px" placeholder="市" filterable @on-change="getCity">
                            <Option v-for="item in sortLists.cityLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        <Select v-model="sortList.districtid" style="width:100px" placeholder="县/区" filterable>
                            <Option v-for="item in sortLists.districtLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>&nbsp;&nbsp;                     
                        <DatePicker type="date" placeholder="认证开始日期" style="width: 150px" @on-change="getStartTime"></DatePicker>                                                       
                        <DatePicker type="date" placeholder="认证截止日期" style="width: 150px" @on-change="getOverTime"></DatePicker>&nbsp;&nbsp;                         
                        <Select v-model="sortList.attestationstate" style="width:150px" placeholder="认证状态">
                            <Option v-for="(item,index) in sortLists.auditStatusLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                        <Select v-model="sortList.projectname" style="width:150px" placeholder="项目名称">
                            <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>
                        <Input v-model="sortList.researchnum" placeholder="调研编号" style="width:150px"/>
                        <Button type="success" @click="sortData">搜索</Button>
                    </div>
                </Breadcrumb>
                <Card>
                    <div class="content">                       
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info" @click="exportData">导出表格</el-button>
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
import ports from "../../assets/js/ports"
export default {
    name: 'updateRecordLists',
    data () {
        return {
            portA: ports.a,
        // 筛选框内容
            // 存贮省市区
            city:[], 
            // 查询功能
            sortLists:{
                provinceLists: [],
                cityLists:[],
                districtLists: [],
                auditStatusLists:[],
                projectNameLists:[]
            },
            // 点击查询按钮发送的参数 
            sortList:{provinceid:'',cityid:'',districtid:'',starttime:'',endtime:'',projectname:'',attestationstate:'',researchnum:''},
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
                                                    this.show(params.row.pid)
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
            dataPage:[],       
        
        }
    },
    mounted(){
    // 请求列表总数据
        axios({
            url:this.portA+"queryReseObjCertRecord",  
            method:'get',
            params:{currPage:1,sortList:this.sortList}                          
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
                // 项目名称列表关联状态
                if(this.sortLists.auditStatusLists.indexOf(datas[i].attestationstate) == -1){
                    this.sortLists.auditStatusLists.push(datas[i].attestationstate);
                }
                if(this.sortLists.projectNameLists.indexOf(datas[i].projectname) == -1){
                    this.sortLists.projectNameLists.push(datas[i].projectname);
                }


            }
            this.updateRecordData = datas;
            this.dataTotal = res.data.count;            
        });
    // 三级联动——省(拿数据)
        axios({
        method:'get',
        url:"../../../static/city.json"
        }).then((data)=>{                       
            var city = this.city = data.data;
            for(var i in city){
                var obj = {
                    value:city[i].id,
                    label:city[i].name
                }
                this.sortLists.provinceLists.push(obj)                                
            }
        })

    },
  methods:{
    // 导出表格数据
        exportData(){
            axios({
                url:this.portA+"AuthenRecordExtport",  
                method:'get',                         
            }).then((res)=>{
                window.location.href=res.data
            })            
        }, 

    // 三级联动——省(发送)
        getProvince(val){
            this.sortLists.cityLists=[]
            this.sortList.provinceid = val
                              
            var city = this.city;  
             for(var i in city){
                if(val == city[i].id){                 
                   var shi = city[i].child
                   for(var j in shi){
                       var obj = {
                           value:shi[j].id,
                           label:shi[j].name
                       }                      
                        this.sortLists.cityLists.push(obj)
                   }
                   
                }
              }
        },
    // 三级联动——市(发送)
        getCity(val2){
            this.sortLists.districtLists=[]          
            this.sortList.cityid = val2                   
            var city = this.city;  
             for(var i in city){                            
                   var shi = city[i].child
                   for(var j in shi){
                        if(val2==shi[j].id){  
                            var qu = shi[j].child;                                                                 
                            for(var k in qu){
                                 var obj = {
                                    value:qu[k].id,
                                    label:qu[k].name
                                 }    
                                 this.sortLists.districtLists.push(obj)
                            }
                        }                       
                   }                   
              }             
        },

    // 跳转详情页
        show (id) {
                this.$router.push({path:"/checkLists",query:{apid:id}})  
        },
    // 获取搜索日期
        getStartTime(value){
            this.sortList.starttime = value
        },
        getOverTime(value){
            this.sortList.endtime = value
        },

    // 搜索
        sortData(){
            axios({
                url:this.portA+"queryReseObjCertRecord",  
                method:'get',
                params:{currPage:1,sortList:this.sortList}                          
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
                url:this.portA+"attestationResObj",  
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
                url:this.portA+"queryReseObjCertRecord",  
                method:'get',
                params:{currPage:page,sortList:this.sortList}                          
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