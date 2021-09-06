<template>
  <!-- 应收客户报表 -->
  <div>
    <!-- 默认列表 -->
    <Table
      :columns="columns"
      :select="select"
      :top_btn="top_btn"
      :act_btn="act_btn"
      :replace="replace"
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

    <!-- 账户存储 -->
    <storage
      :storageshow="storageshow"
      @close="storageclose"
      :mindata="storagedata"
    ></storage>

    <!-- 对账列表 -->
    <reports :visibles="visibles" @close="closes"></reports>
  </div>
</template>
<script>
import Table from "@/components/viewcomp/Table";
import searchs from "@/components/search/index";
import reports from "../financingcomp/AccountStatement/index";//对账单已作废
import storage from "../financingcomp/storage/index"; //存储组件
import { selectAllBdCustomFaFinanceAsPage } from "@/api/financing/flans"; //url路径

export default {
  components: {
    Table,
    searchs,
    reports,
    storage,
  },
  data() {
    return {
      visibles: false,
      storageshow: false,
      storagedata: null,
      content: {
        visiable: false, // 内容界面显示控制
      },
      columns: [
        { prop: "customerCode", label: "客户编号", width: "null" },
        { prop: "corpname", label: "客户名称", width: "200" },
        // { prop: "contractNo;", label: "合同编号", width: "null" },
        // { prop: "productCode", label: "产品编号", width: "null" },
        // { prop: "getProductName", label: "产品名称", width: "null" },
        { prop: "pkPsndocShow", label: "业务员", width: "null" },
        { prop: "remainingNum", label: "预存余额", width: "null" },
        // { prop: "remainingNum", label: "剩余款项", width: "null" },
        // { prop: "noTotalInvoicePrice", label: "未开票金额总计", width: "null" },
        { prop: "beTotalOutTimePrice", label: "超期金额", width: "null" },
        { prop: "totalOrderPrice", label: "应收金额", width: "null" },
        { prop: "noTotalInvoicePrice", label: "未开票金额", width: "null" },
        // { prop: "remainingNum", label: "预存金额", width: "100" },
      ],
      select: {
        select: selectAllBdCustomFaFinanceAsPage,
        queryParam: { dr: 0 },
      },
      top_btn: [
        {
          name: "搜索",
          code: "ADD",
        },
      ],
      act_btn: [
        {
          name: "存储",
          width: 130,
          code: "coin",
          action: null,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-coin",
        },
        // {
        //   name: "列表",
        //   code: "release",
        //   action: null,
        //   btnSize: "mini",
        //   typeLess: "itag",
        //   iconPic: "el-icon-s-release",
        // },
        {
          name: "查询",
          code: "search",
          action: null,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-search",
        },
        // {
        //   name: "修改",
        //   code: "bell",
        //   action: null,
        //   btnSize: "mini",
        //   typeLess: "itag",
        //   iconPic: "el-icon-bell",
        // },
      ],
      replace: [],
    };
  },
  methods: {
    onButtonClick(param) {
      // console.log(param.bindData);
      if (param.btnCode == "coin") { //储存组件
        this.storageshow = true;
        this.storagedata = param.bindData;
      }
      if (param.btnCode == "release") { //查询
        this.visibles = true;
      }
      if (param.btnCode == "search") { //搜索
        // console.log(this.$route.path);
        // console.log(param);
        // let arr = [
        //   pkCustomer:this.
        // ]
        //router 进入财务查看的明细  pkCustomer查看主键
        this.$router.push({path:"/hiderouters/customersearch",query:{user:param.bindData.pkCustomer}});
      }
      if (param.btnCode === "ADD") {
        this.content.visiable = true;
      }
    },
    search_ts(data) {
      //条件搜索
      this.content.visiable = false;
     
      // console.log(data);
      let mindata = {
         creationdateBegin: data['开始时间'],
        creationdateEnd: data['结束时间'],
        pkPsndocShow: data["业务员"],
        customerCode: data["客户编码"],
        corpname: data["公司名称"],
      };
      this.select = {
        select: this.select.select,
        queryParam: mindata,
      };
    },
    closed() {
      this.content.visiable = false;
    },
    storageclose() {
      this.storageshow = false;
      this.select = {
        select: this.select.select,
        queryParam: { dr: 0 },
      };
    },
    closes() {
      this.visibles = false;
       this.select = {
        select: this.select.select,
        queryParam: { dr: 0 },
      };
    },
  },
};
</script>
<style  scoped>
</style>