// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBill = require('../../../app/controller/bill');
import ExportCompany = require('../../../app/controller/company');
import ExportInit = require('../../../app/controller/init');
import ExportLogin = require('../../../app/controller/login');
import ExportPaymentOrder = require('../../../app/controller/paymentOrder');
import ExportRole = require('../../../app/controller/role');
import ExportSpecialExercises = require('../../../app/controller/specialExercises');
import ExportSubject = require('../../../app/controller/subject');
import ExportTest = require('../../../app/controller/test');
import ExportUser = require('../../../app/controller/user');
import ExportWxLogin = require('../../../app/controller/wxLogin');

declare module 'egg' {
  interface IController {
    bill: ExportBill;
    company: ExportCompany;
    init: ExportInit;
    login: ExportLogin;
    paymentOrder: ExportPaymentOrder;
    role: ExportRole;
    specialExercises: ExportSpecialExercises;
    subject: ExportSubject;
    test: ExportTest;
    user: ExportUser;
    wxLogin: ExportWxLogin;
  }
}
