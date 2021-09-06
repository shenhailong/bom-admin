import request from "@/utils/request";

// 系统公告维护日志 录入
export function insertSysNoctice(data) {
  return request({
    url: "/SysNocticeController/insertSysNoctice",
    method: "post",
    data
  });
}

// 系统公告维护日志 分页查询
export function selectAllSysNoctice(data) {
  return request({
    url: "/SysNocticeController/selectAllSysNoctice",
    method: "POST",
    data
  });
}



//新公告 录入
export function saveMsgSystemContentData(data) {
  return request({
    url: "/MsgSystemContentController/saveMsgSystemContentData",
    method: "POST",
    data
  });
}
//删除公告 
export function deleteSystemContentData(data) {
  return request({
    url: "/MsgSystemContentController/deleteSystemContentData",
    method: "POST",
    data
  });
}
//分页查询 公告
// MsgSystemContentController/selectAllMsgSystemContentAsPage
export function selectAllMsgSystemContentAsPage(data) {
  return request({
    url: "/MsgSystemContentController/selectAllMsgSystemContentAsPage",
    method: "POST",
    data
  });
}