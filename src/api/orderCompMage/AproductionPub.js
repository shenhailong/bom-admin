import request from '@/utils/request'

// 保存生产流程中的文件信息
export function saveOrderCompFile(data) {
  return request({
      url: '/aOrderCompPubController/saveOrderCompFile',
      method: 'post',
      headers: { 
        'Content-Type': 'multipart/form-data'
      },
      data
  })
}


//上传图片
export function saveProductImageFile(data) {
  return request({
      url: '/sale/saveProductImageFile',
      method: 'post',
      headers: { 
        'Content-Type': 'multipart/form-data'
      },
      data
  })
}

// /sale/saveOrderPutoOutImage
// 成品出库的图片上传
export function saveOrderPutoOutImage(data) {
  return request({
      url: '/aOrderCompPubController/saveOrderPutoOutImage',
      method: 'post',
      data
  })
}

// 出库明细表位置
export function selectAllOmgPrduFinishPutoutSubDataAsPage(data) {
  return request({
      url: '/omgPrduFinishPutoutController/selectAllOmgPrduFinishPutoutSubDataAsPage',
      method: 'post',
      data
  })
}