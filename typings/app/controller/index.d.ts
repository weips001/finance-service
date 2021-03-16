// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBill = require('../../../app/controller/bill');
import ExportCompany = require('../../../app/controller/company');
import ExportHome = require('../../../app/controller/home');
import ExportRole = require('../../../app/controller/role');
import ExportSpecialExercises = require('../../../app/controller/specialExercises');
import ExportSubject = require('../../../app/controller/subject');
import ExportUser = require('../../../app/controller/user');
import ExportWxLogin = require('../../../app/controller/wxLogin');

declare module 'egg' {
  interface IController {
    bill: ExportBill;
    company: ExportCompany;
    home: ExportHome;
    role: ExportRole;
    specialExercises: ExportSpecialExercises;
    subject: ExportSubject;
    user: ExportUser;
    wxLogin: ExportWxLogin;
  }
}
