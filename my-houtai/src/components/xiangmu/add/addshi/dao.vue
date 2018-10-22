<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="info" size="small" @click="tobase1()">&nbsp;&nbsp;基本信息&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small" @click="todao()">&nbsp;&nbsp;导入信息&nbsp;&nbsp;</el-button>
                    <el-button type="info" size="small" @click="tobian()">&nbsp;&nbsp;编辑算法&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Card>
                        <div style="height: 600px" >
                            <div class="wrop">
                                <div class="left">
                                    <div class="s">
                                        <div>
                                            <el-button type="info" plain>下载清单模板</el-button>
                                        </div>
                                        <!-- 上传 -->
                                        <Upload class="upload"
                                            multiple
                                            action="//jsonplaceholder.typicode.com/posts/">
                                            <Button icon="ios-cloud-upload-outline">导入项目信息</Button>
                                        </Upload>
                                        <Input v-model="value6" type="textarea" :rows="4" placeholder="备注信息" />
                                    </div>
                                    <div class="x">
                                        <div>
                                                <Select v-model="model1" style="width:60px" placeholder="省">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                            <Select v-model="model1" style="width:60px" placeholder="市">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                            <Select v-model="model1" style="width:60px" placeholder="区">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                            <Select v-model="model1" style="width:100px" placeholder="分配状态">
                                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                            </Select>
                                            <Button type="success">分配</Button>
                                        </div>
                                        <div class="fenpei">
                                                
                                            
                                        </div>
                                        <!-- 地图 -->
                                        <div class="map">
                                            地图

                                        </div>
                                            


                                    </div>
                                </div>
                                    <div class="right">
                                        <div class="title"><span>已添加项目访问员</span></div>
                                        表格
                                    </div>
                            </div>                                         
                        </div>
                            <div class="but">
                            <div class="btncen">
                                <Button type="error" size="small"> 取 消 </Button>
                                <Button type="success" size="small" style="margin:0 20px"> 上 一 步 </Button>
                                <Button type="success" size="small"> 下 一 步 </Button>
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
    .wrop{
        display: flex;justify-content: space-between;
        .left{width: 49%;height: 580px;
           .s,.x{width: 100%;height: 50%;}
           //.x{display: flex;justify-content: space-between}
           .fenpei{float: right}
           .map{width: 100%;height: 244px;margin-top: 10px;border: 1px solid blue}
           .upload{width: 100%;height: 110px;;margin: 10px 0;overflow: auto}
        }
        .right{width: 49%;height: 580px;border: 1px solid blue}
    }
    .title{width: 100%;height: 30px;background: #5BC0DE;line-height: 30px;color: #fff;padding:0 10px;display:flex;justify-content: space-between;align-items:center; }

     .but{width: 100%;height: 30px;display: flex;justify-content: center;
        .btncen{width: 120px;height: 30px;display: flex;justify-content: space-between}
     }
</style>