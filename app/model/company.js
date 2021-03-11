'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const CompanySchema = new Schema({
    id: String,
    compName: {
      type: String,
      require: true
    },
    status: String,
    address: String,
    bossName: String,
    bossPhone: String,
    dueDate: Date,
    createTime: {
      type: String,
      default: new Date().toString()
    }
  })
  return mongoose.model('Company', CompanySchema);
};
