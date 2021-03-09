'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    id: String,
    name: String,
    desc: String,
    callPhone: String,
    password: String,
    imgUrl: String,
    token: String,
    wrongSubject: [ String ],
    doneSubject: [ String ],
    subjectTwo: [ Number ],
    subjectFour: [ Number ],
    role: [ String ],
    roleName: [ String ],
    creator: String,
    creatorName: String,
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
  });
  return mongoose.model('User', UserSchema);
};
