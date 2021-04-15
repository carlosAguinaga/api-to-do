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
  },
  done: {
    type: Boolean,
    required: [true, "done is required"],
    default: false
  }
});

module.exports = model('Task', taskSchema)