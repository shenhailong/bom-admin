<!--
 * @page: 页面-
 * @Author: Dragon
 * @Date: 2021-09-17 15:19:04
 * @LastEditors: Dragon
 * @LastEditTime: 2021-09-30 17:30:50
-->
<template>
  <my-tabs ref="tab" :tab-list="tabList" :tab-name="tabName" @closeAllTab="myTabCloseAll" @cutTabs="myTabsSwitch">
    <component
      v-for="item in tabList"
      :is="item.content"
      :slot="item.name"
      :key="item.name"
      :name="item.name"
      :edit-data="item.editData"
      :ref="item.name"
      @goBack="myTabsBack"
      @cutTabs="myTabsSwitch"
      @addTab="myTabsAdd"
      @removeTab="myTabsRemove"
      @reload="myTabsReload"/>
  </my-tabs>
</template>
<script>
import MyTabs from '@/components/MyTabs'
import MyTabsMixin from '@/mixins/MyTabs'
export default {
  name: 'TechnicsAudit',
  components: {
    MyTabs,
    List: resolve => require(['./list.vue'], resolve),
    VersionList: resolve => require(['./versionList.vue'], resolve),
    InstructList: resolve => require(['./instructList.vue'], resolve),
    InstructEdit: resolve => require(['./instructEdit.vue'], resolve)
  },
  mixins: [MyTabsMixin],
  data() {
    return {
      tabName: 'List', // 当前显示的tab
      tabList: [
        {
          title: '产品工艺审核列表', // tab的标题
          name: 'List', // tab的身份标识必须唯一
          content: 'List' // tab对应的组件
        }
      ],
      initList: [
        {
          title: '产品工艺审核列表', // tab的标题
          name: 'List', // tab的身份标识必须唯一
          content: 'List' // tab对应的组件
        }
      ]
    }
  }
}
</script>
