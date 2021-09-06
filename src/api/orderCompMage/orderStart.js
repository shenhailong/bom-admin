import request from '@/utils/request'

// 根据订单字表主键分页查询销售发起中的数据
export function selectAllOrderSaleStartAsPage(data) {
  return request({
      url: '/orderSaleStartController/selectAllOrderSaleStartAsPage',
      method: 'post',
      data
  })
}

// 插入销售发起数据-订单字表参数
export function insertOrderSaleStart(data) {
  return request({
      url: '/orderSaleStartController/insertOrderSaleStart',
      method: 'post',
      data
  })
}

// 根据主键集合删除销售发起数据
export function deleteOrderSaleStartByPks(data) {
  return request({
      url: '/orderSaleStartController/deleteOrderSaleStartByPks',
      method: 'post',
      data
  })
}

// 根据主键更新销售发起数据
export function updateOrderSaleStart(data) {
  return request({
      url: '/orderSaleStartController/updateOrderSaleStart',
      method: 'post',
      data
  })
}
//  添加评论内容
export function selectAllOrderSaleStartB(data) {
  return request({
      url: '/orderSaleStartController/selectAllOrderSaleStartB',
      method: 'post',
      data
  })
}

//  添加评论内容
export function insertOrderSaleStartB(data) {
  return request({
      url: '/orderSaleStartController/insertOrderSaleStartB',
      method: 'post',
      data
  })
}

// 评论置顶
export function updateOrderSaleStartB(data) {
  return request({
      url: '/orderSaleStartController/updateOrderSaleStartB',
      method: 'post',
      data
  })
}