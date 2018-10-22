<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                     <el-button type="info" size="small" @click="tobase1()">&nbsp;&nbsp;基本信息&nbsp;&nbsp;</el-button>
                    <el-button type="info" size="small" @click="todao()">&nbsp;&nbsp;导入信息&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small" @click="tobian()">&nbsp;&nbsp;编辑算法&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Card>
                        <div style="height: 600px" >
                            <div class="wrop">
                                <div class="left">
                                    <div class="ss">
                                        <div class="cen2">
                                            <Select v-model="model1" style="width:160px" placeholder="选择算分模板">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                            <Button type="success">确定</Button>
                                        </div>                                                   
                                    </div>
                                    <div class="x">
                                        <div class="title"><span>指标描述</span></div>
                                        <div style="margin:10px 0">
                                                <Select v-model="model1" style="width:120px" placeholder="一级指标类型">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                            <Select v-model="model1" style="width:120px" placeholder="二级指标类型">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                            
                                            <Button type="success">确定</Button>
                                        </div>
                                        
                                        <!-- 地图 -->
                                        <div class="map3">
                                            地图

                                        </div>
                                            


                                    </div>
                                </div>
                                    <div class="right">
                                        <div class="title"><span>分数对应表</span></div>
                                        表格
                                    </div>
                            </div>                                         
                        </div>
                            <div class="but">
                            <div class="btncen">
                                <Button type="error" size="small"> 取 消 </Button>
                                <Button type="success" size="small" style="margin:0 20px"> 上 一 步 </Button>
                                <Button type="success" size="small"> 完 成 </Button>
                            </div>
                            
                        </div>
                    </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
export default {
  name: 'Addshi',
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
      tobase1(){
          this.$router.push("/base1")
      },
      todao(){
          this.$router.push("/dao")
      },
      tobian(){
          this.$router.push("/bian")
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .ss{width: 100%;height: 30%;display: flex;align-items: center;justify-content: center}
     .cen2{width: 240px;height: 40px;}
     .map3{width: 100%;height: 320px;margin-top: 10px;border: 1px solid blue}
</style>