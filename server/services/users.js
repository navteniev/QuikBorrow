const User = require('../models/User');

const findUser = async (id) => {
  return await User.findById(id);
};

const editUser = async (id, updated) =>{
  return await User.findByIdAndUpdate(id,
      {name: updated.name, email: updated.email}, {new: true});
};

module.exports = {
  findUser,
  editUser,
};
