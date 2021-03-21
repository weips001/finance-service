'use strict';
const axios = require('axios')

const Controller = require('egg').Controller;

class WxLoginController extends Controller {
  async wxLogin() {
    const ctx = this.ctx;
    const {js_code, } = ctx.request.body;
    const appid = 'wxd86018bce893b3ed'
    const secret = '8fc0c46262a8eaca256933f9331cc4f6'
    const grant_type = 'authorization_code'
    let res = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=${grant_type}`)
    ctx.body =  {code: 0, ...res}
  }
}

module.exports = WxLoginController;
