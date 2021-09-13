/*
 * @Author: 状态常量
 * @Date: 2021-09-13 10:45:22
 * @LastEditTime: 2021-09-13 11:00:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bom-admin/src/constants/status.js
 */

const PRODUCT_TYPE_LIST = [
  {
    value: 0,
    label: '自由态'
  }, {
    value: 1,
    label: '加工'
  }, {
    value: 2,
    label: 'oem'
  }, {
    value: 3,
    label: 'odm'
  }, {
    value: 4,
    label: '物料'
  }
]

const PRODUCT_TYPE_OBJ = {
  0: '自由态',
  1: '加工',
  2: 'oem',
  3: 'odm',
  4: '物料'
}

export { PRODUCT_TYPE_LIST, PRODUCT_TYPE_OBJ }

// 报价状态
const BILL_STATE_LIST = [
  {
    value: 0,
    label: '自由态'
  }, {
    value: 1,
    label: '报价流程进行中'
  }, {
    value: 2,
    label: '已认领'
  }, {
    value: 3,
    label: '采购报价完成'
  }, {
    value: 4,
    label: '工艺审核完成'
  }, {
    value: 5,
    label: '生产报价完成'
  }, {
    value: 6,
    label: '销售报价完成'
  }
]

const BILL_STATE_OBJ = {
  0: '自由态',
  1: '报价流程进行中',
  2: '已认领',
  3: '采购报价完成',
  4: '工艺审核完成',
  5: '生产报价完成',
  6: '销售报价完成'
}

export { BILL_STATE_LIST, BILL_STATE_OBJ }
