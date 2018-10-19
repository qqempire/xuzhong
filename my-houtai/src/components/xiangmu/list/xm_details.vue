<template>
  <div class="hello">
      <Layout :style="{marginLeft: '200px'}" >
            
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">
                    
                    <el-button type="info" size="small" @click="tolistjia()">&nbsp;&nbsp;返&nbsp;回&nbsp;&nbsp;</el-button>
                   
                    <el-button type="danger" size="small">&nbsp;&nbsp;删除任务&nbsp;&nbsp;</el-button>
                </Breadcrumb>
                <Card>
                    <div style="height: 600px">
                        <div id="top">

                          <div class="title"><span>访问员进度</span><el-button type="info" size="small">&nbsp;&nbsp;导出表格&nbsp;&nbsp;</el-button></div>
                          <div class="tab1">

                          </div>
                          

                          
                         
                        </div>

                        <div id="bot">

                          <div class="title"><span>调研情况</span><el-button type="info" size="small">&nbsp;&nbsp;导出表格&nbsp;&nbsp;</el-button></div>
                          <div class="ipt">
                              <Select v-model="model1" style="width:100px" placeholder="省">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                               <Select v-model="model1" style="width:100px" placeholder="市">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                               <Select v-model="model1" style="width:100px" placeholder="区">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <Select v-model="model1" style="width:100px" placeholder="访问员">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                               <Select v-model="model1" style="width:100px" placeholder="状态">
                                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                              </Select>
                              <Input v-model="value" placeholder="调研编号" style="width: 100px" />
                              <Button type="success">搜索</Button>
                          </div>

                          <!-- 表格 -->
                          <div class="tab2">
                                    <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
                                    <div style="margin: 10px;overflow: hidden">
                                        <div style="float: right;">
                                            <Page :total="100" :current="1" @on-change="changePage"></Page>
                                        </div>
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
  name: 'xm_details',
  data () {
    return {
        value:"",
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
         tableData1: this.mockTableData1(),
                tableColumns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Status',
                        key: 'status',
                        render: (h, params) => {
                            const row = params.row;
                            const color = row.status === 1 ? 'primary' : row.status === 2 ? 'success' : 'error';
                            const text = row.status === 1 ? 'Working' : row.status === 2 ? 'Success' : 'Fail';

                            return h('Tag', {
                                props: {
                                    type: 'dot',
                                    color: color
                                }
                            }, text);
                        }
                    },
                    {
                        title: 'Portrayal',
                        key: 'portrayal',
                        render: (h, params) => {
                            return h('Poptip', {
                                props: {
                                    trigger: 'hover',
                                    title: params.row.portrayal.length + 'portrayals',
                                    placement: 'bottom'
                                }
                            }, [
                                h('Tag', params.row.portrayal.length),
                                h('div', {
                                    slot: 'content'
                                }, [
                                    h('ul', this.tableData1[params.index].portrayal.map(item => {
                                        return h('li', {
                                            style: {
                                                textAlign: 'center',
                                                padding: '4px'
                                            }
                                        }, item)
                                    }))
                                ])
                            ]);
                        }
                    },
                    {
                        title: 'People',
                        key: 'people',
                        render: (h, params) => {
                            return h('Poptip', {
                                props: {
                                    trigger: 'hover',
                                    title: params.row.people.length + 'customers',
                                    placement: 'bottom'
                                }
                            }, [
                                h('Tag', params.row.people.length),
                                h('div', {
                                    slot: 'content'
                                }, [
                                    h('ul', this.tableData1[params.index].people.map(item => {
                                        return h('li', {
                                            style: {
                                                textAlign: 'center',
                                                padding: '4px'
                                            }
                                        }, item.n + '：' + item.c + 'People')
                                    }))
                                ])
                            ]);
                        }
                    },
                    {
                        title: 'Sampling Time',
                        key: 'time',
                        render: (h, params) => {
                            return h('div', 'Almost' + params.row.time + 'days');
                        }
                    },
                    {
                        title: 'Updated Time',
                        key: 'update',
                        render: (h, params) => {
                            return h('div', this.formatDate(this.tableData1[params.index].update));
                        }
                    }
                ]



  }
  
 },
 methods: {
            mockTableData1 () {
                let data = [];
                for (let i = 0; i < 4; i++) {
                    data.push({
                        name: 'Business' + Math.floor(Math.random () * 100 + 1),
                        status: Math.floor(Math.random () * 3 + 1),
                        portrayal: ['City', 'People', 'Cost', 'Life', 'Entertainment'],
                        people: [
                            {
                                n: 'People' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            },
                            {
                                n: 'People' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            },
                            {
                                n: 'People' + Math.floor(Math.random () * 100 + 1),
                                c: Math.floor(Math.random () * 1000000 + 100000)
                            }
                        ],
                        time: Math.floor(Math.random () * 7 + 1),
                        update: new Date()
                    })
                }
                return data;
            },
            formatDate (date) {
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 4 ? '0' + m : m;
                let d = date.getDate();
                d = d < 4 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            changePage () {
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
                this.tableData1 = this.mockTableData1();
            },
            tolistjia(){
                this.$router.push("/listjia")
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
     #top{height: 140px;width: 100%;background:#fff;box-shadow: 0 1px 1px rgba(0,0,0,.1);border-radius:5px;overflow: hidden;
        .tab1{width: 100%;height: 120px;border: 1px solid red}
     
     }
     #bot{height: 460px;width: 100%;background:#fff;box-shadow: 0 1px 1px rgba(0,0,0,.1);border-radius:5px;overflow: hidden;margin-top: 10px;
        .tab2{width: 100%;height: 355px;border: 1px solid red}
        .ipt{width: 100%;height: 40px;border: 1px solid red;margin: 5px 0}
     
     }

     .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding:0 10px;display:flex;justify-content: space-between;align-items:center;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    }
</style>