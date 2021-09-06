<template>
  <div class="login-container" ref="logins">
    <div class="logo-a"  v-if="!equipment">
      <div class="logo-a1" ><img src="../../assets/cy/logo2.png" /></div>
    </div>
    <el-form
     v-if="!equipment"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">创元智造</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="请输入用户名称"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入用户密码"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          <span class="logins">登录</span>
        </el-button>
      </el-form-item>
      <div class="tips"></div>
    </el-form>
    <el-form
     v-if="equipment"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-forms"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">创元智造</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="请输入用户名称"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入用户密码"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%;"
          @click.native.prevent="handleLogin"
        >
          <span class="logins">立即登录</span>
        </el-button>
      </el-form-item>
      <div class="tips"></div>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  computed:{
     ...mapGetters([
     'equipment'
    ])
},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      callback();
      // if (value.length < 5) {
      //   callback(new Error('密码不能小于5位'))
      // } else {
      //   callback()
      // }
    };
    return {
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
      },
      loading: false,
      pwdType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
       
      },
      immediate: true,
    },
     
  },
  mounted(){
    // console.log();
    if(this.equipment){
        //  console.log(this.$refs.logins);
         this.$refs.logins.style.backgroundImage = 'linear-gradient(rgb(87,179,249), rgb(36,108,246))'
        // this.$refs.logins.style.background = '#fff'
        //  this.$refs.logins.setAttribute('style','background:"red"')
    }
    //  console.log();
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.$router.push({ path: this.redirect || '/' })
      //   }
      // })
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              //跳转 页面
              this.$router.push({ path: this.redirect || "/" });
              // location.reload();
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          // console.log('error submit!!')
          return false;
        }
      });
    },
   
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;

$bg1: #0e1925;
// $bg:#5555ff;
$light_gray: #eee;
// $light_gray:#5500ff;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 80%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg1 inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
// $bg:#2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  background-image: url(../../assets/cy/timg2.jpg);
  background-size: cover ;
  background-color: $bg;
  .logo-a {
    width: 100%;
    height: 110px;
    // background:rgba(0,0,0,0.6);
    background: rgba(19, 36, 53, 0.6);
    display: flex;
    align-items: center;
    padding: 20px;
    position: fixed;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    box-sizing: border-box;
    box-shadow: 1px 15px 100px 20px rgba(0, 0, 0, 0.2);
  }
  .logo-a1 {
    width: 20%;
  }
  .logo-a1 img {
    width: 100%;
    max-width: 100%;
    display: block;
  }
  .login-form {
    width: 400px;
    height: 360px;
    // background:#132435;
    background: rgba(19, 36, 53, 0.6);
    position: absolute;
    padding: 0 50px;
    right: 0;
    max-width: 100%;
    margin: 180px 50px 0 20px;
    border: solid 1px #409eff;
    box-sizing: border-box;
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.2);
    border-radius: 5%;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    // color: $light_gray;
    color: #0b84d3;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
    margin-top: 30px;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.login-forms{
  color: #fff;
  
  padding-top: 20%;
  .title{
    color: #fff;
  }
   .el-form-item{
     color: #fff;
     width: 80%;
     margin: 0 auto;
    margin-top: 70px;
    border: 1px solid rgba(255,255,255,0.5);
  }
  .svg-container{
    color: #fff;
  }
 .el-button {
  background: rgb(255, 255, 255);
  color: #0b84d3;
  border: 0px;
}
}

</style>
