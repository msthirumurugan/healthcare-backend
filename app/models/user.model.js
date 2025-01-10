const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Firstname is required'],
    trim: true,
    minlength: [2, 'Firstname must be at least 2 characters'],
    maxlength: [50, 'Firstname cannot exceed 50 characters'],
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required'],
    trim: true,
    minlength: [2, 'Lastname must be at least 2 characters'],
    maxlength: [50, 'Lastname cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      'Please provide a valid email address',
    ],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    match: [
      /^[0-9]{10}$/,
      'Phone number must be 10 digits',
    ],
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
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age must be less than or equal to 120'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  department: {
    type: String,
  }
}, { timestamps: true });

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
