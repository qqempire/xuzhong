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
                        <el-button type="success" size="normal" :style="{marginTop:'-9px'}" @click="downloadTemplate">模板下载</el-button>  
                        <Upload                            
                            multiple
                            :format="['xls','xlsx']"                            
                            :on-format-error="handleFormatError"
                            :on-success="handleSuccess1"
                            :action=action
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
import ports from "../../assets/js/ports"
export default {
    name: 'addresearchObject',
    data () {
        return {
            portA: ports.a,
            action:ports.a+'researchObjectUpload',
            // 表格内容
            addResearchObject: [{title: '项目名称', align: 'center', key: 'projectname'},{title: '调研对象', align: 'center', key: 'researchobject'},{title: '调研编号', align: 'center', key: 'researchnum'},
            {title: '照片', align: 'center', key: 'photo'},{title: '归类', align: 'center', key: 'classify'},{title: '经度', align: 'center', key: 'longitude'},{title: '纬度', align: 'center', key: 'latitude'},
            {title: '地点备注', align: 'center', key: 'placenotes'},{title: '问题类型', align: 'center', key: 'problemtypes'},{title: '问题备注', align: 'center', key: 'questionnotes'}],
            
            addResearchObjectData: [],
            // 分页数据
                dataTotal:10,
                pageNum:10,
                dataPage:[],
                
            // 后台需求数据
            gsu:''
        }
    },

    methods:{       
        goback(){
            this.$router.push("/researchObjectLists")
        },
        // 下载模板
        downloadTemplate(){        
            window.location.href=this.portA+"researchObjectTemDown"
        },        
        // 导入调研对象
        handleSuccess1 (res, file) {

            this.$Message.info(res.msg);
            this.gsu = res.gsu;
            axios({
                url:this.portA+"queryReseObjAndProb",  
                method:'get',
                params:{currPage:1,gsu:this.gsu}                           
            }).then((data)=>{
                this.addResearchObjectData = data.data.datas;
                this.dataTotal = data.data.counts;
            })                   
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
        },
        cancel () {
            this.$Modal.info('已取消');
        },     

    // 换页操作
        changPage(page){
        //切换页码时更改表格相应数据
            this.researchObjectData = []
            axios({
                url:this.portA+"queryReseObjAndProb",  
                method:'get',
                params:{currPage:page,gsu:this.gsu}                           
            }).then((res)=>{
                this.addResearchObjectData = res.data.datas;
                this.dataTotal = res.data.counts;
            });                                   
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
            .page{float: right; margin-top: 10px; margin-bottom: 5px;}
        }
    }
</style>