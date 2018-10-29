<template>
    <div class="agent">          
        <!-- 表格 -->
        <Table border :columns="agent" :data="agentData"></Table>
        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" /> 
    </div>
</template>

<script>
export default {
  name: 'agent',
  data () {
    return {
    //表格内容
        agent: [{title: '区域',key: '区域'},{title: '代理名称',key: '代理名称'},{title: '项目名称',key: '项目名称',sortable: true},{title: '开始时间',key: '开始时间',sortable: true},
                    {title: '结束时间',key: '结束时间'},{title: '每天完成数量',key: '每天完成数量'},{title: '退回比例',key: '退回比例'},{title: '退回完成率',key: '退回完成率'},
                        {title: '实际录入数量',key: '实际录入数量'},{title: '修改数量',key: '修改数量'}],
        agentData: [{区域: 'John Brown',代理名称: 18,项目名称: 'New York No. 1 Lake Park',开始时间: 55, 结束时间: 23,每天完成数量: 88,退回比例:77,退回完成率:9,实际录入数量:88,修改数量:8}],
           
    // 分页数据
        dataTotal:5,
        pageNum:5,
        dataPage:[]              
    }
  },
//  预存列表数据 
//   props:[],
  mounted(){
    //预载数据
  },
  methods:{
        // 换页操作
        // changPage(page){
        // //切换页码时更改表格相应数据
        //     this.agentData = []
        //     for (var index = (page-1)*5; index < (page)*5; index++) {
        //         this.agentData.push(this.dataPage[index])          
        //     }       
        // } 
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .agent{height: 600px;
        .page{float: right; margin-top: 10px;}
    }
</style>