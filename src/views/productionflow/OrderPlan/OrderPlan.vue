<template>
  <div>

    <!-- 生产计划 -->

    <add :cons="imgcons">


      <div class="table_one" ref="table_one">
        <div class="table_one_title1">
          <p style="text-align:center;"> 作业指导书</p>
        </div>
        <div class="table_one_item">
          <span>产品名称: <var>{{mindata.productName}}</var> </span>
          <span>产品编码：<var>{{mindata.productCode}}</var></span>
          <span>制程:<var>有铅</var></span>
          <span>制作部门:<var>工艺部门</var></span>
          <span>执行部门:<var>生产部门</var></span>
        </div>
        <div class="table_one_item">
          <span>工序名称：<var>{{mindata.process}}</var></span>
          <span>面别:<var>{{mindata.category}}</var></span>
          <span>作业人数:(个)<var>
              <input style="float: right;width: 47%;border: 0px;" type="number" :disabled='1'>
            </var></span>
          <span>工时 (s):<var>
              <input style="float: right;width: 67%;border: 0px;" type="number" :disabled='1'>
            </var></span>
          <span>版本:<var>{{mindata.versions}}</var></span>
          <span>阶段标记:<var>{{mindata.phaseMarker}}</var></span>
          <span>生效日期:<var>{{mindata.creationtime}}</var></span>
          <span>页码:<var>
              <input style="float: right;width: 67%;border: 0px;" type="number" :disabled='1'>
            </var></span>
        </div>
        <div class="table_one_title">
          <p style="text-align: center">物料明细</p>
        </div>
        <div class="table_list">
          <p class="table_one_item">
            <span>名称</span><span>规格/型号</span><span>数量</span><span>位号</span><span>取消</span>
          </p>
          <p :key="index" class="table_one_item" v-for="(item, index) in listData">
            <span>
              {{item.materielName}}
            </span>
            <span v-text="item.materielSpecifications" @blur="item.type = $event.target.innerText"></span>
            <span v-text="item.num"></span>
            <span v-text="item.bitNum"> </span>
            <span> <button @click='tabledelete(index)'>取消</button></span>
          </p>
        </div>
        <div class="table_foot">
          <div>
            <div style="width: 100%">
              <p style="text-align: center; border: 1px solid #000">样图</p>
              <p style="text-align: center; border: 1px solid #000">
                <span id="tip">
                  <!-- {{mindata.sopImgUrl}} -->
                  <img :src="mindata.sopImgUrl" ref="convas_one" alt="" width="100%" height="100%" class="fixed" />
                </span>
              </p>
            </div>
          </div>
          <div>
            <div style=" border: 1px solid #000">
              <h3>使用工具</h3>
              <p @blur="mindata.tool = $event.target.innerText">
                {{mindata.tool}}
              </p>
            </div>
            <div style=" border: 1px solid #000">
              <h3>操作步骤:</h3>
              <!-- operation -->
              <p>
                {{mindata.operation}}
              </p>
            </div>
            <div style=" border: 1px solid #000">
              <h3>注意事项说明:</h3>
              <!-- explain -->
              <p>
                {{mindata.explain}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </add>
    <el-row>
      <el-col :span="24">
        <el-row>
          <el-col :span="2">
            <!-- 选择合同及合同子表中的产品信息 -->
            <OrderConstractProductSel @refreshTableList="refreshTableList">
            </OrderConstractProductSel>
          </el-col>
          <el-col :span="5" :offset="2">
            <el-tag class="ordre-tag" @click="isbutton">当前选择订单合同:{{
              selectedConstractData == null
              ? ""
              : selectedConstractData.contractNo
              }}</el-tag>
          </el-col>
          <el-col :span="5" class="button">
            <!-- 状态搜索 -->
            <btns @label="label"></btns>
          </el-col>
          <el-col :span="11" class="icon" :offset="5">
            <i class="el-icon-view"><span>查看详情</span></i>
            <i class="el-icon-edit"><span>编辑</span></i>
            <i class="el-icon-paperclip"><span>子表数据</span></i>
            <i class="el-icon-s-promotion"><span>查看进度条</span></i>
            <i class="el-icon-finished"><span>完成计划</span></i>
            <i class="el-icon-bell"><span>通知钉钉</span></i>
            <i class="el-icon-collection"><span>查看主题</span></i>
          </el-col>
        </el-row>
        <div style="display: flex; height: 40px"></div>
        <!--销售发起备忘录数据-->
        <searchs :visiable="visiables" @colsed="colsed" @search_ts="search_ts"></searchs>
        <Table :columns="columns" :select="select" :top_btn="top_btn" :act_btn="act_btn" :replace="replace"
          @onButtonClick="onButtonClick">
        </Table>
      </el-col>
    </el-row>
    <!-- 工艺文件维护 -->
    <TechnologyFileDetailsDialog :visiable="content.visiables" :updateRow="content.updateRow" @close="
        () => {
          content.visiables = false;
        }
      ">
    </TechnologyFileDetailsDialog>

    <!--生产计划录入组件-->
    <ProductionFlowOrderPlanContent :replace="replace" :visiable="content.visiable" :title="content.title"
      :action="content.action" :updateRow="content.updateRow" :pkProductOrder="content.pkProductOrder"
      @close="closeContent">
    </ProductionFlowOrderPlanContent>

    <!--送审框Dialog通知钉钉-->
    <CommitDialog :visiable="commitDialogData.visiable" :paramData="commitDialogData.paramData"
      @close="closeCommitDialog" @commitMethod="executeDindDingInterface"></CommitDialog>

    <!--订单字表详情数据-->
    <OrderProductInfoDetails :visiable="orderProductInfoDetails.visiable"
      :pkProductOrderB="orderProductInfoDetails.pkProductOrderB" @close="
        () => {
          orderProductInfoDetails.visiable = false;
        }
      ">
    </OrderProductInfoDetails>

    <!--生产计划子表数据管理-->
    <ProductionFlowOrderPlanDetails :visiable="subDataInfo.visiable" :updateRow="subDataInfo.updateRow" @close="
        () => {
          subDataInfo.visiable = false;
        }
      ">
    </ProductionFlowOrderPlanDetails>

    <!--进度条-->
    <ProductionFlowStepsView :visiable="stepsInfo.visiable" :pkProductOrderB="stepsInfo.pkProductOrderB"
      @close="() => (stepsInfo.visiable = false)">
    </ProductionFlowStepsView>

    <!-- 查看主题弹窗 -->

    <drawer :drawer="drawer" @closer="drawers" :quto="siteRecharge" />
    <add :cons='cons'>

      <div class="box">

        <div class="box_title" style="float: left;">
          <table border="1">
            <thead>
              <tr>
                <th>创建人</th>
                <th>创建时间</th>
                <th>版本号</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <td> {{productdata[0].creatorShow}}</td>
                <!-- creationtime -->
                <td>{{productdata[0].creationtime}}</td>
                <td>{{productdata[0].editionNum}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="float: right;">
          <el-select v-model="region" placeholder="请选择人员">
            <el-option v-for='(item,index) in regionlist' :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button @click='saveSopTaskc' v-if='isshow'>分配</el-button>
          <!-- <el-button v-else>查询</el-button> -->
        </div>

      </div>
      <!-- <div class="box_body">
          <p>DIP</p>
          <p>三防</p>
          <p>组装</p>
          <p>测试</p>
          <p>老化</p>
      </div> -->
      <br>
      <br>
      <br><br>

      <hr>
      <br>
      <el-tabs v-model="activeName" @tab-click="handleClicks">
        <el-tab-pane label="图片分配" name="first">
          <el-table :data="productdatalh" tooltip-effect="dark" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column width="55" :disabled="region==null">
              <template slot-scope="scope">
                <input name="Fruit" @change='checks(scope.row.pkSopParameter)' :disabled="region==null" type="checkbox"
                  :checked='imglists.includes(scope.row.pkSopParameter)' value="" />

              </template>
            </el-table-column>
            <el-table-column prop="pageNum" label="页码" width="150">
            </el-table-column>
            <el-table-column prop="productName" label="产品名称" width="150">
            </el-table-column>
            <el-table-column prop="process" label="工序名称" width="150">
            </el-table-column>
            <!-- productCode -->
            <el-table-column prop="processType" label="工序类型" width="150">
            </el-table-column>
            <el-table-column prop="sopState" label="图片">
              <template slot-scope="scope">

                <img :src="scope.row.sopImgUrl" alt="" style="width: 100%; height: 100px">

              </template>
              <!-- sopImgUrl -->
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="null">
              <template slot-scope="scope">
                <el-button @click="imgclk(scope.row)" type="text" size="small">查看</el-button>

              </template>
            </el-table-column>
          </el-table>


        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <!-- productorderdataslist -->
          <el-table :data="productorderdataslist" border style="width: 100%">
            <el-table-column prop="creationtime" label="创建时间" width="180">

            </el-table-column>
            <el-table-column prop="creatorShow" label="创建人" width="180">
            </el-table-column>
            <el-table-column prop="tag" label="标签" width="100">
              <template slot-scope="scope">
                <el-button @click='tcgd(scope.row)'>
                  更多
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="删除" width="100">
              <template slot-scope="scope">
                <el-button @click='deletesop(scope.row)'>
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

      </el-tabs>

      <add :cons='ckgds'>
        <el-table :data="pklistproduct" border style="width: 100%">
          <el-table-column prop="creationtime" label="创建时间" width="180">

          </el-table-column>
          <el-table-column prop="sopImgName" label="部门" width="180">
          </el-table-column>
          <el-table-column label="图片" width="100">
            <template slot-scope="scope">

              <img :src="scope.row.sopImgUrl" width="100%" alt="" @click='imgclk(scope.row.sopImgUrl)'>

            </template>
          </el-table-column>

        </el-table>
      </add>
    </add>
  </div>
</template>

<script>
  import Table from "@/components/viewcomp/Table";
  import { mapGetters } from "vuex";
  import btns from "@/components/btnselect/index"; //状态按钮
  import searchs from "@/components/search/index"; //搜索
  import ProductionFlowOrderPlanContent from "@/views/productionflow/OrderPlan/content";
  import OrderConstractProductSel from "@/views/productionflow/comp/OrderConstractProductSel";
  import OrderProductInfoDetails from "@/views/productionflow/comp/OrderProductInfoDetails";
  import CommitDialog from "@/components/Commitdingding/CommitDialog";
  import ProductionFlowOrderPlanDetails from "@/views/productionflow/OrderPlan/subinfo/orderSubInfo";
  import ProductionFlowStepsView from "@/views/productionflow/comp/productionFlowSteps"; // 进度条
  import { sendDingMsgByPsndoc } from "@/api/pub/pub"; // 调用钉钉后端API接口
  import { orderSaleDoStartProccess } from "@/api/orderCompMage/orderCompMage";
  import add from '@/components/add/add'
  import instructions from '@/views/productionflow/sop/item/sop_item' //指导书的内容
  import { selectSopImgByPkProduct, selectSopEditionByPkProduct, selectAllBdPsndocAsRef, saveSopTask, selectSopTaskByPkPsndoc, selectAllSopTask, saveSopEdition, deleteSopTaskByPks } from "@/api/sop/book"; //主表的路径
  import {
    insertOrderSaleStartB,
    selectAllOrderSaleStartB,
    updateOrderSaleStartB,
  } from "@/api/orderCompMage/orderStart";
  import TechnologyFileDetailsDialog from "@/views/technics/technologyfile/filedetails"; //工艺文件维护
  import {
    selectAllOrderPlanAsPage,
    insertOrderPlan,
    deleteOrderPlanByPks,
    updateOrderPlan,
    saveOrderBCompFile,
  } from "@/api/orderCompMage/OrderPlan";
  // import { selectOrderInfoAsRef } from "@/api/orderCompMage/orderCompMage"
  import drawer from "@/components/newtab/item/drawer"; //消息中心
  import { downloadProductFile, saveSaleStartB } from "@/api/pub/pub";
  import { ImageDrop } from "quill-image-drop-module";
  import ImageResize from "quill-image-resize-module";
  Quill.register("modules/imageDrop", ImageDrop);
  Quill.register("modules/imageResize", ImageResize);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["image"],
    ["clean"], // remove formatting button
  ];
  export default {
    name: "ProductionFlowOrderPlanView",
    components: {
      Table,
      ProductionFlowOrderPlanContent,
      CommitDialog,
      OrderConstractProductSel,
      OrderProductInfoDetails,
      ProductionFlowOrderPlanDetails,
      ProductionFlowStepsView,
      searchs,
      btns,
      TechnologyFileDetailsDialog,
      drawer,
      add,
      instructions
    },
    computed: {
      ...mapGetters(["name", "roles", "userid"]),
    },
    mounted() {
      selectAllBdPsndocAsRef({ pkPsntype: 9 }).then((res) => {
        this.regionlist = res.object
      })
    },
    watch: {
      region() {
        // 选择的请求接口 
        let m = {
          pkPsndoc: this.region,
          pkProductOrderB: this.pkProductOrderB
        }
        selectSopTaskByPkPsndoc(m).then((res) => {
          // console.log(res.object[0]);
         if(res.object[0]){
          this.imglists = []
          this.imglists = res.object[0].pkSopParameter.split(',')
          this.pkSopTask = res.object[0].pkSopTask
         }
          
        })

      }
    },
    data() {
      return {
        isbtnshow: true,
        cons: { //弹窗
          contentVisiable: false,
          title: null,
        },
        region: null,//选择人员的id
        regionlist: [],//选择人员的数据存储
        uploadUrl: process.env.BASE_API + "/", // 上传图片地址
        // uploadUrl1:process.env.BASE_API/OrderCompPubController/saveOrderBCompFile,
        quillUpdateImg: false,
        visiables: false, //控制搜索框的显示隐藏
        content1: "", //富文本内容
        imageName: "", //图片路径
        activeName: 'first', //分页的标示
        imglists: [],
        productorderdataslist: [],
        pkSopTask: null,
        isshow: true,
        editorOption: {
          placeholder: "请输入评论内容...",
          theme: "snow", //富文本主题
          modules: {
            toolbar: {
              container: toolbarOptions, // 工具栏
              handlers: {
                image: function (value) {
                  if (value) {
                    document.querySelector(".avatar-uploader input").click();
                  } else {
                    this.quill.format("image", false);
                  }
                },
              },
            },
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false,
            },
            imageDrop: true,
            imageResize: {
              displayStyles: {
                backgroundColor: "black",
                border: "none",
                color: "white",
              },
              modules: ["Resize", "DisplaySize", "Toolbar"],
            },
          },
        },
        imgcons: {//缩略图的弹窗
          contentVisiable: false,
          title: null,
        },
        isdata: {},
        // imgsrc: null,
        fileName: "", // 文件名称
        instructions_cons: {},
        fileFullname: "", // 文件全路径名称
        upFileTemp: null, // 记录临时文件
        upFileFileList: [], // 文件存储List集合
        pageFileTemp: null, //记录临时图片文件
        pageFileFileList: [], //记录图片文件
        pklistproduct: [],
        content: {
          visiable: false, // 内容界面显示控制
          visiables: false,
          title: "", // 标题
          action: null, // 执行Action
          updateRow: null, // 更新时带过来的temp
          pkProductOrder: null, // 单据业务属性 合同订单主键
        },
        ckgds: {
          contentVisiable: false,
          title: null,
        },
        drawer: false, //消息显示隐藏
        siteRecharge: [], //主题列表
        saleTheme: "", //主题
        pkProductOrderB: "", //添加主题ID
        showx: 0, //控制评论按钮
        centerDialogVisible: false, //弹窗
        textarea1: "", //评论内容
        tHeader: ["Id", "告警类型", "告警内容", "告警时间（段）", "告警次数"],
        tValue: ["id", "type", "content", "time", "count"],
        value11: "",
        options1: [
          { value: "", label: "请选择" },
          { value: "0", label: "请选择订单类型" },
          { value: "1", label: "请选择日期范围" },
          { value: "2", label: "请选择销售员" },
          { value: "3", label: "请选择产品编号" },
          { value: "4", label: "请选择客户编号" },
          { value: "5", label: "请选择合同编号" },
        ],
        //搜索集合
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
                value: "1",
                label: "进行中",
              },
              {
                value: "2",
                label: "已完成",
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
        productdata: [{
          creatorShow: null,
          creationtime: null,
          editionNum: null
        }],//创建人和创建时间
        // billOfMaterialCraftPos
        listData: [],
        imglists: [],
        productdatadip: [],//dip的数组
        productdatasf: [],//三防的数组
        productdatazz: [],//组装的数组
        productdatacs: [],//测试的数组
        productdatalh: [],//老化的数组
        value: [],
        startTime: "",
        endTime: "",
        constractPsnname1: "",
        constractTableList: [],
        productCode1: "",
        customerCode1: "",
        contractNo1: "",
        subDataInfo: {
          visiable: false, // 内容界面显示控制
          updateRow: null, // 更新时带过来的temp
        },
        stepsInfo: {
          // 进度条控制相关
          visiable: false,
          pkProductOrderB: null, // 订单子表主键
        },
        columns: [
          { prop: "scheduledtime", label: "预计交货日期", width: "100" },
          { prop: "materialTime", label: "物料需求日期", width: "100" },
          { prop: "estimatedOverTime", label: "预计齐料时间", width: "100" },
          { prop: "contractNo", label: "合同编号", width: "80" },
          { prop: "productCode", label: "产品编号", width: "120" },
          { prop: "productName", label: "产品名称", width: "160" },
          { prop: "constractProductNum", label: "订单数量", width: "110" },
          { prop: "unitPrice", label: "生产成本单价", width: "100" },
          // { prop: "totalPrices", label: "未税合计", width: "100" },
          { prop: "constractPsnname", label: "业务员", width: "70" },
          { prop: "schedule", label: "生产状态", width: "120" },
          { prop: "billState", label: "单据状态", width: "110" },
          { prop: "creationtime", label: "创建时间", width: "100" },
          { prop: "pkOmgOrderPlan", label: "生产计划主键", primary: true },
          { prop: "pkProductOrderB", label: "合同子表主键", show: false },

          { prop: "customerCode", label: "客户编号", width: "110" },
          { prop: "constractOrderType", label: "合同类型", width: "110" },
          // {prop: 'productionState', label: '生产状态', width: '100'},
        ],
        select: {
          select: selectAllOrderPlanAsPage,
          queryParam: { dr: 0, billState: "1" },
        },
        boxdatas: "",
        top_btn: [
          {
            name: "搜索",
            code: "search",
          },
        ],
        act_btn: [
          {
            name: "查看产品数据",
            code: "LOOKORDERBPRODUCT",
            action: null,
            width: 270,
            typeLess: "itag",
            iconPic: "el-icon-view",
            btnSize: "mini",
          },
          {
            name: "",
            code: "FILEDETAILS10",
            action: null,
            typeLess: "itag",
            iconPic: "el-icon-menu",
            btnSize: "mini",
          },
          {
            name: "工艺文件维护",
            code: "FILEDETAILS",
            action: null,
            btnSize: "mini",
            iconPic: "el-icon-folder-opened",
            typeLess: "itag",
          },
          {
            name: "修改",
            code: "UPDATESALESTART",
            action: updateOrderPlan,
            when: { billState: [0, 1] },
            typeLess: "itag",
            iconPic: "el-icon-edit",
            btnSize: "mini",
          },
          {
            name: "查看子表数据",
            code: "LOOKUPSUBDATA",
            action: deleteOrderPlanByPks,
            typeLess: "itag",
            iconPic: "el-icon-paperclip",
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
            name: "完成计划",
            code: "OVOERPLAN",
            action: null,
            typeLess: "itag",
            when: { billState: [0, 1] },
            iconPic: "el-icon-finished",
            btnSize: "mini",
          },
          {
            name: "通知钉钉",
            code: "COMMITDINGDING",
            action: null,
            typeLess: "itag",
            when: { dis: [1] },
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
            name: "constractOrderType",
            replace: {
              0: "普通合同",
              1: "生产订单",
              2: "OEM",
              3: "DEM",
              4: "贸易模式",
            },
          },
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
        mindata: {
          sopImgUrl: null

        },
        selectedConstractData: null, // 当前选中的订单合同
        viewDefaultBillState: "1", // 界面默认单据状态条件
        ressl: { dr: 0, billState: "1" }, //保留刷新
      };
    },
    created() {
      var list = this.columns;
      if (
        this.roles[0].roleName == "全权角色" ||
        this.roles[0].roleName == "生产角色"
      ) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].label === "未税单价") {
            list[i].show = true;
          }
          if (list[i].label === "未税合计") {
            list[i].show = true;
          }
        }
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
      drawers() {
        //消息中心的调用
        this.drawer = !this.drawer;
        this.label(this.ressl);
      },
      checks(data) {
        let data2 = data + ''
        // console.log(data);
        // console.log(this.imglists.includes(data));
        //选择图片的标识

        if (this.imglists.includes(data) == false) {
          this.imglists.push(data2)
          this.$forceUpdate();
          // this.imglists += ','+ data
          // 
        } else {
          // console.log(this.imglists.indexOf(data));
          let index = this.imglists.indexOf(data)
          this.imglists.splice(index, 1)
          // console.log(this.imglists);
        }
        // this.$forceUpdate()
      },
      //当页执行搜索
      search_ts(data) {
        this.visiables = false;
        // console.log(data);

        let mindata = {
          creationdateBegin: data["开始时间"],
          creationdateEnd: data["结束时间"],
          contractNo: data["合同编号"],
          productCode: data["产品编码"],
          customerCode: data["客户编码"],
          constractPsnname: data["业务员"],
          orderType: data["选择类型"][1],
          // billState: null,
        };
        this.ressl = mindata;
        this.label(this.ressl)
      },
      handleClose() {
        this.label(this.ressl);
      },
      onEditorChange({ editor, html, text }) {
        //内容改变事件
        // console.log(html);
        this.content1 = html;
      },
      // 富文本图片上传前
      beforeUpload(file) {
        // 显示loading动画
        let quill = this.$refs.QuillEditor.quill;
        let fd = new FormData(); //通过form数据格式来传
        fd.append("purfile", file); //传文件
        fd.append("pkProductOrderB", this.pkProductOrderB); //传文件
        saveSaleStartB(fd).then((response) => {
          // console.log(response);
          this.imageName = response.data.object.ORDERB_REF_FILE_PATH;
          let length = quill.getSelection().index;
          // 插入图片  res.url为服务器返回的图片地址
          var url =
            process.env.BASE_API +
            "/" +
            response.data.object.ORDERB_REF_FILE_PATH;
          // console.log(url);
          quill.insertEmbed(length, "image", url);
          // 调整光标到最后
          quill.setSelection(length + 1);
        });
      },
      //上传文件
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
          } 个文件`
        );
      },
      // 记录工艺文件
      upFileChange(file, fileList) {
        this.upFileTemp = file;
        let param = { pkProductOrderB: this.pkProductOrderB };
        let formData = new FormData(); //通过form数据格式来传
        formData.append(`file`, this.upFileTemp.raw);
        formData.append(`pkProductOrderB`, this.pkProductOrderB);
        saveOrderBCompFile(formData).then((response) => {
          this.fileName = response.object.SALE_ORDERB_NAME;
          this.fileFullname = response.object.SALE_ORDERB_FULL_NAME;
          if (this.content1 == "") {
            this.fileName = response.object.SALE_ORDERB_NAME;
            this.fileFullname = response.object.SALE_ORDERB_FULL_NAME;
          } else {
            this.content1 = this.content1;
          }
        });
      },
      handleSelectionChange() { },
      //文件下载
      downloadProccessFile1(scope) {
        let fileName = scope.row.content;
        let fileFullName = scope.row.fileFullname;
        var downLoadParma = { fileName: fileName, fileFullName: fileFullName };
        if (fileName && fileFullName) {
          downloadProductFile(downLoadParma).then((response) => {
            // console.log(response);
            const blob = response.data;
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = (e) => {
              const a = document.createElement("a");
              if (fileName) {
                a.download = fileName;
              } else {
                a.download = fileName;
              }
              a.href = e.target.result;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            };
          });
        }
      },
      tcgd(data) {
        console.log(data);

        this.ckgds = {
          contentVisiable: true,
          title: null,
        }
        this.pklistproduct = data.billSopParameterPos
      },
      // 调用接口获取界面数据
      refreshTableList(constractData) {
        this.selectedConstractData = constractData;
        this.ressl.pkProductOrder = constractData.pkProductOrder
        let queryParam = {
          // billState: this.viewDefaultBillState,
          dr: 0,
        };
        if (constractData) {
          queryParam.pkProductOrder = constractData.pkProductOrder;
        }
        let newSelect = { select: this.select.select, queryParam: queryParam };
        this.select = newSelect;
      },
      isbutton() {
        this.isbtnshow = !this.isbtnshow;
      },
      saveSopTaskc(item) {
        // 提交分配的图片
        this.boxdatas = ''
        // console.log(this.imglists);
        for (let i of this.imglists) {

          this.boxdatas += ',' + i

        }
        // console.log(this.boxdatas);
        this.boxdatas = this.boxdatas.substr(1)
        if (this.boxdatas == '') {
          this.$message.error('请选择');
        } else {
          let m = {
            pkPsndoc: this.region,
            pkProductOrderB: this.pkProductOrderB,
            pkSopParameter: this.boxdatas,
            pkSopTask: this.pkSopTask
            // 
          }
          // this.boxdatas = this.boxdatas.substr(1)
          // let s = ',0,0,0'
          // s = s.substr(1)
          // console.log(this.boxdatas);
          // console.log(this.boxdatas);
          this.$confirm("是否提交吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            this.$message({
              type: "success",
              message: "提交成功!",
            });
            saveSopTask(m).then((res) => {
              // console.log(res);
              this.region = null
            })
          })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消提交",
              });
            });
        }


        // 

      },
      deletesop(item) {
        console.log(item);
        this.$confirm("是否删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {

          deleteSopTaskByPks({ pkArr: item.pkSopTask }).then((res) => {
            this.$message({ type: "success", message: "删除成功!", });
            selectSopTaskByPkPsndoc({ pkProductOrderB: this.pkProductOrderB }).then((res) => {
              this.productorderdataslist = res.object
            })

          })

        })
      },
      // 监听按钮
      onButtonClick(param, btnCode, unexParam) {
        if (param.btnCode === "search") {
          this.visiables = true;
        }
        if (param.btnCode === "ADDSALESTART") {
          // 录入销售发起数据
          // 校验是否选择订单信息
          if (
            this.selectedConstractData &&
            this.selectedConstractData.pkProductOrder
          ) {
            this.content.pkProductOrder = this.selectedConstractData.pkProductOrder;
            this.openContent("录入", param.btnAction);
          } else {
            this.$message({
              showClose: true,
              message: "请先选择订单信息!",
              type: "warning",
            });
          }
        }
        if (param.btnCode === "UPDATESALESTART") {
          // 修改销售发起数据
          this.openContent("修改", param.btnAction);
          this.content.updateRow = param.bindData;
        }
        if (param.btnCode === "LOOKORDERBPRODUCT") {
          // 查看订单中的产品详情
          this.orderProductInfoDetails.pkProductOrderB =
            param.bindData.pkProductOrderB;
          this.orderProductInfoDetails.visiable = true;
        }
        if (param.btnCode === "COMMITDINGDING") {
          // 推送消息到钉钉
          this.commitDialogData.paramData = param;
          this.commitDialogData.visiable = true;
        }
        if (param.btnCode === "LOOKUPSUBDATA") {
          // 查看子表数据
          this.subDataInfo.visiable = true;
          this.subDataInfo.updateRow = param.bindData;
        }
        if (param.btnCode === "OVOERPLAN") {
          // console.log(this.userid)
          if (param.bindData.pkOmgOrderPlan) {
            let mrpParam = {
              pkOmgOrderPlan: param.bindData.pkOmgOrderPlan,
              billState: "2",
              chargePsn: this.userid,
              pkProductOrderB: param.bindData.pkProductOrderB,
            };

            this.$confirm("是否确认操作?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
                updateOrderPlan(mrpParam).then((response) => {
                  if (response && response.success) {
                    this.label(this.ressl); //保留网页版的刷新问题
                    // this.refreshTableList(this.selectedConstractData);
                    // location.reload();
                  } else {
                    this.$message({
                      showClose: true,
                      message: `${response.errorMessage}!`,
                      type: "warning",
                    });
                  }
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消操作",
                });
              });
            // this.$message({ showClose: true, message: '操作成功!', type: 'success' });
            // this.refreshTableList(this.selectedConstractData)
          }
        }
        if (param.btnCode === "LOOKUPSTEPS") {
          // look steps
          this.stepsInfo.pkProductOrderB = param.bindData.pkProductOrderB;
          this.stepsInfo.visiable = true;
        }

        //查看主题弹窗
        if (param.btnCode === "READTHEME") {
          if (param.bindData.pkProductOrderB) {
            this.drawer = !this.drawer;
            this.siteRecharge = param.bindData.pkProductOrderB;

          }
        }
        if (param.btnCode == "FILEDETAILS") {
          // console.log('s');
          // 弹出工艺文件维护界面
          this.content.visiables = true;
          this.content.updateRow = param.bindData;
        }
        if (param.btnCode == 'FILEDETAILS10') {
          this.cons = {
            contentVisiable: true,
            title: null,
          }
          // console.log(param.bindData.pkProduct);
          this.pkProductOrderB = param.bindData.pkProductOrderB
          this.pkProducts = param.bindData.pkProduct
          let jsons

          jsons = {
            "pkProduct": param.bindData.pkProduct,
            // "pkProduct": 1,
            "isDefault": 1
          }


          selectSopImgByPkProduct(jsons).then((res) => {
            // console.log(res.object);
            this.productdata = res.object
            if (this.productdata.length ==0) {
              this.productdata = [{
                creatorShow: '无',
                creationtime: '无',
                editionNum: '无'
              }]
            } else {
              this.productdatalh = []
              // console.log(this.productdata);

              if (this.productdata != null && this.productdata[0].billSopParameterPos) {
                for (let i of this.productdata[0].billSopParameterPos) {
                  //根据图片进行分类
                  // console.log(i);
                  if (i.pkSopParameter) {
                    i.pkSopParameter = String(i.pkSopParameter)
                  }
                  // console.log(i);
                  if (i.processType == 'DIP') {
                    this.productdatalh.push(i)
                  }
                  if (i.processType == 'SMT') {
                    this.productdatalh.push(i)
                  }
                  if (i.processType == '三防') {
                    this.productdatalh.push(i)
                  }
                  if (i.processType == '组装') {
                    this.productdatalh.push(i)
                  }
                  if (i.processType == '测试') {
                    this.productdatalh.push(i)
                  }
                  if (i.processType == '老化') {
                    this.productdatalh.push(i)
                  }
                }

              } else {
                this.productdata = []
              }
            }



          })
          // console.log(this.cons);
        }
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
      imgclk(item) {
        this.imgcons = {
          contentVisiable: true,
          title: null,
        }
        this.mindata = item
        //     // listData billSopParameterPos
        this.listData = item.billOfMaterialCraftPos

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
        // console.log(this.$refs.QuillEditor.quill.getContents());
        let param = {
          pkProductOrderB: this.pkProductOrderB,
          content: this.content1,
          fileFullname: this.imageName,
          msgType: 1,
        };
        let param1 = {
          pkProductOrderB: this.pkProductOrderB,
          content: this.fileName,
          fileFullname: this.fileFullname,
        };
        if (this.content1 == "") {
          insertOrderSaleStartB(param1).then((response) => {
            if (response.message == "操作成功") {
              this.content1 = "";
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
        } else {
          insertOrderSaleStartB(param).then((response) => {
            if (response.message == "操作成功") {
              this.content1 = "";
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
        }
      },
      //取消评论
      qreport() {
        this.textarea1 = "";
      },
      handleClicks(tab, event) {
        // console.log(tab, event);
        // console.log(tab.name);
        // 分页点击属性
        if (tab.name == 'first') {
          this.isshow = true
        }
        if (tab.name == "second") {
          // console.log(1);
          selectSopTaskByPkPsndoc({ pkProductOrderB: this.pkProductOrderB }).then((res) => {
            this.productorderdataslist = res.object
            this.isshow = false
            // console.log(res);
          })
        }
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
      executeDindDingInterface(sendMsgParam) {
        this.$confirm("是否确认送达?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        })
          .then(() => {

            let bindRowData = sendMsgParam.paramData.bindData;
            // console.log(bindRowData.billState);

            let publicDingMsgInfo = {
              customerCode: bindRowData.customerCode,
              productCode: bindRowData.productCode,
              productName: bindRowData.productName,
              expectDeliDate: bindRowData.scheduledtime,
              // pkPsndoc:bindRowData.pkPsndoc,
              orderNumber: bindRowData.constractProductNum,
              // pkPsndoc: bindRowData.constractPsnname,
              constractno: bindRowData.contractNo,
              // orderNumber: bindRowData.orderNumber,
              quoreOrderDate: bindRowData.ts,
              orderType: '生产计划', //订单类型
              // PsndocShow:this.name
              // expectDeliDate: bindRowData.ts,
            };
            sendMsgParam.publicDingMsgInfo = publicDingMsgInfo
            sendDingMsgByPsndoc(sendMsgParam).then((response) => {
              if (response && response.data.success) {
                // 调用接口后处理
                this.$message({
                  message: "送审成功!",
                  type: "success",
                });
              } else {
                alert("调用钉钉接口失败");
              }
              // sendDingMsgByPsndoc(sendMsgParam);
            })

            // 调用钉钉接口
            // sendDingMsgByPsndoc(sendMsgParam).then((response) => {
            //   if (response && response.data.success) {
            //     // 调用接口后处理
            //     // alert("调用钉钉接口成功");
            //   } else {
            //     // alert("调用钉钉接口失败");
            //   }

          })
          .catch(() => {
            this.$message({ type: "info", message: "已取消送审!" });
          });

      }
    },
    computed: {
      editor() {
        return this.$refs.QuillEditor.quill;
      },
    },
  };
</script>

<style lang="scss" type="text/scss" scoped>
  .ordre-tag {
  margin-left: 10px;
  margin-top: 10px;
}
.icon {
  // float: right;
  margin-top: 50px;
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
  span {
    font-size: 8px;
    padding-left: 5px;
  }
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
.btns {
  display: none;
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

/deep/ .ql-editor {
  height: 100px;
}

/deep/ .el-upload-dragger {
  width: 130px;
  height: 30px;
  background: #409eff;
  border: solid 1px #409eff;
}

/deep/ .el-upload-dragger .el-icon-upload {
  font-size: 30px;
  color: #fffeff;
  float: left;
  margin: -10px 3px 16px;
  line-height: 50px;
}

/deep/ .el-upload__text span {
  color: white;
  margin-top: 10px;
  display: inline-block;
}

/deep/ .avatar-uploader {
  width: 0;
  height: 0;
  display: none;
}
.box_body {
        display: flex;
    }

    .box_body>div {
        text-align: center;
        border: 1px solid #333;
        width: 23%;
        p{
            border-bottom: 1px solid #000;
            img{
                padding: 10px;
            }
        }
    }
/deep/ .imgaa img {
  width: 100px;
  height: 50px;
}

    .table_one * {
      margin: 0;
      padding: 0;
    }
  
    .table_one_item {
      display: flex;
  
      span {
        flex: 1;
        border: 1px solid #000;
      }
    }
  
    .table_one_right {
      border-right: 1px solid #000;
    }
  
    .table_one>div {
      width: 100%;
    }
  
    .table_one_title {
      border: 1px solid #000;
    }
  
    .table_list {
      text-align: center;
    }
  
    .table_foot {
      width: 100%;
      display: flex;
    }
  
    .table_one_title1 {
      display: flex;
      justify-content: space-between;
      border: 0px;
  
      p {
        width: 33%;
      }
    }
  
    .table_foot>div {
      width: 50%;
    }
  
    #image_los {
      margin: 0 auto;
      width: 100px;
    }
  
    .fiexd {
      top: 0;
      position: fixed;
      z-index: 100;
      background: #fff;
      padding: 36px;
  
    }
</style>