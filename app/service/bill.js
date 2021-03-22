'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs') 
class BillService extends Service {
  async list(filter, limit = 10, offset = 0, sorter) {
    const ctx = this.ctx;
    let sorterKey = 1
    if(!!sorter) {
      sorterKey = sorter.dueDate === "descend"?1:-1
    }
    const [ data, total ] = await Promise.all([
      ctx.model.Bill.find(filter).sort({"compName": sorterKey}).skip(offset).limit(limit)
        .lean()
        .exec(),
      ctx.model.Bill.countDocuments(filter)
        .lean()
        .exec(),
    ]);
    return { data, total, success: true, code: 0 };
  }
  async get(id) {
    const ctx = this.ctx;
    const doc = await ctx.model.Bill.findOne({ id }).lean().exec();
    return { code: 0, data: doc };
  }
  async add(data = {}) {
    const ctx = this.ctx;
    const comMod = await this.nameExist(data.billNumber)
    if (comMod) {
      return {
        code: 1,
        msg: '该发票已使用',
        success: false,
      };
    }
    const compId = ctx.request.header.compid 
    const user = await ctx.model.User.findOne({openid: data.openid}).exec()
    const BillModel = ctx.model.Bill({
      id: ctx.helper.generateId(),
      billCode: data.billCode,
      billNumber: data.billNumber,
      money: data.money,
      billDate: data.billDate,
      checkCode: data.checkCode,
      compId: compId,
      openid: data.openid,
      applyUser: data.applyUser,
      voucherNumber: data.voucherNumber,
      inputMethod: data.inputMethod,
      inputUser: user.userName
    });
    await BillModel.save();
    return { code: 0,success: true, msg: '添加成功'};
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const BillModel = await ctx.model.Bill.findOne({ id }).exec();
    if (!BillModel) {
      return {
        code: 1,
        msg: 'Bill不存在',
        success: false,
      };
    }
    if (typeof data.compName !== 'undefined') {
      BillModel.compName = data.compName;
    }
    if (typeof data.address !== 'undefined') {
      BillModel.address = data.address;
    }
    if (typeof data.bossName !== 'undefined') {
      BillModel.bossName = data.bossName;
    }
    if (typeof data.bossPhone !== 'undefined') {
      BillModel.bossPhone = data.bossPhone;
    }
    if (typeof data.dueDate !== 'undefined') {
      BillModel.dueDate = data.dueDate;
    }
    await BillModel.save();
    return { code: 0, success: true };
  }
  async remove(data) {
    const ctx = this.ctx;
    data.deleteArr.forEach(async (id)=>{
      const Bill = await ctx.model.Bill.findOne({ id }).exec();
      if (!Bill) {
        return {
          code: 0,
          msg: '该公司不存在',
        };
      }
      await Bill.remove();
    })
    return {
      code: 0,
      success: true,
    };
  }
  async billIsExit(billNumber) {
    // const filter
    const bill = await this.ctx.model.Bill.findOne({ billNumber }).exec();
    if(bill) {
      console.log('id', bill.id)
      return {
        code: 1,
        msg: '发票已存在'
      }
    }
    return {
      code: 0,
      msg: '发票不存在，可以录入'
    }
  }
  async nameExist(billNumber, id) {
    const ctx = this.ctx;
    const filter = {
      billNumber,
    };
    if (id) {
      filter.id = { $ne: id };
    }
    const Bill = await ctx.model.Bill.findOne(filter).lean().exec();
    return !!Bill;
  }
}
module.exports = BillService;
