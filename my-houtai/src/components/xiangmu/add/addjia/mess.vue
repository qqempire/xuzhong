<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="success" size="small" >&nbsp;&nbsp;基本信息&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small" >&nbsp;&nbsp;选择产品&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small"  >&nbsp;&nbsp;导入信息&nbsp;&nbsp;</el-button>
                    <el-button type="info" size="small"  >&nbsp;&nbsp;编辑算法&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Card>
                        <div style="height: 600px">
                        <div class="dao">
                            <el-button type="info" class="loadbtn" @click="clearlist">下载清单模板</el-button>
                            <el-button type="info" class="loadbtn"  @click="daili">下载代理指标模板</el-button>
                            <div >
                                
                                <div class="shangchuan">
                                    <el-upload
                                        class="upload-demo"
                                        action="http://192.168.0.134:8080/uploadHousePjInfo"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                        :on-success="success1"
                                         multiple
                                        :limit="3"
                                        :on-exceed="handleExceed"
                                        >
                                        <el-button size="small" type="primary">点击上传清单模板</el-button>
                                    
                                    </el-upload>
                                </div>
                                
                            </div>
                            
                            
                            <div >
                            
                                <div class="shangchuan">
                                    <el-upload
                                        class="upload-demo"
                                        action="http://192.168.0.134:8080/uploadProxyIndic"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-remove="beforeRemove"
                                         :on-success="success2"
                                         multiple
                                        :limit="3"
                                        :on-exceed="handleExceed"
                                        >
                                        <el-button size="small" type="primary">点击上传代理指标模板</el-button>
                                    
                                    </el-upload>
                                </div>
                                
                            </div>
                            <div class="beizhu">
                                <Input v-model="value6" type="textarea" :rows="4" placeholder="备注信息" />
                            </div>
                            <div class="btn1">
                                <Button type="error">取消</Button>
                                <Button type="success"  @click="toselect()">上一步</Button>
                                <Button type="success" @click="tosuanfa()">下一步</Button>
                            </div>
                        </div>
                    </div>

                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
import $ from "jquery"
import axios from "axios"

export default {
  name: 'Addjia',
  data () {
    return {
        single: false,
        value6:"",
       activeName: 'first',
        value: '',
       
        // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
  }
 },
  methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      //头部导航
     
       toselect(){
          this.$router.push("/select")
      },
       
       tosuanfa(){
          this.$router.push("/suanfa")
      },
      //下载清单按钮
      clearlist(){
          window.location.href="http://192.168.0.134:8080/housePJinfotemp";
      },
      success1(response, file, fileList){
         console.log(response)
         if(response.msg=="上传成功"){
             alert("上传成功")
         }
      },
      //下载代理按钮
      daili(){
          window.location.href="http://192.168.0.134:8080/proxyIndicatorTemp";
        //    var that = this;
        //    axios({ 
        //          url:"http://192.168.0.134:8080/proxyIndicatorTemp", 
        //         })
        //         .then(function(data){
                  
        //         })
      },
       success2(response, file, fileList){
         console.log(response)
         if(response.msg=="上传成功"){
             alert("上传成功")
         }
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .dao{background: #F5F7F9;padding: 10px}
     .loadbtn{margin-bottom: 10px}
     .shangchuan{width: 400px;height: 100px;border: 1px solid #ccc;border-radius: 5px;overflow: auto;margin:10px 0}
     .beizhu{width:400px }
     .btn1{width: 400px;height: 35px;margin: 10px;display: flex;justify-content: space-around}
</style>