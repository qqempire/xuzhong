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
                            <Select v-model="sortList.province" style="width:100px" placeholder="省" filterable @on-change="getProvince">
                                <Option v-for="(item,index) in sortLists.provinceLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>
                            <Select v-model="sortList.city" style="width:100px" placeholder="市" filterable @on-change="getCity">
                                <Option v-for="(item,index) in sortLists.cityLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>
                            <Select v-model="sortList.district" style="width:100px" placeholder="县/区" filterable>
                                <Option v-for="(item,index) in sortLists.districtLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>&nbsp;&nbsp;
                            <Select v-model="sortList.projectname" style="width:150px" placeholder="项目名称">
                                <Option v-for="(item,index) in sortLists.projectNameLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>                            
                            <Select v-model="sortList.codeState" style="width:150px" placeholder="二维码关联状态">
                                <Option v-for="(item,index) in sortLists.codeStateLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>
                            <Input v-model="sortList.importObj" placeholder="调研编号" style="width:150px"/>&nbsp;&nbsp;
                            <Button type="success" @click="sort">搜索</Button>&nbsp;&nbsp;
                            <Button type="success" @click="importObj">导入调研对象</Button>                                           
                    </div>
                </Breadcrumb>
                <Card>
                    <div class="content">                       
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info">导出表格</el-button>
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
export default {
    name: 'researchObjectLists',
    data () {
        return {
            // 二维码生成
            modal1:false,
            loading:"",
            codeNum:"",
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
            sortList:{province:null,city:null,district:null,startTime:'',overTime:'',auditStatus:'',importObj:""},

            // 表格内容
            researchObject: [{type: 'selection',width: 50,align: 'center'},{title: '项目名称', align: 'center', key: 'projectname'},{title: '地区', align: 'center', key: '地区'},{title: '调研编号', align: 'center', key: 'researchnum'},{title: '调研对象', align: 'center', key: 'researchobject'},{title: '关联日期', align: 'center', key: '关联日期'},{title: '二维码关联状态', align: 'center', key: '二维码关联状态'},                                        
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
                                                    this.show(params.index)
                                                }
                                            }
                                        }, '详情')
                                ])             
                            }                              
                        }
                    ],
            researchObjectData: [{projectname: 'John Brown',地区:"dalian",researchnum: '555',researchobject: 18,关联日期: '2016-10-03', 二维码关联状态: '已关联'},],

            // 分页数据
                dataTotal:10,
                pageNum:10,
                dataPage:[]     
        }
    },
    mounted(){
    // 请求列表总数据
        axios({
            url:"http://192.168.0.134:8080/querystorestate",  
            method:'get'                           
        }).then((res)=>{
            this.dataPage = res.data;
            this.dataTotal = res.data.length;
            // 初始页面数据
            if (this.dataTotal<10) {
                for (let index = 0; index < this.dataTotal; index++) {
                    this.researchObjectData.push(this.dataPage[index])
                    this.researchObjectData[index].area = this.dataPage[index].province+this.dataPage[index].city+this.dataPage[index].district           
                }
            } else {
                for (let index = 0; index < 10; index++) {
                    this.researchObjectData.push(this.dataPage[index])
                    this.researchObjectData[index].area = this.dataPage[index].province+this.dataPage[index].city+this.dataPage[index].district                      
                }                
            }
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
    // 添加调研对象
        importObj (index) {
            this.$router.push("/addresearchObject")  
        },
    // 跳转到相应项目的位置
        show (index) {
            this.$router.push("/researchObjectDetail")  
        },    
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
    // 生成二维码
        ok () {
            setTimeout(() => {
                this.modal1 = false;
            }, 1000);            
            // this.$Modal.info('已成功生成二维码');
        },
        cancel () {
            this.$Modal.info('已取消');
        },     


    // 条件搜索
    sort(){
        this.researchObjectData = [];
        axios({
                url:"http://192.168.0.134:8080/querystorestate",              
                params:this.sortList                           
            }).then((res)=>{
                this.dataPage = res.data;
                this.dataTotal = res.data.length;
                // 初始页面数据
                if (this.dataTotal<10) {
                    for (let index = 0; index < this.dataTotal; index++) {
                        this.researchObjectData.push(this.dataPage[index])
                        this.researchObjectData[index].area = this.dataPage[index].province+this.dataPage[index].city+this.dataPage[index].district           
                    }
                } else {
                    for (let index = 0; index < 10; index++) {
                        this.researchObjectData.push(this.dataPage[index])
                        this.researchObjectData[index].area = this.dataPage[index].province+this.dataPage[index].city+this.dataPage[index].district                      
                    }                
                }                                     
            }) 
    },

    // 换页操作
        changPage(page){
        //切换页码时更改表格相应数据
            this.researchObjectData = []
            if (page*10 < this.dataTotal) {
                for (var index = (page-1)*10; index < (page)*10; index++) {
                    this.researchObjectData.push(this.dataPage[index])          
                }  
            } else {
                for (var index = (page-1)*10; index < this.dataTotal; index++) {
                    this.researchObjectData.push(this.dataPage[index])          
                }                     
            }                                  
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