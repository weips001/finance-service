'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const TestSchema = new Schema({
    name: {
      type: String,
      required: [true, "姓名必填"]
    },
    age: {
      type: Number,
      required: [true, "年龄必填"]
    }
  })
  return mongoose.model('Test', TestSchema);
};
