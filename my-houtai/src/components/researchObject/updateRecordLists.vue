<template>
    <div class="updateRecordLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">  
                    <div class="title">
                        <span>条件筛选</span>
                        <el-button type="info">生成二维码</el-button>    
                    </div>
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
                        <DatePicker type="date" placeholder="开始日期" style="width: 150px" @on-change="getStartTime"></DatePicker>                                                       
                        <DatePicker type="date" placeholder="截止日期" style="width: 150px" @on-change="getOverTime"></DatePicker>                         
                        <Select v-model="sortList.auditStatus" style="width:150px" placeholder="认证状态">
                            <Option v-for="(item,index) in auditStatusLists" :value="item" :key="index">{{ item }}</Option>
                        </Select>&nbsp;
                        <Button type="success" @click="sort">&nbsp;&nbsp;搜索&nbsp;&nbsp;</Button>
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
                        <Table border ref="selection" :columns="columns4" :data="data4"></Table>
                        <!-- 换页 -->
                        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />                            
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
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
        },
        // 点击查询按钮发送的参数 
        sortList:{province:null,city:null,district:null,startTime:'',overTime:'',auditStatus:''},
        // 表格内容
        columns4: [{type: 'selection',width: 60,align: 'center'},{title: '项目名称',key: '项目名称'},{title: '调研对象',key: '调研对象'},{title: '调研编号',key: '调研编号'},{title: '审核状态',key: '审核状态'},{title: '审核时间',key: '审核时间'},                                        
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
        data4: [{项目名称: 'John Brown',调研对象: 18,调研编号: 'New York No. 1 Lake Park',审核状态: '2016-10-03', 审核时间: '2016-10-03'},{项目名称: 'John Brown',调研对象: 18,调研编号: 'New York No. 1 Lake Park',审核状态: '2016-10-03', 审核时间: '2016-10-03'}],
    }
  },
  methods:{
    // 跳转相应的位置（家化或实效）
        show (index) {
                this.$router.push("/checkLists")  // 跳转到相应项目的位置
            }
        },
    // 获取搜索日期
        getStartTime(value){
            this.sortList.startTime = value
        },
        getOverTime(value){
            this.sortList.overTime = value
            console.log(this.sortList)
        },

    // 搜索
        sort(){
            console.log('搜索功能')
        },
    // 批量通过
        batchThrough(){
            console.log("批量通过")
        },


    // 换页操作
        changPage(page){
        //切换页码时更改表格相应数据
            this.secondInstanceData = []
            for (var index = (page-1)*5; index < (page)*5; index++) {
                this.secondInstanceData.push(this.dataPage[index])          
            }       
        } 
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .updateRecordLists{
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
        .select{width: 80%;}
        .content{height: 600px; overflow: hidden;
            .power{margin-bottom: 10px;}
            .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
            .page{float: right; margin-top: 10px;}
        }
    }
</style>