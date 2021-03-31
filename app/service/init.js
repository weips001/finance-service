'use strict';
const md5 = require('md5-node');

const Service = require('egg').Service;
class RoleService extends Service {
  async init() {
    const ctx = this.ctx;
    const app = this.app;
    const data = {
      userName: '李三才',
      role: ["-2"],
      roleName: ['超级管理元'],
      userPhone: '15395833823'
    }
    const dataSon = {
      userName: '韦鹏帅',
      role: ["-2"],
      roleName: ['超级管理元'],
      userPhone: '13271591339'
    }
    const token = app.jwt.sign({
      userName: data.userName
    }, app.config.jwt.secret);
    const tokenSon = app.jwt.sign({
      userName: dataSon.userName
    }, app.config.jwt.secret);
    const UserModel = ctx.model.User({
      id: ctx.helper.generateId(),
      userName: data.userName,
      role: data.role,
      roleName: data.roleName,
      userPhone: data.userPhone,
      desc: data.desc,
      password: md5('123456'),
      createTime: new Date(),
      token,
    });
    const UserModelSon = ctx.model.User({
      id: ctx.helper.generateId(),
      userName: dataSon.userName,
      role: dataSon.role,
      roleName: dataSon.roleName,
      userPhone: dataSon.userPhone,
      desc: dataSon.desc,
      password: md5('123456'),
      createTime: new Date(),
      token: tokenSon,
    });
    await UserModel.save();
    await UserModelSon.save();
    return {
      msg: '初始化成功',
      code: 0
    };
  }
}
module.exports = RoleService;
