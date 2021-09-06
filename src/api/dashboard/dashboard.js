import request from '@/utils/request'

// 查询成品质检数量
export function OmgCount(data) {
    return request({
        url: '/orderSaleStartController/OmgCount',
        method: 'post',
        data
    })
}
// 
// 上表
export function selectAllMsgUserOrderB(data) {
    return request({
        url: '/MsgUserCorrelationController/selectAllMsgUserOrderB',
        method: 'post',
        data
    })
}
// 销售报表
export function selectAllCustomerAsNum(data) {
    return request({
        url: '/customer/selectAllCustomerAsNum',
        method: 'post',
        data
    })
}

