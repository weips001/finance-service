'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const RoleSchema = new Schema({
    id: String,
    name: String,
    auth: [ String ],
    desc: String,
    creator: String,
    creatorName: String,
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
  });
  return mongoose.model('Role', RoleSchema);
};
