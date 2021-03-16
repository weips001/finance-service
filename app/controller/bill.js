'use strict';

const Controller = require('egg').Controller;

class BillController extends Controller {
  async list() {
    const ctx = this.ctx;
    const {current, pageSize} = ctx.query;
    const query = ctx.query
    const filter = {
    };
    if (query.billCode) {
      filter['billCode'] = new RegExp(ctx.helper.escapeStringRegExp(query.billCode), 'i');
    }
    if (query.billNumber) {
      filter['billNumber'] = new RegExp(ctx.helper.escapeStringRegExp(query.billNumber), 'i');
    }
    if (query.money) {
      filter['money'] = new RegExp(ctx.helper.escapeStringRegExp(query.money), 'i');
    }
    const sorter= ctx.query.sorter  
    const limit = parseInt(pageSize || 20);
    const offset = (parseInt(current || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.bill.list(filter, limit, offset, sorter);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.bill.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.bill.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.bill.remove(ctx.request.body);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.bill.update(id, ctx.request.body);
  }
}

module.exports = BillController;
