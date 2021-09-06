import request from '@/utils/request'

// 指导书添加 上传版本号
export function saveSopEdition(data) {
    return request({
        url: '/BillSopEditionController/saveSopEdition',
        method: 'post',
        data
    })
  }


//  版本列表
export function selectSopEditionByPkProduct(data) {
    return request({
        url: '/BillSopEditionController/selectSopEditionByPkProduct',
        method: 'post',
        data
    })
  }
//   BillSopEditionController/defaultSopEdition
export function defaultSopEdition(data) {
    return request({
        url: '/BillSopEditionController/defaultSopEdition',
        method: 'post',
        data
    })
  }
//   
export function delSopEditionById(data) {
    return request({
        url: '/BillSopEditionController/delSopEditionById',
        method: 'post',
        data
    })
  }
  // BillSopEditionController/saveSopImg
  export function saveSopImg(data) {
    return request({
        url: '/BillSopEditionController/saveSopImg',
        method: 'post',
        data
    })
  }
  // BillSopEditionController/saveSopImage
  export function saveSopImage(data) {
    return request({
        url: '/BillSopEditionController/saveSopImage',
        method: 'post',
        data
    })
  }
  // BillSopEditionController/selectSopImgByPkEdition
  export function selectSopImgByPkEdition(data) {
    return request({
        url: 'BillSopEditionController/selectSopImgByPkEdition',
        method: 'post',
        data
    })
  }

  //生产的集合
  // BillSopEditionController/selectSopImgByPkProduct
  export function selectSopImgByPkProduct(data) {
    return request({
        url: 'BillSopEditionController/selectSopImgByPkProduct',
        method: 'post',
        data
    })
  }
  // 生产人员集合
  export function selectAllBdPsndocAsRef(data) {
    return request({
        url: 'bdcorp/selectAllBdPsndocAsRef',
        method: 'post',
        data
    })
  }
  // 移交图片   BillSopTaskController/saveSopTask
  export function saveSopTask(data) {
    return request({
        url: 'BillSopTaskController/saveSopTask',
        method: 'post',
        data
    })
  }
  // 人员  BillSopTaskController/selectSopTaskByPkPsndoc
  export function selectSopTaskByPkPsndoc(data) {
    return request({
        url: 'BillSopTaskController/selectSopTaskByPkPsndoc',
        method: 'post',
        data
    })
  }
  //BillSopTaskController/selectAllSopTask
  export function selectAllSopTask(data) {
    return request({
        url: 'BillSopTaskController/selectAllSopTask',
        method: 'post',
        data
    })
  }
  // BillSopParameterController/saveSopParameter
  export function saveSopParameter(data) {
    return request({
        url: 'BillSopParameterController/saveSopParameter',
        method: 'post',
        data
    })
  }
  // technics/selectAllBillOfMaterialByPkId
  export function selectAllBillOfMaterialByPkId(data) {
    return request({
        url: 'technics/selectAllBillOfMaterialByPkId',
        method: 'post',
        data
    })
  }
  // BillSopParameterController/selectSopParameterByProductId
  export function selectSopParameterByProductId(data) {
    return request({
        url: 'BillSopParameterController/selectSopParameterByProductId',
        method: 'post',
        data
    })
  }
  // BillSopParameterController/selectSopParameterBySopEditionId
  export function selectSopParameterBySopEditionId(data) {
    return request({
        url: 'BillSopParameterController/selectSopParameterBySopEditionId',
        method: 'post',
        data
    })
  }

  // BillSopTaskController/deleteSopTaskByPks
  export function deleteSopTaskByPks(data) {
    return request({
        url: 'BillSopTaskController/deleteSopTaskByPks',
        method: 'post',
        data
    })
  }
  // BillSopParameterController/selectAllBillOfMaterialById
  export function selectAllBillOfMaterialById(data) {
    return request({
        url: 'BillSopParameterController/selectAllBillOfMaterialById',
        method: 'post',
        data
    })
  }
  // BillSopEditionController/copySopEdition
  export function copySopEdition(data) {
    return request({
        url: 'BillSopEditionController/copySopEdition',
        method: 'post',
        data
    })
  }
  
// BillSopParameterController/delSopParameterById
export function delSopParameterById(data) {
  return request({
      url: 'BillSopParameterController/delSopParameterById',
      method: 'post',
      data
  })
}
