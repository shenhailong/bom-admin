import Vue from 'vue'

// import './utils/rem1.js'

// import './utils/flexible.js'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css



import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件

import App from './App'
import store from './store'
import router from './router'
import VueSplitPane from 'vue-splitpane'

// import 'lib-flexible'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.component('split-pane', VueSplitPane)

import Blob from './Excel/Blob'
import Export2Excel from './Excel/Export2Excel.js'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

Vue.config.productionTip = false
Vue.config.devtools = true
import dataV from '@jiaminghi/data-view'
Vue.use(VueQuillEditor,dataV);


 //导出excel文件
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
