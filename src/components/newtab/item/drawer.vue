<!--
 * @Author: your name
 * @Date: 2021-09-07 11:02:22
 * @LastEditTime: 2021-09-15 16:43:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bom-admin/src/views/customer/info/record.vue
-->
<template>
  <el-drawer
    :visible.sync="drawers"
    :before-close="handleClose"
    :with-header="false"
    size="1000px"
  >
    <div class="record-wrap" >
      <el-card header="进度信息" class="card">
        <!-- <el-timeline>
        <el-timeline-item
          v-for="(item, index) in progressList"
          :key="index"
          :timestamp="item.creationtime"
          icon="el-icon-more"
        >
          {{ item.content }}
        </el-timeline-item>
      </el-timeline> -->
        <TimeLine :list="progressList" />
      </el-card>

      <el-card header="订单信息" class="card">
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="form-item">
              <div class="label">合同编号</div>
              <div class="value">{{ detail.contractNo }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-item">
              <div class="label">报价单号</div>
              <div class="value">{{ detail.contractNo }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-item">
              <div class="label">客户编号</div>
              <div class="value">{{ detail.customerCode }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-item">
              <div class="label">产品型号</div>
              <div class="value">{{ detail.model }}</div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="6">
            <div class="form-item">
              <div class="label">签订日期</div>
              <div class="value">{{ detail.orderSignTime }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-item">
              <div class="label">产品编号</div>
              <div class="value">{{ detail.productCode }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-item">
              <div class="label">订单类型</div>
              <div class="value">{{ detail.productType }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-item">
              <div class="label">订单业务</div>
              <div class="value">{{ detail.contractNo }}</div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="6">
            <div class="form-item">
              <div class="label">交货日期</div>
              <div class="value">{{ detail.scheduledtime }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-item">
              <div class="label">产品名称</div>
              <div class="value">{{ detail.productName }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-item">
              <div class="label">订单数量</div>
              <div class="value">{{ detail.productNum }}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="form-item">
              <div class="label">超期时间</div>
              <div :class="computeData(detail.scheduledtime) > 0 ? 'red' :'green'" class="num">
                {{ computeData(detail.scheduledtime) }}
              </div>
            </div>
          </el-col>
        </el-row>

      </el-card>

      <el-card header="沟通记录" class="card">
        <div class="list">
          <div v-for="item in messageList" :key="item.pkOrderSaleStartB" class="item">

            <div class="header">
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="user">
              <div class="title">
                <span class="name">{{ item.chargePsnShow }}</span>
                {{ item.creationtime }}
              </div>
            </div>
            <div class="body">
              <div class="subtitle">{{ item.content }}</div>
              <div class="img-list">
                <!-- <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhimg2.huanqiu.com%2Fattachment2010%2F2014%2F0219%2F20140219024324755.jpg&refer=http%3A%2F%2Fhimg2.huanqiu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633584860&t=756ec4da70e9cc24206c224344de7d3d" class="img">
              <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhimg2.huanqiu.com%2Fattachment2010%2F2014%2F0219%2F20140219024324755.jpg&refer=http%3A%2F%2Fhimg2.huanqiu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633584860&t=756ec4da70e9cc24206c224344de7d3d" class="img"> -->
              </div>
              <div class="footer">
                <div v-if="item.sort === 0" class="top" @click="goTop(item.pkOrderSaleStartB , 1)">
                  置顶
                </div>
                <div v-if="item.sort === 1" class="top" @click="goTop(item.pkOrderSaleStartB, 0)">
                  <i class="el-icon-s-flag"/> 取消置顶
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="comment_wrap">
          <el-input v-model.trim="content" placeholder="请输入内容" class="input-with-select"/>
          <el-button :disabled="content === ''" type="primary" @click="publish">发布</el-button>
          <el-button type="primary">上传图片<i class="el-icon-upload el-icon--right"/></el-button>
        </div>
      </el-card>
    </div>
  </el-drawer>
</template>

<script>
import {
  insertOrderSaleStartB,
  selectAllOrderSaleStartB,
  updateOrderSaleStartB
} from '@/api/orderCompMage/orderStart'
import { getDateDiff } from '@/utils/viewCompUtil'
import TimeLine from '@/components/timeLine'
export default {
  components: {
    TimeLine
  },
  props: {
    quto: {
      type: [String, Number, Array],
      default: ''
    },
    drawer: {
      type: [Boolean],
      default: false
    }
  },
  data() {
    return {
      drawers: false,
      detail: {}, // 详情数据
      progressList: [], // 进度信息
      messageList: [], // 沟通信息
      content: '', //
      list: ['销售报价', '采购报价', '生产报价', '报价完成', '销售发起', '工艺审核', '库房备料', '生产计划', '物料采购', '来料质检', '物料入库', 'SMT生产', 'DIP生产', '三防生产', '老化测试', '成品质检', '成品入库', '成品出库']
    }
  },
  watch: {
    drawer() {
      console.log(this.drawer)
      this.drawers = this.drawer
    },
    quto() {
      this.pkProductOrderB = this.quto
      if (this.quto) {
        this.getDetail()
      }
    }
  },
  mounted() {
    if (this.quto) {
      // this.getDetail()
    }
  },
  methods: {
    getDetail() {
      selectAllOrderSaleStartB({
        pkProductOrderB: this.quto
      }).then(res => {
        if (res.success) {
          this.detail = res.object
          const list = res.object.omgOrderSaleStartBPoList || []
          const arr = []
          const process = list.filter(item => item.msgType === 2)
          this.messageList = list.filter(item => item.msgType === 1)
          this.list.forEach(items => {
            arr.push({
              content: items,
              creationtime: ''
            })
          })
          arr.forEach(items => {
            process.forEach(item => {
              if (item.content === items) {
                items.creationtime = item.creationtime
                arr.push({
                  content: items,
                  creationtime: ''
                })
              } else {
                items.creationtime = ''
              }
            })
          })
          this.progressList = arr
        }
      })
    },
    computeData(value) {
      if (value) {
        const date = new Date()
        const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        return getDateDiff(value, today, 'day')
      }
    },
    // 置顶
    async goTop(pkOrderSaleStartB, sort) {
      const res = await updateOrderSaleStartB({
        pkOrderSaleStartB,
        sort
      })
      if (res.success) {
        this.getDetail()
      }
    },
    // 发送留言
    publish() {
      const param = {
        pkProductOrderB: this.quto,
        content: this.content,
        msgType: 1
      }
      insertOrderSaleStartB(param).then((res) => {
        if (res.success) {
          this.getDetail()
        }
      })
    },
    handleClose(done) {
      this.$emit('closer')
    }
  }
}
</script>

<style lang="scss" scoped>
.record-wrap{

  .form-item{
    display: flex;
    margin-bottom: 20px;
    .label{
      color: #999999;
      font-size: 14px;
      margin-right: 10px;
      width: 80px;
    }
    .value{
      color: #606266;
      font-size: 16px;
    }
  }

  .my-lable{
    color: #999999;
  }

  .green{
    color: #67c23a,
  }
  .red{
    color: #f56c6c;
  }
  padding: 10px 20px;
  padding-bottom: 80px;
  overflow-y: auto;
  .card{
    margin-bottom: 20px;
  }

  .item{
    margin-bottom: 20px;
    border-bottom: 1px solid #F2F3F7;
    .header{
      display: flex;
      align-items: center;
      .user{
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .title{
        color: #333333;
        font-size: 16px;
      }
      .name{
        color: #409EFF;
        margin-right: 10px;
      }
    }

    .body{
      margin: 10px 0;
      padding-left: 70px;
      .subtitle{
        color: #999999;
        font-size: 14px;
        margin-bottom: 10px;
      }

      .img{
        height: 100px;
        width: 200px;
        margin-right: 20px;
      }
    }

    .footer{
      display: flex;
      justify-content: flex-end;
      color: #409EFF;
      font-size: 16px;
      cursor: pointer;
    }
  }

  .comment_wrap{
    background: #FFFFFF;
    padding: 20px 20px 40px 20px;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
