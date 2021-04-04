'use strict';
const JWT = require('jsonwebtoken');

module.exports = options => {
  return async function(ctx, next) {
    const token = ctx.request.header.authorization;
    const method = ctx.method.toLowerCase();
    console.log(88888)
    if (method === 'get') {
      await next();
    } else if (!token) {
      if (ctx.path === '/api/v1/signup' || ctx.path === '/api/v1/signin') {
        await next();
      } else {
        console.log(144444444444)
        ctx.throw(402, '未登录, 请先登录!!!');
      }
    } else {
      let decode;
      try {
        decode = JWT.verify(token, options.secret);
        if (!decode || !decode.userName) {
          ctx.throw(402, '没有权限，请登录');
        }
        if (Date.now() - decode.expire > 0) {
          ctx.throw(402, 'Token已过期');
        }
        const user = await ctx.model.User.find({
          userName: decode.userName,
        });
        if (user) {
          await next();
        } else {
          ctx.throw('402', '用户信息验证失败');
        }
      } catch (e) {
        console.log(388888888888888)
        console.log(e);
      }
    }
  };
};
