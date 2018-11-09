<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="info" size="small" @click="tohome">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                    <!-- <Button type="info">Primary</Button> -->
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                        xian

                    </div>
                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
export default {
  name: 'homeDetail',
  data () {
    return {
       
  }
 },
  methods: {
      tohome(){
          
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    
</style>