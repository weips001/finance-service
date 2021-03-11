'use strict';

const Service = require('egg').Service;
const dayjs = require('dayjs') 
class CompanyService extends Service {
  async list(filter, limit = 10, offset = 0, sorter) {
    const ctx = this.ctx;
    let sorterKey = 1
    if(!!sorter) {
      sorterKey = sorter.dueDate === "descend"?1:-1
    }
    const [ data, total ] = await Promise.all([
      ctx.model.Company.find(filter).sort({"compName": sorterKey}).skip(offset).limit(limit)
        .lean()
        .exec(),
      ctx.model.Company.countDocuments(filter)
        .lean()
        .exec(),
    ]);
    return { data, total, success: true, code: 0 };
  }
  async get(id) {
    const ctx = this.ctx;
    const doc = await ctx.model.Company.findOne({ id }).lean().exec();
    return { code: 0, data: doc };
  }
  async add(data = {}) {
    const ctx = this.ctx;
    const comMod = await this.nameExist(data.compName)
    if (!comMod) {
      return {
        code: 1,
        msg: '该公司已存在',
      };
    }
    const CompanyModel = ctx.model.Company({
      id: ctx.helper.generateId(),
      compName: data.compName,
      status: data.status,
      address: data.address,
      bossName: data.bossName,
      bossPhone: data.bossPhone,
      dueDate: dayjs().add(30, 'day').format(),
    });
    await CompanyModel.save();
    return { code: 0 };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const CompanyModel = await ctx.model.Company.findOne({ id }).exec();
    if (!CompanyModel) {
      return {
        code: 1,
        msg: 'Company不存在',
      };
    }
    if (typeof data.compName !== 'undefined') {
      CompanyModel.compName = data.compName;
    }
    if (typeof data.status !== 'undefined') {
      CompanyModel.status = data.status;
    }
    if (typeof data.address !== 'undefined') {
      CompanyModel.address = data.address;
    }
    if (typeof data.bossName !== 'undefined') {
        CompanyModel.bossName = data.bossName;
    }
    if (typeof data.bossPhone !== 'undefined') {
    CompanyModel.bossPhone = data.bossPhone;
    }
    if (typeof data.dueDate !== 'undefined') {
    CompanyModel.dueDate = data.dueDate;
    }
    await CompanyModel.save();
    return { code: 0 };
  }
  async remove(data) {
    const ctx = this.ctx;
    data.deleteArr.forEach(async (id)=>{
      const Company = await ctx.model.Company.findOne({ id }).exec();
      if (!Company) {
        return {
          code: 0,
          msg: '该公司不存在',
        };
      }
      await Company.remove();
    })
    return {
      code: 0,
    };
  }
  async nameExist(name, id) {
    const ctx = this.ctx;
    const filter = {
      name,
    };
    if (id) {
      filter.id = { $ne: id };
    }
    const Company = await ctx.model.Company.findOne(filter).lean().exec();
    return !!Company;
  }
}
module.exports = CompanyService;
