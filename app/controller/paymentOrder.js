'use strict';

const Controller = require('egg').Controller;

class PaymentOrderController extends Controller {
  async list() {
    const ctx = this.ctx;
    const {current, pageSize} = ctx.query;
    const query = ctx.query
    const filter = {
    };
    if (query.paymentOrderId) {
      filter['paymentOrderId'] = new RegExp(ctx.helper.escapeStringRegExp(query.paymentOrderId), 'i');
    }
    if (query.applyUserName) {
      filter['applyUserName'] = new RegExp(ctx.helper.escapeStringRegExp(query.applyUserName), 'i');
    }
    if (query.department) {
      filter['department'] = new RegExp(ctx.helper.escapeStringRegExp(query.department), 'i');
    }
    if (query.String) {
      filter['String'] = new RegExp(ctx.helper.escapeStringRegExp(query.String), 'i');
    }
    if (query.payeeBankName) {
      filter['payeeBankName'] = new RegExp(ctx.helper.escapeStringRegExp(query.payeeBankName), 'i');
    }
    if (query.bankAccount) {
      filter['bankAccount'] = new RegExp(ctx.helper.escapeStringRegExp(query.bankAccount), 'i');
    }
    if (query.status) {
      filter['status'] = new RegExp(ctx.helper.escapeStringRegExp(query.status), 'i');
    }
    const sorter= ctx.query.sorter  
    const limit = parseInt(pageSize || 20);
    const offset = (parseInt(current || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.paymentOrder.list(filter, limit, offset, sorter);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.paymentOrder.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.paymentOrder.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.paymentOrder.remove(ctx.request.body);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.paymentOrder.update(id, ctx.request.body);
  }
  async submit() {
    const ctx = this.ctx;
    const id = ctx.request.body.id;
    ctx.body = await ctx.service.paymentOrder.submit(id);
  }
}

module.exports = PaymentOrderController;
