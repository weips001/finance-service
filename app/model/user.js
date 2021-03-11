'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    id: Schema.Types.ObjectId,
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
    compId: {
      type: Schema.Types.ObjectId,
      ref: "Company"
    }
  });
  return mongoose.model('User', UserSchema);
};
