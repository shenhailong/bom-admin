<!--
 * @page: 作业指导书-版本列表
 * @Author: Dragon
 * @Date: 2021-09-18 20:56:05
 * @LastEditors: Dragon
 * @LastEditTime: 2021-10-11 13:19:50
-->
<template>
  <div class="panel-page">
    <el-button size="medium" type="primary" @click="addVersion">添加版本</el-button>
    <el-table
      :header-cell-style="{
        background: '#EFF0FF',
        color: '#161616',
        'font-weight': 400,
      }"
      :data="tableList"
      border
      style="width: 100%; margin-top: 20px"
      max-height="450">
      <el-table-column prop="" fixed type="index" label="序号" width="120"/>
      <el-table-column prop="editionNum" label="版本号" width="120"/>
      <el-table-column prop="creatorShow" label="创建人"/>
      <el-table-column prop="isDefault" label="是否默认">
        <template slot-scope="scope">
          {{ scope.row.isDefault === 0 ? '否': '是' }}
        </template>
      </el-table-column>
      <el-table-column prop="editionState" label="审核状态">
        <template slot-scope="scope">
          {{ VERSION_STATUS_OBJ[scope.row.editionState] }}
        </template>
      </el-table-column>
      <el-table-column prop="creationtime" label="创建日期" width="200"/>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button v-if="scope.row.editionState == 2" type="warning" size="mini" @click="setDefault(scope.row)">
            {{ scope.row.isDefault == '0' ? '默认' : '取消' }}
          </el-button>
          <el-button size="mini" @click="look(scope.row)">指导书</el-button>
          <el-button v-if="scope.row.editionState == 0" type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button type="info" size="mini" @click="copy(scope.row)">复制</el-button>
          <el-button v-if="scope.row.editionState == 0" type="primary" size="mini" @click="openDing(scope.row)">钉钉</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="isEdit ? '修改版本号' : '新增版本号'"
      :close-on-press-escape="false"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :before-close="beforeClose"
      width="350px"
      @close="closeDialog"
    >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
        <el-form-item label="版本号" prop="editionNum">
          <el-input v-model.trim="ruleForm.editionNum" maxlength="30" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="submitting" size="small" type="primary" @click="submitForm('ruleForm')">确认</el-button>
          <el-button :loading="submitting" size="small" @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <CommitDialog
      :visiable="commitDialogData.visiable"
      :param-data="commitDialogData.paramData"
      @close="closeCommitDialog"
      @commitMethod="dingSubmit"/>
  </div>
</template>

<script>
import {
  saveSopEdition,
  copySopEdition,
  defaultSopEdition,
  selectSopEditionByPkProduct
} from '@/api/sop/book' // sop接口
import { sendDingMsgByPsndoc } from '@/api/pub/pub' // 调用钉钉后端API接口
import CommitDialog from '@/components/Commitdingding/CommitDialog'// 钉钉
import { VERSION_STATUS_OBJ } from '@/constants/status'
export default {
  components: {
    CommitDialog
  },
  props: {
    editData: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      VERSION_STATUS_OBJ,
      tableList: [],
      submitting: false,
      isEdit: false,
      showDialog: false,
      pkSopEdition: null, // sop版本号主键
      ruleForm: {
        editionNum: ''
      },
      rules: {
        editionNum: [{ required: true, message: '请输入版本号', trigger: 'blur' }]
      },
      commitDialogData: {
        visiable: false, // 钉钉Dialog
        paramData: null
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 查询列表数据
    async getList() {
      const params = { pkProduct: this.editData }
      const res = await selectSopEditionByPkProduct(params)
      if (res.success) {
        this.tableList = res.object
      }
    },
    // 添加版本
    addVersion() {
      this.showDialog = true
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
        const res = await copySopEdition(params)
        if (res.success) {
          this.$message({
            message: '复制成功',
            type: 'success'
          })
          this.getList()
        }
      }).catch(() => {})
    },
    // 作业指导书
    look(row) {
      this.$emit('addTab', {
        name: `instructList${row.pkProduct}`,
        title: `指导书列表-${row.productName}-${row.editionNum}(版本)`,
        content: 'instructList',
        editData: {
          tabName: `instructList${row.pkProduct}`,
          pkProduct: row.pkProduct,
          pkSopEdition: row.pkSopEdition,
          editionState: row.editionState // 状态，只有自由态才可新增编辑
        }
      })
    },
    // 打开钉钉
    openDing(row) {
      this.commitDialogData.visiable = true
      this.pkSopEdition = row.pkSopEdition
    },
    closeCommitDialog() {
      this.commitDialogData.visiable = false
    },
    // 钉钉通知
    dingSubmit(sendMsgParam) {
      const jsons = {
        pkSopEdition: this.pkSopEdition,
        editionState: 1
      }
      // 调用钉钉接口
      sendDingMsgByPsndoc(sendMsgParam).then((response) => {
        // 钉钉接口的毁掉
        if (response && response.data.success) {
          // 调用接口后处理
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          saveSopEdition(jsons).then((res) => {
            this.getList()
          })
        } else {
          this.$message.error('调用钉钉接口失败')
        }
      })
    },
    // 设置为默认
    setDefault(row) {
      console.log(row)
      const data = {
        pkProduct: this.editData,
        pkSopEdition: row.pkSopEdition,
        isDefault: row.isDefault === '0' ? '1' : '0'
      }
      defaultSopEdition(data).then((res) => {
        this.getList()
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitting = true
          const params = {
            pkProduct: this.editData,
            editionNum: this.ruleForm.editionNum,
            pkSopEdition: this.pkSopEdition
          }
          saveSopEdition(params).then((res) => {
            if (res.success) {
              this.closeDialog()
              this.getList()
            } else {
              this.submitting = false
            }
          })
        }
      })
    },
    // 关闭弹窗
    closeDialog() {
      this.isEdit = false
      this.ruleForm = { editionNum: '' }
      this.pkSopEdition = null
      this.showDialog = false
      this.submitting = false
      this.$refs.ruleForm.resetFields()
    },
    beforeClose(done) {
      if (!this.submitting) {
        done()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-page{
  height: 100%;
}
</style>
