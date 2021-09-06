<template>
  <div>
    <!--销售发起-->
    <el-row>
      <el-col :span="24">
        <el-row>
          <el-col :span="2">
            <!-- 选择合同及合同子表中的产品信息 -->
            <OrderConstractProductSel @refreshTableList="refreshTableList">
            </OrderConstractProductSel>
          </el-col>
          <el-col :span="5" :offset="3">
            <el-tag class="ordre-tag"
              >当前选择订单合同:{{
                selectedConstractData == null
                  ? ""
                  : selectedConstractData.contractNo
              }}</el-tag
            >
          </el-col>
          <el-col :span="7" class="button">
            <!-- <el-button
              type="primary"
              size="mini"
              :disabled="!selectedConstractData"
              @click="onButtonClick(null, 'ADDSALESTART', null)"
              >录入</el-button
            > -->
            <!-- <el-button
              type="primary"
              size="mini"
              v-if="this.xx == '1'"
              :disabled="
                !(
                  selectedConstractData &&
                  selectedConstractData.productionState == '0'
                )
              "
              @click="onButtonClick(null, 'DOSTART', null)"
            > -->
             <el-button
              type="primary"
              size="mini"
              :disabled="
                !(
                  selectedConstractData &&
                  selectedConstractData.productionState == '0'
                )
              "
              @click="onButtonClick(null, 'DOSTART', null)"
            >
              <!-- <el-button
              type="primary"
              size="mini"
              v-if="this.xx == '1'"
              
              @click="onButtonClick(null, 'DOSTART', null)"
            > -->
              一键发起
            </el-button>
            <el-button
              type="primary"
              size="mini"
              :disabled="
                !(
                  selectedConstractData &&
                  selectedConstractData.productionState == '1'
                )
              "
              @click="onButtonClick(null, 'DOSTOP', null)"
            >
              一键暂停
            </el-button>
            <el-button
              type="primary"
              size="mini"
              :disabled="
                !(
                  selectedConstractData &&
                  selectedConstractData.productionState == '4'
                )
              "
              @click="onButtonClick(null, 'STARTUP', null)"
            >
              一键启动
            </el-button>
          </el-col>
          <el-col :span="8" class="icon" :offset="2">
            <i class="el-icon-view"><span>查看详情</span></i>
            <i class="el-icon-edit"><span>编辑</span></i>
            <i class="el-icon-delete"><span>删除</span></i>
            <i class="el-icon-bell"><span>通知钉钉</span></i>
            <i class="el-icon-collection"><span>查看主题</span></i>
          </el-col>
        </el-row>

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
    <searchs
      :visiable="visiables"
      @colsed="colsed"
      @search_ts="sales"
    ></searchs>

    <!--销售发起数据录入-->
    <OrderSaleStartDoEditContent
      :replace="replace"
      :visiable="content.visiable"
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      :pkProductOrder="content.pkProductOrder"
      @close="closeContent"
    >
    </OrderSaleStartDoEditContent>

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

    <!--进度条-->
    <ProductionFlowStepsView
      :visiable="stepsInfo.visiable"
      :pkProductOrderB="stepsInfo.pkProductOrderB"
      @close="() => (stepsInfo.visiable = false)"
    >
    </ProductionFlowStepsView>

    <!-- 查看主题弹窗 -->
    <!-- <el-dialog :visible.sync="centerDialogVisible" width="48%">
 
			
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
    <drawer :drawer="drawer" @closer="drawers" :quto='siteRecharge' />
  </div>
</template>

<script>
import Table from "@/components/viewcomp/Table";
import OrderSaleStartDoEditContent from "@/views/productionflow/OrderSell/content";
import OrderConstractProductSel from "@/views/productionflow/comp/OrderConstractProductSel";
import OrderProductInfoDetails from "@/views/productionflow/comp/OrderProductInfoDetails";
import CommitDialog from "@/components/Commitdingding/CommitDialog";
import { sendDingMsgByPsndoc } from "@/api/pub/pub"; // 调用钉钉后端API接口
import {
  orderSaleDoStartProccess,
  orderSaleStartUpProccess,
} from "@/api/orderCompMage/orderCompMage";
import { updateProductOrderStateOutByPk } from "@/api/orders/orders";
import {
  selectAllOrderSaleStartAsPage,
  insertOrderSaleStart,
  deleteOrderSaleStartByPks,
  updateOrderSaleStart,
} from "@/api/orderCompMage/orderStart";
import {
  insertOrderSaleStartB,
  selectAllOrderSaleStartB,
  updateOrderSaleStartB,
} from "@/api/orderCompMage/orderStart";
import { npx, npxMate } from "@/utils/viewCompUtil";
import ProductionFlowStepsView from "@/views/productionflow/comp/productionFlowSteps"; // 进度条
import { mapGetters } from "vuex";
import searchs from "@/components/search/index"; // 搜索
import drawer from '@/components/newtab/item/drawer'  //消息中心

export default {
  name: "ProductionFlowOrderSellView",
  components: {
    Table,
    OrderSaleStartDoEditContent,
    CommitDialog,
    OrderConstractProductSel,
    OrderProductInfoDetails,
    ProductionFlowStepsView,
    searchs,
    drawer,
  },
  computed: {
    ...mapGetters(["userid", "roles"]),
  },
  inject: ["reload"],
  data() {
    return {
       drawer: false,//消息显示隐藏
       siteRecharge: [], //主题列表
      visiables: false, //控制搜索框的显示隐藏
      content: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
        pkProductOrder: null, // 单据业务属性 合同订单主键
      },
      value11: "",
      options1: [
        { value: "", label: "请选择" },
        { value: "0", label: "请选择日期范围" },
        { value: "1", label: "请选择合同编号" },
        { value: "2", label: "请选择客户编号" },
        { value: "3", label: "请选择产品编号" },
        { value: "5", label: "请选择销售员" },
      ],
      contractNo: "", //合同编号
      customerCode: "", //客户编号
      constractPsnname: "", //销售员
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
              label: "ODM",
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
      xx: "1",
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
      ressl:{dr:0},
      columns: [
        { prop: "contractCreationtime", label: "签订日期", width: "150" },
        { prop: "scheduledtime", label: "预计交货日期", width: "100" },
        { prop: "pkOrderSaleStart", label: "销售发起主键", primary: true },
        { prop: "pkProductOrderB", label: "合同子表主键", show: false },
        { prop: "pkProductOrder", label: "合同主键", show: false },
        { prop: "contractNo", label: "合同编号", width: "80" },
        { prop: "productCode", label: "产品编号", width: "100" },
         { prop: "customerCode", label: "客户编号", width: "80" },
        // customerCode
        { prop: "constractProductNum", label: "订单数量", width: "80" },
        { prop: "productionState", label: "合同生产状态", width: "60" },
        {prop:'schedule',label:'产品生产状态',width: "120"},
        { prop: "state", label: "紧急状态" ,width:'60'},
        { prop: "model", label: "产品型号", width: "120" },
        { prop: "productName", label: "产品名称", width: "120" },
        { prop: "constractOrderType", label: "合同类型", width: "80" },
        { prop: "saleTheme", label: "主题", width: "50" },
        { prop: "pkPsndocShow", label: "业务员", width: "60" },
        { prop: "saleContent", label: "内容", width: "50" },
      ],
      select: {
        select: selectAllOrderSaleStartAsPage,
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
          width: 180,
          name: "查看产品数据",
          code: "LOOKORDERBPRODUCT",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-view",
          btnSize: "mini",
        },
        {
          name: "修改",
          code: "UPDATESALESTART",
          action: updateOrderSaleStart,
          typeLess: "itag",
          iconPic: "el-icon-edit",
          btnSize: "mini",
        },
        {
          name: "删除",
          code: "DELETE",
          action: deleteOrderSaleStartByPks,
          typeLess: "itag",
          iconPic: "el-icon-delete",
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
          name: "state",
          replace: { 0: "知会", 1: "预警", 2: "紧急", 3: "事故" },
        },
        // {
        //   name:'schedule',
        //   replace:{0:'自由态',1:'进行中' , 2:'已完成'}
        // },
        {
          name: "constractOrderType",
          replace: {
            0: "普通合同",
            1: "生产订单",
            2: "OEM",
            3: "ODM",
            4: "贸易模式",
          },
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
    };
  },
  methods: {
    sales(data) {
      this.visiables = false;
      let mindata = {
        scheduledtime: data['预计交货日期'],
        contractNo: data['合同编号'],
        productCode: data['产品编码'],
        productName: data['产品名称'],
        pkPsndocShow: data['业务员'],
        customerCode:data['客户编码'],
        // pkProductOrder:this.pkProductOrder
      };
      this.ressl = mindata
      this.upsdata(this.ressl)
    },
    upsdata(datas){
      this.select = {
        select: this.select.select,
        queryParam: datas,
      };
    },
    colsed(data) {
      this.visiables = data;
    },
    // 调用接口获取界面数据
    refreshTableList(constractData) {
      // console.log(constractData.pkProductOrder);
      this.ressl.pkProductOrder = constractData.pkProductOrder
      // console.log(this.ressl.pkProductOrder);
      this.selectedConstractData = constractData;
      let queryParam = {
        pkProductOrder: constractData.pkProductOrder,
        dr: 0,
      };
      let newSelect = { select: this.select.select, queryParam: queryParam };
      this.select = newSelect;
    },
     drawers() {
      //消息中心的调用
   
      // this.ressl.pkProductOrder = this.stepsInfo.pkProductOrderB
      this.drawer = !this.drawer;
      // console.log(this.ressl);
      this.upsdata(this.ressl)
    },
    // 监听按钮
    onButtonClick(param, btnCode, unexParam) {
      // console.log(param);
      if (param != null) {
        if (param.btnCode === "search") {
          this.visiables = true;
        }
      }

      if (btnCode === "ADDSALESTART") {
        // 录入销售发起数据
        // 校验是否选择订单信息
        if (
          this.selectedConstractData &&
          this.selectedConstractData.pkProductOrder
        ) {
          this.content.pkProductOrder = this.selectedConstractData.pkProductOrder;
          this.openContent("录入", insertOrderSaleStart);
        } else {
          this.$message({
            showClose: true,
            message: "请先选择订单信息!",
            type: "warning",
          });
        }
      }
      if (btnCode == "DOSTART") {
        this.$confirm("是否确认选择订单信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // console.log(1);
            let orderStartDoParam = {
              pkProductOrder: this.selectedConstractData.pkProductOrder,
            };
            // console.log(
            //   this.selectedConstractData,
            //   this.selectedConstractData.pkProductOrder
            // );
            if (
              this.selectedConstractData &&
              this.selectedConstractData.pkProductOrder
            ) {
              orderSaleDoStartProccess(orderStartDoParam).then((response) => {
                this.xx = "0";
                this.selectedConstractData.productionState = "1"; // 0:自由态 1:生产中 2:暂停生产(预留不启用) 3:生产完成 4:一键暂停
                this.refreshTableList(this.selectedConstractData);
                // location.reload();
              });
              this.$message({
                type: "success",
                message: "发起请求成功!",
              });
            } else {
              alert("请先选择订单信息");
            }
            
          })
          .catch(() => {
            // console.log(2);
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
      if (btnCode === "DOSTOP") {
        // 一键暂停
        this.$confirm("你确定要暂停吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
             this.$message({
                type: "success",
                message: "发送请求成功!",
              });
            // console.log(1);
            let orderStartDoParam = {
              pkProductOrder: this.selectedConstractData.pkProductOrder,
            };
            if (
              this.selectedConstractData &&
              this.selectedConstractData.pkProductOrder
            ) {
              updateProductOrderStateOutByPk(orderStartDoParam).then(
                (response) => {
                  // this.xx = "0";
                  this.selectedConstractData.productionState = "4"; // 0:自由态 1:生产中 2:暂停生产(预留不启用) 3:生产完成 4:一键暂停
                  this.refreshTableList(this.selectedConstractData);
                  // location.reload();
                }
              );
             
            } else {
              alert("请先选择订单信息");
            }
            
          })
          .catch(() => {
            // console.log(2);
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
      if (btnCode === "STARTUP") {
        this.$confirm("你确定要启动吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            // console.log(1);
            let orderStartDoParam = {
              pkProductOrder: this.selectedConstractData.pkProductOrder,
            };
            if (
              this.selectedConstractData &&
              this.selectedConstractData.pkProductOrder
            ) {
              this.$message({
                type: "success",
                message: "发起请求成功!",
              });
              orderSaleStartUpProccess(orderStartDoParam).then((response) => {
                // this.xx = "0";
                this.selectedConstractData.productionState = "1"; // 0:自由态 1:生产中 2:暂停生产(预留不启用) 3:生产完成 4:一键暂停
                this.refreshTableList(this.selectedConstractData);
                // location.reload();
              });
              
            } else {
              alert("请先选择订单信息");
            }
            
          })
          .catch(() => {
            // console.log(2);
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
        // 针对暂停后的合同进行启动生产
        // 校验是否选择订单信息
        
      }
      if (param != null && param.btnCode === "UPDATESALESTART") {
        // 修改销售发起数据
        this.content.pkProductOrder = param.bindData.pkProductOrder;
        this.openContent("修改", param.btnAction);
        this.content.updateRow = param.bindData;
      }
      if (param != null && param.btnCode === "LOOKORDERBPRODUCT") {
        // 查看订单中的产品详情
        this.orderProductInfoDetails.pkProductOrderB =
          param.bindData.pkProductOrderB;
        this.orderProductInfoDetails.visiable = true;
      }
      if (param != null && param.btnCode === "LOOKUPSTEPS") {
        // look steps
        // console.log(param.bindData.pkProductOrderB);
        this.stepsInfo.pkProductOrderB = param.bindData.pkProductOrderB;
        this.stepsInfo.visiable = true;
      }
      if (param != null && param.btnCode === "COMMITDINGDING") {
        // 推送消息到钉钉
        // console.log(param.bindData);
        this.commitDialogData.paramData = param.bindData;
        this.commitDialogData.visiable = true;
      }
      //查看主题弹窗
      if (param != null && param.btnCode === "READTHEME") {
        if (param.bindData.pkProductOrderB) {
          this.drawer = !this.drawer;
        this.siteRecharge = param.bindData.pkProductOrderB
    
        }
      }
    },

    //根据状态改变颜色
    yellowBg({ row, column, rowIndex, columnIndex }) {
      if (row.sort == 1) {
        return "cell-grey";
      }
    },
    //打开留言按钮
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
    openContent(title, action) {
      // 打开内容界面Dialog
      this.content.visiable = true;
      this.content.title = title;
      this.content.action = action;
    },
    closeContent(actTemp) {
      // 关闭内容界面Dialog
      if (actTemp && actTemp.pkProductOrder) {
        let queryParam = {
          pkProductOrder: actTemp.pkProductOrder,
        };
        let newSelect = { select: this.select.select, queryParam: queryParam };
        this.select = newSelect;
      }

      this.content.visiable = false;
    },
    closeCommitDialog() {
      this.commitDialogData.visiable = false;
    },
    executeDindDingInterface(sendMsgParam) {
      // console.log("我是钉钉接口");
      let bindRowData = sendMsgParam.paramData;
      // scheduledtime
      // 预制公共信息
      let publicDingMsgInfo = {
        // customerCode: bindRowData.customerCode,
        productCode: bindRowData.productCode,
        productName: bindRowData.productName,
        // pkPsndoc: bindRowData.pkPsndoc,
        constractno: bindRowData.contractNo,
        orderNumber: bindRowData.constractProductNum,
        // quoreOrderDate:bindRowData.quoreOrderDate,
        orderType: bindRowData.constractOrderType,
        // expectDeliDate:bindRowData.expectDeliDate,
      };
      sendMsgParam.publicDingMsgInfo = publicDingMsgInfo;
      // console.log(sendMsgParam);
      // 调用钉钉接口
      sendDingMsgByPsndoc(sendMsgParam).then((response) => {
        if (response && response.data.success) {
          // 调用接口后处理
        } else {
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
.icon {
  margin-top: 15px;
  color: #409eff;
  position: absolute;
  right: 0;
  margin-top: 30px;
}
// div{
//   font-size: 8px;
//   color:  #606266;
// }
i {
  font-size: 15px;
  padding-left: 10px;
  cursor: pointer;
}
i span {
  font-size: 10px;
  padding-left: 5px;
}
/deep/ i:hover {
  color: #409eff;
}
.button {
  margin-top: 10px;
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
