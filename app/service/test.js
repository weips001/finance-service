'use strict';
const md5 = require('md5-node');

const Service = require('egg').Service;
class TestService extends Service {
  async add(data = {}) {
    // const ctx = this.ctx;
    // const app = this.app;
    // const exist = await this.phoneExist(data.userPhone, data.id);
    // if (exist) {
    //   return {
    //     code: 1,
    //     msg: '改账号已存在',
    //     success: false
    //   };
    // }
    // const compId = ctx.request.header.compid
    // const token = app.jwt.sign({ name: data.name }, app.config.jwt.secret);
    // const UserModel = ctx.model.User({
    //   id: ctx.helper.generateId(),
    //   userName: data.userName,
    //   department: data.department,
    //   userPhone: data.userPhone,
    //   userEmail: data.userEmail,
    //   password: md5('123456'),
    //   token,
    //   compId: compId
    // });
    // await UserModel.save();
    const {ctx} = this
    const test = ctx.model.Test({name: data.name, age: data.age})
    var error = test.validateSync()
    console.log('err--', error)
    // console.log('id', test.id)
    // console.log('id', typeof test)
    // await test.save()
    return { code: 0,data: test, error };
  }
}
module.exports = TestService;
