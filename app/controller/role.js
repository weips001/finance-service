'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  async list() {
    const ctx = this.ctx;
    const query = ctx.query;
    const compId = ctx.request.header.compid;
    const filter = {
      compId
    };
    query.Type ? filter.Type = query.Type : null;
    const limit = parseInt(query.limit || 10);
    const offset = (parseInt(query.page || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.role.list(filter, limit, offset);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.role.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.role.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.role.remove(id);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.role.update(id, ctx.request.body);
  }
}

module.exports = RoleController;
