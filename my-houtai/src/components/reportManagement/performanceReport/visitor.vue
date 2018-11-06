<template>
    <div class="visitor">         
        <!-- 表格 -->
        <Table border :columns="visitor" :data="visitorData" size="small" ></Table>
        <Page :total="dataTotal" show-elevator :page-size=pageNum class-name="page" @on-change="changPage" /> 
    </div>
</template>

<script>
export default {
  name: 'visitor',
  data () {
    return {
        // 表格内容
        visitor: [{title: '归属代理',key: '归属代理'},{title: '用户名',key: '用户名'},{title: '手机号',key: '手机号'},{title: '完成工作数量',key: '完成工作数量',sortable: true},{title: '有效工作时长',key: '有效工作时长',sortable: true},
                        {title: '实际照片数量',key: '实际照片数量'},{title: '实际问题照片数量',key: '实际问题照片数量'},{title: '实际扫码数量',key: '实际扫码数量'},{title: '实际录音数量',key: '实际录音数量'}],
        visitorData: [{归属代理: 'John Brown',用户名: 18,手机号:999,完成工作数量: 'New York No. 1 Lake Park',有效工作时长: 55,实际照片数量: 23,实际问题照片数量: 88,实际扫码数量:77,实际录音数量:9}],
        // 分页数据
            dataTotal:10,
            pageNum:10,
            dataPage:[]                            
    }
  },
//  预存列表数据  
    // props:{
    //     visitorData
    // },
  mounted(){
    //预载数据
  },

    methods:{
        // 换页操作
            changPage(page){
            //切换页码时更改表格相应数据
                this.visitorData = []
                if (page*10 < this.dataTotal) {
                    for (var index = (page-1)*10; index < (page)*10; index++) {
                        this.visitorData.push(this.dataPage[index])          
                    }  
                } else {
                    for (var index = (page-1)*10; index < this.dataTotal; index++) {
                        this.visitorData.push(this.dataPage[index])          
                    }                     
                }                                  
            }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
    .visitor{overflow: hidden;
        .page{float: right; margin-top: 10px; margin-bottom: 5px;}   
    }
</style>