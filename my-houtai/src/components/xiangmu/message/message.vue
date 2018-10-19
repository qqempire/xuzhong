<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <!-- 消息反馈 -->
                        <el-tab-pane label="消息反馈" name="first">
                             <Card>
                                <div style="height: 600px">
                                    <div class="top">
                                        <div class="ipt">
                                            <Col span="12" style="width: 130px">
                                                <DatePicker type="date" placeholder="开始日期" ></DatePicker>
                                            </Col>
                                            <Col span="12" style="width: 130px">
                                                <DatePicker type="date" placeholder="结束日期" ></DatePicker>
                                            </Col>
                                            <Select v-model="model1" style="width:100px" placeholder="项目名称">
                                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Button type="success" >搜索</Button>
                                        <el-button type="info" size="small" style="margin-left:90px">导出表格</el-button>
                                        </div>
                                        <div class="tab">

                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </el-tab-pane>
                        <!-- 账户异常 -->
                        <el-tab-pane label="账户异常" name="second">
                            <Card>
                                <div style="height: 600px">
                                    <div class="top">
                                        <div class="ipt">
                                            <Col span="12" style="width: 130px">
                                                <DatePicker type="date" placeholder="开始日期" ></DatePicker>
                                            </Col>
                                            <Col span="12" style="width: 130px">
                                                <DatePicker type="date" placeholder="结束日期" ></DatePicker>
                                            </Col>
                                            <Select v-model="model1" style="width:100px" placeholder="项目名称">
                                                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                        <Button type="success" >搜索</Button>
                                        <el-button type="info" size="small" style="margin-left:90px">导出表格</el-button>
                                        </div>
                                        <div class="tab">

                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </el-tab-pane>
                        
                    </el-tabs>
                </Breadcrumb>
               
            </Content>
        </Layout>
  </div> 
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
       activeName: 'first',
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
         model1: '',
  }
 },
 methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .top{width: 100%;height: 600px;
        .ipt{width: 100%;height: 40px;display: flex;justify-content: space-between}
    }
    .tab{width: 100%;height: 550px;border: 1px solid red;margin-top: 10px}
</style>