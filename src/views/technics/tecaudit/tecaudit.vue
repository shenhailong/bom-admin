<template>
  <div>
    <!-- 作业指导书的弹窗 -->
    <add :cons='cons'>
      <instructions :instructions_cons='instructions_cons' @closes='closes' />
    </add>
    <div class="icon">
      <i class="el-icon-tickets"><span>查看</span></i>
      <i class="el-icon-view"><span>详情+修改工艺参数</span></i>
      <i class="el-icon-bell"><span>通过审核</span></i>
      <i class="el-icon-s-ticket"><span>物料解析</span></i>
      <i class="el-icon-circle-check"><span>未送审到管理员</span></i>
      <i class="el-icon-refresh-right"><span>重新审核</span></i>
      <i class="el-icon-warning-outline"><span>退回</span></i>
    </div>
    <div class="button">
      <!-- <el-button size="mini" type="primary" plain @click="queryViewListDataByWhere('0')">自由态</el-button> -->
      <!-- <el-button size="mini" type="primary" plain @click="queryViewListDataByWhere('20')">已申请</el-button> -->
      <el-button size="mini" type="primary" plain @click="queryViewListDataByWhere('21')">工艺审核中</el-button>
      <el-button size="mini" type="primary" plain @click="queryViewListDataByWhere('22')">工艺审核完成</el-button>
    </div>
    <!-- <div style="display: flex;margin:10px;">
      <el-input size="mini" style="width:150px;" placeholder="请输入产品编码" v-model="inputCode" clearable></el-input>
      <el-button size="mini" style="margin-left:10px;" type="primary" @click="searchCode">搜索</el-button>
    </div> -->
    <!-- 搜索 -->
    <searchs :visiable="visiables" @colsed="colsed" @search_ts='search_ts'></searchs>
    <!--基础列表界面-->
    <!-- 工艺审核 -->
    <Table :columns="columns" :select="select" :top_btn="top_btn" :act_btn="act_btn" :replace="replace"
      @onButtonClick="onButtonClick">
    </Table>
    <!--查看详情界面-->
    <Tecauditcontent :replace="replace" :visiable="content.visiable" :title="content.title" :action="content.action"
      :updateRow="content.updateRow" @close="closeContent" @refreshList="queryListData">
    </Tecauditcontent>
    <!--查询模板界面-->
    <ProductQueryDialog :visiable="queryDialog.visiable" @close="closeQueryDialog" @refreshList="queryListData">
    </ProductQueryDialog>
    <!--送审框Dialog通知钉钉-->
    <CommitDialog :visiable="commitDialog.visiable" :paramData="commitDialog.paramData" @close="closeCommitDialog"
      @commitMethod="overTechnicsProccessMethod">
    </CommitDialog>
    <!--<el-dialog title="设置" :visible.sync="dialogVisible" width="880px" custom-class="c-BomMatching-SettingDialog">
      <BomSeting></BomSeting>
      <span slot="footer" class="dialog-footer">
        <el-checkbox label="保存并重新匹配" name="type"></el-checkbox>
        <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>-->
    <!-- 物料解析 上传 -->
    <div v-if="bomDialogVisible">
      <el-dialog title="物料解析" :visible.sync="bomDialogVisible" width="500px" :before-close="handleClose">
        <div style="text-align:center">
          <el-upload class="upload-demo" drag :action="uploadAction" :limit="1" :show-file-list="false" ref="upload"
            :on-success="handleFileSuccess">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    </div>
    <!-- 物料解析 表格 -->
    <div v-if="bomTableVisible">
      <el-dialog title="物料解析" :visible.sync="bomTableVisible" width="1620px" :before-close="bomTableHandleClose"
        top="1%" :close-on-press-escape="false" :close-on-click-modal="false">
        <div>
          <BomTable :file-res="fileRes" :pk-product="pkProduct" :action="bomAction" v-on:complete="bomTableHandleClose">
          </BomTable>
        </div>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog>
    </div>
    <!-- 自定义表头 -->
    <div v-if="diyTableVisible">
      <el-dialog title="表头匹配" :visible.sync="diyTableVisible" width="1620px" top="1%" :close-on-press-escape="false"
        :close-on-click-modal="false">
        <div>
          <table style="width:100%" class="diy_table" cellpadding="0" cellspacing="0">
            <tr v-if="diyData.length>0">
              <td v-for="(item,index) in diyData[0].split('||')" style="padding-left:0">
                <el-select v-model="tableValueArr[index]" @change="changeOption" clearable placeholder="请选择表头">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :disabled="item.disabled"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
              <td>操作</td>
            </tr>
            <tr v-for="(item,index) in diyData">
              <td v-for="(td,ind) in item.split('||')">
                <div class="cell" :title="td">{{td}}</div>
              </td>
              <td><span class="btn-remove" @click="removeItem(index)" style="white-space:nowrap">移除</span></td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="diyNext" size="small">下一步</el-button>
        </span>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  import Table from '@/components/viewcomp/Table'
  import BomTable from '@/components/viewcomp/BomTable'
  import CommitDialog from '@/components/Commitdingding/CommitDialog'
  import Tecauditcontent from '@/views/technics/tecaudit/content'
  import ProductQueryDialog from '@/views/salemage/product/queryDialog'
  import { listTecaudit, updateTecaudit, overTechnicsProccess } from '@/api/technics/tecaudit'
  import { initReplaceUpdateData } from '@/utils/viewCompUtil'
  import { sendDingMsgByPsndoc } from '@/api/pub/pub'
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import searchs from "@/components/search/index";
  import add from '@/components/add/add'//指导书的弹窗
  import instructions from './item/Instructions' //指导书的内容
  export default {
    name: "techinsaudit",
    components: { Table, CommitDialog, Tecauditcontent, ProductQueryDialog, BomTable, searchs, add, instructions },
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    // beforeCreate(){
    //   this.isifs = false
    // },
    data() {
      return {
        visiables: false,
        tableValueArr: [],
        diyData: [],
        cons: {
          contentVisiable: false,
          title: null,
        },
        instructions_cons: {},
        options: [{
          label: '型号',
          value: 'materielName'
        }, {
          label: '规格',
          value: 'materielSpecifications'
        }, {
          label: '封装',
          value: 'packaging'
        }, {
          label: '品牌',
          value: 'brand'
        }, {
          label: '位号',
          value: 'bitNum'
        }, {
          label: '数量',
          value: 'num'
        }, {
          label: '单位',
          value: 'unit'
        }, {
          label: '物料类型',
          value: 'materieType'
        }, {
          label: '备注',
          value: 'note'
        }],
        diyTableVisible: false,
        bomAction: '',
        uploadAction: process.env.BASE_API + '/technics/readExcelAccFileB',
        bomDialogVisible: false,
        bomTableVisible: false,
        fileRes: null,
        isifs: null,
        pkProduct: null,
        content: {
          visiable: false, // 内容界面显示控制
          title: '', // 标题
          action: null, // 执行Action
          updateRow: null // 更新时带过来的temp
        },
        inputCode: '',  //产品编码
        alist: [],
        name1: this.name,
        pIsverify: '0',
        queryDialog: {
          visiable: false
        },
        commitDialog: {
          visiable: false,
          paramData: null
        },
        // 抽屉控制相关
        drawerContent: {
          visiable: false
        },
        //search_two
        viewDefaultBillState: '21', // 界面默认单据状态条件
        columns: [
          { prop: 'pkProduct', label: '主键', width: '10', primary: true },
          { prop: 'code', label: '产品编码', width: '120' },
          { prop: 'name', label: '产品名称', width: '120' },
          { prop: 'model', label: '产品型号', width: '120' },
          { prop: 'technicsState', label: '单据状态', width: '140' },
          { prop: 'modifierShow', label: '最后修改人', width: '90', },
          { prop: 'modifiedtime', label: '最后修改时间', width: '140' },
          { prop: 'creationtime', label: '创建时间', width: '140' },
          { prop: 'pcbSource', label: 'PCB来源', width: '100' },
          // {prop: 'customerName', label: '客户名称', width: '120'},
          // {prop: 'purchaseContactsName', label: '采购联系人', width: '120'},
          // {prop: 'purchaseContactsPhone', label: '采购联系电话', width: '120'},
          { prop: 'skillContactsName', label: '技术联系人', width: '120' },
          { prop: 'skillContactsPhone', label: '技术联系电话', width: '120' },
          { prop: 'pkPsndocShow', label: '业务员', width: '90' },
          { prop: 'bomFilename', label: 'BOM文件名称', width: '120', show: false },
          { prop: 'bomFilefullname', label: 'BOM文件全路径名称', width: '120', show: false },
          { prop: 'pcbFilename', label: 'PCB文件名称', width: '120', show: false },
          { prop: 'pcbFilefullname', label: 'PCB文件全路径名称', width: '120', show: false },
          { prop: 'craftFilename', label: '工艺文件名称', width: '120', show: false },
          { prop: 'craftFilefullname', label: '工艺文件全路径名称', width: '120', show: false },

          // {prop: 'modifierShow', label: '销售负责人',width:'90'},
          // {prop: 'modifierShow', label: '工艺负责人',width:'90'},


        ],
        select: {
          'select': listTecaudit,
          'queryParam': { technicsState: 21, dr: 0 },//原来的数据
        },
        top_btn: [
          {
            name: '搜索',
            code: 'search',

          },
          // {
          //   name: '查询',
          //   code: 'QUERYDIALOG',
          //   action: listTecaudit,
          //   btnSize:'mini'
          // },
          // {
          //   name: '批量通过',
          //   code: 'BATCHAPPROVE',
          //   action: overTechnicsProccess,
          //   btnSize:'mini'
          // }
        ],
        act_btn: [
          {
            width: 200,
            name: '查看',
            code: 'LOOKUP',
            when: { 'technicsState': [22] },
            action: updateTecaudit,
            btnSize: 'mini',
            typeLess: 'itag',
            iconPic: 'el-icon-tickets',
          },
          {
            name: '详情',
            code: 'CHECK',
            when: { 'technicsState': [21, 22] },
            action: updateTecaudit,
            btnSize: 'mini',
            typeLess: 'itag',
            iconPic: 'el-icon-view',
          },
          {
            name: '通过审核',
            code: 'AUDITPASS',
            when: { 'technicsState': [21] },
            action: overTechnicsProccess,
            btnSize: 'mini',
            typeLess: 'itag',
            iconPic: 'el-icon-bell',
          },
          {
            name: '物料解析',
            code: 'MATERIELANALY',
            action: null,
            btnSize: 'mini',
            typeLess: 'itag',
            iconPic: 'el-icon-s-ticket',
          },
          {
            name: '送审',
            code: 'EXAMINE',
            when: { 'pIsverify': '0' },
            action: null,
            btnSize: 'mini',
            typeLess: 'itag',
            iconPic: 'el-icon-circle-check',
          },
          {
            name: '重新审核',
            code: 'RETURN2',
            when: { 'pIsverify': '2' },
            action: null,
            btnSize: 'mini',
            typeLess: 'itag',
            iconPic: 'el-icon-refresh-right',
          },
          {
            name: '退回',
            code: 'RETURN1',
            when: { 'pIsverify': '1' },
            action: null,
            btnSize: 'mini',
            typeLess: 'itag',
            iconPic: 'el-icon-warning-outline',
          },
          {
            name: '退回',
            code: 'RETURN3',
            // when: {  },
            action: null,
            btnSize: 'mini',
            typeLess: 'itag',
            iconPic: 'el-icon-s-management',
          }
        ],
        replace: [
          {
            name: 'technicsState',
            replace: { 0: "自由态", 20: "已申请", 21: "工艺审核中", 22: "工艺审核完成" }
          },
          {
            name: 'pcbSource',
            replace: { 0: "无", 1: "甲方提供", 2: "乙方提供" }
          }
        ]
      }
    },
    created() {
      //
      let productCode = this.$route.query.productCode
      if (productCode) {
        this.select.queryParam.productCode = productCode
      }
    },
    methods: {
      search_ts(data) {
        //搜索
        this.visiables = false
        let mindata = {
          name: data['产品名称'],
          productCode: data['产品编码'],
          pkPsndocShow: data['业务员']

        }
        this.select = {
          select: this.select.select,
          queryParam: mindata
        }
      },
      colsed(data) {
        //搜索
        this.visiables = data;
      },
      removeItem(index) {
        var _tempList = [];
        for (var i = 0; i < this.diyData.length; i++) {
          if (i != index) {
            _tempList.push(this.diyData[i])
          }
        }
        this.diyData = _tempList;
      },
      changeOption(val) {
        // console.log(this.tableValueArr);
      },
      diyNext() {
        let _this = this;
        if (JSON.stringify(this.tableValueArr).replace("bitNum", "").indexOf("num") == -1) {
          this.$message.error('请选择表头[数量]');
          return false;
        }
        if (JSON.stringify(this.tableValueArr).indexOf("materielName") == -1) {
          this.$message.error('请选择表头[型号]');
          return false;
        }
        if (JSON.stringify(this.tableValueArr).indexOf("packaging") == -1) {
          this.$message.error('请选择表头[封装]');
          return false;
        }
        if (JSON.stringify(this.tableValueArr).indexOf("bitNum") == -1) {
          this.$message.error('请选择表头[位号]');
          return false;
        }
        var param = [];
        var numIndex = this.getIndexByKey("num");//数量下标
        var materielNameIndex = this.getIndexByKey("materielName");//型号下标
        var specificationsIndex = this.getIndexByKey("materielSpecifications");//规格下标
        var packagingIndex = this.getIndexByKey("packaging");//封装下标
        var brandIndex = this.getIndexByKey("brand");//品牌下标
        var bitNumIndex = this.getIndexByKey("bitNum");//位号下标
        var unitIndex = this.getIndexByKey("unit");//单位下标
        var materieTypeIndex = this.getIndexByKey("materieType");//物料类型下标
        var noteIndex = this.getIndexByKey("note");//备注下标
        for (var i = 0; i < this.diyData.length; i++) {
          var _arr = this.diyData[i].split("||");

          var _content = [_arr[materielNameIndex], _arr[packagingIndex]];
          if (_arr[specificationsIndex]) {
            _content.push(_arr[specificationsIndex])
          }
          if (_arr[brandIndex]) {
            _content.push(_arr[brandIndex])
          }
          param.push({
            "materielName": _arr[materielNameIndex] || null,
            "materielSpecifications": _arr[specificationsIndex] || null,
            //"content": this.diyData[i] || null,
            "packaging": _arr[packagingIndex] || null,
            "brand": _arr[brandIndex] || null,
            "bitNum": _arr[bitNumIndex] || null,
            "num": _arr[numIndex] || null,
            "materieType": _arr[materieTypeIndex] || null,
            "unit": _arr[unitIndex] || null,
            "note": _arr[noteIndex] || null,
            "content": (_content.join("||")) || null
          })
        }
        // console.log(param);
        axios.post(process.env.BASE_API + "/BillOfMaterial/selectBillOfMaterialByMatchedPartNo", param).then(ret => {
          if (ret.data.success) {
            console.log(ret.data.object);
            _this.fileRes = ret.data;
            _this.diyTableVisible = false
            _this.bomTableVisible = true;
            _this.tableValueArr = [];
          } else {
            _this.$message.error('匹配本地库失败');
          }
        })
        //
      },
      getIndexByKey(key) {
        for (var i = 0; i < this.tableValueArr.length; i++) {
          if (this.tableValueArr[i] == key) {
            return i;
          }
        }
        return -1;
      },
      handleFileSuccess(response, file, fileList) {
        // console.log(response);
        this.diyData = response.object;
        if (this.diyData.length > 0) {
          for (var i = 0; i < this.diyData[0].split('||').length; i++) {
            this.tableValueArr.push("");
          }

        }

        //this.fileRes = response;
        this.$refs.upload.clearFiles();
        //this.bomTableVisible = true;
        this.bomDialogVisible = false;
        //
        this.diyTableVisible = true;
      },
      closes(){
        this.instructions_cons={
          contentVisiable: false,
          title: null,
        }
      },
      onButtonClick(param) { // 监控页面中所有的按钮点击事件
        // 审核动作
        if (param.btnCode === 'CHECK') {
          this.openContent('产品工艺详情', param.btnAction)
          this.content.updateRow = param.bindData
        }
        //打开搜索
        if (param.btnCode === "search") {
          this.visiables = true
        }
        // 查看动作
        if (param.btnCode === 'LOOKUP') {
          this.openContent('查看', param.btnAction)
          this.content.updateRow = param.bindData
        }
        // 查询界面
        if (param.btnCode === 'QUERYDIALOG') {
          this.openQueryDialog()
        }
        // 审核通过动作
        if (param.btnCode === 'AUDITPASS') {
          this.commitDialog.paramData = param
          this.openCommitDialog()
        }
        // 物料解析
        if (param.btnCode === 'MATERIELANALY') {
          let queryParam = { pkProduct: param.bindData.pkProduct }
          let _this = this;

          this.pkProduct = param.bindData.pkProduct;
          axios.post(process.env.BASE_API + "/technics/selectBillOfMaterialCraftBByPkId", { pkProduct: this.pkProduct }).then(ret => {
            if (ret.data && ret.data.object && ret.data.object.length > 0) {
              _this.fileRes = ret.data.object;
              _this.bomAction = 'temp';
              // console.log(_this.fileRes);
              _this.bomTableVisible = true;//直接显示表格
            } else {
              _this.bomAction = '';
              _this.bomDialogVisible = true;
            }
          })
          //this.$router.push({ path: '/MENU9047/MENU44558', query: queryParam })
        }

        //送审
        if (param.btnCode === 'EXAMINE') {
          // this.openContent('送审', param.btnAction)
          let param1 = { pIsverify: '1', pkProduct: param.bindData.pkProduct }
          if (this.name == "admin") {
            alert("工艺人员未提交,请本人操作")
          } else {
            this.$confirm('您确定要提交审核吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              updateTecaudit(param1).then((response => {
                // console.log(response)
                let queryParam = { dr: 0 }
                // 触发查询接口 -- 主动触发Table组件中的查询逻辑
                let newSelect = { select: this.select.select, queryParam: queryParam }
                this.select = newSelect
                // location.reload();
              }))

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消提交'
              });
            });
          }

        }
        // 作业指导书
        if (param.btnCode === 'RETURN3') {
        
          this.instructions_cons = param.bindData
         
          this.cons = {
            contentVisiable: true,
            title: null,
          }
        }
        //重新审核
        if (param.btnCode === 'RETURN2') {
          let param1 = { pIsverify: '1', pkProduct: param.bindData.pkProduct }
          if (this.name == "admin") {
            alert("工艺人员未提交,请本人操作")
          } else {
            this.$confirm('您确定要提交审核吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              updateTecaudit(param1).then((response => {
                // console.log(response)
                let queryParam = { dr: 0 }
                // 触发查询接口 -- 主动触发Table组件中的查询逻辑
                let newSelect = { select: this.select.select, queryParam: queryParam }
                this.select = newSelect
              }))
              // location.reload();
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消提交'
              });
            });
          }
        }
        //退回
        if (param.btnCode === 'RETURN1') {
          let param1 = { pIsverify: '2', pkProduct: param.bindData.pkProduct }
          if (this.name == "admin") {
            this.$confirm('您确定要退回吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              updateTecaudit(param1).then((response => {
                // console.log(response)
                let queryParam = { dr: 0 }
                // 触发查询接口 -- 主动触发Table组件中的查询逻辑
                let newSelect = { select: this.select.select, queryParam: queryParam }
                this.select = newSelect
              }))
              // location.reload();
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消退回!'
              });
            });
          } else {
            alert("您不是管理员无法审核!!")
          }
        }
      },
      //查询自由态
      ziyou() {
        // console.log("我是自由态")
        var queryParam = { technicsState: '0' }
        let newSelect = { select: this.select.select, queryParam: queryParam }
        this.select = newSelect
      },
      // 条件查询列表数据
      queryViewListDataByWhere(whereParam) {
        // console.log(whereParam)
        this.isifs = !this.isifs
        this.viewDefaultBillState = whereParam
        let queryParam = { dr: 0 }
        if (whereParam == 'ALL') { // 全部
          this.viewDefaultBillState = null
          queryParam.technicsState = null
        } else {
          queryParam.technicsState = this.viewDefaultBillState
        }
        // 触发查询接口 -- 主动触发Table组件中的查询逻辑
        let newSelect = { select: this.select.select, queryParam: queryParam }
        this.select = newSelect

      },
      // 通过工艺审核
      overTechnicsProccessMethod(sendMsgParam) {
        let bindRowData = sendMsgParam.paramData.bindData
        // 预制公共信息
        if (bindRowData) {
          // 判断SMT与DIP焊点不能为空
          // if (!bindRowData.smt || !bindRowData.dip) {
          //   this.$message({ type: 'warning', message: 'SMT焊点或DIP焊点不能为空!' })
          //   return
          // }
          let publicDingMsgInfo = {
            customerCode: bindRowData.customerCode,
            productCode: bindRowData.code,
            productName: bindRowData.name,
            pkPsndoc: bindRowData.pkPsndoc,
            constractno: bindRowData.constractno,
            orderNumber: bindRowData.orderNumber,
            quoreOrderDate: bindRowData.quoreOrderDate,
            orderType: bindRowData.orderType,
            expectDeliDate: bindRowData.expectDeliDate,
          }
          sendMsgParam.publicDingMsgInfo = publicDingMsgInfo
        }
        // 消息发送节点
        sendMsgParam.sendTagName = "工艺审核"
        this.$confirm('是否确认通过工艺审核?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          sendDingMsgByPsndoc(sendMsgParam).then((response) => {
            if (!response.data.success) {
              this.$message({ type: 'info', message: response.errorMessage })
            } else {
              let updateParam = initReplaceUpdateData(bindRowData, this.replace)
              overTechnicsProccess(bindRowData).then((response) => {
                this.$message({ message: '工艺审核通过!', type: 'success' })
                bindRowData.technicsState = '工艺审核完成'
                this.$message({ type: 'success', message: '工艺审核完成!' })
                this.queryListData(null)
                // location.reload();
              })
            }
          })

        }).catch(() => {
          this.$message({ type: 'info', message: '已取消审核!' })
        })
      },
      queryListData(queryParam) { // 刷新界面数据
        if (queryParam) {
          let queryDialogParam = {
            productCode: queryParam.productCode,
            pkPsndoc: queryParam.pkPsndoc,
            customShortName: queryParam.customShortName,
            technicsState: queryParam.technicsState,
            creationdateBegin: queryParam.creationdateBegin,
            creationdateEnd: queryParam.creationdateEnd,
          }
          let newSelect = { select: this.select.select, queryParam: queryDialogParam }
          this.select = newSelect
        } else {
          let newSelect = { select: this.select.select, queryParam: this.select.queryParam }
          this.select = newSelect
        }
      },
      //输入产品编码 查询
      searchCode() {
        if (this.inputCode) {
          let param = { code: this.inputCode }
          let newSelect = { select: this.select.select, queryParam: param }
          this.select = newSelect
          this.inputCode = ""
        } else {
          this.$message('您搜索的条件不正确');
        }

      },
      // 打开查询模板
      openQueryDialog() {
        this.queryDialog.visiable = true
      },
      // 关闭查询模板
      closeQueryDialog() {
        this.queryDialog.visiable = false
      },
      // 打开送审框
      openCommitDialog() {
        this.commitDialog.visiable = true
      },
      // 关闭送审框
      closeCommitDialog() {
        this.commitDialog.visiable = false
      },
      openContent(title, action) { // 打开内容界面Dialog
        this.content.visiable = true
        this.content.title = title
        this.content.action = action
      },
      closeContent(tempData) { // 关闭内容界面Dialog
        this.content.visiable = false
      },
      handleClose() {
        // console.log("关闭");
        this.bomDialogVisible = false;
      },
      bomTableHandleClose() {
        this.bomTableVisible = false;
      },
      bomComplete() {
        alert(111);
      }
    }
  }
</script>

<style scoped>
  .icon {
    float: right;
    margin-top: 60px;
    margin-right: 50px;
    color: #409EFF;
    font-size: 10px;
  }

  .diy_table {
    border-collapse: separate;
  }

  .diy_table tr:hover td {
    background: #f5f7fa
  }

  .diy_table tr td {
    padding: 10px 5px;
    border-bottom: 1px solid #ebeef5
  }

  .diy_table tr td .cell {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }
</style>