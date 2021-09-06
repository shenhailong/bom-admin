import request from '@/utils/request'
// repairOrder/selectAllRepairOrderAsPage
// 分页查询物料数据
export function selectAllRepairOrderAsPage(data) {
    return request({
        url: '/repairOrder/selectAllRepairOrderAsPage',
        method: 'post',
        data
    })
  }
  //修改
  export function updateRepairOrder(data) {
    return request({
        url: '/repairOrder/updateRepairOrder',
        method: 'post',
        data
    })
}
//   子表确认
export function updateRepairOrderB(data) {
    return request({
        url: '/repairOrder/updateRepairOrderB',
        method: 'post',
        data
    })
}
//  保存图片
export function saveRepairImage(data) {
    return request({
        url: '/repairOrder/saveRepairImage',
        method: 'post',
        data
    })
}
// 图片路径保存
export function insertRepairImg(data) {
    return request({
        url: 'repairOrder/insertRepairImg',
        method: 'post',
        data
    })
}
// repairOrder/selectAllRepairImgById 
export function selectAllRepairImgById(data) {
    return request({
        url: 'repairOrder/selectAllRepairImgById',
        method: 'post',
        data
    })
}

//   子列表录入
export function saveRepairOrderPutout(data) {
    return request({
        url: 'repairOrder/saveRepairOrderPutout',
        method: 'post',
        data
    })
}
//   子表列表
export function selectAllOrderPutoutSubData(data) {
    return request({
        url: 'repairOrder/selectAllOrderPutoutSubData',
        method: 'post',
        data
    })
}
// 删除 deleteOrderPutoutByPks
export function deleteOrderPutoutByPks(data) {
    return request({
        url: 'repairOrder/deleteOrderPutoutByPks',
        method: 'post',
        data
    })
}
// 出库明细表

export function selectAllOrderPutoutAsPage(data) {
    return request({
        url: 'repairOrder/selectAllOrderPutoutAsPage',
        method: 'post',
        data
    })
}