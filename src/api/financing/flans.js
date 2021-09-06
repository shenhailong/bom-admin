import request from '@/utils/request';
// 财务
export function selectAllIfinancialInfoAsPage(data) {
  return request({
    url: '/financialInfoCintroller/selectAllIfinancialInfoAsPage',
    method: 'post',
    data
  })
}
//预存金额的保存
export function saveFinancePaymen(data) {
  return request({
    url: '/FaFinancePaymentController/saveFinancePayment',
    method: 'post',
    data
  })
}
//预存金额的文件
export function saveFinancePaymentFile(data) {
  return request({
    url: '/FaFinancePaymentController/saveFinancePaymentFile',
    method: 'post',
    data
  })
}
// 产品报表
export function selectAllBdCustomFaFinanceAsPage(data) {
  return request({
    url: '/FaFinancePaymentController/selectAllBdCustomFaFinanceAsPage',
    method: 'post',
    data
  })
}

//  账单查询  
export function selectAllOrderByPkCustomAsPage(data) {
  return request({
    url: '/FaFinancePaymentController/selectAllOrderByPkCustomAsPage',
    method: 'post',
    data
  })
}

//应收合同报表  
//主页面
export function selectAllContractFaFinanceAsPage(data) {
  return request({
    url: '/FaFinancePaymentController/selectAllContractFaFinanceAsPage',
    method: 'post',
    data
  })
}
//合同状态上传   proOrderController/updateProductOrder
export function updateProductOrder(data) {
  return request({
    url: '/proOrderController/updateProductOrder',
    method: 'post',
    data
  })
}
//附件信息   selectAllFileByContract
export function selectAllFileByContract(data) {
  return request({
    url: '/FaFinancePaymentController/selectAllFileByContract',
    method: 'post',
    data
  })
}
///
export function selectAllDetailFaFinanceAsPage(data) {
  return request({
    url: '/FaFinancePaymentController/selectAllDetailFaFinanceAsPage',
    method: 'post',
    data
  })
}