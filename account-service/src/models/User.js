const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  name: { type: String, required: true },
  profileImage: { type: String },
  gender: { 
    type: String, 
    enum: ["Male", "Female"],
    required: true,
  },
  age: { type: Number },
  bio: { type: String },
  phoneNumber: { type: String, required: true },
  shippingAddress: {
    address: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;