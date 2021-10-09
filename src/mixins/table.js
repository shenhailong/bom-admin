/*
 * @page: mixin-table
 * @Author: Dragon
 * @Date: 2021-04-01 10:15:56
 * @LastEditors: Dragon
 * @LastEditTime: 2021-04-09 14:32:43
 */
const tableMethod = {
  methods: {
    // 点击每页多少条
    handleSizeChange(val) {
      this.pageSize = val
      this.pageNum = 1
      this.getTableList()
    },
    // 点击页数
    handleCurrentChange(val) {
      this.pageNum = val
      this.getTableList()
    }
  }
}
export default tableMethod
