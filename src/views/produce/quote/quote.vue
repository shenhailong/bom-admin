<template>
  <div>
   
    <searchs
    :visiable="visiables"
    @colsed="colsed"
    @search_ts="search_ts"
    ></searchs>
    <div>
      <btns @label="label"></btns>
      
    </div>
    <div class="icon">
      <i class="el-icon-bell"><span>完成报价</span></i>
      <i class="el-icon-phone-outline"><span>报价</span></i>
      <i class="el-icon-view"><span>查看</span></i>
      <i class="el-icon-collection"><span>查看主题</span></i>
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
    <Producequotecontent
      :replace="replace"
      :visiable="content.visiable"
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent"
    >
    </Producequotecontent>
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
      @commitMethod="overProduceQuote"
    >
    </CommitDialog>
    <drawer :drawer="drawer" @closer="drawers" :quto='siteRecharge' />
  </div>
</template>

<script>
import Table from "@/components/viewcomp/Table";
import CommitDialog from "@/components/Commitdingding/CommitDialog";
import Producequotecontent from "@/views/produce/quote/content";
import ProductQueryDialog from "@/views/salemage/product/queryDialog";
import searchs from "@/components/search/index";//搜索
import btns from "@/components/btnselect/index"; //状态按钮
import {
  listProduceQuote,
  updateProduceQuote,
  overPassProduceQuote,
} from "@/api/produce/quote";
import { sendDingMsgByPsndoc } from "@/api/pub/pub";
import {
  insertOrderSaleStartB,
  selectAllOrderSaleStartB,
  updateOrderSaleStartB,
} from "@/api/orderCompMage/orderStart";
import drawer from '@/components/newtab/item/drawer'  //消息中心

export default {
  name: "producequote",
  components: { Table, CommitDialog, Producequotecontent, ProductQueryDialog,searchs,btns,drawer },
  data() {
    return {
      drawer: false,//消息显示隐藏
       siteRecharge: [], //主题列表
      visiables:false,
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
      saleTheme: "", //主题
      pkProductOrderB: "", //添加主题ID
      showx: 0, //控制评论按钮
      centerDialogVisible: false, //弹窗
      textarea1: "", //评论内容
      commitDialog: {
        visiable: false,
        paramData: null,
      },
      options1: [
        { value: "", label: "请选择" },
        { value: "0", label: "请选择类型" },
        { value: "1", label: "请选择客户编号" },
        { value: "2", label: "请选择产品编号" },
      ],
      value11: "",
      customerCode: "",
      productCode: "",
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
              value: "5",
              label: "生产报价完成",
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
         { prop: "pkProduceQuoteH", label: "主键", width: "10", primary: true },
        { prop: "serial", label: "流水号", width: "120" },
         { prop: "customerCode", label: "客户编号", width: "120" },
         { prop: "productCode", label: "产品编码", width: "120" },
        
       { prop: "productNum", label: "订单数量", width: "80" },
       { prop: "taxinclud", label: "税率", width: "80" },
        { prop: "pkCustomer", label: "客户信息", width: "120", show: false },
       
        { prop: "pkPsndoc", label: "业务员", width: "120", show: false },
        { prop: "pkProduct", label: "产品信息", width: "120", show: false },
        
        { prop: "productName", label: "产品名称", width: "120" },
        { prop: "productModel", label: "产品型号", width: "120" },
        
        {
          prop: "unitPriceOut",
          label: "外协工序单价",
          width: "120",
          show: false,
        },
        {
          prop: "unitTotalOut",
          label: "外协订单合计",
          width: "120",
          show: false,
        },
        // {prop: 'productUnitPrice', label:'未税单价', width: '120'},
        // {prop: 'taxProductUnitPrice', label:'含税总价', width: '120'},
        // {prop: 'productPrice', label:'产品金额', width: '120'},
        // {prop: 'taxProductPrice', label: '价税合计', width: '120'},
        /////新增字段
        // {prop: 'costUnitPriceNt', label: '产品未税单价', width: '120'},
        // {prop: 'priceTaxTotal ', label: '价税合计', width: '120'},
        // { prop: "taxinclud", label: "税率", width: "80" },
        { prop: "billState", label: "单据状态", width: "80" },
        { prop: "creator", label: "创建人", width: "80", show: false },
        { prop: "creatorShow", label: "创建人", width: "80" },
        { prop: "creationtime", label: "发起时间", width: "120" },
        { prop: "approvetime", label: "审批时间", width: "120" },
        // {prop: 'creationtime', label: '创建时间', width: '130'},
        { prop: "dr", label: "删除标志", width: "120", show: false },
        { prop: "ts", label: "时间戳", width: "120", show: false },
      ],
      select: {
        select: listProduceQuote,
        queryParam: { dr: 0, billState: 2 },
      },
      top_btn: [
        {
          name: '搜索',
          code: 'search',
        
        },
        // {
        //   name: '批量通过',
        //   code: 'BATCHOVERQUOTE',
        //   action: updateProduceQuote,
        //   btnSize:'mini'
        // }
      ],
      act_btn: [
        {
          width: 120,
          name: "报价",
          code: "DOQUOTE",
          when: { billState: [2] },
          action: updateProduceQuote,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-phone-outline",
        },
        {
          name: "完成报价",
          code: "OVERQUOTE",
          when: { billState: [2] },
          action: updateProduceQuote,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-bell",
        },
        {
          name: "查看",
          code: "LOOKUP",
          when: { billState: [0, 1, 5, 6] },
          action: updateProduceQuote,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-view",
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
          // name: "taxinclud",
          // replace: {
          //   1: "不含税",
          //   1.13: "含税",
          // },
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
      ressl:{dr: 0, billState: "2"}//保留刷新
    };
  },
  created() {
    let productCode = this.$route.query.productCode;
    if (productCode) {
      this.select.queryParam.productCode = productCode;
    }
  },
  methods: {
    //状态按钮方法
    label(data) {
      this.ressl =data
      let newSelect = { select: this.select.select, queryParam: data };
      this.select = newSelect;
    },
    //关闭遮罩
  colsed(data){
    this.visiables = data;
  },
  drawers() {
      //消息中心的调用
      this.drawer = !this.drawer;
      this.label(this.ressl)
  },
    onButtonClick(param) {
      // 监控页面中所有的按钮点击事件
      // 报价事件
      if (param.btnCode === "DOQUOTE") {
        this.openContent("生产报价", param.btnAction);
        this.content.updateRow = param.bindData;
      }
      if(param.btnCode === "search"){
        this.visiables =true
      }
      // 查看事件
      if (param.btnCode === "LOOKUP") {
        this.openContent("查看", param.btnAction);
        this.content.updateRow = param.bindData;
      }
      // 查询界面
      if (param.btnCode === "QUERYDIALOG") {
        this.openQueryDialog();
      }
      // 完成报价事件
      if (param.btnCode === "OVERQUOTE") {
        this.commitDialog.paramData = param;
        this.openCommitDialog();
      }

      //查看主题弹窗
      if (param.btnCode === "READTHEME") {
        if (param.bindData.pkProductOrderB) {
          this.drawer = !this.drawer;
          this.siteRecharge = param.bindData.pkProductOrderB
          // this.centerDialogVisible = true; //弹窗
          // this.saleTheme = param.bindData.saleTheme; //主题
          // this.pkProductOrderB = param.bindData.pkProductOrderB; //添加主题ID
          // let mrpParam = { pkProductOrderB: param.bindData.pkProductOrderB };
          // selectAllOrderSaleStartB(mrpParam).then((response) => {
          //   this.siteRecharge = response.object; //主题列表
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
    // 完成生产报价
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
          sendMsgParam.sendTagName = "生产报价";
          sendDingMsgByPsndoc(sendMsgParam).then((response) => {
            if (!response.data.success) {
              this.$message({ type: "info", message: response.errorMessage });
            } else {
              let updateParam = {
                pkProduceQuoteH: bindRowData.pkProduceQuoteH,
                pkProductOrderB: bindRowData.pkProductOrderB,
                pkProduct: bindRowData.pkProduct,
                taskId: bindRowData.taskId,
              };
              overPassProduceQuote(updateParam).then((response) => {
                this.$message({ message: "操作成功", type: "success" });
                bindRowData.billState = "生产报价完成";
                // this.$message({ type: "success", message: "生产报价完成!" });
                this.label(this.ressl)//保留网页版的刷新问题
              });
            }

          });
          
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消完成!" });
        });
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
    //当页执行搜索
     search_ts(data){
		  // console.log(data['选择类型'],);
		   this.visiables=false
      let mindata = {
        productCode:data['产品编码'],
        customerCode:data['客户编码'],
        value:data['选择类型'][1],
         serial :data['流水号'],
         productName:data['产品名称'],
         creatorShow :data['业务员']
      }
      this.ressl=mindata
      this.select={
        select:this.select.select,
        queryParam:mindata
      }
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
    // 打开查询模板
    openQueryDialog() {
      this.queryDialog.visiable = true;
    },
    // 关闭查询模板
    closeQueryDialog() {
      this.queryDialog.visiable = false;
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
      this.label(this.ressl)
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
  margin-top: -10px;
  margin-right: 50px;
  color: #409eff;
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
