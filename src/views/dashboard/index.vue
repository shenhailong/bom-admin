<template>
  <div class="dashboard-editor-container">
    <div class="left">
      <!-- 进度查询 -->
      <flowChart />
      <!-- 销售报表 -->
      <salesReport  v-if='$store.getters.roles.includes("销售角色")||$store.getters.roles.includes("全权角色")'></salesReport>
      <!-- 生产报表 -->
      <productionReport  v-if='$store.getters.roles.includes("生产角色")||$store.getters.roles.includes("全权角色")'></productionReport>
    </div>
    <div class="right">
      <!-- 订单详情 -->
      <orders  v-if='$store.getters.roles.includes("生产角色")||$store.getters.roles.includes("全权角色")'></orders>
      <!-- pk榜单 -->
      <pk    v-if='$store.getters.roles.includes("销售角色")||$store.getters.roles.includes("全权角色")' />
      <!-- 订单详情2 -->
      <!-- <orderTwo></orderTwo> -->
      <!-- 总订单 -->
      <allorder    v-if='$store.getters.roles.includes("生产角色")||$store.getters.roles.includes("全权角色")'></allorder>
      <!-- 工序报表 -->
      <working   v-if='$store.getters.roles.includes("生产角色")||$store.getters.roles.includes("全权角色")'></working>
    </div>
  </div>
</template>
<script>
import flowChart from "./new/flowChart/flowChart";
import salesReport from "./new/salesReport/salesReport";
import productionReport from "./new/productionReport/productionReport";
import working from "./new/working/working";
import orders from "./new/order/order";
import pk from "./new/pk/pk";
import orderTwo from "./new/orders/orders";
import allorder from "./new/allorder/allorder";
import { mapGetters } from 'vuex'

export default {
  components: {
    flowChart,
    salesReport,
    productionReport,
    working,
    orders,
    pk,
    orderTwo,
    allorder,
  },
   computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
};
</script>
<style lang="scss" type="text/scss" scoped>
.dashboard-editor-container {
  padding: 15px;
  background-color: rgb(244, 244, 244);
  display: flex;
  justify-content: space-around;
}
.left {
  width: 60%;
}
.right {
  width: 36%;
}
</style>