<!--
 * @page: 组件-作业指导书
 * @Author: Dragon
 * @Date: 2021-07-05 13:43:00
 * @LastEditors: Dragon
 * @LastEditTime: 2021-10-11 13:52:14
-->
<template>
  <div>
    <el-dialog
      :close-on-press-escape="false"
      :visible="visible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      title="作业指导书"
      append-to-body
      width="95%"
      top="20px"
      fullscreen
      center
      @close="closeDialog"
    >
      <div class="instruction-detail-wrap">
        <el-row>
          <el-col :span="6">
            <div class="form-item">产品名称：
              <span class="value">{{ detail.productName }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-item">产品编码：
              <span class="value">{{ detail.productCode }}</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="form-item">制程：
              <span class="value">{{ SEAL_TECHNICS_OBJ[detail.sealTechnics] }}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="form-item">制作部门：
              <span class="value">工艺部门</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-item border-right-none">执行部门：
              <span class="value">生产部门</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="form-item">工序名称：
              <span class="value">{{ detail.process }}</span>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="form-item">面别：
              <span class="value">{{ detail.category }}</span>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="form-item">作业人数：
              <span class="value">{{ detail.peopleNum }}</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="form-item">工时：
              <span class="value">{{ detail.manHour }}小时</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="form-item">版本：
              <span class="value">{{ detail.versions }}</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="form-item">阶段标记：
              <span class="value">{{ detail.phaseMarker }}</span>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="form-item">生效日期：
            <span class="value">&nbsp;</span></div>
          </el-col>
          <el-col :span="2">
            <div class="form-item border-right-none">页码：
              <span class="value">{{ detail.pageNum }}</span>
            </div>
          </el-col>
        </el-row>
        <div class="title">物料明细</div>
        <el-row>
          <el-col :span="6">
            <div class="form-item center">名称</div>
          </el-col>
          <el-col :span="6">
            <div class="form-item center">规格\型号</div>
          </el-col>
          <el-col :span="6">
            <div class="form-item center">数量</div>
          </el-col>
          <el-col :span="6">
            <div class="form-item center border-right-none">位号</div>
          </el-col>
        </el-row>
        <el-row v-for="item in detail.billOfMaterialCraftPos" :key="item.pkOfMaterialCraft">
          <el-col :span="6">
            <div class="form-item center">
              <span class="value">{{ item.materielName }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-item center">
              <span class="value">{{ item.materielSpecifications }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-item center">
              <span class="value">{{ item.num }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-item center border-right-none">
              <span class="value">{{ item.bitNum }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div class="form-item center">样图</div>
            <div class="img-wrap">
              <img :src="detail.sopImgUrl" class="img" @click="showImg(detail.sopImgUrl)">
            </div>
          </el-col>
          <el-col :span="12">
            <div class="explain one">
              <div class="tip">使用工具：</div>
              <div class="value">{{ detail.tool }}</div>
            </div>
            <div class="explain two">
              <div class="tip">操作步骤：</div>
              <div class="value">{{ detail.operation }}</div>
            </div>
            <div class="explain three border-bottom-none">
              <div class="tip">注意事项说明：</div>
              <div class="value">{{ detail.explains }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" width="100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { SEAL_TECHNICS_OBJ } from '@/constants/status'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detail: {
      type: [Object],
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      SEAL_TECHNICS_OBJ,
      dialogVisible: false,
      dialogImageUrl: '' // 预览图片地址
    }
  },
  mounted() {
    console.log(this.detail)
  },
  methods: {
    closeDialog() {
      this.$emit('update:visible', false)
    },
    showImg(url) {
      this.dialogVisible = true
      this.dialogImageUrl = url
    }
  }
}
</script>

<style lang="scss" scoped>
  .instruction-detail-wrap{
    border: 1px solid #333333;
    .border-right-none{
      border-right: none!important;
    }
    .border-bottom-none{
      border-bottom: none!important;
    }
    .form-item{
      font-size: 14px;
      line-height: 40px;
      height: 40px;
      padding-left: 10px;
      color: #606266;
      border-bottom: 1px solid #333333;
      border-right: 1px solid #333333;
      &.center{
        text-align: center;
      }
      .value{
        font-weight: 500;
      }
    }

    .title{
      font-size: 14px;
      line-height: 40px;
      text-align: center;
      border-bottom: 1px solid #333333;
    }

    .img-wrap{
      height: 560px;
      border-right: 1px solid #333333;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .img{
      width: 100%;
      max-height: 560px;
    }

    .explain{
      border-bottom: 1px solid #333333;
      font-size: 14px;
      line-height: 20px;
      padding-left: 10px;
      .tip{
        line-height: 40px;
        font-weight: 700;
      }
      &.one{
        height: 80px;
      }
      &.two{
        height: 200px;
      }
      &.three{
        height: 320px;
      }
    }
  }
</style>
