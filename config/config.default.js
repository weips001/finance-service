/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.jwt = {
    secret: '123456', // 自定义 token 的加密条件字符串
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // domainWhiteList: [ 'http://localhost:8080' ], // 允许访问接口的白名单
  };

  config.static = {
    prefix: '/',
    dir: process.cwd() + '/public',
  };

  config.rundir = process.cwd() + '/run';

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577165435387_2425';

  // add your middleware config here
  config.middleware = [];

  exports.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/test',
      options: {
        useNewUrlParser: true,
      },
    },
  };

  exports.http = {
    headers: {
      common: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    },
    timeout: 10000,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
