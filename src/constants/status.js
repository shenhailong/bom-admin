/*
 * @Author: 状态常量
 * @Date: 2021-09-13 10:45:22
 * @LastEditTime: 2021-09-21 23:53:31
 * @LastEditors: Dragon
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
    label: 'OEM'
  }, {
    value: 3,
    label: 'ODM'
  }, {
    value: 4,
    label: '物料'
  }
]

const PRODUCT_TYPE_OBJ = {
  0: '自由态',
  1: '加工',
  2: 'OEM',
  3: 'ODM',
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

// 工艺审核状态
const TECHNICS_AUDI_FREE = 0 // 自由态
const TECHNICS_AUDI_ALREADY = 20 // 已申请
const TECHNICS_AUDI_PENDING = 21 // 工艺审核中
const TECHNICS_AUDI_COMPLETE = 22 // 工艺审核完成

const TECHNICS_AUDIT_LIST = [
  {
    value: TECHNICS_AUDI_FREE,
    label: '自由态'
  }, {
    value: TECHNICS_AUDI_ALREADY,
    label: '已申请'
  }, {
    value: TECHNICS_AUDI_PENDING,
    label: '工艺审核中'
  }, {
    value: TECHNICS_AUDI_COMPLETE,
    label: '工艺审核完成'
  }
]

const TECHNICS_AUDIT_OBJ = {
  [TECHNICS_AUDI_FREE]: '自由态',
  [TECHNICS_AUDI_ALREADY]: '已申请',
  [TECHNICS_AUDI_PENDING]: '工艺审核中',
  [TECHNICS_AUDI_COMPLETE]: '工艺审核完成'
}

export { TECHNICS_AUDIT_LIST, TECHNICS_AUDIT_OBJ, TECHNICS_AUDI_FREE, TECHNICS_AUDI_ALREADY, TECHNICS_AUDI_PENDING, TECHNICS_AUDI_COMPLETE }

// 来源
const SOURCE_COMMON_NONE = '0' // 无
const SOURCE_COMMON_A = '1' // 甲方提供
const SOURCE_COMMON_B = '2' // 乙方提供

const SOURCE_COMMON_LIST = [
  {
    value: SOURCE_COMMON_NONE,
    label: '无'
  }, {
    value: SOURCE_COMMON_A,
    label: '甲方提供'
  }, {
    value: SOURCE_COMMON_B,
    label: '乙方提供'
  }
]

const SOURCE_COMMON_OBJ = {
  [SOURCE_COMMON_NONE]: '无',
  [SOURCE_COMMON_A]: '甲方提供',
  [SOURCE_COMMON_B]: '乙方提供'
}

export { SOURCE_COMMON_LIST, SOURCE_COMMON_OBJ }
