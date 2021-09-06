import request from '@/utils/request'

// 修改密码
export function safeupdate(data) {
    return request({
        url: '/bdcorp/updatePsndocPassWord',
        method: 'post',
        data
    })
}
