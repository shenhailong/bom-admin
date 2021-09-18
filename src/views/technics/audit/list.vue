<template>
  <div class="page">
    <el-form :inline="true" :model="searchForm" size="mini">
      <el-row>
        <el-col :span="24">
          <el-form-item label="审核状态">
            <el-select
              v-model="searchForm.technicsState"
              placeholder="请选择单据状态"
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
            <el-button type="primary" @click="resetList">查询</el-button>
            <el-button type="danger" @click="resetList">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span="24">
        <el-button :disabled="!selection.length" size="mini" type="primary" @click="detail">导出报表</el-button>
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
        @select="selectSingle"
        @select-all="selectAll"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column
          type="index"
          label="序号"
          width="50"/>
        <el-table-column prop="code" label="产品编号" width="100" />
        <el-table-column prop="name" label="产品名称" width="120" />
        <el-table-column prop="model" label="产品型号" width="120" />
        <el-table-column prop="technicsState" label="单据状态" width="140" />
        <el-table-column prop="modifierShow" label="最后修改人" width="100" />
        <el-table-column prop="modifiedtime" label="最后修改时间" width="140"/>
        <el-table-column prop="creationtime" label="创建时间" width="140"/>
        <el-table-column prop="pcbSource" label="PCB来源" />
        <el-table-column prop="skillContactsPhone" label="技术联系电话" width="110"/>
        <el-table-column prop="skillContactsPhone" label="技术联系电话" width="110"/>
        <el-table-column prop="pkPsndocShow" label="业务员" />

        <el-table-column v-if="showOperation" label="操作" width="260" fixed="right">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="edit(scope.row)">详情</el-button>
            <el-dropdown style="margin:0 5px">
              <el-button type="primary" size="mini">更多操作
                <i class="el-icon-arrow-down el-icon--right"/>
              </el-button>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="setDepartment(scope.row.id)">查看子表</el-dropdown-item>
                <el-dropdown-item @click.native="setArea(scope.row.id)">全部完成</el-dropdown-item>
                <el-dropdown-item @click.native="setRole(scope.row.id)">查看进度条</el-dropdown-item>
                <el-dropdown-item @click.native="setRole(scope.row.id)">通知钉钉</el-dropdown-item>
                <el-dropdown-item @click.native="setRole(scope.row.id)">查看主题</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageNum"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :total="total"
        class="table_pagination"
        background
        layout="total, sizes, prev, pager, next"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
import {
  selectAllProductionDefenseAsPage,
  updataSelectAllProductionDefenseAsPage,
  defenseInspeReportProccess
} from '@/api/ThreePreventions/index' // 三防信息
import { listBdPsndocAsRef } from '@/api/orgs/bdpsndoc'
import { BILL_STATE_OBJ, PRODUCT_TYPE_OBJ } from '@/constants/status'
import { listTecaudit, updateTecaudit, overTechnicsProccess } from '@/api/technics/tecaudit'
import { selectOrderInfoAsRef } from '@/api/orderCompMage/orderCompMage'

export default {
  components: {

  },
  data() {
    return {
      total: 10,
      list: [],
      page: 1, // 页数
      limit: 10, // 每页显示条数
      showDialog: false, // 显示弹窗开关
      projectList: [],
      searchForm: {
        dr: 0, // 0 是没有删除 1代表是删除
        name: null, // 产品名称
        productCode: null, // 产品编号
        pkPsndocShow: null, // 业务经理
        technicsState: '22' // 审核状态
      },
      selection: [], // 选择的list
      showOperation: true,
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
  mounted() {
    this.getList()
  },
  methods: {
    async getManage() {
      const res = await listBdPsndocAsRef({ pkPsntype: 6 })
      if (res.success) {
        this.managerList = res.object
      }
    },
    // 查询列表数据
    async getList() {
      const params = {
        ...this.searchForm,
        limit: this.limit,
        page: this.page
      }
      const res = await listTecaudit(params)
      if (res.success) {
        this.list = res.object
      }
    },
    // 单选
    selectSingle(selection) {
      console.log(selection)
      this.selection = selection
    },
    // 全部选择
    selectAll(selection) {
      console.log(selection)
      this.selection = selection
    },
    // 点击每页多少条
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNum = 1
      this.getTableList()
    },
    // 点击页数
    handleCurrentChange(val) {
      this.pageNum = val
      this.getTableList()
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
