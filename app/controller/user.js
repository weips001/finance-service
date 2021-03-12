'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async list() {
    const ctx = this.ctx;
    const query = ctx.query;
    const {current, pageSize} = ctx.query;
    const filter = {
    };
    if (query.userCode) {
      filter['userCode'] = new RegExp(ctx.helper.escapeStringRegExp(query.userCode), 'i');
    }
    if (query.userName) {
      filter['userName'] = new RegExp(ctx.helper.escapeStringRegExp(query.userName), 'i');
    }
    if (query.department) {
      filter['department'] = new RegExp(ctx.helper.escapeStringRegExp(query.department), 'i');
    }
    if (query.userPhone) {
      filter['userPhone'] = new RegExp(ctx.helper.escapeStringRegExp(query.userPhone), 'i');
    }
    if (query.userEmail) {
      filter['userEmail'] = new RegExp(ctx.helper.escapeStringRegExp(query.userEmail), 'i');
    }
    query.status?filter.status = query.status:null
    if (query.department) {
      filter['department'] = new RegExp(ctx.helper.escapeStringRegExp(query.department), 'i');
    }
    const limit = parseInt(pageSize || 20);
    const offset = (parseInt(current || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.user.list(filter, limit, offset);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.user.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.company.remove(ctx.request.body);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.user.update(id, ctx.request.body);
  }
  async getCurrentUser() {
    const ctx = this.ctx;
    const token = ctx.request.header.authorization.substr(7, 1000);
    const compId = ctx.request.header.compId
    ctx.body = await ctx.service.user.getCurrentUser(token, compId);
  }
}

module.exports = UserController;
