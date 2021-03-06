'use strict';

const Controller = require('egg').Controller;

class CompanyController extends Controller {
  async list() {
    const ctx = this.ctx;
    const {current, pageSize} = ctx.query;
    const query = ctx.query
    const filter = {
    };
    if (query.compName) {
      filter['compName'] = new RegExp(ctx.helper.escapeStringRegExp(query.compName), 'i');
    }
    if (query.bossName) {
      filter['bossName'] = new RegExp(ctx.helper.escapeStringRegExp(query.bossName), 'i');
    }
    if (query.bossPhone) {
      filter['bossPhone'] = new RegExp(ctx.helper.escapeStringRegExp(query.bossPhone), 'i');
    }
    const sorter= ctx.query.sorter  
    const limit = parseInt(pageSize || 20);
    const offset = (parseInt(current || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.company.list(filter, limit, offset, sorter);
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
