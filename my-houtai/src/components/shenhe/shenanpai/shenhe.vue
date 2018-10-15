<template>
  <div class="hello">
     <Layout :style="{marginLeft: '200px'}">
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                        <div class="shang">
                           <div>
                               <Select v-model="model1" style="width:200px">
                                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                               </Select>

                               <Select v-model="model1" style="width:200px">
                                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                               </Select>

                           </div>
                           <div>
                               <Input v-model="value" placeholder="调研对象" style="width: 300px" />
                               
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
  name: 'Shenhe',
  data () {
    return {
       cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    
                ],
                model1: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .shang{width: 100%;height: 150px;border: 1px solid red}
    
</style>
