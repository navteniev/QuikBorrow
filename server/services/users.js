const bcrypt = require('bcryptjs');
const User = require('../models/User');

const findUserByEmail = (email) => {
  return User.findOne({email}).exec();
};

const findUser = async (id) => {
  return await User.findById(id);
};

const createUser = async (data) => {
  const newUser = new User({
    name: data.name,
    email: data.email,
    password: data.password,
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
  findUser,
};
