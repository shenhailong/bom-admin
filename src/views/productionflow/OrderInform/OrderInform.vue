<template>
  <div>
    <!-- 通知开票 -->
    <el-row>
      <el-col :span="24">
        <el-row>
          <el-col :span="2">
            <!-- 选择合同及合同子表中的产品信息 -->
            <OrderConstractProductSel @refreshTableList="refreshTableList">
            </OrderConstractProductSel>
          </el-col>
          <el-col :span="4" :offset="3">
            <el-tag class="ordre-tag"
              >当前选择订单合同:{{
                selectedConstractData == null
                  ? ""
                  : selectedConstractData.contractNo
              }}</el-tag
            >
          </el-col>
          <el-col :span="8" class="button">
            <el-button
              type="primary"
              size="mini"
              plain
              @click="onButtonClick({ btnCode: 'ADDINFORM', action: null })"
              >录入</el-button
            >
            <el-button
              size="mini"
              type="primary"
              plain
              @click="queryViewListDataByWhere('0')"
              >自由态</el-button
            >
            <el-button
              size="mini"
              type="primary"
              plain
              @click="queryViewListDataByWhere('1')"
              >进行中</el-button
            >
            <el-button
              size="mini"
              type="primary"
              plain
              @click="queryViewListDataByWhere('2')"
              >已完成</el-button
            >
            <el-button
              size="mini"
              type="primary"
              plain
              @click="queryViewListDataByWhere('ALL')"
              >全部显示</el-button
            >
          </el-col>
          <el-col :span="11" class="icon" :offset="1">
            <i class="el-icon-view"><span>查看详情</span></i>
            <i class="el-icon-edit"><span>文件下载</span></i>
            <i class="el-icon-finished"><span>开票完成</span></i>
            <i class="el-icon-delete-solid"><span>删除</span></i>
            <i class="el-icon-bell"><span>通知钉钉</span></i>
            <i class="el-icon-collection"><span>查看主题</span></i>
            <i class="el-icon-paperclip"><span>查看子表</span></i>
          </el-col>
        </el-row>
        <!-- <div style="display: flex;padding:11px;">
			 <div>
			  <el-select size="small" v-model="value11" placeholder="请选择">
				  <el-option
					v-for="item in options1"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				  </el-option>
				</el-select>
			</div>
			<div v-if="this.value11=='0'" style="margin-left:10px;">
				<el-date-picker
				  v-model="startTime"
				  size="small"
				  type="datetime"
				  value-format="yyyy-MM-dd HH:mm:ss"
				  style="width: 140px;"
				  placeholder="选择开始日期时间">
				</el-date-picker>
				<el-date-picker
				  v-model="endTime"
				  size="small"
				  type="datetime"
				  value-format="yyyy-MM-dd HH:mm:ss"
				  style="width: 140px;"
				  placeholder="选择结束日期时间">
				</el-date-picker>
				<el-button size="small" type="primary"  @click="searchDate">搜索</el-button>
			</div>
			<div v-if="this.value11=='1'" style="margin-left:10px;">
					<el-input style="width: 140px;" size="small" v-model="contractNo" placeholder="请输入合同编号"></el-input>
					<el-button  size="small" type="primary"  @click="searchContractNo">搜索</el-button>
			</div>
			<div v-if="this.value11=='2'" style="margin-left:10px;">
			   <el-input style="width: 140px;" size="small" v-model="customerCode" placeholder="请输入客户编号"></el-input>
			   <el-button size="small" type="primary"  @click="searchCustomer">搜索</el-button>
			</div>
			<div v-if="this.value11=='3'" style="margin-left:10px;">
				<el-input style="width: 140px;" size="small" v-model="productCode" placeholder="请输入产品编号"></el-input>
				<el-button size="small" type="primary"  @click="searchCode">搜索</el-button>
			</div>
			<div v-if="this.value11=='4'" style="margin-left:10px;">
				  <el-cascader
					size="small"
					v-model="value"
					:options="options"
					placeholder="请选择类型"
					></el-cascader>
				<el-button size="small" type="primary"    @click="seachBilistate">搜索</el-button>
			</div>
			<div v-if="this.value11=='5'" style="margin-left:10px;">
			   <el-input style="width: 140px;" size="small" v-model="constractPsnname" placeholder="请输入销售员"></el-input>
			   <el-button size="small" type="primary"  @click="searchConstractPsnname">搜索</el-button>
			</div>
		 </div> -->
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

    <!--通知开票详情Dialog-->
    <OrderInformEditContent
      :replace="replace"
      :visiable="content.visiable"
      :updateRow="content.updateRow"
      :title="content.title"
      :action="content.action"
      :contractNo="content.contractNo"
      :pkProductOrder="content.pkProductOrder"
      @close="
        () => {
          content.visiable = false;
        }
      "
    >
    </OrderInformEditContent>

    <!-- 查看主题弹窗 -->
    <el-dialog :visible.sync="centerDialogVisible" width="48%">
      <!-- <div class="readClass">
				  <span class="readZi">主题评论</span>
			</div> -->
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
      <!-- <div class="readClass">
				  <span class="readZi">发表评论</span>
			</div> -->
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
      <!-- <div slot="footer" class="dialog-footer">
		        <el-button @click="centerDialogVisible = false">取 消</el-button>
		        <el-button type="primary" @click="centerDialogVisible = true">确定</el-button>
		    </div> -->
    </el-dialog>

    <!-- 修改主题弹窗 -->
    <el-dialog :visible.sync="updatevisable" width="80%">
      <el-tag>修改数据</el-tag>
      <el-form :inline="true" ref="form" label-width="110px">
        <el-form-item label="销售员:">
          <el-input v-model="constractPsnname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户编号:">
          <el-input v-model="customerCode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="合同编号:">
          <el-input v-model="contractNo" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户名称:">
          <el-input v-model="corpname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单状态:">
          <el-input v-model="billState" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="生产状态:">
          <el-input v-model="productionState" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="有效合同:">
          <el-select v-model="isContract" placeholder="请选择">
            <el-option
              v-for="item in isContractOprion"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="note"></el-input>
        </el-form-item>
        <el-form-item label="预计交货日期:">
          <el-date-picker
            v-model="deliveryTime"
            type="datetime"
            value-format="yyyy-MM-dd"
            placeholder="预计交货日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatevisable = false"
          >取消</el-button
        >
        <el-button type="primary" @click="onUpdate">立即修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Table from "@/components/viewcomp/Table";
import OrderInformEditContent from "@/views/productionflow/OrderInform/content";
import OrderConstractProductSel from "@/views/productionflow/comp/OrderConstractProductSel";
import OrderProductInfoDetails from "@/views/productionflow/comp/OrderProductInfoDetails";
import CommitDialog from "@/components/Commitdingding/CommitDialog";
import { sendDingMsgByPsndoc } from "@/api/pub/pub"; // 调用钉钉后端API接口
import { mapGetters } from "vuex";
import { parseTime } from "@/utils/viewCompUtil";
import {
  insertOrderSaleStartB,
  selectAllOrderSaleStartB,
  updateOrderSaleStartB,
} from "@/api/orderCompMage/orderStart";
import {
  selectAllOmgNoticeInvoiceAsPage,
  insertOmgNoticeInvoice,
  updateOmgNoticeInvoice,
  deleteOmgNoticeInvoiceByPks,
  insertOmgNoticeInvoiceB,
} from "@/api/orderCompMage/OrderInform";

export default {
  name: "ProductionFlowOrderOrderComeView",
  components: {
    Table,
    CommitDialog,
    OrderInformEditContent,
    OrderConstractProductSel,
    OrderProductInfoDetails,
  },
  computed: {
    ...mapGetters(["userid"]),
  },
  data() {
    return {
      content: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
        contractNo: null, // 合同号
        pkProductOrder: null, // 单据业务属性 合同订单主键
        pkOmgNoticeInvoice: null,
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
      billState: "", //订单状态
      productionState: "", //生产状态
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
      //产品类别
      isContractOprion: [
        { value: 0, label: "否" },
        { value: 1, label: "是" },
      ],
      value: [],
      siteRecharge: [], //主题列表
      saleTheme: "", //主题
      pkProductOrderB: "", //添加主题ID
      showx: 0, //控制评论按钮
      centerDialogVisible: false, //弹窗
      updatevisable: false, //修改弹窗
      textarea1: "", //评论内容
      deliveryTime: "", //签订时间
      note: "", //备注
      isContract: "", //是否有效合同
      columns: [
        // {prop: 'scheduledtime', label: '预计交货日期', width: '150'},
        // {prop: 'pkOmgNoticeInvoice', label: '通知开票主键', primary:true},
        // {prop: 'contractNo', label: '合同编号', width: '120'},
        // {prop: 'pkProductOrderBShow', label: '产品名称', width: '120'},
        // {prop: 'productionState', label: '生产状态', width: '100'},
        // {prop: 'lnvoiceNo', label: '发票号', width: '120'},
        // {prop: 'billAmount', label: '金额', width: '70'},
        // {prop: 'chargePsnShow', label: '经办人', width: '70'},
        // {prop: 'chargeTime', label: '经办日期', width: '180'},
        // {prop: 'billState', label: '单据状态'},
        { prop: "pkOmgNoticeInvoice", label: "通知开票主键", primary: true },
        { prop: "constractPsnname", label: "销售员", width: "120" },
        { prop: "customerCode", label: "客户编号", width: "120" },
        { prop: "contractNo", label: "合同编号", width: "120" },
        { prop: "corpname", label: "客户名称", width: "120" },
        { prop: "totalproductUnitPrice", label: "合同金额", width: "120" },
        { prop: "contractCreationtime", label: "签订日期", width: "120" },
        { prop: "isContract", label: "有效合同", width: "120" },
        { prop: "deliveryTime", label: "发货完成日期", width: "120" },
        { prop: "totalBillAmount", label: "已开票金额", width: "120" },
        { prop: "totalPaymentAmount", label: "已回款金额", width: "120" },
        { prop: "nottotalBillAmount", label: "未开票金额", width: "120" },
        { prop: "nototalPaymentAmount", label: "未结余额", width: "120" },
        { prop: "billState", label: "订单状态", width: "120" },
        { prop: "productionState", label: "生产状态", width: "120" },
        { prop: "lnvoiceNo", label: "超期预警", width: "120" },
        { prop: "note", label: "备注", width: "120" },
      ],
      select: {
        select: selectAllOmgNoticeInvoiceAsPage,
        queryParam: { dr: 0 },
      },
      top_btn: [
        // {
        //   name: '录入',
        //   code: 'ADDINFORM',
        //   action: insertOmgNoticeInvoice,
        //   btnSize:'mini',
        //   styleAttr: `margin-top: 10px;`
        // },
      ],
      act_btn: [
        {
          width: "260",
          name: "查看产品数据",
          code: "LOOKORDERBPRODUCT",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-view",
          btnSize: "mini",
        },
        {
          name: "修改",
          code: "UPDATE",
          action: updateOmgNoticeInvoice,
          typeLess: "itag",
          iconPic: "el-icon-edit",
          btnSize: "mini",
        },
        {
          name: "开票完成",
          code: "OVERINFORM",
          action: updateOmgNoticeInvoice,
          when: { billState: [0] },
          typeLess: "itag",
          iconPic: "el-icon-finished",
          btnSize: "mini",
        },
        {
          name: "删除",
          code: "DELETE",
          action: deleteOmgNoticeInvoiceByPks,
          when: { billState: [0] },
          typeLess: "itag",
          iconPic: "el-icon-delete-solid",
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
        {
          name: "查看子表",
          code: "readSon",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-paperclip",
          btnSize: "mini",
        },
      ],
      replace: [
        {
          name: "billState",
          replace: {
            30: "订单报价中",
            31: "完成订单报价",
            51: "生产中",
            50: "签订成功",
            65: "合同完结",
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
        { name: "isContract", replace: { 0: "否", 1: "是" } },
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
    // 调用接口获取界面数据
    refreshTableList(constractData) {
      this.selectedConstractData = constractData;
      let queryParam = {
        pkProductOrder: constractData.pkProductOrder,
        dr: 0,
      };
      let newSelect = { select: this.select.select, queryParam: queryParam };
      this.select = newSelect;
    },
    // 监听按钮
    onButtonClick(param, btnCode, unexParam) {
      if (param.btnCode === "ADDINFORM") {
        // 录入通知开票
        // if (this.selectedConstractData && this.selectedConstractData.pkProductOrder && this.selectedConstractData.contractNo) {
        //   this.content.pkProductOrder = this.selectedConstractData.pkProductOrder
        //   this.content.contractNo = this.selectedConstractData.contractNo
        //   this.openContent('录入', param.btnAction)
        // } else {
        //   this.$message({ message: '请先选择合同！', type: 'warning' })
        // }

        if (this.selectedConstractData.pkProductOrder) {
          this.content.pkProductOrder = this.selectedConstractData.pkProductOrder;
          let param = { pkProductOrder: this.content.pkProductOrder };
          insertOmgNoticeInvoice(param).then((response) => {
            console.log(response);
          });
          // this.openContent('录入', param.btnAction)
        } else {
          this.$message({ message: "请先选择合同！", type: "warning" });
        }
      }
      if (param.btnCode === "LOOKORDERBPRODUCT") {
        // 查看订单中的产品详情
        this.orderProductInfoDetails.pkProductOrderB =
          param.bindData.pkProductOrderB;
        this.orderProductInfoDetails.visiable = true;
      }
      if (param.btnCode === "COMMITDINGDING") {
        // 推送消息到钉钉
        this.commitDialogData.visiable = true;
      }
      if (param.btnCode === "readSon") {
        // 查看子表
        this.content.updateRow = param.bindData;
        // console.log(param.bindData.pkOmgNoticeInvoice)
        this.content.pkProductOrder = param.bindData.pkProductOrder;
        this.content.contractNo = param.bindData.contractNo;
        this.content.pkOmgNoticeInvoice = param.bindData.pkOmgNoticeInvoice;
        this.openContent("修改", param.btnAction);
      }
      if (param.btnCode === "UPDATE") {
        // 修改
        // pkOmgNoticeInvoice
        this.content.updateRow = param.bindData;
        // console.log(this.content.updateRow);
        this.content.pkOmgNoticeInvoice = param.bindData.pkOmgNoticeInvoice;
        this.note = param.bindData.note;
        this.deliveryTime = param.bindData.deliveryTime;
        this.constractPsnname = param.bindData.constractPsnname;
        this.customerCode = param.bindData.customerCode;
        this.contractNo = param.bindData.contractNo;
        this.corpname = param.bindData.corpname;
        this.isContract = param.bindData.isContract;
        this.billState = param.bindData.billState;
        this.productionState = param.bindData.productionState;
        // this.content.pkProductOrder= this.content.updateRow.pkProductOrder
        // this.content.pkProductOrder = this.selectedConstractData.pkProductOrder
        // this.content.contractNo = this.selectedConstractData.contractNo
        // this.openContent('修改', param.btnAction)
        this.updatevisable = true;
      }
      if (param.btnCode === "OVERINFORM") {
        // 开票完成
        // debugger;
        let overParam = {
          pkOmgNoticeInvoice: param.bindData.pkOmgNoticeInvoice,
          billState: "2",
          chargePsn: this.userid,
          chargeTime: parseTime(new Date()),
        };

        this.$confirm("是否确认该项?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "确认成功!",
            });
            updateOmgNoticeInvoice(overParam).then((response) => {
              if (response.success) {
                  this.refreshTableList(this.selectedConstractData);
                  // location.reload();
              } else {
                this.$message({
                  message: `确认失败:${response.message}`,
                  type: "error",
                });
              }
            });
          
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
        // this.$message({ message: '确认成功!', type: 'success' })
        this.refreshTableList(this.selectedConstractData);
      }

      //查看主题弹窗
      if (param.btnCode === "READTHEME") {
        if (param.bindData.pkProductOrderB) {
          this.centerDialogVisible = false;
          this.saleTheme = param.bindData.saleTheme;
          this.pkProductOrderB = param.bindData.pkProductOrderB;
          let mrpParam = { pkProductOrderB: param.bindData.pkProductOrderB };
          selectAllOrderSaleStartB(mrpParam).then((response) => {
            this.siteRecharge = response.object;
            for (var i = 0; i < this.siteRecharge.length; i++) {
              this.siteRecharge[i].zong =
                this.siteRecharge[i].chargePsnShow +
                "         " +
                this.siteRecharge[i].creationtime;
            }
          });
        }
      }
    },
    //查询分类
    seachBilistate() {
      // console.log(this.value[1]);
      if (this.value[0] == "订单类型") {
        let queryParam = {
          page: 1,
          limit: 10,
          orderType: this.value[1],
          billState: null,
        };
        let newSelect = { select: this.select.select, queryParam: queryParam };
        this.select = newSelect;
        this.value = [];
      } else if (this.value[0] == "物料类型") {
        let queryParam = {
          page: 1,
          limit: 10,
          productType: this.value[1],
          billState: null,
        };
        let newSelect = { select: this.select.select, queryParam: queryParam };
        this.select = newSelect;
        this.value = [];
      } else if (this.value[0] == "PCB来源") {
        let queryParam = { page: 1, limit: 10, pcbSource: this.value[1] };
        let newSelect = { select: this.select.select, queryParam: queryParam };
        this.select = newSelect;
        this.value = [];
      } else if (this.value[0] == "钢网来源") {
        let queryParam = {
          page: 1,
          limit: 10,
          productSteelMeshSource: this.value[1],
        };
        let newSelect = { select: this.select.select, queryParam: queryParam };
        this.select = newSelect;
        this.value = [];
      } else if (this.value[0] == "物料来源") {
        let queryParam = { page: 1, limit: 10, materialSource: this.value[1] };
        let newSelect = { select: this.select.select, queryParam: queryParam };
        this.select = newSelect;
        this.value = [];
      } else if (this.value[0] == "单据状态") {
        let queryParam = { page: 1, limit: 10, billState: this.value[1] };
        let newSelect = { select: this.select.select, queryParam: queryParam };
        this.select = newSelect;
        this.value = [];
      }
    },
    //根据时间范围查询
    searchDate() {
      if (this.startTime && this.endTime) {
        let queryParam = {
          creationdateBegin: this.startTime,
          creationdateEnd: this.endTime,
        };
        let newSelect = { select: this.select.select, queryParam: queryParam };
        this.select = newSelect;
      } else {
        this.$message({
          message: "搜索条件不正确!",
        });
      }
    },

    //根据合同编号查询
    searchContractNo() {
      if (this.contractNo) {
        let newSelect = {
          select: this.select.select,
          queryParam: { contractNo: this.contractNo },
        };
        this.select = newSelect;
        this.contractNo = "";
      } else {
        this.$message({
          message: "搜索条件不正确!",
        });
      }
    },
    //查询产品编码
    searchCode() {
      if (this.productCode) {
        let newSelect = {
          select: this.select.select,
          queryParam: { productCode: this.productCode },
        };
        this.select = newSelect;
        this.productCode = "";
      } else {
        this.$message({
          message: "搜索条件不正确!",
        });
      }
    },
    //查询客户编码
    searchCustomer() {
      if (this.customerCode) {
        let newSelect = {
          select: this.select.select,
          queryParam: { customerCode: this.customerCode },
        };
        this.select = newSelect;
        this.customerCode = "";
      } else {
        this.$message({
          message: "搜索条件不正确!",
        });
      }
    },
    //查询销售负责人
    searchConstractPsnname() {
      if (this.constractPsnname) {
        let newSelect = {
          select: this.select.select,
          queryParam: { constractPsnname: this.constractPsnname },
        };
        this.select = newSelect;
        this.constractPsnname = "";
      } else {
        this.$message({
          message: "搜索条件不正确!",
        });
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

    //修改
    onUpdate() {
      let param = {
        pkOmgNoticeInvoice: this.content.pkOmgNoticeInvoice,
        note: this.note,
        isContract: this.isContract,
        deliveryTime: this.deliveryTime,
      };
      updateOmgNoticeInvoice(param).then((response) => {
        // console.log(response);
        if (response.message == "操作成功") {
          this.$message({
            message: "修改成功",
          });
          this.updatevisable = false;
        }
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
    // 条件查询列表数据
    queryViewListDataByWhere(whereParam) {
      let queryParam = { dr: 0 };
      if (whereParam == "ALL") {
        // 全部
      } else {
        queryParam.billState = whereParam;
      }

      // 触发查询接口 -- 主动触发Table组件中的查询逻辑
      let newSelect = { select: this.select.select, queryParam: queryParam };
      this.select = newSelect;
    },
    executeDindDingInterface(sendMsgParam) {
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
  margin-top: 30px;
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
.el-select /deep/.el-input__inner {
  width: 206px;
}
.el-input /deep/.el-input__inner {
  width: 200px;
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
