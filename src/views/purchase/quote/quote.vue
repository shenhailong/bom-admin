<template>
  <div>
    <div class="icon">
      <i class="el-icon-phone-outline"><span>报价</span></i>
      <i class="el-icon-bell"><span>完成报价</span></i>
      <i class="el-icon-view"><span>查看</span></i>
      <i class="el-icon-edit"><span>修订</span></i>
      <i class="el-icon-tickets"><span>物料解析</span></i>
      <i class="el-icon-folder-opened"><span>工艺文件</span></i>
      <i class="el-icon-collection"><span>查看主题</span></i>
    </div>
    <div style="display: flex; padding: 11px; height: 0px">
    </div>

    <div>
      <btns @label="label"></btns>
    </div>
    <!--基础列表界面-->
    <!-- 采购报价 -->
    <searchs
      :visiable="visiables"
      @colsed="colsed"
      @search_ts="search_ts"
    ></searchs>
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

    <!--送审框Dialog通知钉钉-->
    <CommitDialog
      :visiable="commitDialog.visiable"
      :paramData="commitDialog.paramData"
      @close="closeCommitDialog"
      @commitMethod="commitPurchaseMethod"
    >
    </CommitDialog>

    <!--工艺审核详情Dialog-->
    <ProductionFlowOrderAuditFileDetails
      :replace="replace"
      :visiable="productionFlowOrderAuditFileDetails.visiable"
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      :pkProductOrder="content.pkProductOrder"
      @close="closeproductionFlowOrderAuditFileDetailst"
    >
    </ProductionFlowOrderAuditFileDetails>

    <!-- 查看主题弹窗 -->
    <!-- <el-dialog :visible.sync="centerDialogVisible" width="48%" @closed="handleClose">
      
      <div>
        <el-table
          :data="siteRecharge"
          height="450"
          :cell-style="{ padding: '1px' }"
          :cell-class-name="yellowBg"
          style="width: 100%"
        >
          <el-table-column prop="zong" label="发表时间" width="180">
            <template slot-scope="scope">
              <span> {{ scope.row.zong }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="评论内容" align="left">
            <template slot-scope="scope">
              <span> {{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.sort == '0'"
                class="el-icon-top"
                @click="handleClick(scope.row)"
                type="text"
                size="small"
              ></el-button>
              <el-button
                v-if="scope.row.sort == '1'"
                class="el-icon-bottom"
                @click="handleClick1(scope.row)"
                type="text"
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    
      <div class="iconRepert">
        <el-button
          v-if="this.showx == 0"
          class="showDiv"
          size="mini"
          type="primary"
          @click="showDiv"
          >开启留言</el-button
        >
        <el-button
          v-if="this.showx == 1"
          class="closeDiv"
          size="mini"
          type="info"
          @click="closeDiv"
          >关闭留言</el-button
        >
      </div>
      <div v-if="this.showx == 1">
        <div style="padding: 15px 0">
          <el-input
            :rows="5"
            :autosize="{ minRows: 5, maxRows: 10 }"
            type="textarea"
            v-model="textarea1"
          ></el-input>
        </div>
        <div style="width: 100%; padding: 15px">
          <div class="btnQ">
            <span class="bq" @click="qreport">取消</span>
          </div>
          <div class="btnF">
            <span class="bf" @click="report">发表</span>
          </div>
        </div>
      </div>
    
    </el-dialog> -->
        <drawer :drawer="drawer" @closer="drawers" :quto="siteRecharge" />
  </div>
</template>

<script>
import drawer from "@/components/newtab/item/drawer"; //消息中心
import Table from "@/components/viewcomp/Table";
import CommitDialog from "@/components/Commitdingding/CommitDialog";
import Purchasequotecontent from "@/views/purchase/quote/content";
import ProductQueryDialog from "@/views/purchase/quote/queryDialog";
import {
  listPurchase,
  updatePurchaseQuote,
  overPassPurchaseQuote,
} from "@/api/purchase/quote";
import { sendDingMsgByPsndoc } from "@/api/pub/pub";
import {
  insertOrderSaleStartB,
  selectAllOrderSaleStartB,
  updateOrderSaleStartB,
} from "@/api/orderCompMage/orderStart";
import ProductionFlowOrderAuditFileDetails from "@/views/purchase/quote/filedetails";
import searchs from "@/components/search/index"; //搜索
import btns from "@/components/btnselect/index"; //状态按钮
export default {
  name: "purchasequote",
  components: {
    Table,
    CommitDialog,
    Purchasequotecontent,
    ProductQueryDialog,
    ProductionFlowOrderAuditFileDetails,
    searchs,
    btns,
     drawer
  },
  // components: { Table, CommitDialog, Purchasequotecontent, ProductQueryDialog},
  data() {
    return {
      visiables: false,
       drawer: false, //消息显示隐藏
      content: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
      },
      queryDialog: {
        visiable: false,
      },
      commitDialog: {
        visiable: false,
        paramData: null,
      },
      siteRecharge: [], //主题列表
      saleTheme: "", //主题
      pkProductOrderB: "", //添加主题ID
      showx: 0, //控制评论按钮
      centerDialogVisible: false, //弹窗
      textarea1: "", //评论内容
      //控制工艺文件维护页面打开关闭
      productionFlowOrderAuditFileDetails: {
        visiable: false,
        paramData: null,
      },
      value11: "",
      options1: [
        { value: "", label: "请选择" },
        { value: "0", label: "请选择日期范围" },
        { value: "1", label: "请选择产品名称" },
        { value: "2", label: "请选择产品编号" },
        { value: "3", label: "请选择客户编号" },
        { value: "4", label: "请选择单据状态" },
        { value: "5", label: "请选择流水号" },
        { value: "6", label: "请选择业务员" },
      ],
      serial: "", //流水号
      customerCode: "", //客户编号
      pkPsndocShow: "", //销售负责人
      productCode: "", //产品编号
      productName: "", //产品名称
      startTime: "", //开始时间
      endTime: "", //结束时间
      options: [
        {
          value: "单据状态",
          label: "单据状态",
          children: [
            {
              value: null,
              label: "全部显示",
            },
            {
              value: "0",
              label: "自由态",
            },
            {
              value: "2",
              label: "已任领",
            },
            {
              value: "3",
              label: "采购报价完成",
            },
          ],
        },
        {
          value: "订单类型",
          label: "订单类型",
          children: [
            {
              value: "0",
              label: "普通合同",
            },
            {
              value: "1",
              label: "生产订单",
            },
            {
              value: "2",
              label: "OEM",
            },
            {
              value: "3",
              label: "DEM",
            },
            {
              value: "4",
              label: "贸易模式",
            },
          ],
        },
        {
          value: "PCB来源",
          label: "PCB来源",
          children: [
            {
              value: "0",
              label: "无",
            },
            {
              value: "1",
              label: "甲方提供",
            },
            {
              value: "2",
              label: "乙方提供",
            },
          ],
        },
        {
          value: "钢网来源",
          label: "钢网来源",
          children: [
            {
              value: "0",
              label: "无",
            },
            {
              value: "1",
              label: "甲方提供",
            },
            {
              value: "2",
              label: "乙方提供",
            },
          ],
        },
        {
          value: "物料来源",
          label: "物料来源",
          children: [
            {
              value: "0",
              label: "无",
            },
            {
              value: "1",
              label: "甲方提供",
            },
            {
              value: "2",
              label: "乙方提供",
            },
          ],
        },
      ],
      value: [],
      columns: [
        { prop: "pkPurchaseQuote", label: "主键", width: "10", primary: true },
        { prop: "serial", label: "流水号", width: "100" },
        { prop: "customerCode", label: "客户编号", width: "80" },
        { prop: "productCode", label: "产品编号", width: "110" },
        { prop: "productName", label: "产品名称", width: "120" },
        { prop: "productNum", label: "产品数量", width: "80" },
        { prop: "taxinclud", label: "税率", width: "80" },
        { prop: "Intaxprice", label: "采购成本单价", width: "80" },
        { prop: "IntaxZprice", label: "采购成本总价", width: "80" },
        { prop: "quoteEndDate", label: "报价有效日期", width: "100" },
        { prop: "pkPsndocShow", label: "业务员", width: "90" },
        // {prop: 'productUnitPrice', label:'未税单价', width: '120'},
        // {prop: 'taxProductUnitPrice', label:'含税总价', width: '120'},
        // {prop: 'productPrice', label:'产品金额', width: '120'},
        // {prop: 'taxProductPrice', label: '价税合计', width: '120'},
        { prop: "billState", label: "单据状态", width: "100" },
        { prop: "approverShow", label: "审批人", width: "70" },
        /////添加的字段
        // {prop: 'purchasePriceSale', label: '含税单价', width: '80'},
        // {prop: 'productNum', label: '产品数量', width: '80'},
        // {prop: 'purchaseTotalSale', label: '含税金额', width: '80'},
        /////
        { prop: "purchaseCreationtime", label: "发起时间", width: "120" },
        { prop: "approvetime", label: "审批时间", width: "120" },
      ],
      select: {
        select: listPurchase,
        queryParam: { billState: 2, dr: 0 },
        // 'queryParam': {billState:null, dr: 0}
      },
      top_btn: [
        {
          name: "搜索",
          code: "search",
        },
      ],
      act_btn: [
        {
          width: 160,
          name: "报价",
          code: "DOQUOTE",
          when: { billState: [2] },
          action: updatePurchaseQuote,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-phone-outline",
        },
        {
          name: "完成报价",
          code: "OVERQUOTE",
          when: { billState: [2] },
          action: updatePurchaseQuote,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-bell",
        },
        {
          name: "查看",
          code: "LOOKUP",
          when: { billState: [0, 1, 3, 6] },
          action: updatePurchaseQuote,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-view",
        },
        {
          name: "修订",
          code: "REVISE",
          when: { billState: [3] },
          action: updatePurchaseQuote,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-edit",
        },
        {
          name: "物料解析",
          code: "MATERIELANALY",
          when: { billState: [2, 3] },
          action: null,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-tickets",
        },
        {
          name: "工艺文件维护",
          code: "FILEDETAILS11",
          action: null,
          btnSize: "mini",
          iconPic: "el-icon-folder-opened",
          typeLess: "itag",
        },
        {
          name: "查看主题",
          code: "READTHEME",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-collection",
          btnSize: "mini",
        },
      ],
      replace: [
        {
          //   name: 'taxinclud',
          //   replace: {
          //     1: "不含税",
          //     1.13: "含税"
          //   }
        },
        {
          name: "billState",
          replace: {
            0: "自由态",
            1: "报价流程进行中",
            2: "已认领",
            3: "采购报价完成",
            4: "工艺审核完成",
            5: "生产报价完成",
            6: "销售报价完成",
          },
        },
      ],
      ressl: { dr: 0, billState: "2" }, //保留刷新
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
      //状态按钮
      this.ressl = data;
      let newSelect = { select: this.select.select, queryParam: this.ressl };
      this.select = newSelect;
    },
    colsed(data) {
      this.visiables = data;
    },
    search_ts(data) {
      this.visiables = false;
      // console.log(data);
      let mindata = {
        creationdateBegin: data["开始时间"],
        creationdateEnd: data["结束时间"],
        productCode: data["产品编码"],
        customerCode: data["客户编码"],
        billState: data["单据状态"][1],
        serial: data["流水号"],
        pkPsndocShow: data["业务员"],
        productName: data["产品名称"],
      };
      this.ressl = mindata
      this.label(this.ressl);
      data[0].timer_one = "";
      data[0].timer_two = "";
    },
drawers() {
      //消息中心的调用
      this.drawer = !this.drawer;
      this.label(this.ressl);
    },
   
    onButtonClick(param) {
      // 监控页面中所有的按钮点击事件
      if (param.btnCode === "BATCHOVERQUOTE") {
      }
      if (param.btnCode === "search") {
        this.visiables = true;
      }
      if (param.btnCode === "FILEDETAILS11") {
        // 文件详情
        this.content.updateRow = param.bindData;
        // this.commitDialog.paramData = param
        // this.openCommitDialog()
        this.openproductionFlowOrderAuditFileDetails();
      }
      // 查看事件
      if (param.btnCode === "LOOKUP") {
        this.openContent("查看", param.btnAction);
        this.content.updateRow = param.bindData;
      }
      // 报价事件
      if (param.btnCode === "DOQUOTE") {
        this.openContent("采购报价", param.btnAction);
        localStorage.setItem("isSteel", param.bindData.isSteel);
        this.content.updateRow = param.bindData;
      }
      // 修订事件
      if (param.btnCode === "REVISE") {
        this.openContent("采购报价", param.btnAction);
        this.content.updateRow = param.bindData;
      }
      // 查询界面
      if (param.btnCode === "QUERYDIALOG") {
        this.openQueryDialog();
      }
      // 完成报价事件
      if (param.btnCode === "OVERQUOTE") {
        // console.log(1);
        this.commitDialog.paramData = param;
        
        // console.log(this.commitDialog.paramData);
        this.openCommitDialog();
      }
      // 物料解析
      if (param.btnCode === "MATERIELANALY") {
        let queryParam = { pkProduct: param.bindData.pkProduct };
        this.$router.push({ path: "/MENU9047/MENU44558", query: queryParam });
      }

      //查看主题弹窗
      if (param.btnCode === "READTHEME") {
        if (param.bindData.pkProductOrderB) {
           this.drawer = !this.drawer;
          this.siteRecharge = param.bindData.pkProductOrderB;
          // this.centerDialogVisible = true;
          // this.saleTheme = param.bindData.saleTheme;
          // this.pkProductOrderB = param.bindData.pkProductOrderB;
          // let mrpParam = { pkProductOrderB: param.bindData.pkProductOrderB };
          // selectAllOrderSaleStartB(mrpParam).then((response) => {
          //   this.siteRecharge = response.object;
          //   for (var i = 0; i < this.siteRecharge.length; i++) {
          //     this.siteRecharge[i].zong =
          //       this.siteRecharge[i].chargePsnShow +
          //       "         " +
          //       this.siteRecharge[i].creationtime;
          //   }
          // });
        }
      }
    },
    // 条件查询列表数据
    queryViewListDataByWhere(whereParam) {
      this.viewDefaultBillState = whereParam;
      let queryParam = { dr: 0 };
      if (whereParam == "ALL") {
        // 全部
        this.viewDefaultBillState = null;
        queryParam.billState = null;
      } else {
        queryParam.billState = this.viewDefaultBillState;
      }

      // 触发查询接口 -- 主动触发Table组件中的查询逻辑
      //   let newSelect = {select: this.select.select, queryParam: queryParam }
      //   this.select = newSelect
      //   console.log(this.select)
    },
    // 完成采购报价
    commitPurchaseMethod(sendMsgParam) {
      this.$confirm("是否确认完成采购报价?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          // 预制公共信息
          if (sendMsgParam.paramData.bindData) {
            let publicDingMsgInfo = {
              customerCode: sendMsgParam.paramData.bindData.customerCode,
              productCode: sendMsgParam.paramData.bindData.productCode,
              productName: sendMsgParam.paramData.bindData.productName,
              orderNumber: sendMsgParam.paramData.bindData.productOrderNumber,
              pkPsndoc: sendMsgParam.paramData.bindData.pkPsndoc,
              constractno: sendMsgParam.paramData.bindData.constractno,
              orderNumber: sendMsgParam.paramData.bindData.orderNumber,
              quoreOrderDate: sendMsgParam.paramData.bindData.quoreOrderDate,
              orderType: sendMsgParam.paramData.bindData.orderType,
              expectDeliDate: sendMsgParam.paramData.bindData.expectDeliDate,
            };
            sendMsgParam.publicDingMsgInfo = publicDingMsgInfo;
          }
          // 消息发送节点
          sendMsgParam.sendTagName = "采购报价";
          sendDingMsgByPsndoc(sendMsgParam).then((response) => {
            if (!response.data.success) {
              this.$message({ type: "info", message: response.errorMessage });
            } else {
              let bindRowData = sendMsgParam.paramData.bindData;
              let updateParam = {
                pkPurchaseQuote: bindRowData.pkPurchaseQuote,
                pkProductOrderB: bindRowData.pkProductOrderB,
                pkProduct: bindRowData.pkProduct,
                taskId: bindRowData.taskId,
              };
              overPassPurchaseQuote(updateParam).then((response) => {
                this.$message({ message: "操作成功", type: "success" });
                bindRowData.billState = "采购报价完成";
                // this.queryListData()
                this.$message({ type: "success", message: "采购报价完成!" });
                this.label(this.ressl); //保留网页版的刷新问题
              });
            }
          });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消完成!" });
        });
    },
    //根据状态改变颜色
    yellowBg({ row, column, rowIndex, columnIndex }) {
      if (row.sort == 1) {
        return "cell-grey";
      }
    },
    //打开评论
    showDiv() {
      this.showx = 1;
    },
    //关闭留言按钮
    closeDiv() {
      this.showx = 0;
    },
    //发表评论
    report() {
      let param = {
        pkProductOrderB: this.pkProductOrderB,
        content: this.textarea1,
         msgType:1
      };
      let param1 = { pkProductOrderB: this.pkProductOrderB };
      insertOrderSaleStartB(param).then((response) => {
        if (response.message == "操作成功") {
          this.textarea1 = "";
          selectAllOrderSaleStartB(param1).then((response1) => {
            this.siteRecharge = response1.object;
            for (var i = 0; i < this.siteRecharge.length; i++) {
              this.siteRecharge[i].zong =
                this.siteRecharge[i].chargePsnShow +
                "       " +
                this.siteRecharge[i].creationtime;
            }
          });
        }
      });
    },
    //取消评论
    qreport() {
      this.textarea1 = "";
    },
    //点击置顶
    handleClick(row) {
      // console.log(row);
      let param = { pkOrderSaleStartB: row.pkOrderSaleStartB, sort: 1 };
      let param1 = { pkProductOrderB: this.pkProductOrderB };
      updateOrderSaleStartB(param).then((response) => {
        if (response.message == "操作成功") {
          selectAllOrderSaleStartB(param1).then((response1) => {
            this.siteRecharge = response1.object;
            for (var i = 0; i < this.siteRecharge.length; i++) {
              this.siteRecharge[i].zong =
                this.siteRecharge[i].chargePsnShow +
                "       " +
                this.siteRecharge[i].creationtime;
            }
          });
        }
      });
    },
    //取消置顶
    handleClick1(row) {
      let param = { pkOrderSaleStartB: row.pkOrderSaleStartB, sort: 0 };
      let param1 = { pkProductOrderB: this.pkProductOrderB };
      updateOrderSaleStartB(param).then((response) => {
        if (response.message == "操作成功") {
          selectAllOrderSaleStartB(param1).then((response1) => {
            this.siteRecharge = response1.object;
            for (var i = 0; i < this.siteRecharge.length; i++) {
              this.siteRecharge[i].zong =
                this.siteRecharge[i].chargePsnShow +
                "       " +
                this.siteRecharge[i].creationtime;
            }
          });
        }
      });
    },
    handleClose(){
        this.label(this.ressl);
    },
    // 打开查询模板
    openQueryDialog() {
      this.queryDialog.visiable = true;
    },
    // 关闭查询模板
    closeQueryDialog() {
      this.queryDialog.visiable = false;
    },
    // 打开送审框
    openCommitDialog() {
      this.commitDialog.visiable = true;
    },
    // 关闭送审框
    closeCommitDialog() {
      this.commitDialog.visiable = false;
      this.label(this.ressl);
    },
    //打开文件管理
    openproductionFlowOrderAuditFileDetails() {
      this.productionFlowOrderAuditFileDetails.visiable = true;
    },
    //关闭文件管理
    closeproductionFlowOrderAuditFileDetailst() {
      this.productionFlowOrderAuditFileDetails.visiable = false;
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
  position: absolute;
  right: 0;
  margin-top: 35px;
  margin-right: 50px;
  color: #409eff;
  font-size: 10px;
}
.icon i {
  padding-right: 10px;
}
/deep/ i:hover {
  color: #409eff;
}

.readClass {
  width: 100%;
  height: 40px;
  border: solid 1px #e9e5df;
  background: #e9e5df;
  // margin-top:12px;
}
.readZi {
  color: #92887d;
  line-height: 40px;
  font-size: 15px;
  margin-left: 15px;
}

.btnQ {
  width: 100px;
  height: 30px;
  border: solid 1px #01553d;
  background: #01553d;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  cursor: pointer;
  right: 0;
  margin-right: 130px;
}

.bq {
  color: white;
  line-height: 30px;
  font-size: 16px;
}
.bq:hover {
  color: black;
}
.btnF {
  width: 100px;
  height: 30px;
  cursor: pointer;
  border: solid 1px #01553d;
  background: #01553d;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  right: 0;
  margin-right: 18px;
}
.bf {
  color: white;
  line-height: 30px;
  font-size: 16px;
}

.bf:hover {
  color: black;
}

.iconRepert {
  width: 6%;
  height: 40px;
  float: right;
  padding: 1px 0 0 0;
}

/deep/ .showDiv {
  position: absolute;
  right: 0;
}

/deep/ .closeDiv {
  position: absolute;
  right: 0;
}

/deep/ .cell-grey {
  background: red;
}
</style>
