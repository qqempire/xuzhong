<template>
    <div class="examine">
        <!-- 表格 -->
        <Table border :columns="examine" :data="examineData" size="small"></Table>
        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" /> 
    </div>
</template>

<script>
export default {
  name: 'examine',
  data () {
    return {
        // 表格内容
        examine: [{title: '审核职位',key: '审核职位'},{title: '用户名',key: '用户名'},{title: '手机号',key: '手机号'},{title: '审核完成数量',key: '审核完成数量',sortable: true},
            {title: '一审自动审核数',key: '一审自动审核数',sortable: true},{title: '批量审核数量',key: '批量审核数量',sortable: true },{title: '单项审核数量',key: '单项审核数量',sortable: true},
            {title: '有效审核数量',key: '有效审核数量',sortable: true },{title: '退回数量',key: '退回数量',sortable: true}],
        examineData: [{审核职位: 'John Brown',用户名: 18,手机号: 'New York No. 1 Lake Park',审核完成数量: 55,一审自动审核数: 23,批量审核数量: 88,单项审核数量:77,有效审核数量:9,退回数量:44}],
        // 分页数据
            dataTotal:10,
            pageNum:10,
            dataPage:[]              
    }
  },
//  预存列表数据  
    // props:{
    //     examineData
    // },
  mounted(){
    //预载数据
  },

  methods:{
        // 换页操作
            changPage(page){
            //切换页码时更改表格相应数据
                this.agentData = []
                if (page*10 < this.dataTotal) {
                    for (var index = (page-1)*10; index < (page)*10; index++) {
                        this.agentData.push(this.dataPage[index])          
                    }  
                } else {
                    for (var index = (page-1)*10; index < this.dataTotal; index++) {
                        this.agentData.push(this.dataPage[index])          
                    }                     
                }                                  
            }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .examine{height: 600px;
        .page{float: right; margin-top: 10px;}
    } 
</style>