'use strict';

const Service = require('egg').Service;
// const http = require('http');
// const request = require('request');
// const fs = require('fs');
const {
  vipOne
} = require('./vip');
const {
  vipFour
} = require('./vip');
class SubjectService extends Service {
  async list(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.Subject.find(filter).skip(offset).limit(limit)
      .lean()
      .exec(),
      ctx.model.Subject.countDocuments(filter)
      .lean()
      .exec(),
    ]);
    return {
      list,
      total,
    };
  }
  async listOne(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.SubjectOne.find(filter).skip(offset).limit(limit)
      .lean()
      .exec(),
      ctx.model.SubjectOne.countDocuments(filter)
      .lean()
      .exec(),
    ]);
    return {
      list,
      total,
    };
  }
  async listFour(filter, limit = 10, offset = 0) {
    const ctx = this.ctx;
    const [list, total] = await Promise.all([
      ctx.model.SubjectFour.find(filter).skip(offset).limit(limit)
      .lean()
      .exec(),
      ctx.model.SubjectFour.countDocuments(filter)
      .lean()
      .exec(),
    ]);
    return {
      list,
      total,
    };
  }

  async listOneVip() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectOne.find({
      id: {
        $in: vipOne
      },
    });
    return {
      list,
      total: list.length,
    };
  }
  async listFourVip() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectFour.find({
      id: {
        $in: vipFour
      },
    });
    return {
      list,
      code: 0,
    };
  }


  async get(id) {
    const ctx = this.ctx;
    const doc = await ctx.model.Subject.findOne({
      _id: id,
    }).lean().exec();
    return doc;
  }
  async add(data = {}) {
    const ctx = this.ctx;
    const exist = await this.nameExist(data.name, data._id);
    if (exist) {
      return {
        code: 1,
        msg: 'name名重复',
      };
    }
    const subjectModel = ctx.model.Subject({
      id: ctx.helper.generateId(),
      name: data.name,
    });
    await subjectModel.save();
    return {
      code: 0,
    };
  }
  async wrongOne(data = {}) {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectOne.find({
      id: {
        $in: data
      },
    });
    return {
      list,
      code: 0,
    };
  }
  async wrongFour(data = {}) {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectFour.find({
      id: {
        $in: data
      },
    });
    return {
      list,
      code: 0,
    };
  }
  async collectionOne(data = {}) {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectOne.find({
      id: {
        $in: data
      },
    });
    return {
      list,
      code: 0,
    };
  }
  async collectionFour(data = {}) {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectFour.find({
      id: {
        $in: data
      },
    });
    return {
      list,
      code: 0,
    };
  }
  async update(id, data = {}) {
    const ctx = this.ctx;
    const subjectModel = await ctx.model.Subject.findOne({
      _id: id,
    }).exec();
    if (!subjectModel) {
      return {
        code: 1,
        msg: 'Subject不存在',
      };
    }
    const exist = await this.nameExist(data.name, data._id);
    if (exist) {
      return {
        code: 1,
        msg: 'name名重复',
      };
    }
    if (typeof data.name !== 'undefined') {
      subjectModel.name = data.name;
    }
    await subjectModel.save();
    return {
      code: 0,
    };
  }
  async remove(id) {
    const ctx = this.ctx;
    const subject = await ctx.model.Subject.findOne({
      _id: id,
    }).exec();
    if (!subject) {
      return {
        code: 0,
        msg: '该题目不存在',
      };
    }
    await subject.remove();
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
      filter.id = {
        $ne: id,
      };
    }
    const subject = await ctx.model.Subject.findOne(filter).lean().exec();
    return !!subject;
  }
  async getFiftySubject() {
    const ctx = this.ctx;
    const list = await ctx.model.Subject.aggregate([{
      $sample: {
        size: 50,
      },
    }]).exec();
    return {
      list,
      total: 50,
    };
  }
  async getFiftySubjectOne() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectOne.aggregate([{
      $sample: {
        size: 50,
      },
    }]).exec();
    return {
      list,
      total: 50,
    };
  }
  async getFiftySubjectFour() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectFour.aggregate([{
      $sample: {
        size: 50,
      },
    }]).exec();
    return {
      list,
      total: 50,
    };
  }
  async mockSubjectOne() {
    const ctx = this.ctx;
    const listJudge = await ctx.model.SubjectOne.aggregate([{
      $match: {
        Type: '1',
      },
    }, {
      $sample: {
        size: 40,
      },
    }]).exec();
    const listSingleElection = await ctx.model.SubjectOne.aggregate([{
      $match: {
        Type: '2',
      },
    }, {
      $sample: {
        size: 60,
      },
    }]).exec();
    const list = [...listJudge, ...listSingleElection];
    return {
      list,
      total: 100,
    };
  }
  async mockSubjectFour() {
    const ctx = this.ctx;
    const listJudge = await ctx.model.SubjectFour.aggregate([{
      $match: {
        Type: '1',
      },
    }, {
      $sample: {
        size: 20,
      },
    }]).exec();
    const listSingleElection = await ctx.model.SubjectFour.aggregate([{
      $match: {
        Type: '2',
      },
    }, {
      $sample: {
        size: 20,
      },
    }]).exec();
    const listMultipleSelection = await ctx.model.SubjectFour.aggregate([{
      $match: {
        Type: '3',
      },
    }, {
      $sample: {
        size: 10,
      },
    }]).exec();
    const list = [...listJudge, ...listSingleElection, ...listMultipleSelection];
    return {
      list,
      total: 50,
    };
  }
  async getWrongSubject(id) {
    const ctx = this.ctx;
    const doc = await ctx.model.User.findOne({
      id,
    }, {
      wrongSubject: 1,
    }).lean().exec();
    const list = await ctx.model.Subject.find({
      id: {
        $in: doc,
      },
    });
    return {
      list,
      total: doc.lengt,
    };
  }
  async addSubjectOne() {
    const ctx = this.ctx;
    let num = 0
    for (let i = 1; i <= 973; i++) {
      try {
        const data = await ctx.http.get(`http://mnks.jxedt.com/get_question?index=${i}`);
        if (data.sinaimg.indexOf('http') > -1) {
          data.sinaimg = data.sinaimg.replace('http', 'https');
          const name = data.sinaimg.slice(data.sinaimg.lastIndexOf('/') + 1);
          data.sinaimg = 'https://yilianguo.com/static/images/' + name;
        }
        if (data.options) {
          data.options = data.options.split(',');
        }
        data.topicIndex = num;
        num++
        const subjectModel = ctx.model.SubjectOne(JSON.parse(JSON.stringify(data)));
        await subjectModel.save();
      } catch (e) {
        console.log(e);
      }
    }
    for (let i = 2541; i <= 2640; i++) {
      try {
        const data = await ctx.http.get(`http://mnks.jxedt.com/get_question?index=${i}`);
        if (data.sinaimg.indexOf('http') > -1) {
          data.sinaimg = data.sinaimg.replace('http', 'https');
          const name = data.sinaimg.slice(data.sinaimg.lastIndexOf('/') + 1);
          data.sinaimg = 'https://yilianguo.com/static/images/' + name;
        }
        if (data.options) {
          data.options = data.options.split(',');
        }
        data.topicIndex = num;
        num++
        const subjectModel = ctx.model.SubjectOne(JSON.parse(JSON.stringify(data)));
        await subjectModel.save();
      } catch (e) {
        console.log(e);
      }
    }
    for (let i = 7674; i <= 7829; i++) {
      try {
        const data = await ctx.http.get(`http://mnks.jxedt.com/get_question?index=${i}`);
        if (data.sinaimg.indexOf('http') > -1) {
          data.sinaimg = data.sinaimg.replace('http', 'https');
          const name = data.sinaimg.slice(data.sinaimg.lastIndexOf('/') + 1);
          data.sinaimg = 'https://yilianguo.com/static/images/' + name;
        }
        if (data.options) {
          data.options = data.options.split(',');
        }
        data.topicIndex = num;
        num++
        const subjectModel = ctx.model.SubjectOne(JSON.parse(JSON.stringify(data)));
        await subjectModel.save();
      } catch (e) {
        console.log(e);
      }
    }
    for (let i = 13474; i <= 13554; i++) {
      try {
        const data = await ctx.http.get(`http://mnks.jxedt.com/get_question?index=${i}`);
        if (data.sinaimg.indexOf('http') > -1) {
          data.sinaimg = data.sinaimg.replace('http', 'https');
          const name = data.sinaimg.slice(data.sinaimg.lastIndexOf('/') + 1);
          data.sinaimg = 'https://yilianguo.com/static/images/' + name;
        }
        if (data.options) {
          data.options = data.options.split(',');
        }
        data.topicIndex = num;
        num++
        const subjectModel = ctx.model.SubjectOne(JSON.parse(JSON.stringify(data)));
        await subjectModel.save();
      } catch (e) {
        console.log(e);
      }
    }
    for (let i = 13594; i <= 13613; i++) {
      try {
        const data = await ctx.http.get(`http://mnks.jxedt.com/get_question?index=${i}`);
        if (data.sinaimg.indexOf('http') > -1) {
          data.sinaimg = data.sinaimg.replace('http', 'https');
          const name = data.sinaimg.slice(data.sinaimg.lastIndexOf('/') + 1);
          data.sinaimg = 'https://yilianguo.com/static/images/' + name;
        }
        if (data.options) {
          data.options = data.options.split(',');
        }
        data.topicIndex = num;
        num++
        const subjectModel = ctx.model.SubjectOne(JSON.parse(JSON.stringify(data)));
        await subjectModel.save();
      } catch (e) {
        console.log(e);
      }
    }
    for (let i = 16509; i <= 16511; i++) {
      try {
        const data = await ctx.http.get(`http://mnks.jxedt.com/get_question?index=${i}`);
        if (data.sinaimg.indexOf('http') > -1) {
          data.sinaimg = data.sinaimg.replace('http', 'https');
          const name = data.sinaimg.slice(data.sinaimg.lastIndexOf('/') + 1);
          data.sinaimg = 'https://yilianguo.com/static/images/' + name;
        }
        if (data.options) {
          data.options = data.options.split(',');
        }
        data.topicIndex = num;
        num++
        const subjectModel = ctx.model.SubjectOne(JSON.parse(JSON.stringify(data)));
        await subjectModel.save();
      } catch (e) {
        console.log(e);
      }
    }
    for (let i = 22670; i <= 22775; i++) {
      try {
        const data = await ctx.http.get(`http://mnks.jxedt.com/get_question?index=${i}`);
        if (data.sinaimg.indexOf('http') > -1) {
          data.sinaimg = data.sinaimg.replace('http', 'https');
          const name = data.sinaimg.slice(data.sinaimg.lastIndexOf('/') + 1);
          data.sinaimg = 'https://yilianguo.com/static/images/' + name;
        }
        if (data.options) {
          data.options = data.options.split(',');
        }
        data.topicIndex = num;
        num++
        const subjectModel = ctx.model.SubjectOne(JSON.parse(JSON.stringify(data)));
        await subjectModel.save();
      } catch (e) {
        console.log(e);
      }
    }
  }
  async addSubjectFour() {
    const ctx = this.ctx;
    let num = 0;
    for (let i = 1537; i <= 2740; i++) {
      try {
        const data = await ctx.http.get(`http://mnks.jxedt.com/get_question?index=${i}`);
        if (data.sinaimg.indexOf('http') > -1) {
          data.sinaimg = data.sinaimg.replace('http', 'https');
          const name = data.sinaimg.slice(data.sinaimg.lastIndexOf('/') + 1);
          data.sinaimg = 'https://yilianguo.com/static/images/' + name;
        }
        if (data.options) {
          data.options = data.options.split(',');
        }
        data.topicIndex = num;
        num++
        const subjectModel = ctx.model.SubjectFour(JSON.parse(JSON.stringify(data)));
        await subjectModel.save();
      } catch (e) {
        console.log(e);
      }
    }
    for (let i = 13555; i <= 13593; i++) {
      try {
        const data = await ctx.http.get(`http://mnks.jxedt.com/get_question?index=${i}`);
        if (data.sinaimg.indexOf('http') > -1) {
          data.sinaimg = data.sinaimg.replace('http', 'https');
          const name = data.sinaimg.slice(data.sinaimg.lastIndexOf('/') + 1);
          data.sinaimg = 'https://yilianguo.com/static/images/' + name;
        }
        if (data.options) {
          data.options = data.options.split(',');
        }
        data.topicIndex = num;
        num++
        const subjectModel = ctx.model.SubjectFour(JSON.parse(JSON.stringify(data)));
        await subjectModel.save();
      } catch (e) {
        console.log(e);
      }
    }
    for (let i = 13898; i < 14009; i++) {
      try {
        const data = await ctx.http.get(`http://mnks.jxedt.com/get_question?index=${i}`);
        if (data.sinaimg.indexOf('http') > -1) {
          data.sinaimg = data.sinaimg.replace('http', 'https');
          const name = data.sinaimg.slice(data.sinaimg.lastIndexOf('/') + 1);
          data.sinaimg = 'https://yilianguo.com/static/images/' + name;
        }
        if (data.options) {
          data.options = data.options.split(',');
        }
        data.topicIndex = num;
        num++
        const subjectModel = ctx.model.SubjectFour(JSON.parse(JSON.stringify(data)));
        await subjectModel.save();
      } catch (e) {
        console.log(e);
      }
    }
  }
  async deleteAllSubject() {
    const ctx = this.ctx;
    const subjectModel = ctx.model.Subject.find();
    await subjectModel.deleteMany();
  }
  async deleteSubjectOne() {
    const ctx = this.ctx;
    const subjectModel = ctx.model.SubjectOne.find();
    await subjectModel.deleteMany();
  }
  async deleteSubjectFour() {
    const ctx = this.ctx;
    const subjectModel = ctx.model.SubjectFour.find();
    await subjectModel.deleteMany();
  }
}
module.exports = SubjectService;