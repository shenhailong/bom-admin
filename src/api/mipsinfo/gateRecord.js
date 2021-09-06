import axios from 'axios'

// 分页查询识别记录数据
export function selectAllMipsGateRecordAsPage(data) {
    return axios({
        url: process.env.BASE_API + '/mipsUpload/selectAllMipsGateRecordAsPage',
        method: 'post',
        data
    })
}