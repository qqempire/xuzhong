<template>
  <div class="login" >
      <div class="shang" >
          
          
      </div>

      <div class="title" v-text="companyName" ></div>

      <div class="content">
        <div class="for">
          <input type="text" v-model="loginuser" placeholder="请输入账号" autocomplete="off"><br>
          <!-- <Input v-model="value" placeholder="请输入账号" style="width: 450px;" size="large" class="ipt"/>
          <Input v-model="value" placeholder="请输入账号" style="width: 450px;75px" class="ipt"/> -->
          <input type="password" v-model="loginpassword" placeholder="请输入密码"><br>
          <!-- <Select v-model="model1" style="width:450px;margin-top:10px;text-align:center;">
              <Option v-for="item in cityList" :value="item.value" :key="item.value" style="background:#11182D">{{ item.label }}</Option>
          </Select> -->
          <select id="mySelect">
            <option>员工</option>
            <option>代理</option>
            <option>审查访问员</option>
          </select>
          <div id="box">
              <input type="submit" id="submit" value="登录" @click="login"  @keyup.enter="submit">  
              <p>{{this.$store.state.user}}</p>
          </div>       
        </div>
      </div>
      

  </div> 
</template>

<script>
import $ from "jquery"
import axios from "axios"
import {mapGetters,mapActions} from "vuex"


export default {
  name: 'Login',
  data () {
    return {
      aaa:[],
      ptypeid:"",
      cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: '',
      fullscreenLoading: false,
      companyName:"上海旭中调研系统",
      loginuser:"",
      loginpassword:""
 
    }
  },
  methods:{
    ...mapActions(["login","add","jian","username"]), //mapActions（[]）为store里的函数名
   
    openFullScreen2() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, .9)'
        });
        // setTimeout(() => {
        //   loading.close();
        // }, 2000);
    },
    instance (type) {
            const title = 'Title';
            const content = '<p>Content of dialog</p><p>Content of dialog</p>';
            switch (type) {
               
                case 'warning':
                    this.$Modal.warning({
                        title: "提示",
                        content: "<div>帐户名或密码错误</div>"
                    });
                    break;
            }
        },
     //enter
     submit(ev){
      
         if(ev.keyCode == 13){
              alert('你按回车键了');
          }   
        
     },
     login(){

      var val = $('#mySelect') .val();//选中的值
      var ins = $("#mySelect").get(0).selectedIndex;//选中的索引

      //获取ptype
      var ptypeid = this.GetUrlParam("ptype")
      localStorage.setItem('ptypeid',ptypeid)
      this.ptypeid = ptypeid;
      console.log(ptypeid)
      // console.log(this.GetUrlParam("ptype"))
  
        var that = this;
      //  
        axios({
            url:"http://192.168.0.134:8080/login",
            params:{mid:that.ptypeid,account:that.loginuser,password:that.loginpassword,id:ins,mid:1}
        })
        .then(function(data){
            console.log(data.data)
            if(data.data==""){
              that.instance('warning')
            }else{
              //console.log(data.data.uname)
              localStorage.setItem('username',data.data.uname) //用户名
              localStorage.setItem('uid',data.data.uid) //用户id

              localStorage.setItem('job',data.data.pname)  //职位
              localStorage.setItem('Jurisdiction',data.data.jtype) //权限
              localStorage.setItem('dname',data.data.dname) //权限

             // console.log(localStorage.getItem('Jurisdiction'))
               that.openFullScreen2()
              // that.username(data.data.uname) //把this.user传参到store里的login
                that.$router.push("/home")
            }
        })
     },
  //获取ptype
    GetUrlParam(paraName) {
    　　　　var url = window.location.toString();
    　　　　var arrObj = url.split("?");

    　　　　if (arrObj.length > 1) {
    　　　　　　var arrPara = arrObj[1].split("&");
    　　　　　　var arr;

    　　　　　　for (var i = 0; i < arrPara.length; i++) {
    　　　　　　　　arr = arrPara[i].split("=");

    　　　　　　　　if (arr != null && arr[0] == paraName) {
    　　　　　　　　　　return arr[1];
    　　　　　　　　}
    　　　　　　}
    　　　　　　return "";
    　　　　}
    　　　　else {
    　　　　　　return "";
    　　　　}
    　　}
  },
  
  mounted(){
    
   
    //  $("#mySelect").change(function(){
    //        console.log($(this).val());
    //    });
  },
 
created:function(){
    let _this = this;
    document.onkeydown = function(e){
    let _key = window.event.keyCode;
    if(_key === 13){
      // 
      _this.login()
    }
    }
},


}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 
 .ivu-select-single .ivu-select-selection{background: red}
.ivu-select-single .ivu-select-selection{background: green}
  html,body{height: 100%;}
  .login{width:100%;height:100vh; min-width: 1100px; overflow: hidden; background:url(../../assets/img/login/bd.png) no-repeat center/cover;
    
     .shang{width:700px; height: 550px;position: absolute;  top: 0; left: 0; bottom: 0; right: 0;margin: auto;top:-300px;right:50px;
            background: url(../../assets/img/login/earth.png) no-repeat center/cover;
          .earth{width: 30px;height: 30px;} 
          }
     
    .content{width: 500px; height: 250px; margin: 0 auto;margin: auto;  position: absolute;  top: 0; left: 0; bottom: 0; right: 0;top:350px;

        .for{ box-sizing: border-box; width: 500px; height: 220px; padding: 10px 20px 0; background-color: #21202E; border: 1px solid #2d2c3c; 
            position: absolute; left: 0; right: 0; margin: auto; 
            input{width: 450px; height: 40px;margin-top: 5px;border-radius: 5px; border: 0; border-bottom: 1px solid#4d6a74; background:#11182D; color: #56BACA; font-size: 16px; text-align: center;outline: none }
            #mySelect{width: 450px; height: 40px;background:#11182D;font-size: 14px;text-align: center;text-align-last: center;color: #56BACA;border-radius: 5px;outline: none;margin-top: 5px;border:none;border: 1px solid#4d6a74;
              option{width: 450px; height: 40px;text-align: center;}
            }
          #box{ width: 450px; height: 70px; 
            #submit{display: block; width: 160px; height: 40px; margin: 15px auto 0; border: none; font-size: 18px; color: #56BACA; text-align: center; line-height: 40px; background-color: #2d3c41;}
            #submit:hover{background-color: #3F3E41;cursor: pointer;}
          }
      }
    }
  }
  .title{width: 350px; height: 50px; color: #56BACA; margin: auto;  position: absolute;  top: 0; left: 0; bottom: 0; right: 0;left:40px;font-size: 30px; 
        background: url(../../assets/img/login/logo.png) no-repeat left center;
        text-align: center} 
</style>
