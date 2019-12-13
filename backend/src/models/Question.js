const { Schema, model } = require('mongoose');

const QuestionSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    alternatives: {
      type: [String],
      required: true
    },
    awnser: {
      type: Number,
      required: true
    },
    discipline: {
      type: Schema.Types.ObjectId,
      ref: 'Discipline',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Question', QuestionSchema);
