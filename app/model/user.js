'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    id: String,
    userName: String,
    department: String,
    userPhone: String,
    userEmail: String,
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
  });
  return mongoose.model('User', UserSchema);
};
