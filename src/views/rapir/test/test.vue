<template>
  <!-- 不良品维修 -->
  <div>
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
    <CommitDialog
      :visiable="commitDialog.visiable"
      :paramData="commitDialog.paramData"
      @close="closeCommitDialog"
      @commitMethod="overProduceQuote"
    >
    </CommitDialog>
    <repairContent :content="contents" @close="close"></repairContent>
  </div>
</template>
<script>
import Table from "@/components/viewcomp/Table";
import searchs from "@/components/search/index";
import repairContent from "@/components/repair/index";
import { updateRepairOrder } from "@/api/rapir/rapir";
import btns from "@/components/btnselect/index"; //状态按钮
import CommitDialog from "@/components/Commitdingding/CommitDialog"; //钉钉
import { selectAllRepairOrderAsPage } from "@/api/rapir/rapir"; //财务明细url路径
import { sendDingMsgByPsndoc } from "@/api/pub/pub"; //钉钉消息
export default {
  components: { Table, searchs, repairContent, btns, CommitDialog },
  data() {
    return {
      // title:'',
      visibles: false,
      content: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
      },
      contents: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
        type: 0,
      },
      ressl: { dr: 0, repairState: 3 },
      commitDialog: {
        visiable: false,
        paramData: null,
      },
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
        queryParam: { dr: 0, repairState: 3 },
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
           when: { repairState: [3] },
          // action: updateProduceQuote,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-bell",
        },
          {
          name: "确定",
          code: "view",
          typeLess: "itag",
          iconPic: "el-icon-view",
          when: { repairState: [4,5,6,7] },
        },
        {
          name: "查看",
          code: "LOOKUP",
          typeLess: "itag",
          iconPic: "el-icon-edit",
          when: { repairState: [3] },
          // width:'120'
        },
      ],
      replace: [
        {
          name: "repairState",
         replace: { 0: "自由态", 1: "入库中", 2: "判定中" ,3:'维修中',4:'检验中',5:'出库中',6:'出库完成'},
        },
        {
          name: "transportType",
          replace: { 0: "自提", 1: "快递" },
        },
      ],
    };
  },

  methods: {
    close() {
      this.contents.visiable = false;
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
        // param.bindData.repairState = 1
    
      }
      if (param.btnCode === "OVERQUOTE") {
        if (param.bindData.realityNum != null) {
              this.commitDialog.paramData = param;
            this.openCommitDialog();
          // console.log(param);
        } else {
          this.$message.error("实际数量未填写");
        }
    
      }
      //点击搜索
      if (param.btnCode === "ADD") {
        this.content.visiable = true;
      }
      if (param.btnCode === "LOOKUP") {
        this.contents = {
          visiable: true, // 内容界面显示控制
          title: "查看", // 标题
          type: 3,
          bindData: param.bindData,
        };
      }
     

      //   LOOKUP
    },
    label(data) {
      this.ressl = data;
      let newSelect = { select: this.select.select, queryParam: data };
      this.select = newSelect;
    },
    colsed(data) {
      // 弹窗的显示隐藏
      this.content.visiable = data;
    },
    closes() {
      this.visibles = false;
    },
    closeCommitDialog() {
      this.commitDialog.visiable = false;
    },
    overProduceQuote(sendMsgParam) {
      let bindRowData = sendMsgParam.paramData.bindData;
      console.log(bindRowData);
      this.openCommitDialog();
      this.$confirm("是否确认完成生产报价?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          // console.log(bindRowData.bindData.productNum);
          // paramData

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
          sendMsgParam.sendTagName = "不良品维修";
          sendDingMsgByPsndoc(sendMsgParam).then((response) => {
            if (!response.data.success) {
              this.$message({ type: "info", message: response.errorMessage });
            } else {
              // this.label(this.ressl)
              let jsons = {
                repairState: 4,
                pkCustomer: bindRowData.pkCustomer,
                pkProduct: bindRowData.pkProduct,
                pkRepairOrder: bindRowData.pkRepairOrder,
              };
              this.$confirm("此操作将永久修改信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then(() => {
                  this.$message({
                    type: "success",
                    message: "成功!",
                  });
                  updateRepairOrder(jsons).then((res) => {
                    this.label(this.ressl);
                  });
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消",
                  });
                });
            }
          });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消完成!" });
        });
    },
    openCommitDialog() {
      this.commitDialog.visiable = true;
    },
    //搜索接口
    search_one(data) {
      this.content.visiable = false;
      // console.log(data);
      let mindata = {
        creationdateBegin: data["开始时间"],
        creationdateEnd: data["结束时间"],
        contractNo: data["合同编号"],
      };
      this.select = {
        select: selectAllIfinancialInfoAsPage,
        queryParam: mindata,
      };
    },
  },
};
</script>
<style scoped="scoped">
</style>