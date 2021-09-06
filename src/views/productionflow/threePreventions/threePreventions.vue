<template>
  <div>
    <!-- 三防生产 -->
    <el-row>
      <el-col :span="24">
        <el-row>
          <el-col :span="2">
            <!-- 选择合同及合同子表中的产品信息 -->
            <OrderConstractProductSel @refreshTableList="refreshTableList">
            </OrderConstractProductSel>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-tag class="ordre-tag"
              >当前选择订单合同:{{
                selectedConstractData == null
                  ? ""
                  : selectedConstractData.contractNo
              }}</el-tag
            >
          </el-col>
          <el-col :span="8" class="button">
            <!-- 状态按钮 -->
            <btns @label="label"></btns>
          </el-col>
          <el-col :span="11" class="icon">
            <i class="el-icon-view"><span>查看详情</span></i>
            <i class="el-icon-paperclip"><span>查看子表</span></i>
            <!--<i class="el-icon-check"><span>部分完成</span></i>-->
            <i class="el-icon-finished"><span>全部完成</span></i>
            <i class="el-icon-s-promotion"><span>查看进度条</span></i>
            <i class="el-icon-bell"><span>通知钉钉</span></i>
            <i class="el-icon-collection"><span>查看主题</span></i>
          </el-col>
        </el-row>
        <!-- 搜索 -->
        <searchs
          :visiable="visiables"
          @colsed="colsed"
          @search_ts="search_ts"
        ></searchs>
        <!--销售发起备忘录数据-->
        <Table
          :columns="columns"
          :select="select"
          :top_btn="top_btn"
          :act_btn="act_btn"
          :replace="replace"
          @onButtonClick="onButtonClick"
        >
        </Table>
      </el-col>
    </el-row>

    <!--送审框Dialog通知钉钉-->
    <CommitDialog
      :visiable="commitDialogData.visiable"
      :paramData="commitDialogData.paramData"
      @close="closeCommitDialog"
      @commitMethod="executeDindDingInterface"
    ></CommitDialog>

    <!--订单字表详情数据-->
    <OrderProductInfoDetails
      :visiable="orderProductInfoDetails.visiable"
      :pkProductOrderB="orderProductInfoDetails.pkProductOrderB"
      @close="
        () => {
          orderProductInfoDetails.visiable = false;
        }
      "
    >
    </OrderProductInfoDetails>

    <!--SMT子表展示组件-->
    <ProductionFlowOrderSmtContent
      :replace="replace"
      :visiable="content.visiable"
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      :pkProductOrder="content.pkProductOrder"
      :selectedConstractData="selectedConstractData"
      @refreshTableList="refreshTableList"
      @close="closeContent"
    >
    </ProductionFlowOrderSmtContent>
    <!-- <ProductionFlowOrderSmtContent
      :selected='selectProductionSmtSubAsPage'
      :contentVisiable="content.visiable"
      :title="content.title"
    ></ProductionFlowOrderSmtContent> -->
    <!--进度条-->
    <ProductionFlowStepsView
      :visiable="stepsInfo.visiable"
      :pkProductOrderB="stepsInfo.pkProductOrderB"
      @close="() => (stepsInfo.visiable = false)"
    >
    </ProductionFlowStepsView>

   
    <drawer :drawer="drawer" @closer="drawers" :quto="siteRecharge" />
  </div>
</template>

<script>
import drawer from "@/components/newtab/item/drawer"; //消息中心
import Table from "@/components/viewcomp/Table";
import ProductionFlowOrderSmtContent from "./subinfo/subinfo";
// import ProductionFlowOrderSmtContent from "@/components/Productionupload/index.vue";
import OrderConstractProductSel from "@/views/productionflow/comp/OrderConstractProductSel";
import OrderProductInfoDetails from "@/views/productionflow/comp/OrderProductInfoDetails";
import CommitDialog from "@/components/Commitdingding/CommitDialog";
import searchs from "@/components/search/index"; //搜索
// import windows from "./subinfo/windows" //修改弹窗
import btns from "@/components/btnselect/index"; //状态按钮
import ProductionFlowStepsView from "@/views/productionflow/comp/productionFlowSteps"; // 进度条
import { sendDingMsgByPsndoc } from "@/api/pub/pub"; // 调用钉钉后端API接口
import {
  selectAllProductionDefenseAsPage,
  updataSelectAllProductionDefenseAsPage,
  defenseInspeReportProccess
} from "@/api/ThreePreventions/index"; //三防信息
import {
  insertOrderSaleStartB,
  selectAllOrderSaleStartB,
  updateOrderSaleStartB,
} from "@/api/orderCompMage/orderStart";

export default {
  // name: "ProductionFlowOrderRepertoryView",
  components: {
    Table,
    CommitDialog,
    ProductionFlowOrderSmtContent,
    OrderConstractProductSel,
    OrderProductInfoDetails,
    ProductionFlowStepsView,
    searchs,
    btns,
      drawer
  },
  data() {
    return {
      drawer: false, //消息显示隐藏
      content: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
        pkProductOrder: null, // 单据业务属性 合同订单主键
      },
      visiables: false, //控制搜索框的显示隐藏
      visiablem: false, //修改界面的打开
      value11: "",
      // selectProductionSmtSubAsPage:selectProductionSmtSubAsPage,
      contractNo: "", //合同编号
      customerCode: "", //客户编号
      constractPsnname: "", //销售负责人
      productCode: "", //产品编号
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
      siteRecharge: [], //主题列表
      saleTheme: "", //主题
      pkProductOrderB: "", //添加主题ID
      showx: 0, //控制评论按钮
      centerDialogVisible: false, //弹窗
      textarea1: "", //评论内容
      stepsInfo: {
        // 进度条控制相关
        visiable: false,
        pkProductOrderB: null, // 订单子表主键
      },

      columns: [
        { prop: "scheduledtime", label: "预计交货日期", width: "100" },
        { prop: "pkOmgProduSmt", label: "SMT生产主键", primary: true },
        { prop: "pkProductOrderB", label: "合同子表主键", show: false },
        { prop: "contractNo", label: "合同编号", width: "90" },
        { prop: "productCode", label: "产品编号", width: "90" },
        { prop: "productName", label: "产品名称", width: "120" },
        { prop: "constractProductNum", label: "订单数量", width: "110" },
        { prop: "productionState", label: "生产状态", width: "100" },
        { prop: "finishNum", label: "累计完成数量", width: "100" },
        { prop: "completionTime", label: "完工时间", width: "100" },
        { prop: "mPrice", label: "工价单价", width: "100" },
        //
        { prop: "billState", label: "单据状态", width: "110" },
        // { prop: "memo", label: "备注", width: "160" },
        { prop: "constractPsnname", label: "销售员" },
      ],
      select: {
        select: selectAllProductionDefenseAsPage,
        queryParam: { dr: 0, billState: "1" },
      },
      top_btn: [
        {
          name: "搜索",
          code: "search",
        },
      ],
      act_btn: [
        {
          width: 240,
          name: "查看产品数据",
          code: "LOOKORDERBPRODUCT",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-view",
          btnSize: "mini",
        },
        {
          name: "查看子表",
          code: "FILEDETAILS",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-paperclip",
          btnSize: "mini",
        },
        {
          name: "sop",
          code: "exhibition",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-s-management",
          btnSize: "mini",
        },
        {
          name: "报检",
          code: "INSPEREPORT",
          when: { billState: [1] },
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-check",
          btnSize: "mini",
        },
        {
          name: "全部完成",
          code: "OVERSMT",
          when: { billState: [1] },
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-finished",
          btnSize: "mini",
        },
        {
          name: "进度",
          code: "LOOKUPSTEPS",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-s-promotion",
          btnSize: "mini",
        },
        {
          name: "通知钉钉",
          code: "COMMITDINGDING",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-bell",
          btnSize: "mini",
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
          name: "billState",
          replace: { 0: "自由态", 1: "进行中", 2: "已完成" },
        },
        {
          name: "productionState",
          replace: {
            0: "自由态",
            1: "生产中",
            2: "暂停(未启用)",
            3: "生产完成",
            4: "一键暂停",
          },
        },
      ],
      commitDialogData: {
        // 控制钉钉Dialog显示
        visiable: false,
        paramData: null,
      },
      orderProductInfoDetails: {
        visiable: false,
        pkProductOrderB: null, // 订单子表主键
      },
      selectedConstractData: null, // 当前选中的订单合同
      viewDefaultBillState: "1", // 界面默认单据状态条件,
      ressl: { dr: 0, billState: "1" }, //保留刷新
    };
  },
  methods: {
    determine(data) {
      // console.log(data);
      this.visiablem = false;
      // this.label(data)
    },
    label(data) {
      this.ressl = data;
      let newSelect = { select: this.select.select, queryParam: data };
      this.select = newSelect;
    },
    colsed(data) {
      this.visiables = data;
    },
    winclose() {
      this.visiablem = false;
    },
    search_ts(data) {
      //搜索
      this.visiables = false;
      // console.log(data);
      let mindata = {
        creationdateBegin: data["开始时间"],
        creationdateEnd: data["结束时间"],
        contractNo: data["合同编号"],
        productCode: data["产品编码"],
        customerCode: data["客户编码"],
        constractPsnname: data["客户名称"],
        orderType: data["选择类型"][1],
        constractPsnname: data["业务员"],
      };
      this.ressl = mindata;
      this.label(this.ressl); // 更新页面
    },
     drawers() {
      //消息中心的调用
      this.drawer = !this.drawer;
      this.label(this.ressl);
    },
    // 调用接口获取界面数据
    refreshTableList(constractData) {
      this.selectedConstractData = constractData;
      this.ressl.pkProductOrder = constractData.pkProductOrder
      let queryParam = {
        billState: this.viewDefaultBillState,
        dr: 0,
      };
      if (constractData) {
        queryParam.pkProductOrder = constractData.pkProductOrder;
      }
      let newSelect = { select: this.select.select, queryParam: queryParam };
      this.select = newSelect;
    },

    // 监听按钮
    onButtonClick(param, btnCode, unexParam) {
      if (param.btnCode === "LOOKORDERBPRODUCT") {
        // 查看订单中的产品详情
        this.orderProductInfoDetails.pkProductOrderB =
          param.bindData.pkProductOrderB;
        this.orderProductInfoDetails.visiable = true;
      }
      if (param.btnCode === "search") {
        this.visiables = true;
      }
      if (param.btnCode === "COMMITDINGDING") {
        // 推送消息到钉钉
        this.commitDialogData.paramData = param;
        this.commitDialogData.visiable = true;
      }
      if (param.btnCode === "FILEDETAILS") {
        this.content.updateRow = param.bindData;
        this.openContent("文件详情", null);
      }
      if (param.btnCode === "UPDATESALESTART") {
        //修改的点击事件
        this.visiablem = true;
      }
      //sop
      if(param.btnCode === "exhibition"){
        // this.$route.p   ,query:{user:param.bindData.pkCustomer}
        // console.log(param.bindData.pkProductOrderB);
        this.$router.push({path:"/hiderouters/exhibition",query:{pkProductOrderB:param.bindData.pkProductOrderB,type:['三防']}},);
      }
      if (param.btnCode === "OVERSMT") {
        // console.log(param);
        if (param.bindData.finishNum >= param.bindData.constractProductNum) {
          // SMT全部完成
          this.$confirm("是否操作该项?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              if (param.bindData.pkProductOrderB) {
                let overParam = {
                  pkOmgProduDefense: param.bindData.pkOmgProduDefense,
                  billState: "2",
                  pkProductOrderB: param.bindData.pkProductOrderB,
                };
                updataSelectAllProductionDefenseAsPage(overParam).then(
                  (res) => {
                    this.label(this.ressl);
                  }
                );
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消操作",
              });
            });
        } else {
          this.$message.error("累计完成数量小于订单数量");
        }
      }
      if (param.btnCode === "LOOKUPSTEPS") {
        // look steps
        this.stepsInfo.pkProductOrderB = param.bindData.pkProductOrderB;
        this.stepsInfo.visiable = true;
      }
      if (param.btnCode === "INSPEREPORT") {
        // DIP报检 开始成品质检
        this.$confirm("是否操作该项?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "操作成功!",
            });
            if (param.bindData.pkProductOrderB) {
              let inspeParam = {
                pkProductOrderB: param.bindData.pkProductOrderB,
              };
              defenseInspeReportProccess(inspeParam).then((res) => {
                this.label(this.ressl);
              });
            }
            this.refreshTableList(this.selectedConstractData);
            // location.reload();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      }
      //查看主题弹窗
      if (param.btnCode === "READTHEME") {
        if (param.bindData.pkProductOrderB) {
          this.drawer = !this.drawer;
          this.siteRecharge = param.bindData.pkProductOrderB;
        }
      }
    },
    openContent(title, action) {
      // 打开内容界面Dialog
      this.content.visiable = true;
      this.content.title = title;
      this.content.action = action;
    },
    closeContent() {
      // 关闭内容界面Dialog
      this.content.visiable = false;
    },
    closeCommitDialog() {
      this.commitDialogData.visiable = false;
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
     handleClose(){
      this.label(this.ressl);
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
    executeDindDingInterface(sendMsgParam) {
      let bindRowData = sendMsgParam.paramData.bindData;
        // console.log(bindRowData.billState);
        if(bindRowData.constractOrderType == 0){

        }
        let publicDingMsgInfo = {
          customerCode: bindRowData.customerCode,
          productCode: bindRowData.productCode,
          productName: bindRowData.productName,
          expectDeliDate:bindRowData.scheduledtime,
          // pkPsndoc:bindRowData.pkPsndoc,
          orderNumber: bindRowData.constractProductNum,
          // pkPsndoc: bindRowData.constractPsnname,
          constractno: bindRowData.contractNo,
          // orderNumber: bindRowData.orderNumber,
          quoreOrderDate: bindRowData.ts,
          orderType: '三防', //订单类型
          // PsndocShow:this.name
          // expectDeliDate: bindRowData.ts,
        };
        sendMsgParam.publicDingMsgInfo = publicDingMsgInfo;
      // 调用钉钉接口
      sendDingMsgByPsndoc(sendMsgParam).then((response) => {
        if (response && response.data.success) {
          // 调用接口后处理
          alert("调用钉钉接口成功");
        } else {
          alert("调用钉钉接口失败");
        }
      });
    },
  },
};
</script>

<style  lang="scss" type="text/scss" scoped>
.ordre-tag {
  margin-left: 10px;
  margin-top: 10px;
}
.button {
  margin-top: 10px;
}
.icon {
  margin-top: 80px;
  color: #409eff;
  position: absolute;
  right: 0;
}
div {
  font-size: 8px;
  color: #606266;
}
i {
  font-size: 15px;
  padding-left: 10px;
  cursor: pointer;
}
i span {
  font-size: 8px;
  padding-left: 5px;
}
/deep/ i:hover {
  color: #409eff;
  cursor: pointer;
}

.readClass {
  width: 100%;
  height: 40px;
  border: solid 1px #e9e5df;
  background: #e9e5df;
  margin-top: 12px;
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
