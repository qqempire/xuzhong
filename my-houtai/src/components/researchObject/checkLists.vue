<template>
    <div class="checkLists">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">                   
                    <el-button type="info" size="small" @click="goBack">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <el-button  type="success" size="small" @click="modal1 = true">&nbsp;&nbsp;认&nbsp;证&nbsp;&nbsp;</el-button>                  
                </Breadcrumb>
                <card> 
                    <div class="title"><span>修改资料</span></div>
                    <div class="accessData">
                        <div class="row" >
                            <Card>
                                <div class="rowDetail">
                                    <img :src=img alt="" >                                   
                                    <ul>
                                        <li>类型:342</li>
                                        <li>归类:234</li>
                                        <li>经度:234</li>
                                        <li>纬度:234</li>
                                        <li>拍摄时间:2342</li>
                                    </ul>
                                </div>                                    
                            </Card>
                            <Card>
                                <div class="rowDetail">
                                    <img :src=img alt="" >                                   
                                    <ul>
                                        <li>类型:342</li>
                                        <li>归类:234</li>
                                        <li>经度:234</li>
                                        <li>纬度:234</li>
                                        <li>拍摄时间:2342</li>
                                    </ul>
                                </div>                                    
                            </Card>                                                                                                  
                        </div><br><hr> 
                    </div>                             
                </card>
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
        .row{width: 100%; display: flex; justify-content: space-between; margin-bottom: 5px; margin-top: 5px;
            .rowDetail{display: flex;justify-content: space-around;  overflow: hidden; align-items: center;
                img{ width: 100px;height: 100px; margin-right: 20px;}
            }
        }
    }           
       
}
</style>