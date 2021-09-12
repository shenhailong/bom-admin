/*
 * @Author: your name
 * @Date: 2021-07-29 09:46:58
 * @LastEditTime: 2021-09-06 14:17:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bom-admin/config/dev.env.js
 */
"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://39.106.96.105:8070/hups"', //生产打包n
  // SINGLE_SIGN_URL: '"http://39.106.96.105:8076/#/singleSign"' // prod 生产 打包
  BASE_API: '"http://39.106.96.105:8070/test"', //测试
  // BASE_API: '"http://192.168.8.104:8093/test"',       //本地
  // BASE_API: '"http://192.168.8.104:8092/hups"',
});
