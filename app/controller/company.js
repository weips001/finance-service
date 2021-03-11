'use strict';

const Controller = require('egg').Controller;

class CompanyController extends Controller {
  async list() {
    const ctx = this.ctx;
    const {current, pageSize} = ctx.query;
    const filter = {  
    };
    const limit = parseInt(pageSize || 20);
    const offset = (parseInt(current || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.company.list(filter, limit, offset);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.company.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.company.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.company.remove(ctx.request.body);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.company.update(id, ctx.request.body);
  }
}

module.exports = CompanyController;
