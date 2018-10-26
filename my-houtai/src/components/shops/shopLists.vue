<template>
    <div class="shopLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}" class="add">                   
                        <Upload                            
                            multiple
                            :format="['xls','xlsx']"                            
                            :on-format-error="handleFormatError"
                            :on-success="handleSuccess1"
                            action="http://192.168.0.133:8080/storeupload"     
                            >   
                            <Button icon="ios-cloud-upload-outline">批量上传</Button>
                        </Upload>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-button type="success" size="normal" :style="{marginTop:'-9px'}" @click="modal12 = true">&nbsp;&nbsp;单个添加&nbsp;&nbsp;</el-button>  
                        <el-button type="success" size="normal" :style="{marginTop:'-9px'}" @click="downloadTemplate">&nbsp;&nbsp;模板下载&nbsp;&nbsp;</el-button>  
                    <Modal
                        title="单个门店添加"
                        ok-text='添加'
                        v-model="modal12"
                        @on-ok="handleSuccess2"
                        draggable
                        class-name="vertical-center-modal">                       
                            <div class="addshop"><br>
                            <Select v-model="addOnestore.province" style="width:150px" placeholder="省" filterable>
                                <Option v-for="item in sortLists.provinceLists" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                            <Select v-model="addOnestore.city" style="width:150px" placeholder="市" filterable>
                                <Option v-for="item in sortLists.cityLists" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                            <Select v-model="addOnestore.district" style="width:150px" placeholder="县/区" filterable>
                                <Option v-for="item in sortLists.districtLists" :value="item" :key="item">{{ item }}</Option>
                            </Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Input v-model="addOnestore.projecttype" placeholder="项目类别" style="width: 402px;margin-top:5px" />                                                                              
                                <Input v-model="addOnestore.storenum" placeholder="门店编号" style="width: 200px;margin-top:5px" />
                                <Input v-model="addOnestore.storename" placeholder="门店名称" style="width: 200px;margin-top:5px" />                                
                                <Input v-model="addOnestore.storearea" placeholder="门店面积" style="width: 200px;margin-top:5px" />                                                                              
                                <Input v-model="addOnestore.storelevel" placeholder="门店等级" style="width: 200px;margin-top:5px" /><br>
                                <Input v-model="addOnestore.storelat" placeholder="门店经度" style="width: 200px;margin-top:5px" />
                                <Input v-model="addOnestore.storelong" placeholder="门店纬度" style="width: 200px;margin-top:5px" /><br>
                                <Input v-model="addOnestore.detailsaddr" placeholder="详细地址" style="width: 402px;margin-top:5px" />                                                                            
                            </div>                                                                                                    
                    </Modal>
                </Breadcrumb>
                <Card>
                    <div class="content">
                        <div class="title"><span>条件筛选</span></div>
                        <div class="select">                             
                            <Select v-model="sortList.province" style="width:150px" placeholder="省" filterable @on-change="getProvince">
                                <Option v-for="(item,index) in sortLists.provinceLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>
                            <Select v-model="sortList.city" style="width:150px" placeholder="市" filterable @on-change="getCity">
                                <Option v-for="(item,index) in sortLists.cityLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>
                            <Select v-model="sortList.district" style="width:150px" placeholder="县/区" filterable>
                                <Option v-for="(item,index) in sortLists.districtLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Input v-model="sortList.storename" placeholder="门店名称" style="width:100px"/>
                            <Select v-model="sortList.storelevel" style="width:100px" placeholder="门店等级" filterable >
                                <Option v-for="(item,index) in sortLists.storeLevelLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>&nbsp;&nbsp;
                            <Select v-model="sortList.storearea" style="width:100px" placeholder="面积范围" filterable >                           
                                <Option v-for="(item,index) in sortLists.storeAreaLists" :value="item" :key="index">{{ item }}</Option>
                            </Select>&nbsp;&nbsp;
                            <Button type="success" @click="querystorestate">&nbsp;&nbsp;搜索&nbsp;&nbsp;</Button>
                        </div>
                        <br/>
                        <!-- 下表 -->
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info" @click="exportData">导出表格</el-button>
                        </div>
                        <!-- 表格 -->
                        <Table border :columns="columns9" :data="data9" ></Table>
                        <Modal
                            title="单个门店修改"
                            ok-text='保存'
                            v-model="modal4"
                            @on-ok="handleSuccess()"
                            draggable
                            class-name="vertical-center-modal"> 
                                区域:<Input v-model="storeList.area" placeholder="区域" style="width: 402px;margin-top:5px" /> <br>                                                                             
                                门店名称:<Input v-model="storeList.storename" placeholder="门店名称" style="width:300px; margin-top:5px" /> <br>                                                               
                                门店编号:<Input v-model="storeList.storenum" placeholder="门店编号" style="width:300px; margin-top:5px" /><br>
                                详细地址:<Input v-model="storeList.detailsaddr" placeholder="详细地址" style="width:300px; margin-top:5px" />  <br>                                                                                                                                                                              
                                门店等级:<Input v-model="storeList.storelevel" placeholder="门店等级" style="width:300px; margin-top:5px" /><br>                               
                                面积范围:<Input v-model="storeList.storearea" placeholder="面积范围" style="width:300px; margin-top:5px" />  <br>                                                                            
                                门店经度:<Input v-model="storeList.storelat" placeholder="门店经度" style="width:300px; margin-top:5px" /><br>
                                门店纬度:<Input v-model="storeList.storelong" placeholder="门店纬度" style="width:300px; margin-top:5px" /><br>
                        </Modal>                         
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
    name: 'shopLists',
    data () {
        return {            
        //添加单个列表
            modal12:false,
            addOnestore:{province:'',city:'',district:'',projecttype:'',storelevel:'',storearea:'',storenum:'',storename:'',storelong:'',storelat:'',detailsaddr:''},
           
        // 表格数据
            columns9: [{title: '区域', key: 'area',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.area)
                            ]);
                        }            
                },
                {title: '门店名称',key: 'storename'},{title: '门店编号',key: 'storenum'},{title: '详细地址',key: 'detailsaddr'},{title: '门店等级',key: 'storelevel'},{title: '面积范围',key: 'storearea'},{title: '经度',key: 'storelat'},{title: '维度',key: 'storelong'},                    
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
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data9:[],     //[{area: '中国上海',storename: '龙凤店',storenum:999, detailsaddr: '中国上海',storelevel: "AA",storearea: 333,storelat: 231,storelong: 888,}],                           
            
        // 查询功能
            sortLists:{
                provinceLists: ["河南","广东","江西","湖南","湖北","河北","东北"],
                cityLists:["安阳"],
                districtLists: ["文峰"],
                storeNameLists:['手动输入'],
                storeLevelLists:["AA"],
                storeAreaLists:[333]
            },

            // 点击查询按钮发送的参数 
            sortList:{province:null,city:null,district:null,storename:null,storelevel:null,storearea:null},

        // modal数据（编辑操作）
            storeList:{area:'',storename:'',storenum:'',detailsaddr:'',storelevel:'',storearea:'',storelat:'',storelong:'',index:''},
            modal4:false,            
                       
        // 分页数据
            dataTotal:5,
            pageNum:5,
            dataPage:[]  
        }
    },
    mounted() {
    // 请求列表总数据
        axios({
            url:"http://192.168.0.133:8080/querystorestate",  
            method:'get'                           
        }).then((res)=>{
            this.dataPage = res.data;
            this.dataTotal = res.data.length;
            // 初始页面数据
            if (this.dataTotal<5) {
                for (let index = 0; index < this.dataTotal; index++) {
                    this.data9.push(this.dataPage[index])
                    this.data9[index].area = this.dataPage[index].province+this.dataPage[index].city+this.dataPage[index].district           
                }
            } else {
                for (let index = 0; index < 5; index++) {
                    this.data9.push(this.dataPage[index])
                    this.data9[index].area = this.dataPage[index].province+this.dataPage[index].city+this.dataPage[index].district                      
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
        // 门店等级
        axios({
            url:"http://192.168.0.133:8080/querystorelevel",  
            method:'get'                           
        }).then((res)=>{
            this.sortLists.storeLevelLists = res.data;
        })
        // 门店范围
        axios({
            url:"http://192.168.0.133:8080/querystorearea",  
            method:'get'                           
        }).then((res)=>{
            this.sortLists.storeAreaLists = res.data;
        })        
    },
    methods: {
        //导出表格数据
        exportData(){
            window.location.href="http://192.168.0.133:8080/storestatedownload?province="+this.sortList.province+"&city="+this.sortList.city+"&district="+this.sortList.district+"&storename="+this.sortList.storename+"&storelevel="+this.sortList.storelevel+"&storearea="+this.sortList.storearea
        },
    // 三级联动——省(发送)
        getProvince(value){
            axios({
                url:"http://192.168.0.133:8080/querycity",  
                params:{province:value},
            }).then((res)=>{
                this.sortLists.cityLists = res.data;
            }) 
        },
    // 三级联动——市(发送)
        getCity(value){
            axios({
                url:"http://192.168.0.133:8080/querydistrict",  
                method:'get',
                params:{city:value},
            }).then((res)=>{
                this.sortLists.districtLists = res.data;
            })             
        },

        // 下载模板
        downloadTemplate(){        
            window.location.href="http://192.168.0.133:8080/downloadTemplet"
        },
        //上传功能（success或者error）
        //单个上传
        handleSuccess2(){
            var onOff = true;
            for (let key in this.addOnestore) {                
                if (this.addOnestore[key]=='') {
                    onOff = false;
                    alert("请将信息输入完整!")
                    return false;
                }
            }
            if(onOff){
                axios({
                    url:"http://192.168.0.133:8080/sinaddstoinfo",               
                    params:this.addOnestore                            
                }).then((res)=>{
                    alert(res.data.msg)                   
                    // 清空this.addOnestore中的value
                    for (const key in this.addOnestore) {
                         this.addOnestore[key]==''                       
                    }
                }) 
            }
        }, 
        //批量上传
        handleSuccess1 (res, file) {
            alert(res.msg)         
        },  
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: file.name + ' 格式不正确, 请输入后缀名是xls或Xlsx的excel文件！'
            });
        },
        // 条件搜索
        getStoreArea(value){ console.log(this.sortList)},
        querystorestate(){
            this.data9 = [];
            axios({
                    url:"http://192.168.0.133:8080/querystorestate",              
                    params:this.sortList                           
                }).then((res)=>{
                    this.dataPage = res.data;
                    this.dataTotal = res.data.length;
                    // 初始页面数据
                    if (this.dataTotal<5) {
                        for (let index = 0; index < this.dataTotal; index++) {
                            this.data9.push(this.dataPage[index])
                            this.data9[index].area = this.dataPage[index].province+this.dataPage[index].city+this.dataPage[index].district           
                        }
                    } else {
                        for (let index = 0; index < 5; index++) {
                            this.data9.push(this.dataPage[index])
                            this.data9[index].area = this.dataPage[index].province+this.dataPage[index].city+this.dataPage[index].district                      
                        }                
                    }                                     
                }) 
        },

    // 表格操作（对门店的修改）
        show (index) {
            this.storeList.index= index; 
            for(let key in this.data9[index]){
                this.storeList[key]=this.data9[index][key];
            }                  
            this.modal4 = true;
        },
        remove (index) {        
        // 删除操作通知后台
            axios({
                url:"http://192.168.0.133:8080/deleteStoreinfo", 
                method:'post',
                params:{storenum:this.data9[index].storenum},                                      
            }).then((res)=>{
                alert(res.data.msg)
                // 前端页面显示删除
                this.data9.splice(index, 1);
            })
        },

        // 编辑数据
        handleSuccess(){
            // 把修改后的整条数据发给后台保存
                console.log(this.data9[this.storeList.index])   
            axios({
                url:"http://192.168.0.133:8080/updateStoreinfo", 
                params:this.data9[this.storeList.index], 
                method:'post',                                        
            }).then((res)=>{
                alert(res.data.msg)
                // 将修改后的数据存到前端相应的位置
                for(let key in this.data9[this.storeList.index]){
                    this.data9[this.storeList.index][key]=this.storeList[key];
                }                   
            })                    
        },
        // 换页操作
        changPage(page){
        //切换页码时更改表格相应数据
            this.data9 = []
            for (var index = (page-1)*5; index < (page)*5; index++) {
                this.data9.push(this.dataPage[index])          
            }       
        }      
        
    },

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .shopLists{
        .add{width: 500px; height: 80px; display: flex; justify-content: space-around; align-items: center;}  
        .content{overflow: hidden; height: 600px;
            .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
                span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
            }
            .select{display: flex; width:800px; justify-content: space-between; align-items: center;}
            .page{float: right; margin-top: 10px;}
        }  
    }
</style>