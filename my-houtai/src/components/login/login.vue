<template>
  <div class="login">
    <div class="content">
      <img src="../../assets/img/login/earth.png" alt="旭中调研系统" class="earth">
      <div class="title" v-text="companyName"></div>
      <form method="GET" >
        <input type="text" id="userName" placeholder="请输入账号"><br>
        <input type="text" id="passWord" placeholder="请输入密码"><br>
        <div id="box">
            <input type="submit" id="submit" value="登录">  
        </div>       
      </form>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      companyName:"上海旭中调研系统"
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  html,body{height: 100%;}
  .login{width:100%;height:100%; min-width: 1100px; overflow: hidden; 
     background-image: url("../../assets/img/login/bd.png"); background-repeat: no-repeat; background-size: cover; -webkit-background-size: cover;
     -o-background-size: cover; background-position: center 0;
     .earth{display: block; position: absolute;left: 0; top: -550px;}
    .content{width: 1100px; height: 680px; margin: 0 auto; position: relative; 
      .title{width: 290px; height: 50px; color: #56BACA; margin: 500px auto 50px; 
        text-align: right; line-height: 50px; font-size: 30px; background: url("../../assets/img/login/logo.png") no-repeat left center; }       
        form{ box-sizing: border-box; width: 490px; height: 230px; padding: 10px 20px 0; background-color: #21202E; border: 1px solid #2d2c3c; 
            position: absolute; left: 0; right: 0; margin: auto; 
          #userName{width: 450px; height: 75px; border: none; border-bottom: 1px solid #4d6a74; background: inherit; color: #4d6a74; font-size: 16px; text-align: center;}
          #passWord{width: 450px; height: 75px; border: none; border-bottom: 1px solid #4d6a74; background: inherit; color:  #4d6a74; font-size: 16px; text-align: center;}
          #box{ width: 450px; height: 70px; 
            #submit{display: block; width: 160px; height: 40px; margin: 15px auto 0; border: none; font-size: 18px; color: #56BACA; text-align: center; line-height: 40px; background-color: #2d3c41;}
            #submit:hover{background-color: 21202e;}
          }
      }
    }
  }
</style>
