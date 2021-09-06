import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import Layout from './views/layout/Layout'

const _import = require('./router/_import_' + process.env.NODE_ENV) // 获取组件的方法
let addRourtersLoad = true
let getRouters = []

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => { // 刷新前置操作
  // console.log(from.path);
  
 
  currDevice() //手机端口的配置
  
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') { // 如果当前页面是登陆也 直接通过
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles && store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          // 根据拉取的用户信息组装router,动态加载菜单
          if (addRourtersLoad) {
            initAddRouters(res.object.perms)
            router.options.routes = router.options.routes.concat(getRouters)
            router.addRoutes(getRouters)
            next({ ...to, replace: true })
            addRourtersLoad = false
          } else {
            next()
          }
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err.message)
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else if (to.path === '/MipsGateRecordListPage') {
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
  //手机端的保留页面问题
  if (from.path == "app/message") {
    to.meta.isBack = true;
  } else {
    to.meta.isBack = false;
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

// 组装router数据
function initAddRouters(perms) {
  getRouters = filterAsyncRouter(perms)
}

// 递归操作
function filterAsyncRouter(asyncRouterMap) { // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component == '') { // Layout组件特殊处理
      route.component = Layout
      route.path = '/' + route.name
      if (route.name == '首页') {
        route.path = '/'
      }
    } else {
      route.component = _import(route.component)
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}

//监听当前的使用设备
function currDevice(){
  var u = navigator.userAgent;
  var app = navigator.appVersion;// appVersion 可返回浏览器的平台和版本信息。该属性是一个只读的字符串。
  var browserLang = (navigator.browserLanguage || navigator.language).toLowerCase();    //获取浏览器语言
  
  var deviceBrowser = function(){
      return{
          trident: u.indexOf('Trident') > -1,  //IE内核
          presto: u.indexOf('Presto') > -1,  //opera内核
          webKit: u.indexOf('AppleWebKit') > -1,  //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,  //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/),  //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.Mac OS X/),  //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,  //android终端或者uc浏览器
          iPhone: u.indexOf('iPhone') > -1,  //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1,  //是否iPad
          webApp: u.indexOf('Safari') == -1,  //是否web应用程序，没有头部和底部
          weixin: u.indexOf('MicroMessenger') > -1,  //是否微信
          qq: u.match(/\sQQ/i) == " qq",  //是否QQ
      }
  }();
  //监听是否是手机操作
  if(deviceBrowser.iPhone ===true || deviceBrowser.android === true ){
    store.dispatch( 'EQUIPMENTMINS',true)
    // console.log('手机端口');
  }else{
    store.dispatch( 'EQUIPMENTMINS',false)
    // console.log('pc');
  }
}