// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportJwt = require('../../../app/middleware/jwt');
import ExportJwtCopy = require('../../../app/middleware/jwtCopy');

declare module 'egg' {
  interface IMiddleware {
    jwt: typeof ExportJwt;
    jwtCopy: typeof ExportJwtCopy;
  }
}
