<!--
 * @Author: your name
 * @Date: 2021-05-19 08:41:46
 * @LastEditTime: 2021-09-12 15:13:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bom-admin/src/views/customer/info/custominfo.vue
-->
<template>
  <div class="message-wrap">
    <el-row :gutter="24" class="row-bg">
      <el-form v-if="tab === 1" :model="form1" size="mini" label-position="top" label-width="80px">
        <el-col :span="12">
          <el-card class="box-card">
            <el-row :gutter="24">
              <el-col :span="8">
                <div class="item">
                  <div class="btn-empty" />
                  <el-form-item label="报价发起日期">
                    <el-date-picker
                      v-model="form1.ts"
                      style="width:100%"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      @change="paramsChange1"/>
                  </el-form-item>
                  <el-form-item label="合同编号">
                    <el-input v-model="form1.contractdate" clearable placeholder="请输入合同编号" @change="paramsChange1"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="item">
                  <div :class="{active: form1.billStateList}" class="btn" @click="searchStatus(1)">进行时</div>
                  <el-form-item label="业务经理">
                    <el-select
                      v-model="form1.pkPsndocShow"
                      placeholder="请选择业务经理"
                      style="width:100%"
                      clearable
                      @change="paramsChange1">
                      <el-option
                        v-for="item in managerList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"/>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="客户编号">
                    <el-input v-model="form1.customerCode" clearable placeholder="请输入客户编号" @change="paramsChange1"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="item">
                  <div :class="{active: form1.billState}" class="btn" @click="searchStatus(2)">已完成</div>
                  <el-form-item label="产品名称">
                    <el-input v-model="form1.productName" clearable placeholder="请输入产品名称" @change="paramsChange1"/>
                  </el-form-item>
                  <el-form-item label="产品编号">
                    <el-input v-model="form1.productCode" clearable placeholder="请输入产品编号" @change="paramsChange1"/>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-form>

      <el-form v-if="tab === 2" :model="form2" size="mini" label-position="top" label-width="80px">
        <el-col :span="12">
          <el-card class="box-card">
            <el-row :gutter="24">
              <el-col :span="8">
                <div class="item">
                  <div :class="{active: !form2.billStateList && !form2.billState}" class="btn" @click="searchStatus2(0)">全部显示</div>
                  <el-form-item label="交货截止日期">
                    <el-date-picker
                      v-model="form2.scheduledtime"
                      style="width:100%"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      @change="paramsChange2"/>
                  </el-form-item>
                  <el-form-item label="合同编号">
                    <el-input v-model="form2.contractdate" clearable placeholder="请输入合同编号" @change="paramsChange2"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="item">
                  <div :class="{active: form2.billStateList}" class="btn" @click="searchStatus2(1)">进行时</div>
                  <el-form-item label="业务经理">
                    <el-select v-model="form2.pkPsndocShow" placeholder="请选择业务经理" style="width:100%" clearable @change="paramsChange2">
                      <el-option
                        v-for="item in managerList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label"/>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="客户编号">
                    <el-input v-model="form2.customerCode" clearable placeholder="请输入客户编号" @change="paramsChange2"/>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="item">
                  <div :class="{active: form2.billState}" class="btn" @click="searchStatus2(2)">已完成</div>
                  <el-form-item label="产品名称">
                    <el-input v-model="form2.productName" clearable placeholder="请输入产品名称" @change="paramsChange2"/>
                  </el-form-item>
                  <el-form-item label="产品编号">
                    <el-input v-model="form2.productCode" clearable placeholder="请输入产品编号" @change="paramsChange2"/>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-form>

      <el-col :span="12" class="right">
        <el-card class="box-card">
          <div class="tab">
            <el-row :gutter="24">
              <el-col :span="8">
                <div class="status-item">
                  <div class="num">{{ saleNum }}</div>
                  <div :class="{active: tab === 1}" class="btn" @click="clickTab(1)">报价流程</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="status-item">
                  <div class="num">{{ orderNum }}</div>
                  <div :class="{active: tab === 2}" class="btn" @click="clickTab(2)">订单流程</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="status-item">
                  <div class="num">0</div>
                  <div :class="{active: tab === 3}" class="btn">返修流程</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>

    </el-row>
    <div v-if="tab === 1" class="list_table">
      <el-table
        :data="list1"
        :header-cell-style="{
          background: '#EFF0FF',
          color: '#161616',
          'font-weight': 400,
        }"
        border
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"/>
        <el-table-column prop="serial" label="流水号" />
        <el-table-column prop="ts" label="报价发起日期" />
        <el-table-column prop="approvetime" label="报价签订日期" />
        <el-table-column prop="customerCode" label="客户编号" />
        <el-table-column prop="productCode" label="产品编号" />
        <el-table-column prop="productName" label="产品名称" width="100" />
        <el-table-column prop="productModel" label="产品型号" />
        <el-table-column prop="productNum" label="订单数量" />
        <el-table-column prop="billState" label="订单类型" />
        <el-table-column prop="pkPsndocShow" label="业务员" />
        <el-table-column prop="constractPsnname" label="订单进度" />

        <el-table-column label="操作" width="260" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.concerned === '0'" type="primary" size="mini" @click="follow(scope.row, scope.$index, '1', 1)">关注</el-button>
            <el-button v-if="scope.row.concerned === '1'" type="warning" size="mini" @click="follow(scope.row, scope.$index, '0', 1)">取消关注</el-button>
            <el-button type="primary" size="mini" @click="showDrawer(scope.row)">沟通记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="form1.page"
        :page-size="form1.limit"
        :page-sizes="[10, 20, 30, 40]"
        :total="total1"
        class="table_pagination"
        background
        layout="total, sizes, prev, pager, next"
        @current-change="handleCurrentChange1"
        @size-change="handleSizeChange1"
      />

    </div>

    <div v-if="tab === 2" class="list_table">
      <el-table
        :data="list2"
        :header-cell-style="{
          background: '#EFF0FF',
          color: '#161616',
          'font-weight': 400,
        }"
        border
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50"/>
        <el-table-column prop="contractNo" label="合同编号" />
        <el-table-column prop="productCode" label="签订日期" />
        <el-table-column prop="productName" label="交货日期" />
        <el-table-column prop="customerCode" label="客户编号" />
        <el-table-column prop="productionState" label="产品编号" />
        <el-table-column prop="productName" label="产品名称" width="100" />
        <el-table-column prop="productModel" label="产品型号" />
        <el-table-column prop="productNum" label="订单数量" />
        <el-table-column prop="billState" label="订单类型" />
        <el-table-column prop="pkPsndocShow" label="业务员" />
        <el-table-column prop="constractPsnname" label="订单进度" />

        <el-table-column label="操作" width="260" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.concerned === '0'" type="primary" size="mini" @click="follow2(scope.row, scope.$index, '1')">关注</el-button>
            <el-button v-if="scope.row.concerned === '1'" type="warning" size="mini" @click="follow2(scope.row, scope.$index, '0')">取消关注</el-button>
            <el-button type="primary" size="mini" @click="showDrawer(scope.row)">沟通记录</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page="form2.page"
        :page-size="form2.limit"
        :page-sizes="[10, 20, 30, 40]"
        :total="total2"
        class="table_pagination"
        background
        layout="total, sizes, prev, pager, next"
        @current-change="handleCurrentChange2"
        @size-change="handleSizeChange2"
      />
    </div>

    <el-drawer
      :visible.sync="drawer"
      title="沟通记录表"
      size="60%"
      destroy-on-close
    >
      <Record :pk-product-order-b="pkProductOrderB"/>
    </el-drawer>
  </div>
</template>

<script>
import * as saleApi from '@/api/salemage/salequote' // 销售报价
import { listBdPsndocAsRef } from '@/api/orgs/bdpsndoc'
import { updateProductOrderB } from '@/api/orders/orders'
import Record from './Record.vue'
export default {
  components: {
    Record
  },
  data() {
    return {
      form1: {
        customerCode: null, // 客户编号
        productCode: null, // 产品编号
        productName: null, // 产品名称
        pkPsndocShow: null, // 业务经理
        contractdate: null, // 合同编号
        billStateList: [0, 1, 2, 3, 4, 5],
        ts: null,
        page: 1,
        limit: 10 // 每页显示条数
      },
      form2: {
        customerCode: null, // 客户编号
        productCode: null, // 产品编号
        productName: null, // 产品名称
        pkPsndocShow: null, // 业务经理
        contractdate: null, // 合同编号
        page: 1,
        limit: 10 // 每页显示条数
      },
      managerList: [], // 业务经理
      list1: [],
      list2: [],
      total1: 0,
      total2: 0,
      saleNum: 0,
      orderNum: 0,
      limit: 10, // 每页显示条数
      drawer: false, // 显示抽屉
      tab: 1,
      pkProductOrderB: ''
    }
  },
  mounted() {
    this.getList1()
    this.getManage()
    this.getAllTotal()
    this.getList2()
  },
  methods: {
    transferSpace(data) {
      for (const key in data) {
        if (data[key] === '') {
          data[key] = null
        }
      }
      return data
    },
    // 业务经理
    async getManage() {
      const res = await listBdPsndocAsRef({ pkPsntype: 6 })
      if (res.success) {
        this.managerList = res.object
      }
    },
    // 业务经理
    async getAllTotal() {
      const res = await saleApi.getTotal({ dr: 0 })
      if (res.success) {
        this.orderNum = res.object.orderNum
        this.saleNum = res.object.saleNum
      }
    },
    // 搜索条件变化
    paramsChange1() {
      this.getList1()
    },
    // 搜索条件变化
    paramsChange2() {
      this.getList2()
    },
    // 报价流程
    async getList1() {
      const res = await saleApi.getList(this.transferSpace(this.form1))
      if (res.success) {
        this.list1 = res.object
        this.total1 = res.total
      }
    },
    // 报价流程
    async getList2() {
      const res = await saleApi.getOrderList(this.transferSpace(this.form2))
      if (res.success) {
        this.list2 = res.object
        this.total2 = res.total
      }
    },
    // 关注和取消关注
    async follow(row, index, type) {
      const res = await updateProductOrderB({
        'pkProductOrderB': row.pkProductOrderB,
        'concerned': type // 关注状态 0 取消关注，1关注
      })
      if (res.success) {
        this.list1[index].concerned = type
      }
    },
    // 关注和取消关注
    async follow2(row, index, type) {
      const res = await updateProductOrderB({
        'pkProductOrderB': row.pkProductOrderB,
        'concerned': type // 关注状态 0 取消关注，1关注
      })
      if (res.success) {
        this.list2[index].concerned = type
      }
    },
    searchStatus(status) {
      if (status === 1) {
        // 进行中
        this.form1.billStateList = [0, 1, 2, 3, 4, 5]
        delete this.form1.billState
      } else {
        // 已完成
        this.form1.billState = 6
        delete this.form1.billStateList
      }
      this.getList1()
    },
    searchStatus2(status) {
      if (status === 1) {
        // 进行中
        this.form2.billStateList = [0, 1]
        delete this.form2.billState
      } else if (status === 2) {
        // 已完成
        this.form2.billState = 2
        delete this.form2.billStateList
      } else {
        delete this.form2.billState
        delete this.form2.billStateList
      }
      this.getList2()
    },
    showDrawer(row) {
      this.pkProductOrderB = row.pkProductOrderB
      this.drawer = true
    },
    clickTab(type) {
      this.tab = type
    },
    // 点击每页多少条
    handleSizeChange1(val) {
      this.form1.limit = val
      this.form1.page = 1
      this.getList1()
    },
    // 点击页数
    handleCurrentChange1(val) {
      this.form1.page = val
      this.getList1()
    },
    // 点击每页多少条
    handleSizeChange2(val) {
      this.form2.limit = val
      this.form2.page = 1
      this.getList2()
    },
    // 点击页数
    handleCurrentChange2(val) {
      this.form2.page = val
      this.getList2()
    }
  }
}
</script>

<style lang="scss" scoped>
.message-wrap{
  padding: 40px 20px;
  .tab{
    height: 210px;
    padding-top: 40px;
  }

  .list_table{
    margin-top: 20px;
  }

  .table_pagination {
    margin: 20px;
    margin-bottom: 40px;
    text-align: right;
  }
  .btn{
    height: 30px;
    width: 100%;
    background: #b1abab;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #FFFFFF;
    border-radius: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    &.active{
      background: #f2752e;
    }
  }

  .btn-empty{
    height: 30px;
    width: 100%;
    margin-bottom: 11px;
  }

  .status-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .num{
      font-size: 60px;
      margin-bottom: 10px;
    }
  }
}
</style>
