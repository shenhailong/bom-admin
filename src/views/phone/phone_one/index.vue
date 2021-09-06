<template>
  <!-- 上传页面 -->
  <div class="app">
    <br />
    <h1 class="title"><div>我的应用</div></h1>
    <br />
    <br />
    <div class="cons">
      <p class="cons_title">消息</p>

      <div class="cons_con">
        <div @click="boxclk('message', '留言消息')" class="cons_con_box">
          <p class="text_cen"><img src="@/assets/cy/5.png" alt="" /></p>
          <p class="text_cen">留言</p>
        </div>
      </div>
    </div>

    <div class="cons"  v-if="
        $store.getters.roles.includes('质检角色') ||
        $store.getters.roles.includes('全权角色')
      ">
      <p class="cons_title">质检</p>
      <div class="con_flex">
        <div class="cons_con">
          <div @click="boxclk('incoming')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/4.png" alt="" /></p>
            <p class="text_cen">来料检验</p>
          </div>
        </div>
        <div class="cons_con">
          <div @click="boxclk('test')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/4.png" alt="" /></p>
            <p class="text_cen">成品质检</p>
          </div>
        </div>
      </div>
    </div>
    <div class="cons" v-if=" $store.getters.roles.includes('仓储角色') || $store.getters.roles.includes('全权角色')">
      <p class="cons_title">库房备料</p>
      <div class="con_flex">
        <div class="cons_con">
          <div @click="boxclk('getReady', 'MRP')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/1.png" alt="" /></p>
            <p class="text_cen">MRP</p>
          </div>
        </div>
        <div class="cons_con">
          <div @click="boxclk('getReady_two', 'DIP')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/1.png" alt="" /></p>
            <p class="text_cen">DIP</p>
          </div>
        </div>
         <div class="cons_con">
          <div @click="boxclk('getReady_two', 'SMT')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/1.png" alt="" /></p>
            <p class="text_cen">SMT</p>
          </div>
        </div>
      </div>
    </div>

    <div class="cons" v-if="
        $store.getters.roles.includes('仓储角色') ||
        $store.getters.roles.includes('全权角色')
      ">
      <p class="cons_title">入库</p>
      <div class="con_flex">
        <div class="cons_con">
          <div @click="boxclk('onRoom', 'SMT')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/1.png" alt="" /></p>
            <p class="text_cen">SMT</p>
          </div>
        </div>
        <div class="cons_con">
          <div @click="boxclk('onRoom', 'DIP')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/1.png" alt="" /></p>
            <p class="text_cen">DIP</p>
          </div>
        </div>
         <div class="cons_con">
          <div @click="boxclk('onRoom', '三防')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/1.png" alt="" /></p>
            <p class="text_cen">三防</p>
          </div>
        </div>
        <div class="cons_con">
          <div @click="boxclk('onRoom', '组装测试老化')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/1.png" alt="" /></p>
            <p class="text_cen">组装,测试,老化</p>
          </div>
        </div>
        <div class="cons_con">
          <div @click="boxclk('onRoom', '成品')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/1.png" alt="" /></p>
            <p class="text_cen">成品</p>
          </div>
        </div>
      </div>
    </div>

    <div class="cons" v-if="
        $store.getters.roles.includes('仓储角色') ||
        $store.getters.roles.includes('全权角色')
      ">
      <p class="cons_title">出库</p>
      <div class="con_flex">
        <div class="cons_con">
          <div @click="boxclk('deliveryEntry', 'SMT')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/1.png" alt="" /></p>
            <p class="text_cen">SMT</p>
          </div>
        </div>
        <div class="cons_con">
          <div @click="boxclk('deliveryEntry', 'DIP')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/1.png" alt="" /></p>
            <p class="text_cen">DIP</p>
          </div>
        </div>
         <div class="cons_con">
          <div @click="boxclk('deliveryEntry', '三防')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/1.png" alt="" /></p>
            <p class="text_cen">三防</p>
          </div>
        </div>
        <div class="cons_con">
          <div @click="boxclk('deliveryEntry', '组装测试老化')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/1.png" alt="" /></p>
            <p class="text_cen">组装,测试,老化</p>
          </div>
        </div>
        <div class="cons_con">
          <div @click="boxclk('deliveryEntry', '成品')" class="cons_con_box">
            <p class="text_cen"><img src="@/assets/cy/1.png" alt="" /></p>
            <p class="text_cen">成品</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 全权角色 -->
    
    <br /><br /><br /><br /><br />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { listDeptCascadePsndoc } from "@/api/orgs/bddept";
export default {
  data() {
    return {
      form: {
        region: "incoming",
        tops: 0,
      },
      istest: [],
    };
  },
  methods: {
    boxclk(context, con) {
      this.$router.push({ path: context, query: { name: con } });
    },
  },
  components: {
    ...mapGetters(["name", "roles"]),
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.cons {
  width: 100%;
  background: #fff;
  margin-bottom: 2rem;
  margin-top: 2rem;
}
.cons_title {
  font-size: 1.5rem;
  padding: 1rem;
}
.cons_con {
  width: 20%;
  padding-top: 2rem;
  padding-bottom: 3rem;
}
.text_cen {
  text-align: center;
}
.cons_con_box {
  // width: 20%;
}
.con_flex {
  display: flex;
}
.app {
  background: rgb(241, 241, 241);
  height: 140%;
}
img{
 width: 4rem; 
}
.title{
  text-align: center;
}
</style>