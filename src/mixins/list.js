/*
 * @page: mixin-列表的各种操作方法
 * @Author: Dragon
 * @Date: 2021-04-01 10:15:56
 * @LastEditors: Dragon
 * @LastEditTime: 2021-09-22 09:25:06
 */
export default {
  data() {
    return {
      loading: false, // 加载loading
      total: 0, // 总条数
      list: [], // 列表数据
      page: 1, // 页数
      limit: 10, // 每页显示条数
      showOperation: true, // 操作栏是否显示
      selection: [], // 导出报表选择的list
      initSearchForm: {} // 为了重置from用,复制一份初始的searchForm
    }
  },
  mounted() {
    this.getTableList()
    this.initSearchForm = JSON.parse(JSON.stringify(this.searchForm))
  },
  methods: {
    // 获取列表
    getTableList() {
      const params = {
        ...this.searchForm,
        limit: this.limit,
        page: this.page
      }
      this.getList(params)
    },
    // 点击每页多少条
    handleSizeChange(val) {
      this.limit = val
      this.page = 1
      this.getTableList()
    },
    // 点击页数
    handleCurrentChange(val) {
      this.page = val
      this.getTableList()
    },
    // checkbox 选择
    selectionChange(selection) {
      this.selection = selection
    },
    // 导出的方法
    exportExcel() {
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/Excel/Export2Excel')
        const title = this.getKey('label') // 设置Excel的表格第一行的标题
        const prop = this.getKey('prop') // tableData里对象的属性key值
        const list = JSON.parse(JSON.stringify(this.selection)) // 要导出的数据
        // 需要把值转换成中文，需要转换的对应每个columns里面的filter的常量
        list.forEach(one => {
          for (const key in one) {
            this.columns.forEach(two => {
              if (key === two.prop && two.filter) {
                one[key] = two.filter[one[key]]
              }
            })
          }
        })
        if (title[0] !== '序号') {
          title.unshift('序号')
        }
        const data = this.formatJson(prop, list)
        // 添加序号值
        if (title[0] === '序号') {
          for (let i = 0; i < data.length; i++) {
            data[i].unshift(i + 1)
          }
        }
        export_json_to_excel(title, data, this.excelName) // 最后一个是表名字
      })
    },
    formatJson(prop, jsonData) {
      return jsonData.map((v) => prop.map((j) => v[j]))
    },
    // 获取columns的label或者prop
    getKey(key) {
      const arr = []
      this.columns.forEach(item => {
        arr.push(item[key])
      })
      return arr
    },
    // 重置列表,重新请求
    resetList() {
      this.page = 1
      this.total = 0
      this.list = []
      this.searchForm = JSON.parse(JSON.stringify(this.initSearchForm))
      this.getTableList()
    },
    // 列表操作按照之后重新加载列表
    reloadList() {
      this.page = 1
      this.total = 0
      this.list = []
      this.getTableList()
    },
    closeDialog() {
      this.isEdit = false
      this.ruleForm = JSON.parse(JSON.stringify(this.initRuleForm))
      this.showDialog = false
      this.submitting = false
      this.$refs.ruleForm.resetFields()
    }
  }
}
