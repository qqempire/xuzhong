<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                   
                </Breadcrumb>
                 <Card>
                    <div style="height: 600px">
                        <div class="shang">
                           <div class="ipt">
                                <Select v-model="model1" style="width:150px" placeholder="项目类别" @on-change="change">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                                &nbsp; &nbsp; &nbsp;
                                 <Select v-model="leibie" style="width:150px" placeholder="产品类别">
                                    <Option v-for="item in productclass" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
                        value: '家化',
                        label: '家化'
                    },
                    {
                        value: '时效',
                        label: '时效'
                    },
                   
                ],
                model1: '时效',
        productclass:[
                 {
                        value: '家化',
                        label: '家化'
                    },
                    {
                        value: '时效',
                        label: '时效'
                    },
                 ],
                 leibie: '',        
     }
   },
    methods:{
        change(val){
           console.log(val)
           if(val=="家化"){
               this.$router.push("/listjia")
           }else{
              this.$router.push("/listshi")
           }
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