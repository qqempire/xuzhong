<template>
    <div class="shopLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}" class="add">                   
                        <Upload
                            v-model="modal1"
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
                                <Select v-model="addOnestore.province" style="width:133px;margin-top:5px" placeholder="省" filterable>
                                    <Option v-for="item in provinceLists" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                                </Select>
                                <Select v-model="addOnestore.city" style="width:133px;margin-top:5px" placeholder="市">
                                    <Option v-for="item in cityLists" :value="item.value" :key="item.value" filterable>{{ item.label }}</Option>
                                </Select>
                                <Select v-model="addOnestore.district" style="width:133px;margin-top:5px" placeholder="区" filterable>
                                    <Option v-for="item in districtLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select><br><br><br><br>
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
                            <Select v-model="modal1" style="width:150px" placeholder="省" filterable>
                                <Option v-for="item in provinceLists" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <Select v-model="modal1" style="width:150px" placeholder="市" filterable>
                                <Option v-for="item in cityLists" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <Select v-model="modal1" style="width:150px" placeholder="县/区" filterable>
                                <Option v-for="item in districtLists" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Select v-model="modal1" style="width:100px" placeholder="门店名称" filterable>
                                <Option v-for="item in cityLists" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>&nbsp;&nbsp;
                            <Select v-model="modal1" style="width:100px" placeholder="门店等级" filterable>
                                <Option v-for="item in cityLists" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>&nbsp;&nbsp;
                            <Select v-model="modal1" style="width:100px" placeholder="面积范围" filterable>
                                <Option v-for="item in cityLists" :value="item.label" :key="item.value">{{ item.label }}</Option>
                            </Select>&nbsp;&nbsp;
                            <Button type="success" @click="querystorestate">&nbsp;&nbsp;搜索&nbsp;&nbsp;</Button>
                        </div>
                        <br/>
                        <!-- 下表 -->
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info">导出表格</el-button>
                        </div>
                        <!-- 表格 -->
                        <Table border :columns="columns9" :data="data9" ></Table>                       
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
            value:"",
            modal1:'',
            //添加单个列表
            modal12:false,
            addOnestore:{province:'',city:'',district:'',projecttype:'',storelevel:'',storearea:'',storenum:'',storename:'',storelong:'',storelat:'',detailsaddr:''},
            // 选择列表
            provinceLists: [{ value: 'New York',label: 'New York'},{ value: 'Beijing',label: 'Beijing'},{ value: 'Kongkong',label: 'Kongkong'},{ value: 'Japan',label: 'Japan'},],
            cityLists: [{ value: 'New York',label: 'New York'},{ value: 'Beijing',label: 'Beijing'},{ value: 'Kongkong',label: 'Kongkong'},{ value: 'Japan',label: 'Japan'},],
            districtLists: [{ value: 'New York',label: 'New York'},{ value: 'Beijing',label: 'Beijing'},{ value: 'Kongkong',label: 'Kongkong'},{ value: 'Japan',label: 'Japan'},],
           
            // 表格数据
            columns9: [{title: 'name', key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }            
                },
                {title: '门店名称',key: '门店名称'},{title: '门店编号',key: '门店编号'},{title: '详细地址',key: '详细地址'},{title: '门店等级',key: '门店等级'},{title: '面积范围',key: '面积范围'},{title: '经度',key: '经度'},{title: '维度',key: '维度'},                    
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
            data9: [{name: '中国上海',门店名称: '龙凤店',门店编号:999, 详细地址: '中国上海',门店等级: "AA",面积范围: 333,经度: 231,维度: 888,},],                           
        }
    },
    methods: {
        downloadTemplate(){        
        // 下载模板
            axios({
                url:"http://192.168.0.133:8080/downloadTemplet",  
                methods:'get',                                        
            })
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
                    methods:'get',             
                    params:this.addOnestore                            
                }).then((res)=>{
                    alert(res.data)                   
                    // 清空this.addOnestore中的value
                    for (const key in this.addOnestore) {
                         this.addOnestore[key]==''                       
                    }

                }) 
            }
        }, 
        //批量上传
        handleSuccess1 (res, file) {
            // debugger;
            alert(res.msg)         
        },  
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: file.name + ' 格式不正确, 请输入后缀名是xls或Xlsx的excel文件！'
            });
        },
        // 条件搜索
        querystorestate(){
            axios({
                    url:"http://192.168.0.133:8080/querystorestate",  
                    methods:'get',             
                    params:{}                           
                }).then((res)=>{
                    console.log(res.data)                   
                }) 
        },


        // 表格操作（对门店的修改）
        show (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `Name：${this.data9[index].name}<br>Age：${this.data9[index].age}<br>Address：${this.data9[index].address}`
            })
        },
        remove (index) {
            this.data9.splice(index, 1);
        }      
        
    },




    mounted(){

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .shopLists{
        .add{width: 500px; height: 80px; display: flex; justify-content: space-around; align-items: center;}  
        .content{ height: 600px;
            .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
                span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
            }
        }  
    }
</style>