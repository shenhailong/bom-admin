<template>
  <div class="app">
    <div class="title">
      <div class="title_user"> <span class="el-icon-user"></span></div>
      <div class="title_nr">
        <p class="title_name"> {{ name }}</p>
        <p class="title_roles"> {{$store.getters.roles[0]}}</p>
      </div>
    </div>
    
    <!-- <h2 class="title" style="margin:0">  创元成业 </h2> -->
    <!-- <div class="log"> <p style="paddig:2rem;line-height:4rem;"> <i class="el-icon-user-solid" ></i> {{ name }}</p> </div>
     -->
     <div @click="logout" class="logout div"> <i class="el-icon-setting svgm"></i> 退出登陆</div>
  </div>
</template>
<script>

import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      src: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  methods: {
    logout() {
      let r = confirm("你确定要退出吗");
      if (r) {
        this.$store.dispatch("LogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug /
        });
      } else {
        this.$message("已取消");
      }
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/* *{margin:0;padding: 0;} */
.app {
  // display: flex;
  height: 100%;
  background: rgb(241, 241, 241);
  // flex-direction: column;
  
  // justify-content: space-around;
  .logout{
      margin-top: 1rem;
      width: 100%;
      font-size: 2rem;
      height: 5rem;
      line-height: 5rem;
      background-color: #fff;
      .svgm{
        margin-left: 0.5rem;
      }
  }
}
.title {
  width: 100%;
  
  display: flex;
  height: 15rem;
 background-image: linear-gradient(to right, rgb(109, 162, 246) , rgb(80,138,235));
 padding: 17% 0 0 6%;
 
 .title_nr{
   padding-left: 1.7rem;
  font-weight: bold;
  .title_name{
    
    margin-top: 0.5rem;
    margin-bottom: 0;
    color: #fff;
    font-size: 2rem;
  }
  .title_roles{
    margin-top: 1.5rem;
    color: #fff;
  }
 }
 
  .title_user{
    width: 6rem;
    height:6rem;
    border-radius:50%;
    line-height:7rem;
    text-align:center;
    background-color: #fff;
    border:1px solid #fff;
    span{
      font-size: 4rem;
    }
    
  }
}
</style>