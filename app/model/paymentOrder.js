'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PaymentOrderSchema = new Schema({
    id: String,
    // 付款单号 规则：F+日期+流水号  eg：F202103130001
    paymentOrderId: String,
    // 申请人
    applyUserName: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    createTime: {
      type: String,
      default: new Date().toString()
    },
    // 付款摘要
    payDigest: {
      type: String,
      required: true
    },
    // 应付款总金额
    payableAll: {
      type: Number,
      required: true
    },
    // 累计已付款金额
    payedMoney: {
      type: Number,
      required: true
    },
    // 付款方式 0 - 转账 1 - 承兑
    payMethod: String,
    // 本次付款金额
    payMoney: {
      type: Number,
      required: true
    },
    // 是否提供发票及时间 0 - 否 1 - 已提供 2 - 付款后提供 3 - 自定义
    hasProvideInvoice: {
      type: String,
      required: true
    },
    // 付款自定义信息
    invoiceNote: String,
    // 收款人全称
    payeeName: {
      type: String,
      required: true
    },
    // 收款人开户银行
    payeeBankName: {
      type: String,
      required: true
    },
    // 账号
    bankAccount: {
      type: String,
      required: true
    },
    
    // 付款单状态 0-草稿状态 1-已提交 2-已退回 3-已完成 
    status: String,
    // 是否有最晚付款时间 0 - 是 1 - 否
    hasLastTime: {
      type: String,
      required: true
    },
    // 最晚付款时间
    latestPayTime: String,
    // 是否备注 0 - 是 1 - 否
    hasNote: String,
    // 备注
    note: String,
    payTime: String
  })
  return mongoose.model('PaymentOrder', PaymentOrderSchema);
};
