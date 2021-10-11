<!--
 * @page: 作业指导书-列表
 * @Author: Dragon
 * @Date: 2021-09-18 20:56:05
 * @LastEditors: Dragon
 * @LastEditTime: 2021-10-11 13:30:14
-->
<template>
  <div class="panel-page">
    <el-button v-if="editData.editionState === 0" size="medium" type="primary" @click="addInstruct">新增作业指导书</el-button>
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
            @click="showImg(scope.row.sopImgUrl)">
        </template>
      </el-table-column>
      <el-table-column prop="creatorShow" label="工艺人" width="150"/>
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button size="mini" @click="look(scope.row)"> 查看</el-button>
          <el-button v-if="editData.editionState === 0" type="primary" size="mini" @click="editInstruct(scope.row)"> 编辑</el-button>
          <el-button v-if="editData.editionState === 0" type="danger" size="mini" @click="deleteInstruct(scope.row)"> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <InstructionDetail v-if="detail.pkSopParameter !== undefined" :detail="detail" :visible.sync="visible"/>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import {
  selectSopParameterBySopEditionId,
  delSopParameterById
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
      submitting: false,
      isEdit: false,
      showDialog: false,
      pkSopEdition: null, // sop版本号主键
      visible: false,
      detail: {
        billOfMaterialCraftPos: []
      },
      dialogVisible: false,
      dialogImageUrl: '' // 预览图片地址
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 查询列表数据
    async getList() {
      const params = { pkSopEdition: this.editData.pkSopEdition }
      const res = await selectSopParameterBySopEditionId(params)
      if (res.success) {
        this.tableList = res.object
      }
    },
    // 新增作业指导书
    addInstruct() {
      this.$emit('addTab', {
        name: `instructEdit-new`,
        title: `新增作业指导书`,
        content: 'instructEdit',
        editData: {
          tabName: this.editData.tabName,
          pkProduct: this.editData.pkProduct,
          pkSopEdition: this.editData.pkSopEdition
        }
      })
    },
    // 编辑作业指导书
    editInstruct(row) {
      this.$emit('addTab', {
        name: `instructEdit${row.pkProduct}`,
        title: `编辑作业指导书-${row.pkSopParameter}`,
        content: 'instructEdit',
        editData: {
          row,
          tabName: `instructEdit${row.pkProduct}`,
          pkProduct: this.editData.pkProduct,
          pkSopEdition: this.editData.pkSopEdition
        }
      })
    },
    // 查看
    look(row) {
      this.detail = row
      this.visible = true
    },
    showImg(url) {
      this.dialogVisible = true
      this.dialogImageUrl = url
    },
    deleteInstruct(item) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const jsons = { pkSopParameter: item.pkSopParameter }
        delSopParameterById(jsons).then((res) => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getList()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-page{
  height: 100%;
}
</style>
