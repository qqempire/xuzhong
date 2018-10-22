<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="success" size="small" @click="tobase1()">&nbsp;&nbsp;基本信息&nbsp;&nbsp;</el-button>
                    <el-button type="info" size="small" @click="todao()">&nbsp;&nbsp;导入信息&nbsp;&nbsp;</el-button>
                    <el-button type="info" size="small" @click="tobian()">&nbsp;&nbsp;编辑算法&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                        <div class="shang">
                            <div class="left">
                                <div class="ipt">
                                    <Select v-model="model1" style="width:180px" placeholder="项目类别">
                                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <Select v-model="model1" style="width:180px" placeholder="产品类别">
                                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </div>
                                <div class="ipt">
                                    <Input v-model="value" placeholder="项目名称" style="width: 180px" />
                                    <Input v-model="value" placeholder="项目编号" style="width: 180px" />
                                </div>
                                <div class="ipt ipt1">
                                    <Col span="12" style="width: 120px">
                                    <DatePicker type="date" placeholder="调查日期" ></DatePicker>
                                    </Col>
                                    <Col span="12" style="width: 120px">
                                    <DatePicker type="date" placeholder="截止日期"></DatePicker>
                                    </Col>
                                    <Col span="12" style="width: 120px">
                                    <DatePicker type="date" placeholder="预警日期" ></DatePicker>
                                    </Col>
                                </div>
                                <div class="ipt">
                                    <Select v-model="model1" style="width:180px" placeholder="调研产品类别">
                                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <Select v-model="model1" style="width:180px" placeholder="选择项目模板">
                                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </div>
                            </div>
                            <div class="right">
                                <div class="title"><span>调用以往项目信息</span></div>
                                <div class="center">
                                    <div class="center2">
                                        <Input v-model="value" placeholder="项目名称" style="width: 200px" />
                                        <Input v-model="value" placeholder="项目编号" style="width: 200px;margin:10px 0" />
                                        <Button class="btn" size="small">检测</Button>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                        <div class="xia">
                            <div class="title"><span>以往项目信息</span></div>
                            <div class="tab">
                                    表格
                            </div>
                            <div class="but">
                                <div class="btncen">
                                    <Button type="error" size="small"> 取 消 </Button>
                                    <Button type="success" size="small"> 下 一 步 </Button>
                                </div>
                                
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
    .shang{
        width: 100%;height: 200px;display: flex;justify-content: space-between;
        .left{width: 60%;height: 200px;background:#F5F7F9;
            .ipt{width: 100%;height: 50px;display: flex;align-items: center;justify-content: space-around;
            
            }
            .ipt1{justify-content: space-around;}
        }
        .right{width: 37%;height: 200px;background:#F5F7F9;
        
        .center{width: 100%;height: 170px;display:flex;justify-content: center;align-items:center;
            .center2{width: 200px;height: 150px;
               .btn{width: 100px;height: 30px;background: #39435B;float: right;border: 0;color: #fff}
            }
         }
        }
    }
    .xia{width: 100%;height: 340px;border: 1px solid red;margin-top: 10px;
       .tab{width: 100%;height: 260px;border: 1px solid greenyellow}
       .but{width: 100%;height: 30px;display: flex;justify-content: center;
        .btncen{width: 120px;height: 30px;display: flex;justify-content: space-between}
        }
      
    }
</style>