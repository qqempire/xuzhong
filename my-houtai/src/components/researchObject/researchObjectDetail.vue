<template>
    <div class="researchObjectDetail">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">                   
                <div class="title">
                    <span>基本信息</span>
                    <el-button type="info" size="small" @click="goBack">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>                     
                </div>
                <Table border ref="selection" :columns="columns4" :data="data4"></Table>
                                
                </Breadcrumb>

                <Card>

                <div class="title"><span>二维码信息</span></div>                                                                     
                    <!-- 表格内容 -->
                    <div class="accessData">
                        <table class="picture" border="1">
                            <tbody>
                                <tr>
                                    <td><img :src="img" alt=""></td>
                                    <td>
                                        <ul>
                                            <li>类型</li>
                                            <li>归类</li>
                                            <li>经度</li>
                                            <li>纬度</li>
                                            <li>拍摄时间</li>
                                        </ul>
                                    </td>
                                    <td><img :src="img" alt=""></td>
                                    <td>
                                        <ul>
                                            <li>类型</li>
                                            <li>归类</li>
                                            <li>经度</li>
                                            <li>纬度</li>
                                            <li>拍摄时间</li>
                                        </ul>
                                    </td>
                                </tr>
                                <tr>
                                    <td><img :src="img" alt=""></td>
                                    <td>
                                        <ul>
                                            <li>类型</li>
                                            <li>归类</li>
                                            <li>经度</li>
                                            <li>纬度</li>
                                            <li>拍摄时间</li>
                                        </ul>
                                    </td>
                                    <td><img :src="img" alt=""></td>
                                    <td>
                                        <ul>
                                            <li>类型</li>
                                            <li>归类</li>
                                            <li>经度</li>
                                            <li>纬度</li>
                                            <li>拍摄时间</li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table> 
                    </div> 
                                                                                                                        
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
import img from '../../assets/img/login/logo.png'
export default {
  name: 'researchObjectDetail',
  data () {
    return {
        // 表格内容
        columns4: [{title: '审查访问员',key: '审查访问员'},{title: '提交日期',key: '提交日期'},{title: '认证员',key: '认证员'},{title: '确认日期',key: '确认日期'},
            {title: '调研对象',key: '调研对象'},{title: '调研编号',key: '调研编号'},{title: '经度',key: '经度'},{title: '纬度',key: '纬度'}],
        data4: [{审查访问员: 'John Brown',提交日期: 18,认证员: 'New York No. 1 Lake Park',确认日期: '2016-10-03', 调研对象: '2016-10-03',调研编号: '2016-10-03',经度: '2016-10-03',纬度: '2016-10-03'}],


        // 表格数据
        img: img,




    }
  },
  methods:{
    // 返回按钮
    goBack(){
          this.$router.push('/researchObjectLists')
      },
    //指派人员
    ok () {
        this.$Message.info('Clicked ok');
    },
    cancel () {
        this.$Message.info('Clicked cancel');
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.researchObjectDetail{
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    }   
    .accessData{height: 600px; 
        .picture{width: 100%; border-collapse: collapse;
            td{height: 25px; text-align: center; line-height: 25px;}
        }
    }           
       
}
</style>