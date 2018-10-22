<template>
  <div class="generatedReportList">
      <Layout :style="{marginLeft: '200px'}">            
            <Content :style="{padding: '0 16px 16px'}">
                <Card>
                    <div class="content">
                        <div class="title"><span>条件筛选</span></div>
                        <div class="select">                             
                            <Select v-model="model1" style="width:100px" placeholder="报告名称">
                                <Option v-for="item in reportList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>&nbsp;&nbsp;
                            <Row>
                                <Col span="12">
                                    <DatePicker type="date" placeholder="开始日期" style="width: 200px"></DatePicker>
                                </Col>
                                <Col span="12">
                                    <DatePicker type="date" placeholder="截止日期" style="width: 200px"></DatePicker>
                                </Col>
                            </Row>&nbsp;
                            <Button type="success">&nbsp;&nbsp;搜索&nbsp;&nbsp;</Button>
                        </div>
                        <br/>
                        <!-- 下表 -->
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info">导出表格</el-button>
                        </div>
                        <!-- 表格 -->
                        <Table border :columns="columns4" :data="data4" ></Table>
                        <!-- 表格可编辑 -->
                        <Modal
                        title="报告修改"
                        ok-text='确定'
                        v-model="modal4"
                        @on-ok="handleSuccess()"
                        @on-cancel="handleFail()"
                        draggable
                        class-name="vertical-center-modal">                       
                            <div class="addshop"><br>
                                报告名:&nbsp;<Input v-model="generatedlist.name" placeholder="项目类别" style="width: 402px;margin-top:5px" /><br>                                                                             
                                操作人:&nbsp;<Input v-model="generatedlist.operator" placeholder="门店编号" style="width: 200px;margin-top:5px" /><br>
                                创建时间:&nbsp;<Input v-model="generatedlist.startTime" placeholder="门店名称" style="width: 200px;margin-top:5px" />                                
                            </div>                                                                                                    
                    </Modal>  
                        <Page :total="dataNum" show-elevator class-name="page" @on-change="changPage" /> 
                    </div>
                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
import axios from 'axios'
export default {
  name: 'generatedReportList',
  data () {
    return {
        // 筛选条件
       reportList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                ],
                model1: '',
                textarea2: '',
                textarea3: '',
                value:"",
                value2:"" ,
        // 表格数据
        columns4: [
            {title: '报告名称', key: 'name',
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
            {title: '操作人',key: 'operator'},{title: '创建时间',key: 'startTime'},                    
            {title: '操作',key: 'operate', 
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
                                },                               
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
        data4: [{name: '中国上海',operator: '龙凤店',startTime:999},{name: '中国北京',operator: '小女店',startTime:909}], 
        
        // modal数据（编辑操作）
        generatedlist:{name:'',operator:'',startTime:'',index:''},
        modal4:false,

        // 分页数据
        dataNum:40,
        data:[{}]      

    }
  },
  mounted() {
    //请求列表总数据
    // axios({
    //     url:"http://192.168.0.133:8080/querystorestate",  
    //     methods:'get',             
    //     params:{name:'generatedReportList'}                           
    // }).then((res)=>{
    //     console.log(res.data) 
    //     this.data = res.data;       
    //     this.dataTotal = res.data.length + 1;
    //     // 初始页面数据
    //     for (let index = 0; index < 10; index++) {
    //         this.data4.push(this.data[index])           
    //     }
    // })                 
  },
  methods:{
        // 表格操作（对门店的修改）
        show (index) {
            this.generatedlist.index= index; 
            for(let key in this.data4[index]){
                this.generatedlist[key]=this.data4[index][key];
            }                  
            this.modal4 = true;
            console.log(this.generatedlist.index)
        },
        remove (index) {
        // 前端页面显示删除
            this.data4.splice(index, 1);
        // 删除操作通知后台
            // axios({
            //     url:"http://192.168.0.133:8080/downloadTemplet", 
            //     params:{index}, 
            //     methods:'get',                                        
            // })

        },

        // 编辑数据
        handleSuccess(){
            // 将修改后的数据存到前端相应的位置
            for(let key in this.data4[this.generatedlist.index]){
                this.data4[this.generatedlist.index][key]=this.generatedlist[key];
            }  
            // 把修改后的整条数据发给后台保存
            // axios({
            //     url:"http://192.168.0.133:8080/downloadTemplet", 
            //     params:{generatedlist.index,this.data4[generatedlist.index].name,this.data4[generatedlist.index].operator,this.data4[generatedlist.index].startTime}, 
            //     methods:'get',                                        
            // })

            console.log(this.data4[this.generatedlist.index].name)             
        },
        handleFail(){
            // 把修改后的整条数据发给后台删除
            // axios({
            //     url:"http://192.168.0.133:8080/downloadTemplet", 
            //     params:{generatedlist.index,this.data4[generatedlist.index].name,this.data4[generatedlist.index].operator,this.data4[generatedlist.index].startTime}, 
            //     methods:'get',                                        
            // })

            console.log(this.data4[this.generatedlist.index].name)         
        },

        // 换页操作
      changPage(page){
        //切换页码时更改表格相应数据
        for (let index = (page-1)*10; index < (page)*10; index++) {
            // this.data4.push(this.data[index])
            // console.log(index)           
        }       
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.generatedReportList{
    .content{overflow: hidden;
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
            span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
        }
        .select{display: flex; width: 650px; justify-content: space-between; align-items: center;}
        .page{float: right; margin-top: 10px;}
    }
}
</style>