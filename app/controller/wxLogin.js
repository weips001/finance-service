'use strict';
const axios = require('axios')
const Controller = require('egg').Controller;
const WXBizDataCrypt = require('../utils/WXBizDataCrypt')
const appid = 'wxd86018bce893b3ed'
class WxLoginController extends Controller {
  async wxLogin() {
    const ctx = this.ctx;
    const {js_code} = ctx.request.body;
    const secret = '8fc0c46262a8eaca256933f9331cc4f6'
    const grant_type = 'authorization_code'
    let res = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=${grant_type}`)
    ctx.body =  {code: 0, ...res}
  }
  async getWeInfo() {
    const ctx = this.ctx;
    const {session_key,encryptedData, iv } = ctx.request.body;
    var pc = new WXBizDataCrypt(appid, session_key)
    var data = pc.decryptData(encryptedData , iv)
    ctx.body =  {code: 0, data}
  }
  async wxGetToken() {
    const ctx = this.ctx;
    const app = this.app;
    const { userPhone, openId } = ctx.request.body
    const user = ctx.model.User.findOne({
      userPhone: userPhone
    })
    if(user.openId !== openId) {
      return {
        code: 1,
        msg: '请使用绑定的微信号登陆',
        success: false
      }
    } else {
      if(user.token) {
        return {
          code: 0,
          token: user.token,
          success: true
        }
      } else {
        const token = app.jwt.sign({ name: data.userName }, app.config.jwt.secret);
        user.token = token
        await user.save()
        return {
          code: 0,
          token: token,
          success: true
        }
      }
    }

  }
}

module.exports = WxLoginController;
