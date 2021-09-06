<template>
  <!-- 产品管理 -->
  <div>
    <div style="display: flex; padding: 11px">

         <btns @label="label"></btns>
      <!-- <searchs
        :visiable="visiables"
        @colsed="colsed"
        :title="content.title"
        @search_ts="search_two"
      ></searchs> -->
    </div>
    <div class="icon">
      <i class="el-icon-view"><span>查看</span></i>
      <i class="el-icon-edit"><span>编辑</span></i>
      <i class="el-icon-delete"><span>删除</span></i>
      <i class="el-icon-bell"><span>送审工艺部门</span></i>
    </div>
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
    <Productcontent
      :replace="replace"
      :visiable="content.visiable"
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent"
      @refreshList="queryListData"
    >
    </Productcontent>
    <!--查询模板界面-->
    <ProductQueryDialog
      :visiable="queryDialog.visiable"
      @close="closeQueryDialog"
      @refreshList="queryListData"
    >
    </ProductQueryDialog>
    <!--送审框Dialog通知钉钉-->
    <CommitDialog
      :visiable="commitDialog.visiable"
      :paramData="commitDialog.paramData"
      @close="closeCommitDialog"
      @commitMethod="commitTechnicsMethod"
    >
    </CommitDialog>
  </div>
</template>

<script>
import Table from "@/components/viewcomp/Table";
import CommitDialog from "@/components/Commitdingding/CommitDialog";
import Productcontent from "@/views/salemage/product/content";
import ProductQueryDialog from "@/views/salemage/product/queryDialog";
import {
  listProduct,
  addProduct,
  deleteProductByPks,
  updateProduct,
  commitTechnics,
} from "@/api/salemage/product";
import { sendDingMsgByPsndoc } from "@/api/pub/pub";
import searchs from "@/components/search/index";
import btns from "@/components/btnselect/index"; //状态按钮
export default {
  name: "saleproduct",
  inject: ["reload"],
  components: {
    Table,
    CommitDialog,
    Productcontent,
    ProductQueryDialog,
    searchs,
    btns
  },
  created(){
    //  console.log(this.$route.path)
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
      input: "", //搜索值
      listQuery: {
        //通过分页查询值
        page: 1,
        limit: 10,
      },
      constractTableList: [],
      queryDialog: {
        visiable: false,
      },
      commitDialog: {
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
      ],
      //搜索字段
      startTime: "", //开始日期
      endTime: "", //结束日期
      name: "", //产品名称
      code: "", //产品编号
      customerCode: "", //客户编号
      columns: [
        { prop: "pkProduct", label: "主键", width: "10", primary: true },
        { prop: "name", label: "产品名称", width: "110", fixedLeft: true },
        { prop: "code", label: "产品编码", width: "100" },
        { prop: "model", label: "产品型号", width: "100" },
        { prop: "pkPsndocShow", label: "业务员", width: "100" },
        { prop: "materialSource", label: "物料来源", width: "80" },
        { prop: "pcbSource", label: "PCB来源", width: "80" },
        { prop: "customerCode", label: "客户编码", width: "80" },
        { prop: "steelMeshSource", label: "钢网来源", width: "80" },
        { prop: "technicsState", label: "单据状态", width: "80" },
        { prop: "creationtime", label: "创建时间", width: "130" },
      ],
      select: {
        select: listProduct,
        queryParam: { technicsState: 20, dr: 0 },
        // 'queryParam': { name: "612测试板", dr: 0 }
      },
      top_btn: [
        {
          name: "搜索",
          code: "QUERYDIALOG",
          btnSize: "mini",
          action: listProduct,
        },
        // {
        //   name: '录入',
        //   code: 'ADD',
        //   action: addProduct
        // },
        // {
        //   name: "全部显示",
        //   code: "QUERYALL",
        //   btnSize: "mini",
        //   action: listProduct,
        // },
        // {
        //   name: "搜索",
        //   code: "search",
        //   // btnSize: "mini",
        //   action: listProduct,
        // },
        // technicsState
        // {
        //   name: "工艺审核中",
        //   code: "gongyi1",
        //   btnSize: "mini",
        //   action: listProduct,
        // },
        // {
        //   name: "工艺审核完成",
        //   code: "gongyi",
        //   btnSize: "mini",
        //   action: listProduct,
        // },
      ],
      act_btn: [
        {
          name: "查看",
          code: "LOOKUP",
          when: { technicsState: [20, 21, 22] },
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-view",
        },
        {
          name: "修改",
          code: "UPDATE",
          when: { technicsState: [20, 22] },
          action: updateProduct,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-edit",
        },
        {
          name: "删除",
          code: "DELETE",
          when: { technicsState: [0] },
          action: deleteProductByPks,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-delete",
        },
        {
          name: "送审工艺部",
          code: "COMMIT",
          when: { technicsState: [20] },
          action: commitTechnics,
          width: 150,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-bell",
        },
      ],
      replace: [
        {
          name: "technicsState",
          replace: {
            0: "自由态",
            20: "未申请",
            21: "工艺审核中",
            22: "工艺审核完成",
          },
        },
        {
          name: "materialSource",
          replace: { 1: "甲方提供", 2: "乙方提供", 3: "部分甲方提供" },
        },
        {
          name: "steelMeshSource",
          replace: { 0: "无", 1: "甲方提供", 2: "乙方提供" },
        },
        {
          name: "pcbSource",
          replace: { 1: "甲方提供", 2: "乙方提供" },
        },
      ],
     ressl:{ technicsState: 20, dr: 0}

    };
  },
  methods: {
    label(data) {
      this.ressl =data
      let newSelect = { select: this.select.select, queryParam: data };
      this.select = newSelect;
    },
    onButtonClick(param) {
      // 监控页面中所有的按钮点击事件
      // 全部显示
      if (param.btnCode === "QUERYALL") {
        this.queryListData({});
      }
      //工艺审核完成
      if (param.btnCode === "gongyi") {
        this.queryListData({ dr: 0, technicsState: 22 });
      }
      //工艺审核中
      if (param.btnCode === "gongyi1") {
        this.queryListData({ dr: 0, technicsState: 21 });
      }
      // 录入
      if (param.btnCode === "ADD") {
        this.openContent("录入", param.btnAction);
      }
      //  搜索
      if (param.btnCode === "search") {
        // console.log("ss");
        this.visiables = !this.visiables;
        this.content.title = "搜索条件";
      }
      // 修改
      if (param.btnCode === "UPDATE") {
        this.openContent("修改", param.btnAction);
        this.content.updateRow = param.bindData;
      }
      // 查看
      if (param.btnCode === "LOOKUP") {
        this.openContent("查看", null);
        this.content.updateRow = param.bindData;
      }
      // 查询界面
      if (param.btnCode === "QUERYDIALOG") {
        this.openQueryDialog();
      }
      // 送审工艺部
      if (param.btnCode === "COMMIT") {
        this.commitDialog.paramData = param;
        this.openCommitDialog();
      }
    },
    //关闭蒙版
    colsed(data) {

      this.visiables = data;
    },
    queryListData(queryParam) {
      // 刷新界面数据
      if (queryParam) {
        let queryDialogParam = {
          productCode: queryParam.productCode,
          pkPsndoc: queryParam.pkPsndoc,
          customShortName: queryParam.customShortName,
          technicsState: queryParam.technicsState,
          creationdateBegin: queryParam.creationdateBegin,
          creationdateEnd: queryParam.creationdateEnd,
          customerCode: queryParam.customerCode,
        };
        let newSelect = {
          select: this.select.select,
          queryParam: queryDialogParam,
        };
        this.select = newSelect;
      } else {
        let newSelect = {
          select: this.select.select,
          queryParam: this.select.queryParam,
        };
        this.select = newSelect;
      }
    },
    // 送审工艺部
    commitTechnicsMethod(sendMsgParam) {
      this.$confirm("是否确认送审单据到工艺部?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          // 预制公共信息
          if (sendMsgParam.paramData.bindData) {
            let publicDingMsgInfo = {
              customerCode: sendMsgParam.paramData.bindData.customerCode,
              productCode: sendMsgParam.paramData.bindData.code,
              productName: sendMsgParam.paramData.bindData.name,
              orderNumber: sendMsgParam.paramData.bindData.orderNumber,
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
          sendMsgParam.sendTagName = "销售发起工艺审核";
          sendDingMsgByPsndoc(sendMsgParam).then((response) => {
            if (!response.data.success) {
              this.$message({ type: "info", message: response.errorMessage });
            } else {
              let bindRowData = sendMsgParam.paramData.bindData;
              // 流程实例ID
              let processInstanceId = bindRowData.processInstanceId;
              // 产品名称
              let productName =
                bindRowData.name == null ? "**" : bindRowData.name;
              // 产品编码
              let productCode =
                bindRowData.code == null ? "**" : bindRowData.code;
              // 客户编码
              let customerCode =
                bindRowData.customerCode == null
                  ? "**"
                  : bindRowData.customerCode;
              // 产品主键
              let pkProduct =
                bindRowData.pkProduct == null ? "**" : bindRowData.pkProduct;
              let flowTitle =
                productName + "_" + productCode + "_" + customerCode;
              let commitParam = {
                pkProduct: bindRowData.pkProduct,
                flowTitle: flowTitle,
                processInstanceId: processInstanceId,
              };
              commitTechnics(commitParam).then((response) => {
                this.$message({
                  message: "送审成功!",
                  type: "success",
                });
                bindRowData.technicsState = "工艺审核中";
                this.$message({ type: "success", message: "送审成功!" });
                // location.reload();  
                this.label(this.ressl)
              });
            }
          });
          
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消送审!" });
        });
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
 search_two(data){
  //  console.log(data);
     this.visiables=false
     let mindata = {
        creationdateBegin:data[0].timer_one,
        creationdateEnd:data[0].timer_two,
        name:data[1],
        code:data[2],
        customerCode:data[3],
        creatorShow:data[4]
      }
      this.ressl =mindata
      this.select={
        select:this.select.select,
        queryParam:mindata
      }
 }
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
i:hover {
  color: #409eff;
  cursor: pointer;
}
</style>
