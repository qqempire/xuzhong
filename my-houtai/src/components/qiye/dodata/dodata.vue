<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                        <!-- 表格 -->
                          <Table border :columns="history"  align="right" :data="shuju"></Table>    
                    </div>
                </Card>
            </Content>
        </Layout>
  </div> 
</template>

<script>
export default {
  name: 'Dodata',
  data () {
    return {
       history: [
                    {
                        title: '用户名',
                        key: 'name'
                    },
                    {
                        title: '部门',
                        key: 'bumen'
                    },
                    {
                        title: '职位',                        
                        key: 'position'
                    },
                     {
                        title: 'IP',
                        key: 'ip'
                    },
                     {
                        title: '记录日期',
                        key: 'date'
                    },
                     {
                        title: '操作',
                        key: 'do',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    },
                ],
                shuju: [
                    {  
                        name: '张三',
                        bumen: '行政部',
                        position: '经理',
                        ip: '123456789',
                        date: '2016-10-03'
                    },
                    {  
                        name: '李四',
                        bumen: '市场部',
                        position: '总经理',
                        ip: '369258147',
                        date: '2016-10-03'
                    },
                    
                ]


                
  }
 },
 methods:{
      
      show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.shuju[index].name}<br>Age：${this.shuju[index].bumen}<br>Address：${this.shuju[index].position}`
                })
            },
            remove (index) {
                this.data6.splice(index, 1);
            }
     
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    table{text-align: center;
        td{height: 25px}
        }
    .header{background: #009DD9;color: #fff}
</style>