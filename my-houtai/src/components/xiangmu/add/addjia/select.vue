<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="success" size="small" >&nbsp;&nbsp;基本信息&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small" >&nbsp;&nbsp;选择产品&nbsp;&nbsp;</el-button>
                    <el-button type="info" size="small"  >&nbsp;&nbsp;导入信息&nbsp;&nbsp;</el-button>
                    <el-button type="info" size="small"  >&nbsp;&nbsp;编辑算法&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                        <div class="select">
                            <Select v-model="model1" style="width:300px" placeholder="请选择产品类别" @on-change="change">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select><br>
                            <Input v-model="productname" placeholder="产品名称" style="width: 200px;margin:10px 0" /><br>
                            <Input v-model="sortnum" placeholder="排序值" style="width: 100px;margin:10px 0" />
                            <Button type="success" @click="tijiao()"> 提交 </Button><br><br><br>
                            <div class=" btnse">
                            <Button type="error">取消</Button>
                            <Button type="success" @click="tobase()">上一步</Button>
                            <Button type="success" @click="tobmess()">下一步</Button>
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
        select:"",
        productname:"",
        sortnum:"",
        single: false,
        value6:"",
       activeName: 'first',
        
        cityList: [
                    // {
                    //     value: 'New York',
                    //     label: 'New York'
                    // },
                    
                ],
                model1: '',
      
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
  }
 },
  methods: {
      //选择框
       change(val){
          console.log(val)
          this.select=val    
       },
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
      tobase(){
          this.$router.push("/base")
      },
      
       tobmess(){
          this.$router.push("/mess")
      },
      tijiao(){
          var that = this;
           axios({ 
                 method: 'post',
                 url:"http://192.168.0.134:8080/addProductinfo",
                 params:{productname:that.select,producttype:that.productname,sortnum:that.sortnum,}
                })
                .then(function(data){
                   console.log(data.data.msg)
                   if(data.data.msg=="添加成功!"){
                       alert("添加成功")
                   }
                   that.select="";
                   that.productname="";
                   that.sortnum=""
                })
      }
       
  },
  mounted(){
       var that = this;
      
      //产品类别下拉
          axios({ 
                  url:"http://192.168.0.134:8080/queryProductcate",
                   
                })
                .then(function(data){
                    console.log(data.data)       
                    var arr = data.data;
                    for(var i in arr){                   
                      var obj={value:arr[i].producttype,label:arr[i].producttype}
                       // console.log(obj)
                       that.cityList.push(obj)
                     }
                     
                   
                })


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .select{width: 100%;height: 300px;background: #F5F7F9;padding:30px}
     .btnse{width: 300px;height: 35px;display: flex;justify-content: space-between;padding: 0;margin: 0}
</style>