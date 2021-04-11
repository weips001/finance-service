'use strict';
const JWT = require('jsonwebtoken');

module.exports = options => {
  return async function(ctx, next) {
    if(ctx.url === '/api/login'|| '/api/wxGetToken' || '/api/user') {
      await next()
      return
    }
    const token = ctx.request.header.token;
    let decode= null;
    if (token) {
      try {
        // 解码token
        decode = ctx.app.jwt.verify(token, options.secret);
        await next();
      } catch (error) {
        ctx.status = 200;
        if(error.message === 'jwt expired') {
          ctx.body = {
            code: "Unauthorized",
            message: 'Token已过期,请重新登陆'
          };
        } else if(error.message === 'invalid signature') {
          ctx.body = {
            code: "Unauthorized",
            message: '一个假冒的Token,一边玩去'
          };
        } else {
          ctx.body = {
            code: "Unauthorized",
            message: '无效的token'
          };
        }     
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        message: '没有token',
      };
      return;
    } 
  }
}
