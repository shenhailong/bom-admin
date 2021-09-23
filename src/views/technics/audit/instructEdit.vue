<template>
  <div class="content">
    <div class="title_wrap">
      <div class="title"><i class="el-icon-edit" /> {{ ruleForm.id ? '修改作业指导书' : '新增作业指导书' }}</div>
      <el-button :loading="submitting" type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </div>
    <el-form ref="ruleForm" :rules="rules" :inline="true" :model="ruleForm" label-width="180px" size="mini" class="demo-form-inline">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="工序名称" prop="process">
            <el-input v-model="ruleForm.process" maxlength="30" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="面别" prop="category">
            <el-input v-model="ruleForm.category" maxlength="30" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="作业人数(个)" prop="peopleNum">
            <el-input-number v-model="ruleForm.peopleNum" :min="1" label="请输入作业人数" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="版本" prop="versions">
            <el-input v-model="ruleForm.versions" maxlength="20" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="阶段标记" prop="phaseMarker">
            <el-input v-model="ruleForm.phaseMarker" maxlength="20" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工时" prop="manHour">
            <el-input-number v-model="ruleForm.manHour" :min="1" label="请输入工时" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="页码" prop="pageNum">
            <el-input v-model="ruleForm.pageNum" maxlength="20" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工序名称" prop="processType">
            <el-select v-model="ruleForm.processType" class="form-select">
              <el-option v-for="item in processTypeList" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工序名称" prop="name">
            <el-input v-model="ruleForm.name" maxlength="20" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="my_table">
        <div class="subtitle">物料明细</div>
        <el-table
          ref="table"
          :data="ruleForm.resultData"
          border
          empty-text="请新增"
        >
          <el-table-column type="index" width="50" align="center" />
          <el-table-column align="center" label="名称">
            <template slot-scope="scope">
              <el-form-item
                :prop="'resultData.' + scope.$index + '.pkOfMaterialCraft'"
                :rules="[{ required: true, message: '请选择物料名称', trigger: 'change' }]"
              >
                <el-select v-model="scope.row.pkOfMaterialCraft" placeholder="请选择物料名称" @change="nameChange(scope.$index)">
                  <el-option v-for="item in materialList" :key="item.pkOfMaterialCraft" :disabled="hasName(item.name)" :label="item.materielName" :value="item.pkOfMaterialCraft" />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="materielSpecifications" label="规格\型号" align="center"/>
          <el-table-column prop="num" label="数量" align="center"/>
          <el-table-column prop="bitNum" label="位号" align="center" width="150px"/>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-form-item>
                <el-popover
                  v-model="scope.row.visible"
                  placement="top"
                  width="160"
                >
                  <p style="text-align: center">确定删除吗？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" @click="scope.row.visible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="deleteData(scope.$index)">确定</el-button>
                  </div>
                  <el-button slot="reference" size="mini" type="danger">删除</el-button>
                </el-popover>
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
        <div class="create">
          <el-link :underline="false" type="primary" @click="addMaterial">
          <i class="el-icon-circle-plus-outline el-icon--right" /> 新增</el-link>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import {
  selectAllBillOfMaterialById
} from '@/api/sop/book' // sop接口
export default {
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
      processTypeList: ['DIP', '三防', '组装', '测试', '老化', 'SMT'],
      materialList: [], // 物料列表
      ruleForm: {
        process: null, // 工序名称,
        category: null, // 面别
        peopleNum: null, // 作业人数
        versions: null, // 版本
        phaseMarker: null, // 阶段标记
        manHour: null, // 工时
        pageNum: null, // 页码
        processType: 'DIP', // 工序类别
        resultData: []
      }, // form数据
      rules: {
        process: [{
          required: true, message: '请输入工序名称', trigger: 'blur'
        }],
        category: [{
          required: true, message: '请输入面别', trigger: 'blur'
        }],
        peopleNum: [
          { required: true, message: '请输入作业人数', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '仅支持输入大于0的整数', trigger: 'blur' }
        ],
        versions: [{
          required: true, message: '请输入面别', trigger: 'blur'
        }],
        phaseMarker: [{
          required: true, message: '请输入阶段标记', trigger: 'blur'
        }],
        manHour: [
          { required: true, message: '请输入工时', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '仅支持输入大于0的整数', trigger: 'blur' }
        ],
        pageNum: [{
          required: true, message: '请输入页码', trigger: 'blur'
        }],
        processType: [{
          required: true, message: '请选择工序类别', trigger: 'blur'
        }]
      },
      submitting: false
    }
  },
  created() {
    this.getMaterialList()
  },
  methods: {
    // 获取物料明细
    async getMaterialList() {
      const params = {
        pkProduct: this.editData.pkProduct,
        pkSopEdition: this.editData.pkSopEdition
      }
      console.log(params)
      const res = await selectAllBillOfMaterialById(params)
      if (res.success) {
        this.materialList = res.object || []
      }
    },
    // 新增物料
    addMaterial() {
      this.ruleForm.resultData.push({
        name: '',
        need: 'N'
      })
    },
    hasName(name) {
      const arr = []
      this.ruleForm.resultData.forEach(item => {
        if (item.name) {
          arr.push(item.name)
        }
      })
      if (arr.includes(name)) {
        return true
      }
      return false
    },
    // 提交数据
    submitForm(formName) {
      console.log()
      this.$refs[formName].validate((valid) => {
        if (valid) {

        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.content{
  padding: 30px;
  background: #FFFFFF;
  height: 100%;
  overflow-y: auto;
}
.create{
  text-align: center;
  color: blue;
  line-height: 50px;
  background: rgb(247, 244, 244);
}

.form-select{
  width: 159px;
}

.btn{
  margin: 0 auto;
  display: block;
  margin-top: 20px;
}

.title_wrap{
  display: flex;
  align-items: center;
  justify-content: space-between
}

.title{
  font-size: 20px;
  margin-bottom: 30px;
}

.subtitle{
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  font-weight: 700;
  width: 150px;
  padding-right: 12px;
  text-align: left;
}
.my_table{
  margin-bottom: 30px;
  .el-form-item{
    margin-top: 18px;
  }
}
</style>
