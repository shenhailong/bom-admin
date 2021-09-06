<template>
  <!-- 应收客户报表 -->
  <div>
    <div @click="titles($event)">
      <el-button>回款</el-button>
      <el-button>开票</el-button>
    </div>
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
  </div>
</template>
<script>
import Table from "@/components/viewcomp/Table";
import searchs from "@/components/search/index";
import reports from "../financingcomp/AccountStatement/index";
import storage from "../financingcomp/storage/index";
import { selectAllDetailFaFinanceAsPage } from "@/api/financing/flans"; //url路径
import testVue from "../../phone/phone_one/comp/test/test.vue";

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
        { prop: "contractNo", label: "合同编号", width: "100" },
        { prop: "orpname", label: "客户名称", width: "200" },
        { prop: "paymentNo", label: "发票编号", width: "100" },
        { prop: "paymentNo", label: "收款单号", width: "100", primary: true },
        { prop: "invoiceSum", label: "开票金额", width: "100" },

        { prop: "backSum", label: "回款金额", width: "100" },
        { prop: "creationtime", label: "录入日期", width: "100" },
        { prop: "paymentTime", label: "开票日期", width: "150" },
        //
        { prop: "paymentTime", label: "回款日期", width: "150", primary: true },
        { prop: "pkPsndocShow", label: "业务员", width: "80" },
      ],
      select: {
        select: selectAllDetailFaFinanceAsPage,
        queryParam: { dr: 0, paymentType: 2 },
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
      replace: [],
    };
  },
  methods: {
    search_ts(ts) {
      //条件搜索
      this.content.visiable = false;
      let mindata = {
        pkPsndocShow: data["业务员"],
        customerCode: data["客户编码"],
        corpname: data["公司名称"],
        contractBillState: data["合同状态"],
        contractNo: data["合同编号"],
        corpname: data["公司名称"],
        isValid: data["有效合同"],
      };
      this.select = {
        select: this.select.select,
        queryParam: mindata,
      };
    },
    onButtonClick(param) {
      //修改组件调用
      if (param.btnCode === "ADD") {
        this.content.visiable = true;
      }
    },
    closed() {
      this.content.visiable = false;
    },
    titles(e) {
      //选择条件
      let queryParam = { dr: 0 };
      //利用事件冒泡来判断点击按钮
      if (e.target.innerHTML == "回款") {
        //回款和开票显示代码的静态区别显示
        this.columns[2].primary = true;
        this.columns[3].primary = false;
        this.columns[7].primary = true;
        this.columns[8].primary = false;
        this.columns[4].primary = true;
        this.columns[5].primary = false;
        queryParam.paymentType = 2;
      } else {
        // console.log(this.columns);
        this.columns[2].primary = false;
        this.columns[3].primary = true;
        this.columns[7].primary = false;
        this.columns[8].primary = true;
        this.columns[4].primary = false;
        this.columns[5].primary = true;
        queryParam.paymentType = 3;
      }
      //调用接口
      let newSelect = { select: this.select.select, queryParam: queryParam };
      this.select = newSelect;
    },
  },
};
</script>
<style  scoped>
</style>