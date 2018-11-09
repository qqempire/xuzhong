<template>
    <div class="addresearchObject">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0',}">  
                    <div class="title">
                        <span>编辑</span> 
                        <el-button type="info" @click="goback">返回</el-button>                      
                    </div>
                    <div class="select">
                        <el-button type="success" size="normal" :style="{marginTop:'-9px'}" @click="downloadTemplate">&nbsp;&nbsp;模板下载&nbsp;&nbsp;</el-button>  
                        <Upload                            
                            multiple
                            :format="['xls','xlsx']"                            
                            :on-format-error="handleFormatError"
                            :on-success="handleSuccess1"
                            action="http://192.168.0.134:8080/storeupload"
                            style="display: inline-block;"     
                        >   
                            <Button icon="ios-cloud-upload-outline">上传调研对象</Button>
                        </Upload> 
                                                                      
                    </div>
                </Breadcrumb>
                <Card>
                    <div class="content">                       
                        <div class="title">
                            <span>列表状态</span>
                            <el-button type="info">导出表格</el-button>
                        </div>
                        <!-- 表格 -->
                        <Table border ref="selection" :columns="addResearchObject" :data="addResearchObjectData" size="small"></Table>
                        <!-- 换页 -->
                        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" />                             
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: 'addresearchObject',
    data () {
        return {
            // 表格内容
            addResearchObject: [{title: '项目名称', align: 'center', key: 'projectname'},{title: '调研对象', align: 'center', key: 'researchobject'},{title: '调研编号', align: 'center', key: 'researchnum'},
            {title: '照片', align: 'center', key: '照片'},{title: '归类', align: 'center', key: '归类'},{title: '经度', align: 'center', key: '经度'},{title: '纬度', align: 'center', key: '纬度'},
            {title: '地点备注', align: 'center', key: '地点备注'},{title: '问题类型', align: 'center', key: '问题类型'},{title: '问题备注', align: 'center', key: '问题备注'}],
            
            addResearchObjectData: [{projectname: 'John Brown',researchobject:"dalian",researchnum: '555',照片: 18,归类: '2016-10-03', 经度: '已关联',纬度: '2016-10-03', 地点备注: '2016-10-03',
            问题类型: '2016-10-03', 问题备注: '2016-10-03', }],

            // 分页数据
                dataTotal:10,
                pageNum:10,
                dataPage:[]     
        }
    },
    mounted(){
    // 请求列表总数据
        axios({
            url:"http://192.168.0.134:8080/querystorestate",  
            method:'get'                           
        }).then((res)=>{
            this.dataPage = res.data;
            this.dataTotal = res.data.length;
            // 初始页面数据
            if (this.dataTotal<10) {
                for (let index = 0; index < this.dataTotal; index++) {
                    this.researchObjectData.push(this.dataPage[index])
                    this.researchObjectData[index].area = this.dataPage[index].province+this.dataPage[index].city+this.dataPage[index].district           
                }
            } else {
                for (let index = 0; index < 10; index++) {
                    this.researchObjectData.push(this.dataPage[index])
                    this.researchObjectData[index].area = this.dataPage[index].province+this.dataPage[index].city+this.dataPage[index].district                      
                }                
            }
        });


    },
    methods:{       
        goback(){
            this.$router.push("/researchObjectLists")
        },
        // 下载模板
        downloadTemplate(){        
            window.location.href="http://192.168.0.134:8080/downloadTemplet"
        },        
        // 导入调研对象
        handleSuccess1 (res, file) {
            this.$Message.info(res.msg);         
        }, 
        handleFormatError (file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: file.name + ' 格式不正确, 请输入后缀名是xls或Xlsx的excel文件！'
            });
        },

    // 生成二维码

        ok () {
            setTimeout(() => {
                this.modal1 = false;
            }, 1000);            
            // this.$Modal.info('已成功生成二维码');
        },
        cancel () {
            this.$Modal.info('已取消');
        },     

    // 换页操作
        changPage(page){
        //切换页码时更改表格相应数据
            this.researchObjectData = []
            if (page*10 < this.dataTotal) {
                for (var index = (page-1)*10; index < (page)*10; index++) {
                    this.researchObjectData.push(this.dataPage[index])          
                }  
            } else {
                for (var index = (page-1)*10; index < this.dataTotal; index++) {
                    this.researchObjectData.push(this.dataPage[index])          
                }                     
            }                                  
        } 
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .addresearchObject{overflow: hidden;
        .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
        .select{width: 50%; display: flex; justify-content: space-between; height: 80px; align-items: center;}
        .content{overflow: hidden;
            .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;margin-bottom: 10px;}
            .page{float: right; margin-top: 10px;}
        }
    }
</style>