<template>
  <div>
    <el-table :data="listViewData" border fit:row-style="{height:'2px'}" :cell-style="{padding:'3px 0'}">
      <!--<el-table-column prop="mac" label="设备 ID" width="160"></el-table-column>
      <el-table-column prop="userId" label="角色 ID" width="80"></el-table-column>
      <el-table-column prop="checkTime" label="刷脸时间" width="100"></el-table-column>
      <el-table-column prop="name" label="人员名称" width="100"></el-table-column>
      <el-table-column prop="type" label="身份类型" width="80"></el-table-column>
      <el-table-column prop="cardNo" label="卡号" width="160"></el-table-column>
      <el-table-column prop="idCardNo" label="身份证号码" width="160"></el-table-column>
      <el-table-column prop="temperature" label="人体温度" width="100"></el-table-column>
      <el-table-column prop="mask" label="是否佩戴口罩" width="120"></el-table-column>
      <el-table-column prop="checkPic" label="抓拍图片" width="100"></el-table-column>
      <el-table-column prop="extra" label="其他信息"></el-table-column>-->

      <el-table-column prop="name" label="人员名称" width="100"></el-table-column>
      <el-table-column prop="type" label="身份类型" width="120"
        :formatter="(row, column) => {
          if (row.type == 1) { return '访客' }
          if (row.type == 2) { return '黑名单' }
          if (row.type == 3) { return '员工' }
         }"></el-table-column>
      <el-table-column prop="idCardNum" label="人员ID" width="160"
        :formatter="(row, column) => {
          if (row.type == -1) { return '陌生人' }
         }"></el-table-column>
      <el-table-column prop="tempratrue" label="人体温度" width="100"></el-table-column>
      <el-table-column prop="mask" label="是否佩戴口罩" width="120"
        :formatter="(row, column) => {
          if (row.mask == 1) { return '佩戴' }
          if (row.mask == 0) { return '未佩戴' }
          if (row.mask == -1) { return '无' }
         }"></el-table-column>
      <el-table-column prop="cardInfo" label="卡号" width="250"></el-table-column>
      <el-table-column prop="imageName" label="抓拍图片" width="400">
        
      </el-table-column>
      <!-- <el-image :src="scope.row.img" class="img"></el-image> -->
      <el-table-column prop="currentTime" label="刷脸时间" width="300"></el-table-column>
      <el-table-column prop="birthDate" label="其他信息"></el-table-column>
    </el-table>

    <pagination 
      v-show="total > 0" 
      :total="total" 
      :page.sync="listQuery.page" 
      :limit.sync="listQuery.limit" 
      @pagination="initViewListData" />
  </div>
</template>

<script>
import { selectAllMipsGateRecordAsPage } from '@/api/mipsinfo/gateRecord'
import Pagination from '@/components/Pagination'

export default {
  name: 'MipsGateRecordListPageView',
  components: { Pagination },
  data() {
    return {
      listViewData: [], // 界面列表数据
      total: 0, // 数据量
      listQuery: {
        page: 1,
        limit: 20,
      },

      timer: null
    }
  },
  created() {
    this.initViewListData()

    this.timer = setInterval(this.initViewListData, 100000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    // 查询界面列表数据
    initViewListData() {
      this.listViewData = []
      this.total = 0

      let queryParam = {
        dr: 0
      }
      selectAllMipsGateRecordAsPage(queryParam).then((response) => {
        if (response && response.data.success && response.data.object) {
          this.listViewData = response.data.object
          this.total = response.data.total
        }
      })
    }
  }
}
</script>

<style>

</style>
