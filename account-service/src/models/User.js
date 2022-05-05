const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
  name: { type: String },
  profileImage: { type: String },
  gender: { 
    type: String, 
    enum: ["Male", "Female"]
  },
  age: { type: Number },
  bio: { type: String },
  phoneNumber: { type: String },
  shippingAddress: {
    address: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;