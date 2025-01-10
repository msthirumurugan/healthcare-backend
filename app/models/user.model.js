const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Firstname is required'],
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other'], // You can adjust options as needed
  },
  role:{
    type: String,
    required: [true, 'role is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  department: {
    type: String,
  }
}, { timestamps: true });

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
