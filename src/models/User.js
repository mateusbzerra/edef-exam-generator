const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phone: String,
    admin: {
      type: Boolean,
      default: false
    },
    avatar: String
  },
  {
    timestamps: true
  }
);

UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  }
};

UserSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
  }
};

module.exports = model('User', UserSchema);
