<template>
    <div class="researchObjectLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">  
                    <div class="title">
                        <span>条件筛选</span>
                        <el-button type="info" @click="modal1 = true">生成二维码</el-button>
                        <Modal
                            v-model="modal1"
                            title="请输入您想要的二维码数量"
                            :loading="loading"
                            @on-ok="ok"
                            @on-cancel="cancel">
                            <Input v-model="codeNum" placeholder="二维码数量" style="width:150px"/>
                        </Modal>                        
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

                            <Select v-model="sortList.projectname" style="width:150px" placeholder="项目名称">
                                <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>                            
                            <Select v-model="sortList.relationstate" style="width:150px" placeholder="二维码关联状态">
                                <Option v-for="(item,index) in sortLists.auditStatusLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>
                            <Input v-model="sortList.researchnum" placeholder="调研编号" style="width:150px"/>&nbsp;&nbsp;
                            <Button type="success" @click="sort">搜索</Button>&nbsp;&nbsp;
                            <Button type="success" @click="importObj">导入调研对象</Button>                                           
                    </div>
                </Breadcrumb>
                <Card>
                    <div class="content">                       
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <!-- 表格 -->
                        <Table border ref="selection" :columns="researchObject" :data="researchObjectData" size="small"></Table>
                        <!-- 换页 -->
                        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />                             
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import axios from "axios"
import ports from "../../assets/js/ports"
export default {
    name: 'researchObjectLists',
    data () {
        return {
            portA: ports.a,
        // 存贮省市区
            city:[], 

            // 二维码生成
            modal1:false,
            loading:"",
            codeNum:"",
        // 筛选框内容
            // 查询功能
            sortLists:{
                provinceLists: [],
                cityLists:[],
                districtLists: [],
                auditStatusLists:[],
                projectNameLists:[]
            },
            // 点击查询按钮发送的参数 
            sortList:{provinceid:'',cityid:'',districtid:'',relationstate:'',researchnum:'',projectname:'',},

            // 表格内容
            researchObject: [{type: 'selection',width: 50,align: 'center'},{title: '项目名称', align: 'center', key: 'projectname'},{title: '地区', align: 'center', key: 'address'},{title: '调研编号', align: 'center', key: 'researchnum'},{title: '调研对象', align: 'center', key: 'researchobject'},{title: '关联日期', align: 'center', key: 'relationdate'},{title: '二维码关联状态', align: 'center', key: 'relationstate'},                                        
                        {title: '查看详情', align: 'center', key: '查看详情', 
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
                                        }, '详情')
                                ])             
                            }                              
                        }
                    ],
            researchObjectData: [],
            // 分页数据
                dataTotal:10,
                pageNum:10,
                dataPage:[]     
        }
    },
    mounted(){
    // 请求列表总数据
        axios({
            url:this.portA+"queryResObjAndCodeCola",
            method:'get',
            params:{currPage:1,sortList:this.sortList}                          
        }).then((res)=>{
            let datas = res.data.datas;
            for(var i = 0 ; i < datas.length ; i++){
                if (datas[i].relationstate == 1) {
                    datas[i].relationstate = "已认证"
                }else{
                    datas[i].relationstate = "未认证"
                }
                if(datas[i].address == undefined){
                    datas[i].address = "无"
                }
                if(datas[i].name == undefined){
                    datas[i].name = "无"
                }
                if(datas[i].relationdate == undefined){
                    datas[i].relationdate = "无"
                }                
                if(datas[i].attestationuser == undefined){
                    datas[i].attestationuser = "无"
                }
                if(datas[i].attestationtime == undefined){
                    datas[i].attestationtime = "无"
                }
                // 项目名称列表关联状态
                if(this.sortLists.auditStatusLists.indexOf(datas[i].relationstate) == -1){
                    this.sortLists.auditStatusLists.push(datas[i].relationstate);
                }
                if(this.sortLists.projectNameLists.indexOf(datas[i].projectname) == -1){
                    this.sortLists.projectNameLists.push(datas[i].projectname);
                }
            }            
            this.researchObjectData = datas;
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
                url:this.portA+"exporttable",  
                method:'get',                         
            }).then((res)=>{
                window.location.href=res.data
            })            
        },   
    // 添加调研对象
        importObj (index) {
            this.$router.push("/addresearchObject")  
        },
    // 跳转到相应项目的位置
        show (id) {
            this.$router.push({path:"/researchObjectDetail",query:{apid:id}})  
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

    // 生成二维码
        ok () {        
            axios({
                url:this.portA+"generTwoDimensCode",  
                method:'get',
                params:{count:this.codeNum}                          
            }).then((res)=>{
                this.modal1 = false;
                window.location.href=res.data
            })
        },
        cancel () {
            this.$Message.success("已取消")
        },     

    // 条件搜索
    sort(){
        this.researchObjectData = [];
        console.log(this.sortList)
        axios({
            url:this.portA+"queryResObjAndCodeCola",
            method:'get',
            params:{currPage:1,sortList:this.sortList}                          
        }).then((res)=>{
            let datas = res.data.datas;
            for(var i = 0 ; i < datas.length ; i++){
                if (datas[i].relationstate == 1) {
                    datas[i].relationstate = "已认证"
                }else{
                    datas[i].relationstate = "未认证"
                }
                if(datas[i].address == undefined){
                    datas[i].address = "无"
                }
                if(datas[i].name == undefined){
                    datas[i].name = "无"
                }
                if(datas[i].relationdate == undefined){
                    datas[i].relationdate = "无"
                }                
                if(datas[i].attestationuser == undefined){
                    datas[i].attestationuser = "无"
                }
                if(datas[i].attestationtime == undefined){
                    datas[i].attestationtime = "无"
                }
            }
            this.researchObjectData= datas;
            this.dataTotal = res.data.count;
        });
    },

    // 换页操作
        changPage(page){
        //切换页码时更改表格相应数据
            this.researchObjectData = []
            axios({
                url:this.portA+"queryResObjAndCodeCola",
                method:'get',
                params:{currPage:1,sortlist:this.sortList}                          
            }).then((res)=>{
                let datas = res.data.datas;
                for(var i = 0 ; i < datas.length ; i++){
                    if (datas[i].relationstate == 1) {
                        datas[i].relationstate = "已认证"
                    }else{
                        datas[i].relationstate = "未认证"
                    }
                    if(datas[i].address == undefined){
                        datas[i].address = "无"
                    }
                    if(datas[i].name == undefined){
                        datas[i].name = "无"
                    }
                    if(datas[i].relationdate == undefined){
                        datas[i].relationdate = "无"
                    }                
                    if(datas[i].attestationuser == undefined){
                        datas[i].attestationuser = "无"
                    }
                    if(datas[i].attestationtime == undefined){
                        datas[i].attestationtime = "无"
                    }
                }
                this.researchObjectData = datas;
            });
        
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .researchObjectLists{ overflow: hidden;
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
        .content{overflow: hidden;
            .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
            .page{float: right; margin-top: 10px; margin-bottom: 5px;}
        }
    }
</style>