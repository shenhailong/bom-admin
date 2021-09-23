<template>
  <div class="page">
    <el-form :inline="true" :model="searchForm" size="mini">
      <el-row>
        <el-col :span="24">
          <el-form-item label="审核状态">
            <el-select
              v-model="searchForm.technicsState"
              placeholder="请选择审核状态"
            >
              <el-option label="全部" value="" />
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
            />
          </el-form-item>

          <el-form-item label="产品名称">
            <el-input
              v-model="searchForm.name"
              clearable
              placeholder="请输入客户编号"
            />
          </el-form-item>
          <el-form-item label="业务经理">
            <el-select v-model="searchForm.pkPsndocShow" placeholder="请选择业务经理" style="width:100%" clearable >
              <el-option
                v-for="item in managerList"
                :key="item.value"
                :label="item.label"
                :value="item.label"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getTableList">查询</el-button>
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
            <el-button type="success" size="mini" @click="instruction(scope.row)">作业指导书</el-button>
            <el-dropdown style="margin:0 5px">
              <el-button type="primary" size="mini">更多操作
                <i class="el-icon-arrow-down el-icon--right"/>
              </el-button>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="scope.row.pIsverify === '0'" @click.native="reAudit(scope.row.pkProduct)">审核</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.pIsverify === '1'" @click.native="sendBack(scope.row.pkProduct)">退回</el-dropdown-item>
                <el-dropdown-item v-if="scope.row.pIsverify === '2'" @click.native="reAudit(scope.row.pkProduct)">重新审核</el-dropdown-item>
                <!-- <el-dropdown-item @click.native="setRole(scope.row.id)">查看进度条</el-dropdown-item> -->
                <el-dropdown-item @click.native="openDing(scope.row)">通知审核</el-dropdown-item>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  selectAllProductionDefenseAsPage,
  updataSelectAllProductionDefenseAsPage,
  defenseInspeReportProccess
} from '@/api/ThreePreventions/index' // 三防信息
import { listBdPsndocAsRef } from '@/api/orgs/bdpsndoc'
import { BILL_STATE_OBJ, TECHNICS_AUDIT_OBJ, SOURCE_COMMON_OBJ } from '@/constants/status'
import { listTecaudit, updateTecaudit, overTechnicsProccess } from '@/api/technics/tecaudit'
import CommitDialog from '@/components/Commitdingding/CommitDialog'
import ListMixin from '@/mixins/list'
import { selectOrderInfoAsRef } from '@/api/orderCompMage/orderCompMage'

export default {
  components: {
    CommitDialog
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
      managerList: [],
      commitDialog: {
        visiable: false,
        paramData: null
      }, // 通知钉钉审核
      children: [
        {
          value: null,
          label: '全部显示'
        },
        {
          value: '0',
          label: '自由态'
        },
        {
          value: '2',
          label: '已任领'
        },
        {
          value: '3',
          label: '采购报价完成'
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
      console.log(sendMsgParam)
    },
    // 作业指导书
    instruction(row) {
      this.$emit('addTab', {
        name: `Detail${row.pkProduct}`,
        title: `作业指导书版本列表-${row.name}`,
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
