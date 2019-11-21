const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');
const Item = require('../models/Item');
const JWT_OPTIONS = {
  expiresIn: 31556926,
};

const getJwtToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, keys.secretOrKey, JWT_OPTIONS, (err, token) => {
      return err ? reject(err) : resolve(token);
    });
  });
};

const verifyJwtToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, keys.secretOrKey, (err, decoded) => {
      return err ? reject(err) : resolve(decoded);
    });
  });
};

const findUserByEmail = (email) => {
  return User.findOne({email});
};

const findUser = async (id) => {
  return await User.findById(id);
};

const editUser = async (id, updated) =>{
  return await User.findByIdAndUpdate(id,
      {name: updated.name, email: updated.email}, {new: true});
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
  const hash = await bcrypt.hash(value, salt);
  return hash;
};

const getLendingList = async (userId) => {
  // const user = await User.findById(userId);
  const casted = new mongoose.Types.ObjectId(userId);
  const lendingList = await Item.find({'user': casted});
  return lendingList;
};


module.exports = {
  getJwtToken,
  createUser,
  generateHash,
  findUserByEmail,
  findUser,
  editUser,
  getLendingList,
  verifyJwtToken,
};
