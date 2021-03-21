// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBill = require('../../../app/model/bill');
import ExportCompany = require('../../../app/model/company');
import ExportPaymentOrder = require('../../../app/model/paymentOrder');
import ExportRole = require('../../../app/model/role');
import ExportSubject = require('../../../app/model/subject');
import ExportSubjectFour = require('../../../app/model/subjectFour');
import ExportSubjectOne = require('../../../app/model/subjectOne');
import ExportTest = require('../../../app/model/test');
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    Bill: ReturnType<typeof ExportBill>;
    Company: ReturnType<typeof ExportCompany>;
    PaymentOrder: ReturnType<typeof ExportPaymentOrder>;
    Role: ReturnType<typeof ExportRole>;
    Subject: ReturnType<typeof ExportSubject>;
    SubjectFour: ReturnType<typeof ExportSubjectFour>;
    SubjectOne: ReturnType<typeof ExportSubjectOne>;
    Test: ReturnType<typeof ExportTest>;
    User: ReturnType<typeof ExportUser>;
  }
}
