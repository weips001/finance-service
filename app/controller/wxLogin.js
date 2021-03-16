'use strict';
const axios = require('axios')

const Controller = require('egg').Controller;

class WxLoginController extends Controller {
  async wxLogin() {
    const ctx = this.ctx;
    const {js_code} = ctx.request.body;
    let res = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=wxd86018bce893b3ed&secret=8fc0c46262a8eaca256933f9331cc4f6&js_code=${js_code}&grant_type=authorization_code`)
    return {code: 0, res}
  }
}

module.exports = WxLoginController;
