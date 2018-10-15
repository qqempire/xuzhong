<template>
  <div class="login">
     <div class="shang">
           <img src="../../assets/img/login/earth.png" alt="旭中调研系统" class="earth">
           <div class="title" v-text="companyName"></div>
      </div>

      <div class="content">
          
        <div class="for">
          <input type="text" id="userName" placeholder="请输入账号"><br>
          <input type="text" id="passWord" placeholder="请输入密码"><br>
          <div id="box">
              <input type="submit" id="submit" value="登录">  
          </div>       
        </div>
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
  .login{width:100%;height:100vh; min-width: 1100px; overflow: hidden; border: 1px solid red;
     background-image: url("../../assets/img/login/bd.png"); background-repeat: no-repeat; background-size: cover; -webkit-background-size: cover;
     -o-background-size: cover; background-position: center 0;
     .shang{border: 1px solid red;width:800px; height: 600px;position: absolute;  top: 0; left: 0; bottom: 0; right: 0;margin: auto;top:-300px;
          .earth{width: 100%;height: 100%} 
          }
     
    .content{width: 500px; height: 250px; margin: 0 auto; border: 1px solid red;margin: auto;  position: absolute;  top: 0; left: 0; bottom: 0; right: 0;top:350px;

        .for{ box-sizing: border-box; width: 490px; height: 230px; padding: 10px 20px 0; background-color: #21202E; border: 1px solid #2d2c3c; 
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
  .title{width: 380px; height: 50px; color: #56BACA; border: 1px solid blue;margin: auto;  position: absolute;  top: 0; left: 0; bottom: 0; right: 0;
        font-size: 30px; background: url("../../assets/img/login/logo.png") no-repeat left center; top: 280px;text-align: center} 
</style>
