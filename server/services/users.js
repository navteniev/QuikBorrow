const bcrypt = require('bcryptjs');
const User = require('../models/User');

const findUserByEmail = (email) => {
  return User.find({email}).exec();
};

const createUser = async (data) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  await newUser.save();
  return newUser;
};

const generateHash = async (value) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(value, salt);
  return hash;
};

module.exports = {
  createUser,
  generateHash,
  findUserByEmail,
};
