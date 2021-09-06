<template>
  <div>
    <!-- 采购明细 -->
    <btns @label="label"></btns>
    <div class="icon">
      <!-- <i class="el-icon-phone-outline"><span>报价</span></i> -->
      <!-- <i class="el-icon-edit"><span>下载文件</span></i> -->
      <i class="el-icon-download"><span>下载文件</span></i>
    </div>
    <!-- 搜索 -->
    <searchs
      :visiable="visiables"
      @colsed="colsed"
      @search_ts="orderType"
    ></searchs>
    <!--基础列表界面-->
    <!-- 采购报价 -->
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
    <Purchasequotecontent
      :replace="replace"
      :visiable="content.visiable"
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent"
    >
    </Purchasequotecontent>
  </div>
</template>

<script>
import Table from "@/components/viewcomp/Table";
import CommitDialog from "@/components/Commitdingding/CommitDialog";
import Purchasequotecontent from "@/views/purchase/quote/content";
import ProductQueryDialog from "@/views/purchase/quote/queryDialog";
import {
  selectAllPriceInfoMaterialAsPage,
  updatePurchaseQuote,
  overPassPurchaseQuote,
} from "@/api/purchase/quote";
import { sendDingMsgByPsndoc, downloadProductFile } from "@/api/pub/pub";
import { saveOrderCompFile } from "@/api/orderCompMage/AproductionPub";
import searchs from "@/components/search/index";
import btns from "@/components/btnselect/index"; //状态按钮

export default {
  name: "purchasequote",
  components: {
    Table,
    CommitDialog,
    Purchasequotecontent,
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
      contentVisiable: false, // dialog 显示框
      commitDialog: {
        visiable: false,
        paramData: null,
      },
      columns: [
        { prop: "pkPurchaseQuote", label: "主键", width: "10", primary: true },
        { prop: "contractNo", label: "合同编号", width: "80" },
        { prop: "customerCode", label: "客户编号", width: "80" },
        { prop: "productCode", label: "产品编号", width: "100" },
        { prop: "productName", label: "产品名称", width: "80" },
        { prop: "constractProductNum", label: "订单数量", width: "80" },
        //
        { prop: "taxinclud", label: "税率", width: "80" },
        { prop: "pkPsndocShow", label: "销售员", width: "80" },
        { prop: "productionState", label: "订单状态", width: "100" },
        // {prop: 'corpname', label: '公司名称', width: '80'},
        { prop: "materialSource", label: "物料来源", width: "80" },
        { prop: "orderSignTime", label: "签订日期", width: "120" },

        { prop: "orderType", label: "合同类型", width: "80" },

        { prop: "pcbSource", label: "PCB来源", width: "100" },
        { prop: "steelMeshSource", label: "钢网来源", width: "100" },
        { prop: "costUnitPriceNt", label: "物料未税单价", width: "100" },
        { prop: "taxCostUnitPriceNt", label: "物料含税单价", width: "100" },
        { prop: "a1", label: "物料含税总价", width: "100" },
        { prop: "changShow", label: "经办人", width: "80" },
      ],
      select: {
        select: selectAllPriceInfoMaterialAsPage,
        queryParam: { billState: 2, dr: 0 },
      },
      uploadUrl: process.env.BASE_API + "/", // 上传地址
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
          action: updatePurchaseQuote,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-phone-outline",
        },

        {
          name: "下载文件",
          code: "download",
          action: null,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-download",
        },
      ],
      replace: [
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
        {
          name: "productType",
          replace: { 0: "自由态", 1: "加工", 2: "OEM", 3: "ODM", 4: "物料" },
        },
      ],
      ressl: { billState: 2, dr: 0 },
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
    orderType(data) {
      this.visiables = false;
      let mindata = {
        creationdateBegin: data["开始时间"],
        creationdateEnd: data["结束时间"],
        contractNo: data["合同编号"],
        productName: data["产品名称"],
        customerCode: data["客户编码"],
        productCode: data["产品编码"],
        corpname: data["公司名称"],
        orderType: data["合同类型"][0],
        pkPsndocShow: data["业务员"],
      };
      (this.ressl = mindata), this.label(this.ressl);
    },
    colsed(data) {
      this.visiables = data;
    },
    onButtonClick(param) {
      // 监控页面中所有的按钮点击事件
      if (param.btnCode === "BATCHOVERQUOTE") {
      }
      if (param.btnCode === "search") {
        this.visiables = true;
      }
      // 报价事件
      if (param.btnCode === "DOQUOTE") {
        this.openContent("采购报价", param.btnAction);
        this.content.updateRow = param.bindData;
      }
      // 修订事件
      if (param.btnCode === "REVISE") {
        this.openContent("采购报价", param.btnAction);
        this.content.updateRow = param.bindData;
      }
      //下载文件
      if (param.btnCode === "download") {
        var materielFileName = param.bindData.materielFileName;
        var materielFilefullName = param.bindData.materielFilefullName;
        var contractNo = param.bindData.contractNo;
        var downLoadParma = {
          fileName: materielFileName,
          fileFullName: materielFilefullName,
          contractNo: contractNo,
        };
        if (materielFileName && materielFilefullName) {
          downloadProductFile(downLoadParma).then((response) => {
            const blob = response.data;
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = (e) => {
              const a = document.createElement("a");
              if (materielFileName) {
                a.download = materielFileName;
              } else {
                a.download = materielFileName;
              }
              a.href = e.target.result;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            };
          });
        }
      }
    },
    queryListData(queryParam) {
      // 刷新界面数据
      if (queryParam) {
        let queryDialogParam = {
          productCode: queryParam.productCode,
          pkPsndoc: queryParam.pkPsndoc,
          customerCode: queryParam.customerCode,
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
.icon {
  float: right;
  margin-top: 20px;
  margin-right: 50px;
  color: #409eff;
  font-size: 10px;
}
.icon i {
  padding-right: 10px;
}
/deep/ i:hover {
  color: #409eff;
  cursor: pointer;
}
</style>
