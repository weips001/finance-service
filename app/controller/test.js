'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async add() {
    const ctx = this.ctx;
    console.log('ctx.request.body', ctx.request.body)
    ctx.body = await ctx.service.test.add(ctx.request.body);
  }
}

module.exports = TestController;
