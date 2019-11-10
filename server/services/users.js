const User = require('../models/User');

const findUser = async (id) => {
  return await User.findById(id);
};

module.exports = {
  findUser,
};
