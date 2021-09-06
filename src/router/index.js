import Vue from "vue";
import Router from "vue-router";
import Layout from "../views/layout/Layout";
var list = null
//监听手机设备
function currDevice() {
  var u = navigator.userAgent;
  var app = navigator.appVersion;// appVersion 可返回浏览器的平台和版本信息。该属性是一个只读的字符串。
  var browserLang = (navigator.browserLanguage || navigator.language).toLowerCase();    //获取浏览器语言

  var deviceBrowser = function () {
    return {
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

  // console.log(deviceBrowser);
  //监听是否是手机操作
  if (deviceBrowser.iPhone === true || deviceBrowser.android === true) {
    list = {
      redirect: "/app/home",
      path: '/',
      name: 'App',
      component: () => import("@/App.vue"),
      children: [
        {
          path: 'app/home',
          name: 'Home',
          component: () => import('@/views/phone/phone_one/index'),
          // children:[
          //   {path:'test',name:'test',component:()=>import('@/views/phone/phone_one/comp/test/test')}
          // ]
        },
        {
          path: 'app/fen',
          component: () => import('@/views/phone/phone_two'),
        },
        {
          path: 'app/seen',
          name: 'Seen',
          component: () => import('@/views/phone/phone_three'),
        },
        {
          path: 'app/me',
          name: 'Me',
          component: () => import('@/views/phone/phone_four'),

        },
        {
          path: 'app/test',
          name: 'test',
          component: () => import('@/views/phone/phone_one/comp/test/test')
        },
        {
          path: 'app/incoming',
          name: 'incoming',
          component: () => import('@/views/phone/phone_one/comp/incoming/incoming')
        },
        {
          path: 'app/onRoom',
          name: 'onRoom',
          component: () => import('@/views/phone/phone_one/comp/onRoom/onRoom')
        },
        {
          path: 'app/deliveryEntry',
          name: 'deliveryEntry',
          component: () => import('@/views/phone/phone_one/comp/deliveryEntry/deliveryEntry')
        },
        {
          path: 'app/receipt',
          name: 'receipt',
          component: () => import('@/views/phone/phone_one/comp/receipt/receipt')
        },
        // getReady
        {
          path: 'app/getReady',
          name: 'getReady',
          component: () => import('@/views/phone/phone_one/comp/getReady/getReady')
        },
        {
          path: 'app/getReady_two',
          name: 'two',
          component: () => import('@/views/phone/phone_one/comp/getReady_two/getReady_two')
        },
        {
          path: 'app/message',
          name: 'message',
          component: () => import('@/views/phone/phone_one/comp/message/message'),
          meta: {
            keepAlive: true, 
            isBack: false
          }
        },
        {
          path: 'app/info',
          name: 'message',
          component: () => import('@/views/phone/phone_one/comp/message/item/textarea'),
          
        }
      ]
    }
    // console.log('手机端口的操作');
  } else {
    list = {
      path: "/",
      component: Layout,
      redirect: "/dashboard",
      name: "Dashboard",
      hidden: false,
      meta: { title: "首页", icon: "example" },
      children: [
        {
          path: "dashboard",
          component: () => import("@/views/dashboard/index")
        }
      ]
    }
    ////改变隐藏路由标题

  }
}
currDevice()
Vue.use(Router);

/* Layout */
// 友情提示：本网站的路由是后端配置的 除首页和手机端口外
export const constantRouterMap = [
  ///手机端口的路由配置
  {
    path: "/login",
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: "/404", component: () => import("@/views/404"), hidden: true },
  {
    path: "/MipsGateRecordListPage",
    component: () => import("@/views/mipsinfo/gateRecord/gateRecord"),
    hidden: true
  },
  {
    // 皆为电脑端单独页面的现实界面跳转
    path: "/hiderouters",
    component: Layout,
    name: "customersearch",
    hidden: true,
    meta: { title: "财务账单查询", icon: "dashboard" },
    children: [
      {
        path: "customersearch",
        component: () => import("@/views/financing/financingcomp/customersearch/index")
      },
      {
        // sop 屏幕跳转的页面
        path: "exhibition",
        component: () => import("@/components/exhibition/index")
      }
    ]
  },
  
  list
];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
