const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createUser = async (data) => {
  const newUser = new User({
    name: data.name,
    email: data.email,
    password: data.password,
  });
  return await newUser.save();
};

const generateHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports = {
  createUser,
  generateHash,
};
