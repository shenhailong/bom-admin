import axios from 'axios'

// 根据文件名称下载文件
export function downloadProductFile(data) {
  return axios({
    url: process.env.BASE_API + '/sale/downloadProductFile',
    method: 'post',
    responseType: 'blob',
    data
  })
}

// 发送钉钉消息
export function sendDingMsgByPsndoc(data) {
  return axios({
    url: process.env.BASE_API + '/dingerp/sendDingMsgByPsndoc',
    method: 'post',
    data
  })
}


//上传评论图片接口
export function saveSaleStartB(data) {
  return axios({
    url:process.env.BASE_API+'/orderSaleStartController/saveSaleStartB',
    method: 'post',
    data
  })
}