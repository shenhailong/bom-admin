/*
 * @Author: your name
 * @Date: 2021-09-08 14:07:07
 * @LastEditTime: 2021-09-10 17:19:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bom-admin/src/api/salemage/salequote.js
 */
import request from '@/utils/request'

// 分页查询所有销售报价信息
export function listSaleQuote(data) {
  return request({
    url: '/sale/selectAllSaleQuoteAsPage',
    method: 'post',
    data
  })
}

// 根据产品信息查询历史报价数据
export function selectSaleQuoteHistoryByPkProduct(data) {
  return request({
    url: '/sale/selectSaleQuoteHistoryByPkProduct',
    method: 'post',
    data
  })
}

// 新增销售报价信息
export function addSaleQuote(data) {
  return request({
    url: '/sale/insertSaleQuote',
    method: 'post',
    data
  })
}

// 根据主键集合删除销售报价信息
export function deleteSaleQuoteByPks(data) {
  return request({
    url: '/sale/deleteSaleQuoteByPks',
    method: 'post',
    data
  })
}

// 更新销售报价信息
export function updateSaleQuotes(data) {
  return request({
    url: '/sale/updateSaleQuote',
    method: 'post',
    data
  })
}

// 保存销售物料报价文件
export function saveMatterFile(data) {
  return request({
    url: '/sale/saveMatterFile',
    method: 'post',
    data,
    timeout: 50000
  })
}

// 完成销售报价
export function overProccessSaleQupte(data) {
  return request({
    url: '/quoteprocess/overProccessSaleQupte',
    method: 'post',
    data
  })
}

// 销售控制重新报价
export function startRequoteProccess(data) {
  return request({
    url: '/requoteprocess/startRequoteProccess',
    method: 'post',
    data
  })
}

// 新分页查询所有销售报价信息
export function getList(data) {
  return request({
    url: '/MsgUserCorrelationController/selectAllSaleProductAsPage',
    method: 'post',
    data
  })
}

// 新分页查询所有销售报价信息
export function getTotal(data) {
  return request({
    url: '/MsgUserCorrelationController/selectAllProductInfoNum',
    method: 'post',
    data
  })
}

// 新分页查询所有销售报价信息
export function getOrderList(data) {
  return request({
    url: '/MsgUserCorrelationController/selectAllProductOrderAsPage',
    method: 'post',
    data
  })
}
