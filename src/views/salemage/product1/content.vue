<template>
  <el-dialog :title="title" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="85%">
    <el-form :inline="true" ref="dataForm" :disabled="title=='查看'" :model="temp" :rules="rules" label-position="left" label-width="140px">
      <!--基本信息-->
      <el-tabs type="border-card">
        <el-tab-pane label="产品信息">
		  <el-form-item label="产品类别" prop="productType">
		     <el-select @change="productSelct" v-model="temp.productType" placeholder="请选择"  >
		       <el-option
		         v-for="item in technicsStateOprion1"
		         :key="item.value"
		         :label="item.label"
		         :value="item.value">
		       </el-option>
		     </el-select>
		   </el-form-item>
          <el-form-item label="单据状态" prop="technicsState">
            <el-select v-model="temp.technicsState" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in technicsStateOprion"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-tab-pane>
      </el-tabs>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sureDialog" v-if="title!='查看'">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { initReplaceUpdateData, initReplaceAddData, parseTime, randomNum, parseRefKeyInt } from '@/utils/viewCompUtil'
import { saveProductFile } from '@/api/salemage/product'
import { listCustomerAsRef, selectCustomdocDefaultPsn, selectAllCustomdocAsRef } from '@/api/customer/customer'
import { listBdPsndocAsRef } from '@/api/orgs/bdpsndoc'
import { downloadProductFile } from '@/api/pub/pub'

export default {
  name: 'Productcontent',
  props: ["replace", "title", "visiable", 'action', 'updateRow'],
  computed: {
    ...mapGetters([
      'listData', 'columns', 'name', 'userid'
    ])
  },
  data() {
    // 整数类型校验
    let checkNumberAsInt = (rule, value, callback) => {
      if (value || isNaN(value)) {
        let numVal = Number.parseInt(value)
        if (value && Number.isFinite(numVal)) {
          callback()
        } else {
          return callback(new Error('订单数量必须为数字类型'))
        }
      } else {
        callback()
      }
    }
    return {
      contentVisiable: false, // dialog 显示框
      temp: {
        pkProduct: undefined,
        dr: 0,
        ts: parseTime(new Date())
      },
      
      // 页面填写数据规则校验
      rules: {
        // 组装时间
        instalMin: [
          {validator: checkNumberAsInt, trigger: 'blur' }
        ],
        // 测试时间
        testMin: [
          {validator: checkNumberAsInt, trigger: 'blur' }
        ],
        // 老化时间
        agingMin: [
          {validator: checkNumberAsInt, trigger: 'blur' }
        ],
        // 三防面积
        defenseArea: [
          {validator: checkNumberAsInt, trigger: 'blur' }
        ],
        // 产品名称
        name: [
          {required: true, message: '产品名称不能为空', trigger: 'blur' },
        ]
      },
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
      // 修改事件
      if (this.title === '修改' && this.updateRow) {
        this.temp = this.updateRow
        this.temp.modifier = this.name
        this.initCustomdocDefaultPsn()
        if (this.updateRow.bomFilename) {
          let BOMFileName = { name: this.updateRow.bomFilename, fullName: this.updateRow.bomFilefullname }
          this.BOMFileList = [ BOMFileName ]
        }
        if (this.updateRow.pcbFilename) {
          let PCBFileName = { name: this.updateRow.pcbFilename, fullName: this.updateRow.pcbFilefullname }
          this.PCBFileList = [ PCBFileName ]
        }
        if (this.updateRow.craftFilename) {
          let CRAFTFileName = { name: this.updateRow.craftFilename, fullName: this.updateRow.craftFilefullname }
          this.GONGYIFileList = [ CRAFTFileName ]
        }
      }
      
    }
  },
  created() {
    // 初始客户信息参照
    listCustomerAsRef().then((response) => {
      this.customerOption = response.object
      parseRefKeyInt(this.customerOption)
    })
    // 初始人员信息参照
    let psndocRefParam = {pkPsntypeName: '销售人员'}
    listBdPsndocAsRef(psndocRefParam).then((response) => {
      this.psndocOption = response.object
      parseRefKeyInt(this.psndocOption)
    })
  },
  methods: {
    // PCB开关变化
    
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
    restTemp() { // 刷新本界面的数据
      this.temp = {
        pkProduct: undefined,
        modifierShow: this.name,
        modifiedtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date())
      }
    }
  }
}
</script>

<style  lang="scss" type="text/scss" scoped>
.el-select /deep/ .el-input__inner{
  width: 206px;
}
</style>
