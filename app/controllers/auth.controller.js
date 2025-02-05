const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      gender,
      role,
      age,
      password,
      department,
    } = req.body;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !phoneNumber ||
      !gender ||
      !age ||
      !password
    ) {
      return res.status(400).send({ message: "Missing required fields." });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send({ message: "Email is already in use." });
    }

    const newUser = new User({
      firstname,
      lastname,
      email,
      phoneNumber,
      gender,
      role: role || "user",
      age,
      password: bcrypt.hashSync(password, 8),
      department,
    });

    await newUser.save();

    res.status(201).send({ message: "User was registered successfully!" });
  } catch (err) {
    console.error("Error during user signup:", err);
    res.status(500).send({ message: "Internal server error." });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      department: user.department,
      accessToken: token,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ message: err.message || "Some error occurred during signin." });
  }
};

exports.logout = async (req, res) => {
  try {
    // Need to implementing token blacklist
    res.status(200).send({ message: "User logged out successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Some error occurred during logout." });
  }
};
