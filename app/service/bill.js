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
    const comMod = await this.nameExist(data.compName)
    if (comMod) {
      return {
        code: 1,
        msg: '该公司已存在',
        success: false,
      };
    }
    const BillModel = ctx.model.Bill({
      id: ctx.helper.generateId(),
      compName: data.compName,
      status: 0,
      address: data.address,
      bossName: data.bossName,
      bossPhone: data.bossPhone,
      dueDate: dayjs().add(30, 'day').format(),
    });
    await BillModel.save();
    return { code: 0 };
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
  async nameExist(compName, id) {
    const ctx = this.ctx;
    const filter = {
      compName,
    };
    if (id) {
      filter.id = { $ne: id };
    }
    const Bill = await ctx.model.Bill.findOne(filter).lean().exec();
    return !!Bill;
  }
}
module.exports = BillService;
