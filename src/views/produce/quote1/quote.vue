<template>
  <!-- 生产明细 -->
  <div>
    <btns @label="label"></btns>
    <div class="icon">
      <!-- <i class="el-icon-phone-outline"><span>报价</span></i>
      <i class="el-icon-view"><span>查看</span></i> -->
      
    </div>
    <searchs
      :visiable="visiables"
      @colsed="colsed"
      @search_ts="detailed"
    ></searchs>
    <!--基础列表界面-->
    <Table
      :columns="columns"
      :select="select"
      :top_btn="top_btn"
      :act_btn="act_btn"
      :replace="replace"
      @onButtonClick="onButtonClick"
    >
    </Table>
    <!--新增修改界面-->
    <Producequotecontent
      :replace="replace"
      :visiable="content.visiable"
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent"
    >
    </Producequotecontent>
  </div>
</template>

<script>
import Table from "@/components/viewcomp/Table";
import CommitDialog from "@/components/Commitdingding/CommitDialog";
import Producequotecontent from "@/views/produce/quote/content";
import ProductQueryDialog from "@/views/salemage/product/queryDialog";
import {
  listProduceQuote,
  updateProduceQuote,
  overPassProduceQuote,
  selectAllPriceInfoProduceAsPage,
} from "@/api/produce/quote";
import { sendDingMsgByPsndoc } from "@/api/pub/pub";
import searchs from "@/components/search/index";
import btns from "@/components/btnselect/index"; //状态按钮

export default {
  name: "producequote",
  components: {
    Table,
    CommitDialog,
    Producequotecontent,
    ProductQueryDialog,
    searchs,
    btns,
  },
  data() {
    return {
      visiables: false,
      content: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
      },
      queryDialog: {
        visiable: false,
      },
      viewDefaultBillState: "",
      commitDialog: {
        visiable: false,
        paramData: null,
      },
      columns: [
        { prop: "pkProduceQuoteH", label: "主键", width: "10", primary: true },
        { prop: "pkCustomer", label: "客户信息", width: "120", show: false },
        { prop: "customerCode", label: "客户编码", width: "80" },
        { prop: "contractNo", label: "合同编号", width: "80", show: true },
        { prop: "orderSignTime", label: "签订日期", width: "120", show: true },
        // {prop: 'productCode', label: '发货日期', width: '120'},
        { prop: "productCode", label: "产品编号", width: "100" },
        { prop: "productName", label: "产品名称", width: "100" },
        { prop: "constractProductNum", label: "订单数量", width: "80" },
        { prop: "orderType", label: "合同类型", width: "80", show: true },
        { prop: "pkPsndocShow", label: "销售员", width: "80", show: true },
        { prop: "smtUnitPrices", label: "SMT未税合计", width: "110" },
        { prop: "dipUnitPrice", label: "DIP未税合计", width: "110" },
        {
          prop: "defenseUnitPrice",
          label: "三防未税合计",
          width: "110",
          show: true,
        },
        { prop: "testUnitPrice", label: "组装未税合计", width: "110" },
        // {prop: 'unitTotalTriceOut', label: '生产未税单价', width: '110'},
        { prop: "Costunitprice", label: "生产成本单价", width: "110" },
        { prop: "asprice", label: "生产成本总价", width: "110" },
        { prop: "changShow", label: "经办人", width: "110" },
        { prop: "productionState", label: "订单状态", width: "110" },
        { prop: "dr", label: "删除标志", width: "120", show: false },
        { prop: "ts", label: "时间戳", width: "120", show: false },
      ],
      select: {
        select: selectAllPriceInfoProduceAsPage,
        // 'queryParam': {dr:0,billState:2}
        queryParam: { dr: 0 },
      },
      top_btn: [
        {
          name: "搜索",
          code: "search",
        },
      ],
      act_btn: [
        {
          name: "报价",
          code: "DOQUOTE",
          when: { billState: [2] },
          action: updateProduceQuote,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-phone-outline",
        },
      ],
      replace: [
        {
          // name: 'taxinclud',
          // replace: {
          //   1: "不含税",
          //   1.13: "含税"
          // }
        },
        {
          name: "productionState",
          replace: {
            0: "自由态",
            1: "报价流程进行中",
            2: "已认领",
            3: "采购报价完成",
            4: "工艺审核完成",
            5: "生产报价完成",
            6: "销售报价完成",
            7: "确认报价完成",
          },
        },
        {
          name: "orderType",
          replace: {
            0: "普通合同",
            1: "生产订单",
            2: "OEM",
            3: "DEM",
            4: "贸易模式",
          },
        },
        {
          name: "materialSource",
          replace: { 0: "无", 1: "甲方提供", 2: "乙方提供", 3: "部分甲方提供" },
        },
        {
          name: "steelMeshSource",
          replace: { 0: "无", 1: "甲方提供", 2: "乙方提供" },
        },
        {
          name: "pcbSource",
          replace: { 0: "无", 1: "甲方提供", 2: "乙方提供" },
        },
        // {
        //   name: "productType",
        //   replace: { 0: "自由态", 1: "加工", 2: "OEM", 3: "ODM", 4: "物料" },
        // },
      ],
      ressl: { dr: 0 },
    };
  },
  created() {
    let productCode = this.$route.query.productCode;
    if (productCode) {
      this.select.queryParam.productCode = productCode;
    }
  },
  methods: {
    label(data) {
      this.ressl = data;
      let newSelect = { select: this.select.select, queryParam: data };
      this.select = newSelect;
    },
    colsed(data) {
      this.visiables = data;
    },
    detailed(data) {
      
      this.visiables = false;
      let mindata = {
        creationdateBegin: data["开始时间"],
        creationdateEnd: data["结束时间"],
        contractNo: data["合同编号"],
        // productCode: data['产品编码'],
        productName: data["产品名称"],
        customerCode: data["客户编码"],
        productCode: data["产品编码"],
        corpname: data["公司名称"],
        orderType: data["合同类型"][0],
        // orderType: data['选择类型'][1],
        pkPsndocShow: data["业务员"],
        // billState: null,
      };
      this.ressl = mindata
      this.label(this.ressl);
      // this.select={
      //   select:this.select.select,
      //   queryParam:mindata
      // }
    },
    onButtonClick(param) {
      // 监控页面中所有的按钮点击事件
      // 报价事件
      if (param.btnCode === "DOQUOTE") {
        this.openContent("生产报价", param.btnAction);
        this.content.updateRow = param.bindData;
      }
      if (param.btnCode === "search") {
        this.visiables = true;
      }
    },
    queryListData(queryParam) {
      // 刷新界面数据
      if (queryParam) {
        let queryDialogParam = {
          productCode: queryParam.productCode,
          pkPsndoc: queryParam.pkPsndoc,
          customShortName: queryParam.customShortName,
          billState: queryParam.billState,
          creationdateBegin: queryParam.creationdateBegin,
          creationdateEnd: queryParam.creationdateEnd,
        };
        let newSelect = {
          select: this.select.select,
          queryParam: queryDialogParam,
        };
        this.select = newSelect;
      } else {
        let newSelect = { select: this.select.select, queryParam: { dr: 0 } };
        this.select = newSelect;
      }
    },
    // 打开完成报价
    openCommitDialog() {
      this.commitDialog.visiable = true;
    },
    // 关闭完成报价
    closeCommitDialog() {
      this.commitDialog.visiable = false;
    },
    openContent(title, action) {
      // 打开内容界面Dialog
      this.content.visiable = true;
      this.content.title = title;
      this.content.action = action;
    },
    closeContent(tempData) {
      // 关闭内容界面Dialog
      this.content.visiable = false;
    },
  },
};
</script>

<style  lang="scss" type="text/scss" scoped>
div {
  font-size: 8px;
}
.icon {
  float: right;
  margin-top: 20px;
  margin-right: 50px;
  color: #409eff;
}
/deep/ i:hover {
  color: #409eff;
  cursor: pointer;
}
</style>
