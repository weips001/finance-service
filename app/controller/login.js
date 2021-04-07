'use strict';

const Controller = require('egg').Controller;
const md5 = require('md5-node');


class HomeController extends Controller {
  async login() {
    const {
      ctx,
      app
    } = this;
    const data = ctx.request.body;
    data.password = md5(data.password);
		const filter = {
			password: data.password,
			userPhone: data.userPhone
		}
    const UserModel = await ctx.model.User.findOne(filter).exec();
    if (UserModel) {
      const token = ctx.app.jwt.sign({
        userName: data.userName
      }, ctx.app.config.jwt.secret, {
        expiresIn: 600 * 600,
      });
      UserModel.token = token;
      const compId = UserModel.compId
      await UserModel.save();
      ctx.body = {
        code: 0,
        token,
        compId
      };
      return;
    }
		console.log(UserModel, 444)
    ctx.body = {
      code: 1,
      msg: '用户名或密码错误',
    };
    return;
  }
  async register() {
    const {
      ctx,
      app
    } = this;
    const data = ctx.request.body;
    if (!data.userPhone) {
      ctx.body = {
        code: 1,
        msg: '请输入手机号',
      };
      return;
    }
    if (!data.name) {
      ctx.body = {
        code: 1,
        msg: '请输入姓名',
      };
      return;
    }
    const exist = await this.phoneExist(data.userPhone);
    if (exist) {
      this.ctx.body = {
        code: 1,
        msg: '用户已存在',
      };
      return;
    }
    if (!data.password) {
      ctx.body = {
        code: 1,
        msg: '请输入密码',
      };
      return;
    }
    const token = app.jwt.sign({
      name: data.name
    }, app.config.jwt.secret, {
      expiresIn: 60 * 60,
    });

    const userModel = ctx.model.User({
      id: ctx.helper.generateId(),
      name: data.name,
      password: md5(data.password),
      userPhone: data.userPhone,
      token,
    });
    await userModel.save();
    ctx.body = {
      code: 0,
      token,
      msg: '注册成功',
    };
    return;
  }
  async wxlogin() {
    
  }
  async phoneExist(userPhone, password) {
    const ctx = this.ctx;
    const filter = {
      userPhone,
    };
    if (password) {
      filter.password = password;
    }
    const user = await ctx.model.User.findOne(filter).lean().exec();
    if (user) {
      return {
        isUser: !!user
      };
    }

  }
}

module.exports = HomeController;