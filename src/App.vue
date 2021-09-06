<template>
  <div id="app">
    <newtab v-if="!equipment"></newtab>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <tabbar v-if="equipment"></tabbar>
  </div>
</template>

<script>
import newtab from "@/components/newtab/newtab";
let tabbar = () => import("@/components/tabbar/TabBarMain.vue");
import { mapGetters } from "vuex";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  components: {
    newtab,
    tabbar,
  },
  data() {
    return {
      name: "App",
      isRouterAlive: true,
    };
  },
  computed: {
    ...mapGetters(["equipment"]),
  },
  updated() {
    if (this.equipment) {
      //rem配置
      (function (d, w) {
        //d:document  w:window
        var t = d.documentElement;
        // 检测浏览器是否支持orientationchange事件，不支持使用resize
        var m = "orientationchange" in window ? "orientationchange" : "resize";
        // 事件处理函数
        var s = function () {
          var e = t.clientWidth;
          // 给html根节点修改fontSize属性
          t.style.fontSize = (e / 375) * 10 + "px";
        };
        // 第一次打开页面时自动执行
        s();
        // 给document对象或者window对象添加自定义监听事件
        d.addEventListener && w.addEventListener(m, s, false);
      })(document, window);
    }
  },
  mounted() {
    if (window.screen.width == "1366") {
      document.write('<body style="zoom: 75%">');
    } else if (window.screen.width == "1360") {
      document.write('<body style="zoom: 75%">');
    } else if (window.screen.width == "1440") {
      document.write('<body style="zoom: 85%">');
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
<style scoped>
body,
html {
  font-size: 100px;
}
</style>
