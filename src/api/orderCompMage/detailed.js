import request from '@/utils/request'

// 生产计划明细表
export function selectAllOrderPlanBAsPage(data) {
    return request({
        url: '/productionFlowOrderPlanController/selectAllOrderPlanBAsPage',
        method: 'post',
        data
    })
  }