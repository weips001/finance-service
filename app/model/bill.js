'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const BillSchema = new Schema({
    id: String,
    // 发票代码
    billCode: {
      type: String,
      required: true
    },
    // 发票号码
    billNumber: {
      type: String,
      required: true
    },
    // 发票金额
    money: {
      type: String,
      required: true
    },
    // 开票日期
    billDate: {
      type: String,
      required: true
    },
    // 校验码
    checkCode: {
      type: String,
      required: true
    },
    createTime: { 
      type: String,
      default: new Date().toString()
    },
    compId: {
      type: String,
      ref: "Company"
    },
    weId: String
  });
  return mongoose.model('Bill', BillSchema);
};
