<template>
    <div class="districtReport">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">                   
                    <el-button type="info" size="small" @click="goBack">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small">&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;</el-button>
                    <el-button type="danger" size="small">&nbsp;&nbsp;导&nbsp;出    &nbsp;&nbsp;</el-button>
                </Breadcrumb>   
                 <!-- nav -->
                    <ul class="nav">
                        <li @click="district" class="active">大区</li>
                        <li @click="sub">分报告</li>
                        <li @click="salesPerson">销售员分报告</li>
                        <li @click="customer">客户分报告</li>
                        <li @click="province">省份报告</li>
                        <li @click="detail">商店明细数据</li>
                    </ul>                           
                <Card>
                    <div class="table" >
                        <!-- 表格 -->
                        <Table border :columns="columns12" :data="data12" size="small"></Table>
                        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />                       
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'districtReport',
  data () {
    return {
    // 表格数据
        columns12: [{title: '区域', align: 'center', key: '区域'},{title: '原始得分', align: 'center', key: '原始得分'},{title: '标准得分', align: 'center', key: '标准得分'},{title: '商店总数', align: 'center', key: '商店总数'},{title: 'A+店数', align: 'center', key: 'A+店数'},
            {title: 'A店数', align: 'center', key: 'A'},{title: 'B店数', align: 'center', key: 'B店数'},{title: 'C店数', align: 'center', key: 'C店数'},{title: 'D店数', align: 'center', key: 'D店数'},{title: 'DSR店数', align: 'center', key: 'DSR店数'},
            {title: '样本总数', align: 'center', key: '样本总数'},{title: '排名', align: 'center', key: '排名'}],
        data12: [{区域: 'John Brown',原始得分: 18,标准得分:999,商店总数: 'New York No. 1 Lake Park',A: 55,A店数: "查看",B店数: 43,C店数: 99,D店数: 55,DSR店数: 77,样本总数: 88,排名:8}],
    // 分页数据
        dataTotal:10,
        pageNum:10,
        dataPage:[]              
    }
  },
    methods: {
        district () {
            this.$router.push("/districtReport")
        },
        sub() {
            this.$router.push("/subReport")
        },
        salesPerson () {
            this.$router.push("/salesPersonReport")
        },
        customer () {
            this.$router.push("/customerReport")
        },
        province () {
            this.$router.push("/provinceReport")
        },
        detail () {
            this.$router.push("/detailsReport")
        },
        // 返回按钮
        goBack(){
            this.$router.push("/familyReportList")
        },
        //切换页码时更改表格相应数据        
        changPage(page){
            this.data12 = []
            if (page*10 < this.dataTotal) {
                for (var index = (page-1)*10; index < (page)*10; index++) {
                    this.data12.push(this.dataPage[index])          
                }  
            } else {
                for (var index = (page-1)*10; index < this.dataTotal; index++) {
                    this.data12.push(this.dataPage[index])          
                }                     
            }                                  
        }                 
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.districtReport{
    .nav{display: flex; width: 600px; height: 40px; text-align: center; line-height: 40px; color: white;
        li{display:block; width: 100px; height: 40px; background: #cccccc; border-radius: 5px;}
        li:hover{background: #5BB85D;}
        .active{background: #5BB85D;} 
    }
    .table{height: 600px;
        .page{float: right; margin-top: 10px;}
    }      
}
</style>