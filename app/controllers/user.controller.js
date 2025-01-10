const User = require('../models/user.model');

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.getDoctors = async (req,res) => {
  const data = await User.find({role: "doctor"})
  return res.status(200).json(data)
}
