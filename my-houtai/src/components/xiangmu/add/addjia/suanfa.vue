<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="success" size="small" >&nbsp;&nbsp;基本信息&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small"  >&nbsp;&nbsp;选择产品&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small"  >&nbsp;&nbsp;导入信息&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small"  >&nbsp;&nbsp;编辑算法&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                        <div class="suan">
                            <div class="select1">
                                <Select v-model="model1" style="width:200px" placeholder="选择算分模板">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Button type="success">确定</Button>
                            </div>
                        <div class="select1">
                            <Select v-model="model1" style="width:200px" placeholder="选择必备品牌">
                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                <Checkbox v-model="single" style="margin-left:10px">必备</Checkbox>
                        </div>
                            <div class="btn1 btn2">
                                <Button type="error">取消</Button>
                                <Button type="success" @click="tobmess()">上一步</Button>
                                <Button type="success">完成</Button>
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
      
       tobmess(){
          this.$router.push("/mess")
      },
       
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .suan{background: #F5F7F9;padding: 10px }
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 10px;}
    .select1{margin: 15px}
    .btn2{width: 300px;padding: 0 15px;display: flex;justify-content: space-between}
</style>