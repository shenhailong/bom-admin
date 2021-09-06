<template>
  <el-select v-model="label" placeholder="请选择">
    <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.label">
    </el-option>
  </el-select>
</template>
<script>
  export default {
    data() {
      return {
        //   ishow:true,
        ishow: null,

        //默认值
        options: [
          {
            label: '全部显示'
          },
          {
            label: '自由态'
          },
          {
            label: '进行中'
          },
          {
            label: '已完成'
          }
        ],
        //采购报价的数据
        Purchasequotation: [
          {
            label: '全部显示'
          },
          {
            label: '自由态'
          },
          {
            label: '已认领'
          },
          {
            label: '采购报价完成'
          },
        ],
        //生产报价数据
        Productionquotation: [
          {
            label: '全部显示'
          },
          {
            label: '自由态'
          },
          {
            label: '已认领'
          },
          {
            label: '生产报价完成'
          },
        ],
        productmanagement: [
          {
            label: '全部显示'
          },
          {
            label: '工艺审核中'
          },
          {
            label: '工艺审核完成'
          },

        ],
        //生产计划
        options1: [
          {
            label: "自由态",
          },
          {
            label: "进行中",
          },
          {
            label: "已完成",
          },
          {
            label: "全部显示",
          },
          {
            label: "出库已完成",
          },
          {
            label: "出库未完成",

          },
          {
            label: "交货超时临近7天",

          },
          {
            label: "全部交货超时",

          },
          {
            label: "物料超时临近7天",

          },
          {
            label: "全部物料超时",

          },
        ],
        delivery: [
          {
            label: '回执单未完成'
          },
          {
            label: '出库单未完成'
          },
          {
            label: '全部显示'
          }

        ],
        rapir: [
          {
            label: '不良品入库完成'
          },
          {
            label: '不良品入库未完成'
          },

        ],
        rapirs: [
          {
            label: '不良品判定完成'
          },
          {
            label: '不良品判定未完成'
          },

        ],
        repairtest: [
          {
            label: '不良品维修完成'
          },
          {
            label: '不良品维修未完成'
          },
        ],
        repairq: [
          {
            label: '不良品质检完成'
          },
          {
            label: '不良品质检未完成'
          },
        ],
        oputrepair: [
          {
            label: '不良品出库完成'
          },
          {
            label: '不良品出库未完成'
          },
        ],
        sop: [{
          label: '审核中'
        }, {
          label: '审核通过'

        }],
        label: "",
      };
    },

    mounted() {
      //判断路由渲染数据
      if (this.$route.path === '/MENU63907/MENU38889') {
        this.options = this.Purchasequotation
      }
      if (this.$route.path === '/MENU61719/MENU12411') {
        this.options = this.sop
      }
      if (this.$route.path === '/MENU61719/MENU35235') {
        this.options = this.Productionquotation
      }
      if (this.$route.path === '/MENU22617/MENU45455') {
        this.options = this.productmanagement
      }
      if (this.$route.path == '/MENU76444/MENU4162') {
        this.options = this.delivery
      }
      // 
      if (this.$route.path == '/MENU78061/MENU11149') {
        this.options = this.repairq
      }
      if (this.$route.path == '/MENU78061/MENU45258') {
        this.options = this.rapir
      }
      if (this.$route.path == '/MENU78061/MENU57804') {
        this.options = this.repairtest
      }
      // 
      if (this.$route.path == '/MENU78061/MENU40950') {
        this.options = this.oputrepair
      }
      // MENU78061/MENU37513
      if (this.$route.path == '/MENU78061/MENU37513') {
        this.options = this.rapirs
      }
      let arr = ["/MENU61719/MENU7214"]
      if (
        arr.includes(this.$route.path)
      ) {
        this.options = this.options1
      }
    },
    watch: {
      //传递参数
      label() {
        let datas = {
          自由态: { billState: "0", dr: 0 },
          进行中: { billState: "1", dr: 0 },
          已完成: { billState: "2", dr: 0 },
          全部显示: { billState: null, dr: 0 },
          出库未完成: { outbillState: "0,1" },
          出库已完成: { outbillState: "2" },
          交货超时临近7天: { orderExceedWeek: "1" },
          全部交货超时: { orderExceedWeek: "2" },
          物料超时临近7天: { orderExceedWeek: "3" },
          全部物料超时: { orderExceedWeek: "4" },
          已认领: { billState: "2", dr: 0 },
          采购报价完成: { billState: "3", dr: 0 },
          生产报价完成: { billState: "5", dr: 0 },
          工艺审核中: { technicsState: '21' },
          工艺审核完成: { technicsState: '22' },
          出库单未完成: { fileUrl: 1 },
          回执单未完成: { receiptUrl: 1 },
          不良品入库完成: { repairState: '2,3' },
          不良品入库未完成: { repairState: '1' },
          不良品判定完成: { repairState: '3,4,5,6' },
          不良品判定未完成: { repairState: '2' },
          不良品维修完成: { repairState: '4,5,6' },
          不良品维修未完成: { repairState: '3' },
          不良品质检完成: { repairState: '5,6' },
          不良品质检未完成: { repairState: '4' },
          不良品出库完成: { repairState: '6' },
          不良品出库未完成: { repairState: '5' },
          审核中: { editionState: 1},
          审核通过: { editionState: 2 },
          // repairState
        };
        this.$emit("label", datas[this.label]);
      },
    },
  };
</script>
<style scoped>
</style>