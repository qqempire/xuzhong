<template>
    <div class="countryVisual">
      <Layout :style="{marginLeft: '200px'}" >            
            <Content :style="{padding: '0 16px 16px'}"> 
                <Breadcrumb :style="{margin: '16px 0'}"> 
                    <div class="title">
                        <span>全国区域</span>
                        <el-button type="info" @click="goBack">返&nbsp;回</el-button>                     
                    </div>                
                </Breadcrumb>
                <Card> 
                    <div id="container"></div>
               </Card>              
            </Content>
        </Layout>
    </div>
</template>
<script>
// import img from '../../assets/img/login/logo.png'
// var echarts = require('echarts')
export default {
    name: 'countryVisual',
    mounted() {
        var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        var app = {};
        var option = null;
        option = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'邮件营销',
                    type:'line',
                    stack: '总量',
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'联盟广告',
                    type:'line',
                    stack: '总量',
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'视频广告',
                    type:'line',
                    stack: '总量',
                    data:[150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name:'直接访问',
                    type:'line',
                    stack: '总量',
                    data:[320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name:'搜索引擎',
                    type:'line',
                    stack: '总量',
                    data:[820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }  

    },    
    methods:{
        // 返回按钮
        goBack(){
            this.$router.push('/researchObjectDetail')
        },
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped  lang="scss">
.countryVisual{
    .title{width: 100%;height: 40px;background: #5BC0DE;line-height: 40px;color: #fff;padding-left:10px;display:flex;justify-content: space-between;align-items:center;
        span:nth-child(2){display: block;width: 100px;height: 30px;background: #C1C1C1;border-radius: 5px;line-height: 30px;text-align: center;}
    } 
    #container{width: 100%; height: 600px; margin: 0 auto 30px;}                
}
</style>