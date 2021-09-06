const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar, // 用户头像、
  equipment:state=>state.app.equipment,//手机设备的判定
  name: state => state.user.name,
  userid: state => state.user.userid,
  pkCorp: state => state.user.pkCorp,
  pkPsndoc:state => state.user.pkPsndoc,
  unitname: state => state.user.unitname,
  roles: state => state.user.roles,

  fixedLeftColumns: state => state.viewComp.fixedLeftColumns, // 左边固定列表字段
  columns: state => state.viewComp.columns, // 列表字段
  listData: state => state.viewComp.listData, // 列表数据
  topBtns: state => state.viewComp.topBtns, // 页面顶部按钮
  actBtns: state => state.viewComp.actBtns, // 操作栏按钮
  actWidth: state => state.viewComp.actWidth // 操作栏按钮宽度
}
export default getters
