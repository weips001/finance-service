'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    id: String,
    userCode: String,
    userName: {
      type: String,
      required: true
    },
    department: String,
    userPhone: {
      type: String,
      required: true
    },
    userEmail: String,
    createTime: { 
      type: String,
      default: new Date().toString()
    },
    status: {
      // 0 - 在职 1 - 离职
      type: String,
      default: '0'
    },
    // 不应返回在数据中
    password: {
      // 密码应该使用某种加密方式进行储存
      type: String
    },
    compId: {
      type: String,
      ref: "Company"
    },
    token: String,
    code: String
  });
  return mongoose.model('User', UserSchema);
};
