const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  isAdmin: { type: Boolean, default: false },
  avatar: { type: String },
  gender: { 
    type: String, 
    enum: ["Male", "Female"]
  },
  isActive: { type: Boolean, default: false },
  activationToken: { type: String },
  forgotPasswordToken: { type: String }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;