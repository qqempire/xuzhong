<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="info" size="small" @click="tobase()">&nbsp;&nbsp;基本信息&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small"  @click="toselect()">&nbsp;&nbsp;选择产品&nbsp;&nbsp;</el-button>
                    <el-button type="info" size="small"  @click="tobmess()">&nbsp;&nbsp;导入信息&nbsp;&nbsp;</el-button>
                    <el-button type="info" size="small"  @click="tosuanfa()">&nbsp;&nbsp;编辑算法&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                        <div class="select">
                            <Select v-model="model1" style="width:300px" placeholder="请选择产品类别">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select><br>
                            <Input v-model="value" placeholder="产品名称" style="width: 200px;margin:10px 0" /><br>
                            <Input v-model="value" placeholder="排序值" style="width: 100px;margin:10px 0" />
                            <Button type="success" > 提交 </Button><br><br><br>
                            <div class=" btnse">
                            <Button type="error">取消</Button>
                            <Button type="success">上一步</Button>
                            <Button type="success">下一步</Button>
                            </div>
                        </div>
                            
                    </div>
                    

                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
export default {
  name: 'Addjia',
  data () {
    return {
        single: false,
        value6:"",
       activeName: 'first',
        value: '',
        cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    
                ],
                model1: '',
       cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    
                ],

        model1: '',
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
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
      tobase(){
          this.$router.push("/base")
      },
       toselect(){
          this.$router.push("/select")
      },
       tobmess(){
          this.$router.push("/mess")
      },
       tosuanfa(){
          this.$router.push("/suanfa")
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .select{width: 100%;height: 300px;background: #F5F7F9;padding:30px}
     .btnse{width: 300px;height: 35px;display: flex;justify-content: space-between;padding: 0;margin: 0}
</style>