'use strict';

const Service = require('egg').Service;
class PaymentOrderService extends Service {
  async list(filter, limit = 10, offset = 0, sorter) {
    const ctx = this.ctx;
    let sorterKey = 1
    if(!!sorter) {
      sorterKey = sorter.dueDate === "descend"?1:-1
    }
    const [ data, total ] = await Promise.all([
      ctx.model.PaymentOrder.find(filter).sort({"applyUserName": sorterKey}).skip(offset).limit(limit)
        .lean()
        .exec(),
      ctx.model.PaymentOrder.countDocuments(filter)
        .lean()
        .exec(),
    ]);
    return { data, total, success: true, code: 0 };
  }
  async get(id) {
    const ctx = this.ctx;
    const doc = await ctx.model.PaymentOrder.findOne({ id }).lean().exec();
    return { code: 0, data: doc };
  }
  async add(data = {}) {
    const ctx = this.ctx;
    const PaymentOrderModel = ctx.model.PaymentOrder({
      id: ctx.helper.generateId(),
      paymentOrderId: data.paymentOrderId,
      applyUserName: data.applyUserName,
      department: data.department,
      payDigest: data.payDigest,
      payableAll: data.payableAll,
      payMoney: data.payMoney,
      payedMoney: data.payedMoney,
      payMethod: data.payMethod,
      hasProvideInvoice: data.hasProvideInvoice,
      invoiceNote: data.invoiceNote,
      payeeName: data.payeeName,
      payeeBankName: data.payeeBankName,
      bankAccount: data.bankAccount,
      status: data.status,
      hasLastTime: data.hasLastTime,
      latestPayTime: data.latestPayTime,
      note: data.note,
      hasNote: data.note,
      payTime: data.payTime
    });
    await PaymentOrderModel.save();
    return { code: 0,success: true, msg: '添加成功'};
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const PaymentOrderModel = await ctx.model.PaymentOrder.findOne({ id }).exec();
    if (!PaymentOrderModel) {
      return {
        code: 1,
        msg: '该订单不存在',
        success: false,
      };
    }
    if (typeof data.paymentOrderId != 'undefined') {
      PaymentOrderModel.paymentOrderId = data.paymentOrderId;
    }
    if (typeof data.applyUserName != 'undefined') {
      PaymentOrderModel.applyUserName = data.applyUserName;
    }
    if (typeof data.department != 'undefined') {
      PaymentOrderModel.department = data.department;
    }
    if (typeof data.payDigest != 'undefined') {
      PaymentOrderModel.payDigest = data.payDigest;
    }
    if (typeof data.payableAll != 'undefined') {
      PaymentOrderModel.payableAll = data.payableAll;
    }
    if (typeof data.payedMoney != 'undefined') {
      PaymentOrderModel.payedMoney = data.payedMoney;
    }
    if (typeof data.payMoney != 'undefined') {
      PaymentOrderModel.payMoney = data.payMoney;
    }
    if (typeof data.payMethod != 'undefined') {
      PaymentOrderModel.payMethod = data.payMethod;
    }
    if (typeof data.hasProvideInvoice != 'undefined') {
      PaymentOrderModel.hasProvideInvoice = data.hasProvideInvoice;
    }
    if (typeof data.invoiceNote != 'undefined') {
      PaymentOrderModel.invoiceNote = data.invoiceNote;
    }
    if (typeof data.payeeName != 'undefined') {
      PaymentOrderModel.payeeName = data.payeeName;
    }
    if (typeof data.payeeBankName != 'undefined') {
      PaymentOrderModel.payeeBankName = data.payeeBankName;
    }
    if (typeof data.bankAccount != 'undefined') {
      PaymentOrderModel.bankAccount = data.bankAccount;
    }
    if (typeof data.status != 'undefined') {
      PaymentOrderModel.status = data.status;
    }
    if (typeof data.hasLastTime != 'undefined') {
      PaymentOrderModel.hasLastTime = data.hasLastTime;
    }
    if (typeof data.latestPayTime != 'undefined') {
      PaymentOrderModel.latestPayTime = data.latestPayTime;
    }
    if (typeof data.hasNote != 'undefined') {
      PaymentOrderModel.hasNote = data.hasNote;
    }
    if (typeof data.note != 'undefined') {
      PaymentOrderModel.note = data.note;
    }
    if (typeof data.payTime != 'undefined') {
      PaymentOrderModel.payTime = data.payTime;
    }

    await PaymentOrderModel.save();
    return { code: 0, success: true };
  }
  async remove(data) {
    const ctx = this.ctx;
    data.deleteArr.forEach(async (id)=>{
      const PaymentOrder = await ctx.model.PaymentOrder.findOne({ id }).exec();
      if (!PaymentOrder) {
        return {
          code: 0,
          msg: '该订单不存在',
        };
      }
      await PaymentOrder.remove();
    })
    return {
      code: 0,
      success: true,
    };
  }
  async submit(id) {
    const PaymentOrderModel = await this.ctx.model.PaymentOrder.findOne({ id }).exec();
    if (!PaymentOrderModel) {
      return {
        code: 1,
        msg: '该订单不存在',
        success: false,
      };
    }
    if(PaymentOrderModel.status === '0') {
      PaymentOrderModel.status = '1';
      await PaymentOrderModel.save()
      return {
        code: 0,
        msg: '订单提交成功'
      };
    }
    return {
      code: 1,
      msg: '订单当前状态无法提交'
    };
  }
  async nameExist(paymentOrderNumber, id) {
    const ctx = this.ctx;
    const filter = {
      paymentOrderNumber,
    };
    if (id) {
      filter.id = { $ne: id };
    }
    const PaymentOrder = await ctx.model.PaymentOrder.findOne(filter).lean().exec();
    return !!PaymentOrder;
  }
}
module.exports = PaymentOrderService;
