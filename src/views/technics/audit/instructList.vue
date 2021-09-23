<!--
 * @page: 作业指导书-列表
 * @Author: Dragon
 * @Date: 2021-09-18 20:56:05
 * @LastEditors: Dragon
 * @LastEditTime: 2021-09-22 22:10:15
-->
<template>
  <div class="panel-page">
    <el-button v-if="editData.editionState === 0" size="medium" type="primary" @click="add">新增作业指导书</el-button>
    <el-table
      :header-cell-style="{
        background: '#EFF0FF',
        color: '#161616',
        'font-weight': 400,
      }"
      :data="tableList"
      border
      style="width: 100%; margin-top: 20px"
      max-height="650">
      <el-table-column prop="pageNum" label="页码" width="100"/>
      <el-table-column prop="productName" label="产品名称"/>
      <el-table-column prop="process" label="工序名称"/>
      <el-table-column prop="processType" label="工序类型" width="150"/>
      <el-table-column prop="sopState" label="图片" width="150">
        <template slot-scope="scope">
          <img
            :src="scope.row.sopImgUrl"
            alt=""
            style="width: 100%; height: 100px"
            @click="lookit(scope.row.sopImgUrl)">
        </template>
      </el-table-column>
      <el-table-column prop="creatorShow" label="工艺人" width="150"/>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button size="mini" @click="look(scope.row)"> 查看</el-button>
          <el-button v-if="editData.editionState === 0" type="primary" size="mini" @click="text_push(scope.row)"> 编辑</el-button>
          <el-button v-if="editData.editionState === 0" type="danger" size="mini" @click="text_dlete(scope.row)"> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <InstructionDetail :visible.sync="visible"/>
  </div>
</template>

<script>
import {
  saveSopEdition,
  selectSopParameterBySopEditionId,
  selectAllBillOfMaterialById
} from '@/api/sop/book' // sop接口
import InstructionDetail from './instructDetail.vue'
export default {
  components: {
    InstructionDetail
  },
  props: {
    editData: {
      type: [Object],
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      tableList: [],
      materialList: [], // 物料明细
      submitting: false,
      isEdit: false,
      showDialog: false,
      pkSopEdition: null, // sop版本号主键
      visible: false
    }
  },
  mounted() {
    this.getList()
    console.log(this.editData)
  },
  methods: {
    // 获取物料明细
    async getMaterialList() {
      const params = {
        pkProduct: this.editData.pkProduct,
        pkSopEdition: this.editData.pkSopEdition
      }
      const res = await selectAllBillOfMaterialById(params)
      if (res.success) {
        this.materialList = res.object || []
      }
    },
    // 查询列表数据
    async getList() {
      const params = { pkSopEdition: this.editData.pkSopEdition }
      const res = await selectSopParameterBySopEditionId(params)
      if (res.success) {
        this.tableList = res.object
      }
    },
    // 新增\编辑作业指导书
    add(row) {
      console.log(row)
      this.$emit('addTab', {
        name: `instructEdit${row.pkProduct}`,
        title: `作业指导书版本列表-${row.name}`,
        content: 'instructEdit',
        editData: {
          pkProduct: this.editData.pkProduct,
          pkSopEdition: this.editData.pkSopEdition,
          editionState: row.editionState // 状态，只有自由态才可新增编辑
        }
      })
    },
    // 查看
    look() {
      this.visible = true
    },
    // 修改版本号
    edit(row) {
      this.isEdit = true
      this.showDialog = true
      this.ruleForm.editionNum = row.editionNum
      this.pkSopEdition = row.pkSopEdition
    },
    // 复制
    copy(row) {
      const params = { pkSopEdition: row.pkSopEdition }
      this.$confirm('是否复制?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // const res = await copySopEdition(params)
        // if (res.success) {
        //   this.$message({
        //     message: '复制成功',
        //     type: 'success'
        //   })
        //   this.getList()
        // }
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-page{
  height: 100%;
}
</style>
