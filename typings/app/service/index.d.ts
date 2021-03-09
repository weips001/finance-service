// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportCompany = require('../../../app/service/company');
import ExportRole = require('../../../app/service/role');
import ExportSpecialExercises = require('../../../app/service/specialExercises');
import ExportSubject = require('../../../app/service/subject');
import ExportUser = require('../../../app/service/user');
import ExportVip = require('../../../app/service/vip');

declare module 'egg' {
  interface IService {
    company: AutoInstanceType<typeof ExportCompany>;
    role: AutoInstanceType<typeof ExportRole>;
    specialExercises: AutoInstanceType<typeof ExportSpecialExercises>;
    subject: AutoInstanceType<typeof ExportSubject>;
    user: AutoInstanceType<typeof ExportUser>;
    vip: AutoInstanceType<typeof ExportVip>;
  }
}
