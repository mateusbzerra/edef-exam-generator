const { Schema, model } = require('mongoose');

const DisciplineSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    workload: {
      type: Number,
      required: true
    },
    activeUser: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Discipline', DisciplineSchema);
