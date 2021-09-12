<!--
 * @Author: your name
 * @Date: 2021-09-10 23:12:15
 * @LastEditTime: 2021-09-11 12:37:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bom-admin/src/views/customer/info/timeLine.vue
-->
<template>
  <div class="time-line">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="item">
      <div class="icon"/>
      <div class="text">{{ item.content }}</div>
      <div class="time">{{ item.creationtime }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: [Array],
      default: function() {
        return []
      }
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.time-line{
  display: flex;
  // justify-content: center;
  // overflow-y: auto;
  flex-wrap: wrap;
  .item{
    text-align: center;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .icon{
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: #E4E7ED;
    margin: 0 auto;
    margin-bottom: 8px;
  }
  .text{
    font-size: 14px;
    color: #303133;
    width: 80px;
  }

  .time{
    color: #909399;
    line-height: 1;
    font-size: 13px;
    margin-top: 8px
  }

}
</style>
