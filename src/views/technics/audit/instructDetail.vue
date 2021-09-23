<!--
 * @page: 组件-作业指导书
 * @Author: Dragon
 * @Date: 2021-07-05 13:43:00
 * @LastEditors: Dragon
 * @LastEditTime: 2021-09-22 16:05:10
-->
<template>
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
            <span class="value">电路板</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="form-item">产品编码：
            <span class="value">电路板</span>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="form-item">制程：
            <span class="value">电路板</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="form-item">制作部门：
            <span class="value">电路板</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="form-item border-right-none">执行部门：
            <span class="value">电路板</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <div class="form-item">工序名称：
            <span class="value">电路板</span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="form-item">面别：
            <span class="value">电路板</span>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="form-item">作业人数：
            <span class="value">电路板</span>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="form-item">工时：
            <span class="value">电路板</span>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="form-item">版本：
            <span class="value">电路板</span>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="form-item">阶段标记：
            <span class="value">电路板</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="form-item">生效日期：
          <span class="value">2010-10-1</span>2</div>
        </el-col>
        <el-col :span="2">
          <div class="form-item border-right-none">页码：
            <span class="value">电路板</span>
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
      <el-row>
        <el-col :span="6">
          <div class="form-item center">
            <span class="value">电路板</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="form-item center">
            <span class="value">电路板</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="form-item center">
            <span class="value">电路板</span>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="form-item center border-right-none">
            <span class="value">电路板</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div class="form-item center">样图</div>
          <div class="img-wrap">
            <img class="img" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhimg2.huanqiu.com%2Fattachment2010%2F2014%2F0219%2F20140219024324755.jpg&refer=http%3A%2F%2Fhimg2.huanqiu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633584860&t=756ec4da70e9cc24206c224344de7d3d">
          </div>
        </el-col>
        <el-col :span="12">
          <div class="explain one">
            <div class="tip">使用工具：</div>
            <div class="value">使用工具</div>
          </div>
          <div class="explain two">
            <div class="tip">操作步骤：</div>
            <div class="value">使用工具</div>
          </div>
          <div class="explain three border-bottom-none">
            <div class="tip">注意事项说明：</div>
            <div class="value">使用工具</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {

  },
  methods: {
    closeDialog() {
      console.log(111)
      this.$emit('update:visible', false)
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
