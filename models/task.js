const { Schema, model } = require("mongoose");

const taskSchema = Schema({
  note: {
    type: String,
    required: [true, "Note is required"],
  },
  user: {
      type: Schema.Types.ObjectId,
      ref:'User',
      required: true
  }
});

module.exports = model('Task', taskSchema)