<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="info" size="small">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small">&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;</el-button>
                    <el-button type="danger" size="small">&nbsp;&nbsp;删&nbsp;除&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                      
                        <el-table :data="tableData" stripe border style="width:100%" highlight-current-row>
                                　　
                        　　<el-table-column prop="jid" label="权限组编号" align="center" min-width="120">
                        　　</el-table-column>
                        　　<el-table-column prop="jname" label="权限组名称" align="center" min-width="100">
                        　　</el-table-column>
                        　　<el-table-column prop="jtype" label="包含权限" align="center" min-width="120">
                        　　</el-table-column>
                        　
                        　　<el-table-column label="操作" align="center" min-width="100">
                        　　　　<template slot-scope="scope">
                        　　　　　　<el-button type="info" @click="modifyUser(scope.row.jid,scope.row.jname,scope.row.jtype);modal2 = true" >修改</el-button>
                        　　　　</template>
                        　　</el-table-column>
                        </el-table>
                         
                         <Page :total="pageTotal" :current="pageNum" show-elevator show-total 
                               placement="top" @on-change="changePage" @on-page-size-change='handlePageSize'>
                         </Page>

                       
                    </div>
                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
export default {
  name: 'aaa',
  data () {
    return {
            tableData:[
           {
               jid:"1",
               jname:"0000",
               jtype:"查看详情功能,认证功能,编辑权限,导出表格",           
           },
            {
               jid:"2",
               jname:"1111",
               jtype:"认证功能,编辑权限",           
           },
            {
               jid:"3",
               jname:"2222",
               jtype:"编辑权限,导出表格",           
           },
           {
               jid:"4",
               jname:"3333",
               jtype:"查看详情功能,认证功能",           
           },
            {
               jid:"5",
               jname:"4444",
               jtype:"认证功能,编辑权限",           
           },
            {
               jid:"6",
               jname:"5555",
               jtype:"编辑权限,导出表格",           
           },
           
        ],
            pageTotal: 100,
            pageNum: 1,
            pageSize: 3,

  }
 },
  methods: {
          
            //修改用户
            modifyUser(val){
            　　let self = this;
            },
           
         
          changePage(value) {
            this.pageNum = value
            console.log(value)
            },
          

            

            
    }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    
</style>