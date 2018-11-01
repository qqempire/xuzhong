<template>
    <div class="checkLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">                   
                    <el-button type="info" size="small" @click="goBack">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <el-button  type="success" size="small" @click="modal1 = true">&nbsp;&nbsp;认&nbsp;证&nbsp;&nbsp;</el-button>                  
                </Breadcrumb> 
                <div class="title"><span>修改资料</span></div>                           
                                           
                <Card>                   
                    <!-- 表格内容 -->
                    <div class="accessData">
                        <table class="picture" border="1">
                            <thead>
                                <tr>
                                    <td colspan="4" :style="{background:'#5BC0DE',color:'white'}">列表状态</td>
                                </tr>
                            </thead>
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
  name: 'checkLists',
  data () {
    return {
        // 表格数据
        img: img,

    }
  },
  methods:{
    // 返回按钮
    goBack(){
          this.$router.push('/updateRecordLists')
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
.checkLists{
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    }   
    .accessData{height: 600px; 
        .picture{width: 100%; border-collapse: collapse;
            td{height: 25px; text-align: center; line-height: 25px;}
        }
    }           
       
}
</style>