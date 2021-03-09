'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async list() {
    const ctx = this.ctx;
    const query = ctx.query;
    const filter = {
    };
    query.Type ? filter.Type = query.Type : null;
    const limit = parseInt(query.limit || 10);
    const offset = (parseInt(query.page || 1) - 1) * limit;
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
    const id = ctx.params.id;
    ctx.body = await ctx.service.user.remove(id);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.user.update(id, ctx.request.body);
  }
  async getCurrentUser() {
    const ctx = this.ctx;
    const token = ctx.request.header.authorization.substr(7, 1000);
    ctx.body = await ctx.service.user.getCurrentUser(token);
  }
}

module.exports = UserController;
