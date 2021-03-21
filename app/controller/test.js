'use strict';

const Controller = require('egg').Controller;

// class TestController extends Controller {
//   async add() {
//     const ctx = this.ctx;
//     console.log('ctx.request.body', ctx.request.body)
//     ctx.body = await ctx.service.test.add(ctx.request.body);
//   }
// }

// module.exports = TestController;
const svgCaptcha = require('svg-captcha');
class CompanyController extends Controller {
  async test() {
    const ctx = this.ctx;
		var codeConfig = {
			size: 6,// 验证码长度
			ignoreChars: '0o1i', // 验证码字符中排除 0o1i
	  }
	  var captcha = svgCaptcha.create(codeConfig);
		console.log(captcha.text)
    ctx.body={
			a: 1
		}
  }
}

module.exports = CompanyController;
