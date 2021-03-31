'use strict';
const md5 = require('md5-node');

const Service = require('egg').Service;
class UserService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [ data, total ] = await Promise.all([
      ctx.model.User.find(filter,{password: 0}).skip(offset).limit(limit)
        .lean()
        .exec(),
      ctx.model.User.countDocuments(filter)
        .lean()
        .exec(),
    ]);
    return { data, total, code: 0, success: true };
  }
  async get(id) {
    const ctx = this.ctx;
    const doc = await ctx.model.User.findOne({ id }).lean().exec();
    return { code: 0, data: doc, success: true };
  }
  async add(data = {}) {
    const ctx = this.ctx;
    const app = this.app;
    const compId = ctx.request.header.compid || data.compId
    const exist = await ctx.model.User.findOne({  userPhone: data.userPhone }).lean().exec();
    if (exist) {
      if(exist.compId) {
        return {
          code: 1,
          msg: '该账号以存在',
          data: exist,
          success: true
        }
      } else {
        exist.compId = compId
        await exist.save()
        return {
          code: 1,
          msg: '该账号已存在',
          success: true,
          data: exist
        };
      }
    }
    if(data.role.length>0) {
      const RoleModel = await ctx.model.Role.find({
        id: {
          $in: data.role
        }
      }).exec()
      data.roleName = RoleModel.map(item => {
        return item.name
      })
    }
    const token = app.jwt.sign({ name: data.userName }, app.config.jwt.secret);
    const UserModel = ctx.model.User({
      id: ctx.helper.generateId(),
      userName: data.userName,
      department: data.department,
      userPhone: data.userPhone,
      role: data.role,
      roleName: data.roleName,
      userEmail: data.userEmail,
      password: md5('123456'),
      token,
      compId: compId,
      openid: data.openid
    });
    await UserModel.save();
    return { code: 0,success: true };
  }
  async addUserByCode(data = {}) {
    const ctx = this.ctx;
    const company = await ctx.model.Company.findOne({ code: data.code }).exec()
    if(!company) {
      return {
        code: 1,
        success: false,
        msg: '邀请码错误'
      }
    }
    const UserModel = await ctx.model.User.findOne({userPhone: data.userPhone})
    UserModel.compId = company.id
    UserModel.code = company.code
    UserModel.userName = data.userName
    await UserModel.save();
    return { code: 0, success: true };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const UserModel = await ctx.model.User.findOne({ id }).exec();
    if (!UserModel) {
      return {
        code: 1,
        msg: 'User不存在',
        success: false
      };
    }
    if (typeof data.userName !== 'undefined') {
      UserModel.userName = data.userName;
    }
    if (typeof data.department !== 'undefined') {
      UserModel.department = data.department;
    }
    if (typeof data.userPhone !== 'undefined') {
      UserModel.userPhone = data.userPhone;
    }
    if (typeof data.userEmail !== 'undefined') {
      UserModel.userEmail = data.userEmail;
    }
    if (typeof data.status !== 'undefined') {
      UserModel.status = data.status;
    }
    if (typeof data.password !== 'undefined') {
      UserModel.password = data.password;
    }
    if (typeof data.compId !== 'undefined') {
      UserModel.compId = data.compId;
    }
    await UserModel.save();
    return { code: 0, success: true };
  }
  async remove(data) {
    const ctx = this.ctx;
    console.log(data, 8222)
    data.deleteArr.forEach(async (id)=>{
      const User = await ctx.model.User.findOne({ id }).exec();
      if (!User) {
        return {
          code: 0,
          msg: '该用户不存在',
        };
      }
      console.log(User, 9000)
      await User.remove();
    })
    return {
      code: 0,
      success: true
    };
  }
  async phoneExist(userPhone, id) {
    const ctx = this.ctx;
    const filter = {
      userPhone,
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
    console.log(token, 160000)
    const user = await ctx.model.User.findOne(filter).lean().exec();
    console.log(user, 161111)
    const role = user.role;
    const roleList = await ctx.model.Role.find({
      id: {
        $in: role
      }
    });
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
  async getUserFromOpenid(openid) {
    const ctx = this.ctx;
    const filter = {
      openid,
    };
    const user = await ctx.model.User.findOne(filter).lean().exec();
    return {
      code: 0,
      data: user
    }
  }
}
module.exports = UserService;
