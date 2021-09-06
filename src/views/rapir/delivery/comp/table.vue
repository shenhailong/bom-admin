<template>
  <div>
     <!-- 选择按钮 -->
    <btns @label="label"></btns>
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
      @search_ts="search_one"
      @colsed="colsed"
    >
    </searchs>
    <!-- 钉钉通知 -->
    <CommitDialog
      :visiable="commitDialog.visiable"
      :paramData="commitDialog.paramData"
      @close="closeCommitDialog"
      @commitMethod="overProduceQuote"
    >
    </CommitDialog>
  </div>
</template>
<script>
import Table from "@/components/viewcomp/Table";
import searchs from "@/components/search/index";//搜索
import CommitDialog from "@/components/Commitdingding/CommitDialog"; //钉钉
import { selectAllRepairOrderAsPage,updateRepairOrder } from "@/api/rapir/rapir"; //返修url路径
import { sendDingMsgByPsndoc } from "@/api/pub/pub"; //钉钉消息
import btns from "@/components/btnselect/index"; //状态按钮
import bus from "@/assets/bus/eventBus.js";
export default {
  components: {
    Table,
    CommitDialog,
    btns,
    searchs,
  },
  data() {
    return {
      content: {
        //搜索页面
        visiable: false, // 内容界面显示控制
      },
      ressl: { dr: 0, repairState: 5 },
      columns: [
        // { prop: "pkMenu", label: "主键", width: "10", primary: true },
        { prop: "pkProduct", label: "主键", width: "10", primary: true },
        { prop: "repairNo", label: "返修编号", width: "100", search: true },

        { prop: "customerCode", label: "客户编码", width: "80" },
        { prop: "productCode", label: "产品编码", width: "100" },
        { prop: "productName", label: "产品名称", width: "100" },
        { prop: "repairNum", label: "返修数量", width: "100" },
        { prop: "repairState", label: "状态", width: "80" },
        { prop: "transportType", label: "发货方式", width: "80" },
        { prop: "transpostNo", label: "快递单号", width: "80" },
        // {prop: 'pkPsndocShow', label: '销售负责人', width: '100'},
        { prop: "creationtime", label: "创建时间", width: "140" },
      ],
      select: {
        select: selectAllRepairOrderAsPage,
        queryParam: { dr: 0, repairState: 5 },
      },
      top_btn: [
        {
          name: "搜索",
          code: "ADD",
          // action: addSmMenu,
        },
      ],
      act_btn: [
        {
          name: "完成报价",
          code: "OVERQUOTE",
          // when: { billState: [2] },
          when: { repairState: [5] },
          // action: updateProduceQuote,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-bell",
        },
        {
          name: "完成报价",
          code: "paperclip",
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-paperclip",
        },
        {
          name: "确定",
          code: "view",
          typeLess: "itag",
          iconPic: "el-icon-view",
          when: { repairState: [6] },
        },
        //
        {
          name: "修改",
          code: "LOOKUP",
          typeLess: "itag",
          iconPic: "el-icon-edit",
          when: { repairState: [5] },
        },
      ],
      replace: [
        {
          name: "repairState",
          replace: {
            0: "自由态",
            1: "入库中",
            2: "判定中",
            3: "维修中",
            4: "检验中",
            5: "出库中",
            6: "出库完成",
          },
        },
        {
          name: "transportType",
          replace: { 0: "自提", 1: "快递" },
        },
      ],
      commitDialog: {
        //钉钉
        visiable: false,
        paramData: null,
      },
    };
  },
  methods: {
    label(data) {
      // 刷新页面
      this.ressl = data;
      let newSelect = { select: this.select.select, queryParam: data };
      this.select = newSelect;
    },
    dateFormat(dateData) {
      //对日期进行的处理
      var date = new Date(dateData);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      const time = y + "-" + m + "-" + d;
      return time;
    },
    colsed(data) {
      // 弹窗的显示隐藏
      this.content.visiable = data;
    },
    //d钉钉通知  和 完成出库
    overProduceQuote(sendMsgParam) {
      let bindRowData = sendMsgParam.paramData.bindData;
      // console.log(bindRowData);
      let date = new Date();
      this.openCommitDialog();
      this.$confirm("是否确认完成生产报价?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          let jsons = {
            repairState: 6,
            pkCustomer: bindRowData.pkCustomer,
            pkProduct: bindRowData.pkProduct,
            pkRepairOrder: bindRowData.pkRepairOrder,
            outoperator: this.userid,
            confirmtime: this.dateFormat(date),
          };
          // 预制公共信息
          if (bindRowData) {
            let publicDingMsgInfo = {
              customerCode: bindRowData.customerCode,
              productCode: bindRowData.productCode,
              productName: bindRowData.productName,
              orderNumber: bindRowData.productNum,
              pkPsndoc: bindRowData.pkPsndoc,
              constractno: bindRowData.constractno,
              // orderNumber: bindRowData.orderNumber,
              quoreOrderDate: bindRowData.ts,
              orderType: bindRowData.orderType, //订单类型
              // expectDeliDate: bindRowData.ts,
            };
            sendMsgParam.publicDingMsgInfo = publicDingMsgInfo;
          }
          // 消息发送节点
          sendMsgParam.sendTagName = "不良品出库";
          sendDingMsgByPsndoc(sendMsgParam).then((response) => {
            if (!response.data.success) {
              this.$message({ type: "info", message: response.errorMessage });
            } else {
              updateRepairOrder(jsons).then((res) => {
                this.$message({
                  message: "已完成",
                  type: "success",
                });
                this.label(this.ressl);
              });
              // this.label(this.ressl);
            }
          });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消完成!" });
        });
    },
    closeCommitDialog() {
      this.commitDialog.visiable = false;
    },
    openCommitDialog() {
      this.commitDialog.visiable = true;
    },
    onButtonClick(param) {
      if (param.btnCode === "view") {
        // pkCustomer: 80
        // pkProduct: 69
        // pkRepairOrder: 1
        this.contents = {
          visiable: true, // 内容界面显示控制
          title: "查看", // 标题
          type: 10,
          bindData: param.bindData,
        };
        this.$emit("update:data", this.contents);
        // param.bindData.repairState = 1
    
      }
      if (param.btnCode === "paperclip") {
        //出库单需要上传的数据
        this.comp_index = {
          contentVisiable: true,
          title: "返修出库单上传",
          updateRow: param.bindData,
        };
        bus.$emit("compdata", this.comp_index);
      
      }
      if (param.btnCode === "OVERQUOTE") {
        // 钉钉通知
        if (param.bindData.realityNum != null) {
          this.commitDialog.paramData = param;
          this.openCommitDialog();
        } else {
          this.$message.error("实际数量未填写");
        }
      }
      //点击搜索
      if (param.btnCode === "ADD") {
        // 搜索弹窗
        this.content.visiable = true;
      }
      if (param.btnCode === "LOOKUP") {
        this.contents = {
          visiable: true, // 内容界面显示控制
          title: "查看", // 标题
          type: 1,
          bindData: param.bindData,
        };
        this.$emit("update:data", this.contents);
      }
      if (param.btnCode === "check") {
      }

      //   LOOKUP
    },
    search_one(data) {
      //点击搜索
      this.content.visiable = false;
      let mindata = {
        creationdateBegin: data["开始时间"],
        creationdateEnd: data["结束时间"],
        contractNo: data["合同编号"],
      };
     this.ressl = mindata
     this.label(this.ressl)
    },
  },
};
</script>
<style  scoped>
</style>