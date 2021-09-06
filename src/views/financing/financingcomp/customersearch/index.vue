<template>
  <div>
    <div>
      <el-page-header @back="back" content="账单详情">
      </el-page-header>
    </div>
    <div>
      <!-- {{this.$route.query.user}} -->
    </div>
    <!-- 默认列表 -->
    <Table
      :columns="columns"
      :select="select"
      :top_btn="top_btn"
      :act_btn="act_btn"
      :replace="replaces"
      @onButtonClick="onButtonClick"
    >
    </Table>
    <!-- 搜索 -->
    <searchs
      :visiable="content.visiable"
      @search_ts="search_ts"
      @colsed="closed"
    >
    </searchs>
  </div>
</template>
<script>
import Table from "@/components/viewcomp/Table";
import searchs from "@/components/search/index";
import { selectAllOrderByPkCustomAsPage } from "@/api/financing/flans"; //财务明细url路径
export default {
  components: {
    Table,
    searchs,
  },
  data() {
    return {
      content: {
        visiable: false, // 内容界面显示控制
      },
      columns: [
        { prop: "customerCode", label: "客户编码", width: "100" },
        { prop: "corpname", label: "客户名称", width: "150" },
          { prop: "productCode", label: "产品编码", width: "100" },
        { prop: "productName", label: "产品名称", width: "100" },
         { prop: "contractNo", label: "合同编号", width: "100" },
        { prop: "productUnitPrice", label: "单价", width: "100" },
        { prop: "productNum", label: "订单数量", width: "100" },
        {prop:'zPrice',label:'总价',width:''},
        { prop: "contractBillState", label: "合同状态", width: "100" },
        { prop: "finishNum", label: "出库数量", width: "100" },
        // {prop:'priceCompleted',label:'已结款金额',width:''},
        {prop:'backSum',label:'已结款金额',width:''},
        {prop:'invoiceSum',label:'已开票金额',width:''},
        //
        {prop:'creationtime',label:'合同签订日期'},
        {prop:'nout',label:'未出库数量',width:''},
        {prop:'nopriceCompleted',label:'未结款金额',width:''},
        {prop:'notInvoiced',label:'未开票金额',width:''},
         { prop: "pkPsndocShow", label: "业务员", width: "100" },
      ],
      select: {
        select: selectAllOrderByPkCustomAsPage,
        queryParam: { dr: 0 ,pkCustomer:this.$route.query.user},
      },
      top_btn: [
        {
          name: "搜索",
          code: "ADD",
        },
      ],
      act_btn: [
        {
          width: 0,
          when: true,
        },
      ],
      replaces: [
        {
          name:"contractBillState",
          replace: {
            0:'无此状态',
            30: "订单报价中",
            31: "完成订单报价", 
            32: "合同签订成功",
            50:'合同未完成功',
            51:'生产中',
            65:'合同完成' 
          },
        },]
    };
  },
  methods: {
    onButtonClick(param) {
      if (param.btnCode === "ADD") {
        this.content.visiable = true;
      }
    },
    closed() {
      this.content.visiable = false;
    },
    search_ts(data) {
      //条件搜索
      this.content.visiable = false;
       let mindata = {
          creationdateBegin: data['开始时间'],
        creationdateEnd: data['结束时间'],
        pkPsndocShow: data["业务员"],
        corpname: data["公司名称"],
        contractBillState:data['合同状态'],
        contractNo:data['合同编号'],
        productCode:data['产品编码']
      };
      this.select = {
        select: this.select.select,
        queryParam: mindata,
      }
      
    },
    back() {
      //跳转上一个页面
      this.$router.go(-1);
    },
    enterKey(event) {
      //键盘事件
      const componentName = this.$options.name;
      const code = event.keyCode
        ? event.keyCode
        : event.which
        ? event.which
        : event.charCode;
      //如果按下esc 执行跳转事件
      // console.log(code);
      if (code == 27) {
        this.back();
      }
    },
    enterKeyupDestroyed() {
      document.removeEventListener("keyup", this.enterKey);
    },
    enterKeyup() {
      document.addEventListener("keyup", this.enterKey);
    },
  },
  created() {
    //   创建键盘事件
    this.enterKeyup();
  },
  destroyed() {
    //   销毁键盘事件
    this.enterKeyupDestroyed();
  },
};
</script>
<style  scoped>
.el-icon-back {
  font-size: 25px;
}
</style>