<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <!-- <el-button type="info" size="small">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <el-button type="success" size="small">&nbsp;&nbsp;保&nbsp;存&nbsp;&nbsp;</el-button>
                    <el-button type="danger" size="small">&nbsp;&nbsp;删&nbsp;除&nbsp;&nbsp;</el-button> -->
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                        <div class="shang">
                           <div class="ipt">
                                <Select v-model="model1" style="width:150px" placeholder="项目类别">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                &nbsp; &nbsp; &nbsp;
                                 <Select v-model="model1" style="width:150px" placeholder="产品类别">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                 &nbsp; &nbsp;
                                <Button type="success">搜索</Button>&nbsp; &nbsp;&nbsp; &nbsp;
                                <Button type="warning">导出表格</Button>
                           </div>
                           <div class="ipt">
                               <Input v-model="value" placeholder="调研编号" style="width: 300px" /> &nbsp; &nbsp;
                               <Button type="success">搜索</Button>
                           </div>
                        </div>
                        <!-- 表格 -->
                        <div class="xia">

                        </div>
                    </div>
                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
export default {
  name: 'Listjia',
  data () {
    return {
        value: '',
       cityList: [
                    {
                        value: '1',
                        label: '家化'
                    },
                    {
                        value: '2',
                        label: '时效'
                    },
                   
                ],
                model1: ''
  }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .shang{width: 100%;height: 100px;background: #F5F7F9;padding: 5px;box-sizing: border-box;
       .ipt{width: 100%;height: 46px;}
    }
    .xia{width: 100%;height: 490px;border:1px solid red;margin-top: 10px}
</style>