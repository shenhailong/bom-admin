<template>
  <div class="page">
    <el-form :inline="true" :model="searchForm" size="mini">
      <el-row>
        <el-col :span="24">
          <el-form-item label="审核状态">
            <el-select
              v-model="searchForm.technicsState"
              placeholder="请选择审核状态"
              @change="getTableList"
            >
              <el-option
                v-for="item in children"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="产品编号">
            <el-input
              v-model="searchForm.productCode"
              clearable
              placeholder="请输入产品编号"
              @change="getTableList"
            />
          </el-form-item>

          <el-form-item label="产品名称">
            <el-input
              v-model="searchForm.name"
              clearable
              placeholder="请输入客户编号"
              @change="getTableList"
            />
          </el-form-item>
          <el-form-item label="业务经理">
            <el-select
              v-model="searchForm.pkPsndocShow"
              placeholder="请选择业务经理"
              style="width:100%"
              clearable
              @change="getTableList" >
              <el-option
                v-for="item in managerList"
                :key="item.value"
                :label="item.label"
                :value="item.label"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <!-- <el-button type="primary" @click="getTableList">查询</el-button> -->
            <el-button type="danger" @click="resetList">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="24">
        <el-button :disabled="!selection.length" size="mini" type="primary" @click="exportExcel">导出报表</el-button>
        <el-button size="mini" type="primary" @click="showOperation = !showOperation">{{ showOperation ? '隐藏' : '显示' }}操作栏</el-button>
      </el-col>
    </el-row>
    <div class="list_table">
      <el-table
        :data="list"
        :header-cell-style="{
          background: '#EFF0FF',
          color: '#161616',
          'font-weight': 400,
        }"
        border
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          type="index"
          label="序号"
          width="50"/>
        <template v-for="item in columns">
          <el-table-column
            v-if="!item.primary"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              {{ item.filter ? item.filter[scope.row[item.prop]] : scope.row[item.prop] }}
            </template>
          </el-table-column>
        </template>

        <el-table-column v-if="showOperation" label="操作" width="260" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="openContent(scope.row, '查看')">详情</el-button>
            <el-button type="success" size="mini" @click="version(scope.row)">版本</el-button>
            <el-dropdown style="margin:0 5px">
              <el-button type="primary" size="mini">更多
                <i class="el-icon-arrow-down el-icon--right"/>
              </el-button>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="openContent(scope.row, '产品工艺详情')">编辑</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.pIsverify === '0'" @click.native="reAudit(scope.row.pkProduct)">审核</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.pIsverify === '1'" @click.native="sendBack(scope.row.pkProduct)">退回</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.pIsverify === '2'" @click.native="reAudit(scope.row.pkProduct)">重新审核</el-dropdown-item>
                <el-dropdown-item @click.native="material(scope.row)">物料解析</el-dropdown-item>
                <el-dropdown-item @click.native="openDing(scope.row)">钉钉通知</el-dropdown-item>
                <!-- <el-dropdown-item @click.native="setRole(scope.row.id)">查看主题</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="page"
        :page-size="limit"
        :page-sizes="[10, 20, 30, 40]"
        :total="total"
        class="table_pagination"
        background
        layout="total, sizes, prev, pager, next"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <!--送审框Dialog通知钉钉-->
    <CommitDialog
      :visiable="commitDialog.visiable"
      :param-data="commitDialog.paramData"
      @close="() => { commitDialog.visiable = false }"
      @commitMethod="overTechnicsProccessMethod"/>
    <!--查看详情界面-->
    <Tecauditcontent
      :replace="replace"
      :visiable="content.visiable"
      :title="content.title"
      :action="content.action"
      :update-row="content.updateRow"
      @close="closeContent"
      @refreshList="getTableList"/>
    <!-- 物料解析 上传 -->
    <div v-if="materialUpload">
      <el-dialog :visible.sync="materialUpload" :before-close="handleClose" title="物料解析" width="500px">
        <div style="text-align:center">
          <el-upload
            ref="upload"
            :action="uploadAction"
            :limit="1"
            :show-file-list="false"
            :on-success="handleFileSuccess"
            class="upload-demo"
            drag>
            <i class="el-icon-upload"/>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </div>
        <span slot="footer" class="dialog-footer"/>
      </el-dialog>
    </div>
    <!-- 自定义表头 -->
    <div v-if="diyTableVisible">
      <el-dialog
        :visible.sync="diyTableVisible"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        title="表头匹配"
        width="1620px"
        top="1%">
        <div>
          <table style="width:100%" class="diy_table" cellpadding="0" cellspacing="0">
            <tr v-if="diyData.length>0">
              <td v-for="(item,index) in diyData[0].split('||')" style="padding-left:0">
                <el-select v-model="tableValueArr[index]" clearable placeholder="请选择表头" @change="changeOption">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :disabled="item.disabled"
                    :value="item.value"/>
                </el-select>
              </td>
              <td>操作</td>
            </tr>
            <tr v-for="(item,index) in diyData">
              <td v-for="(td,ind) in item.split('||')">
                <div :title="td" class="cell">{{ td }}</div>
              </td>
              <td><span class="btn-remove" style="white-space:nowrap" @click="removeItem(index)">移除</span></td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="diyNext">下一步</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 物料解析 表格 -->
    <div v-if="bomTableVisible">
      <el-dialog
        :visible.sync="bomTableVisible"
        :before-close="bomTableHandleClose"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
        title="物料解析"
        width="1620px"
        top="1%">
        <div>
          <BomTable :file-res="fileRes" :pk-product="pkProduct" :action="bomAction" @complete="bomTableHandleClose"/>
        </div>
        <span slot="footer" class="dialog-footer"/>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import { listBdPsndocAsRef } from '@/api/orgs/bdpsndoc'
import { TECHNICS_AUDIT_OBJ, SOURCE_COMMON_OBJ } from '@/constants/status'
import { listTecaudit, updateTecaudit, overTechnicsProccess } from '@/api/technics/tecaudit'
import CommitDialog from '@/components/Commitdingding/CommitDialog'
import BomTable from '@/components/viewcomp/BomTable'
import Tecauditcontent from '@/views/technics/tecaudit/content'
import { sendDingMsgByPsndoc } from '@/api/pub/pub'
import ListMixin from '@/mixins/list'
import { initReplaceUpdateData } from '@/utils/viewCompUtil'

export default {
  components: {
    CommitDialog,
    Tecauditcontent,
    BomTable
  },
  mixins: [ListMixin],
  data() {
    return {
      excelName: '产品工艺审核',
      columns: [
        { prop: 'pkProduct', label: '主键', width: '10', primary: true },
        { prop: 'code', label: '产品编码', width: '110' },
        { prop: 'name', label: '产品名称', width: '120' },
        { prop: 'model', label: '产品型号', width: '120' },
        { prop: 'technicsState', label: '单据状态', width: '140', filter: TECHNICS_AUDIT_OBJ },
        { prop: 'modifierShow', label: '最后修改人', width: '100' },
        { prop: 'modifiedtime', label: '最后修改时间', width: '140' },
        { prop: 'creationtime', label: '创建时间', width: '140' },
        { prop: 'pcbSource', label: 'PCB来源', filter: SOURCE_COMMON_OBJ },
        { prop: 'skillContactsName', label: '技术联系人', width: '130' },
        { prop: 'skillContactsPhone', label: '技术联系电话', width: '110' },
        { prop: 'pkPsndocShow', label: '业务员' }
      ],
      searchForm: {
        dr: 0, // 0 是没有删除 1代表是删除
        name: null, // 产品名称
        productCode: null, // 产品编号
        pkPsndocShow: null, // 业务经理
        technicsState: '22' // 审核状态
      },
      pkProduct: null, // 列表主键
      managerList: [],
      commitDialog: {
        visiable: false,
        paramData: null
      }, // 通知钉钉审核
      materialUpload: false, // 物料上传
      uploadAction: process.env.BASE_API + '/technics/readExcelAccFileB', // 物料上传接口
      tableValueArr: [],
      diyTableVisible: false, // 自定义数据弹窗
      diyData: [], // 自定义数据
      bomTableVisible: false, // 表格table弹窗
      fileRes: null,
      bomAction: '',
      content: {
        visiable: false, // 内容界面显示控制
        title: '', // 标题
        action: null, // 执行Action
        updateRow: null // 更新时带过来的temp
      },
      replace: [
        {
          name: 'technicsState',
          replace: { 0: '自由态', 20: '已申请', 21: '工艺审核中', 22: '工艺审核完成' }
        },
        {
          name: 'pcbSource',
          replace: { 0: '无', 1: '甲方提供', 2: '乙方提供' }
        }
      ],
      children: [
        {
          value: '21',
          label: '工艺审核中'
        },
        {
          value: '22',
          label: '工艺审核完成'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  mounted() {
    this.getManage()
  },
  methods: {
    async getManage() {
      const res = await listBdPsndocAsRef({ pkPsntype: 6 })
      if (res.success) {
        this.managerList = res.object
      }
    },
    // 查询列表数据
    async getList(params) {
      const res = await listTecaudit(params)
      if (res.success) {
        this.list = res.object
        this.total = res.total
      }
    },
    // 打开内容界面Dialog
    openContent(row, title) {
      this.content.updateRow = row
      this.content.visiable = true
      this.content.title = title
      this.content.action = updateTecaudit
    },
    // 关闭内容界面Dialog
    closeContent(tempData) {
      this.content.visiable = false
    },
    // 打开钉钉
    openDing(param) {
      this.commitDialog = {
        visiable: true,
        paramData: param
      }
    },
    // 重新审核 \ 审核
    reAudit(pkProduct) {
      const param = { pIsverify: '1', pkProduct }
      if (this.name === 'admin') {
        this.$message.error('工艺人员未提交,请本人操作!')
      } else {
        this.$confirm('您确定要提交审核吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await updateTecaudit(param)
          if (res.success) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.reloadList()
          }
        }).catch(() => {})
      }
    },
    // 退回
    sendBack(pkProduct) {
      const param = { pIsverify: '2', pkProduct }
      if (this.name === 'admin') {
        this.$confirm('您确定要退回吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          const res = await updateTecaudit(param)
          if (res.success) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.reloadList()
          }
        }).catch(() => {})
      } else {
        this.$message.error('您不是管理员无法审核!')
      }
    },
    // 通过工艺审核
    overTechnicsProccessMethod(sendMsgParam) {
      const bindRowData = sendMsgParam.paramData.bindData
      // 预制公共信息
      if (bindRowData) {
        const publicDingMsgInfo = {
          customerCode: bindRowData.customerCode,
          productCode: bindRowData.code,
          productName: bindRowData.name,
          pkPsndoc: bindRowData.pkPsndoc,
          constractno: bindRowData.constractno,
          orderNumber: bindRowData.orderNumber,
          quoreOrderDate: bindRowData.quoreOrderDate,
          orderType: bindRowData.orderType,
          expectDeliDate: bindRowData.expectDeliDate
        }
        sendMsgParam.publicDingMsgInfo = publicDingMsgInfo
      }
      // 消息发送节点
      sendMsgParam.sendTagName = '工艺审核'
      this.$confirm('是否确认通过工艺审核?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        sendDingMsgByPsndoc(sendMsgParam).then((response) => {
          if (!response.data.success) {
            this.$message({ type: 'info', message: response.errorMessage })
          } else {
            initReplaceUpdateData(bindRowData, this.replace)
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
    // 物料解析
    material(row) {
      this.pkProduct = row.pkProduct
      axios.post(process.env.BASE_API + '/technics/selectBillOfMaterialCraftBByPkId', { pkProduct: this.pkProduct }).then(res => {
        if (res.data && res.data.object && res.data.object.length > 0) {
          this.fileRes = res.data.object
          this.bomAction = 'temp'
          this.bomTableVisible = true// 直接显示表格
        } else {
          // 物料上传
          this.bomAction = ''
          this.materialUpload = true
        }
      })
    },
    // 关闭物料上传弹窗
    handleClose() {
      this.materialUpload = false
    },
    handleFileSuccess(res) {
      console.log(res)
      this.diyData = res.object
      if (this.diyData.length > 0) {
        for (var i = 0; i < this.diyData[0].split('||').length; i++) {
          this.tableValueArr.push('')
        }
      }

      this.$refs.upload.clearFiles()
      this.materialUpload = false
      this.diyTableVisible = true
    },
    // 关闭表格弹窗
    bomTableHandleClose() {
      this.bomTableVisible = false
    },
    diyNext() {
      const _this = this
      if (JSON.stringify(this.tableValueArr).replace('bitNum', '').indexOf('num') === -1) {
        this.$message.error('请选择表头[数量]')
        return false
      }
      if (JSON.stringify(this.tableValueArr).indexOf('materielName') === -1) {
        this.$message.error('请选择表头[型号]')
        return false
      }
      if (JSON.stringify(this.tableValueArr).indexOf('packaging') === -1) {
        this.$message.error('请选择表头[封装]')
        return false
      }
      if (JSON.stringify(this.tableValueArr).indexOf('bitNum') === -1) {
        this.$message.error('请选择表头[位号]')
        return false
      }
      var param = []
      var numIndex = this.getIndexByKey('num')// 数量下标
      var materielNameIndex = this.getIndexByKey('materielName')// 型号下标
      var specificationsIndex = this.getIndexByKey('materielSpecifications')// 规格下标
      var packagingIndex = this.getIndexByKey('packaging')// 封装下标
      var brandIndex = this.getIndexByKey('brand')// 品牌下标
      var bitNumIndex = this.getIndexByKey('bitNum')// 位号下标
      var unitIndex = this.getIndexByKey('unit')// 单位下标
      var materieTypeIndex = this.getIndexByKey('materieType')// 物料类型下标
      var noteIndex = this.getIndexByKey('note')// 备注下标
      for (var i = 0; i < this.diyData.length; i++) {
        var _arr = this.diyData[i].split('||')

        var _content = [_arr[materielNameIndex], _arr[packagingIndex]]
        if (_arr[specificationsIndex]) {
          _content.push(_arr[specificationsIndex])
        }
        if (_arr[brandIndex]) {
          _content.push(_arr[brandIndex])
        }
        param.push({
          'materielName': _arr[materielNameIndex] || null,
          'materielSpecifications': _arr[specificationsIndex] || null,
          // "content": this.diyData[i] || null,
          'packaging': _arr[packagingIndex] || null,
          'brand': _arr[brandIndex] || null,
          'bitNum': _arr[bitNumIndex] || null,
          'num': _arr[numIndex] || null,
          'materieType': _arr[materieTypeIndex] || null,
          'unit': _arr[unitIndex] || null,
          'note': _arr[noteIndex] || null,
          'content': (_content.join('||')) || null
        })
      }
      // console.log(param);
      axios.post(process.env.BASE_API + '/BillOfMaterial/selectBillOfMaterialByMatchedPartNo', param).then(ret => {
        if (ret.data.success) {
          console.log(ret.data.object)
          _this.fileRes = ret.data
          _this.diyTableVisible = false
          _this.bomTableVisible = true
          _this.tableValueArr = []
        } else {
          _this.$message.error('匹配本地库失败')
        }
      })
      //
    },
    getIndexByKey(key) {
      for (var i = 0; i < this.tableValueArr.length; i++) {
        if (this.tableValueArr[i] == key) {
          return i
        }
      }
      return -1
    },
    // 版本列表
    version(row) {
      this.$emit('addTab', {
        name: `Detail${row.pkProduct}`,
        title: `版本列表-${row.name}`,
        content: 'versionList',
        editData: row.pkProduct
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page{
  padding: 20px;
  height: 100%;
}

.list_table{
  margin-top: 20px;
}

.table_pagination {
  margin: 20px;
  margin-bottom: 40px;
  text-align: right;
}

</style>

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
