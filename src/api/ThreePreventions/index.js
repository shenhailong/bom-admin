//三防
import request from '@/utils/request'
//三防的主表数据
export function selectAllProductionDefenseAsPage(data) {
    return request({
      url: '/OmgProductionDefenseProFlowController/selectAllProductionDefenseAsPage ',
      method: 'post',
      data
    })
}
//更新三防数据 图标对号
export function updataSelectAllProductionDefenseAsPage(data) {
    return request({
      url: '/OmgProductionDefenseProFlowController/updateProductionDefense',
      method: 'post',
      data
    })
}
//保检

export function defenseInspeReportProccess(data) {
    return request({
      url: '/proccessMageMentOrderFlowController/defenseInspeReportProccess',
      method: 'post',
      data
    })
}
//  录入子表信息
export function saveProductionDefenseSub(data) {
    return request({
      url: '/OmgProductionDefenseProFlowController/saveProductionDefenseSub',
      method: 'post',
      data
    })
}
//查询子表信息
export function selectDefenseBSubAs(data) {
    return request({
      url: '/OmgProductionDefenseProFlowController/selectDefenseBSubAs',
      method: 'post',
      data
    })
}
//测试老化


//主表
export function selectAllProductionTestAsPage(data) {
  return request({
    url: '/OmgProductionTestProFlowController/selectAllProductionTestAsPage',
    method: 'post',
    data
  })
}
// 
//全部完成
export function updateProductionTest(data) {
  return request({
    url: '/OmgProductionTestProFlowController/updateProductionTest',
    method: 'post',
    data
  })
}
//报检  saveProductionTestBSub
export function testInspeReportProccess(data) {
  return request({
    url: '/proccessMageMentOrderFlowController/testInspeReportProccess',
    method: 'post',
    data
  })
}
//保存子表
export function saveProductionTestBSub(data) {
  return request({
    url: '/OmgProductionTestProFlowController/saveProductionTestBSub',
    method: 'post',
    data
  })
}
//子表查询
export function selectTestBSubAs(data) {
  return request({
    url: '/OmgProductionTestProFlowController/selectTestBSubAs',
    method: 'post',
    data
  })
}
