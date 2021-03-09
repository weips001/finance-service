'use strict';
const md5 = require('md5-node');

const Service = require('egg').Service;
class UserService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [ list, total ] = await Promise.all([
      ctx.model.User.find(filter, { imgUrl: 0, token: 0 }).skip(offset).limit(limit)
        .lean()
        .exec(),
      ctx.model.User.countDocuments(filter)
        .lean()
        .exec(),
    ]);
    return { list, total, code: 0 };
  }
  async get(id) {
    const ctx = this.ctx;
    const doc = await ctx.model.User.findOne({ id }).lean().exec();
    return { code: 0, data: doc };
  }
  async add(data = {}) {
    const ctx = this.ctx;
    const app = this.app;
    const exist = await this.phoneExist(data.callPhone, data.id);
    if (exist) {
      return {
        code: 1,
        msg: '改账号已存在',
      };
    }
    const token = app.jwt.sign({ name: data.name }, app.config.jwt.secret);
    const UserModel = ctx.model.User({
      id: ctx.helper.generateId(),
      name: data.name,
      role: data.role,
      callPhone: data.callPhone,
      desc: data.desc,
      password: md5('123456'),
      createTime: new Date(),
      token,
    });
    await UserModel.save();
    return { code: 0 };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const UserModel = await ctx.model.User.findOne({ id }).exec();
    if (!UserModel) {
      return {
        code: 1,
        msg: 'User不存在',
      };
    }
    if (typeof data.name !== 'undefined') {
      UserModel.name = data.name;
    }
    if (typeof data.desc !== 'undefined') {
      UserModel.desc = data.desc;
    }
    if (typeof data.callPhone !== 'undefined') {
      UserModel.callPhone = data.callPhone;
    }
    if (typeof data.imgUrl !== 'undefined') {
      UserModel.imgUrl = data.imgUrl;
    }
    UserModel.role = data.role;
    await UserModel.save();
    return { code: 0 };
  }
  async remove(id) {
    const ctx = this.ctx;
    const User = await ctx.model.User.findOne({ id }).exec();
    if (!User) {
      return {
        code: 0,
        msg: '该角色不存在',
      };
    }
    await User.remove();
    return {
      code: 0,
    };
  }
  async phoneExist(callPhone, id) {
    const ctx = this.ctx;
    const filter = {
      callPhone,
    };
    if (id) {
      filter.id = { $ne: id };
    }
    const User = await ctx.model.User.findOne(filter).lean().exec();
    return !!User;
  }
  async getCurrentUser(token) {
    const ctx = this.ctx;
    const filter = {
      token,
    };
    const user = await ctx.model.User.findOne(filter).lean().exec();
    const role = user.role;
    const roleList = await ctx.model.Role.find({ id: { $in: role } });
    const auth = {};
    roleList.forEach(item => {
      item.auth.forEach(item0 => {
        auth[item0] = item0;
      });
    });
    return {
      code: 0,
      data: user,
      auth: Object.keys(auth),
    };
  }
}
module.exports = UserService;
