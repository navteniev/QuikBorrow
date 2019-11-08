const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const userServices = require('../services/users');

const login = (req, res, next) => {
  const payload = {
    id: req.user.id,
    name: req.user.name,
  };

  const options = {
    expiresIn: 31556926,
  };

  // Sign token, expires in 1 year
  jwt.sign(payload, keys.secretOrKey, options, (err, token) => {
    if (err) {
      return next(err);
    }
    res.json({success: true, token: 'Bearer ' + token});
  });
};


const register = async (req, res, next) => {
  const {name, email, password} = req.body;
  try {
    const hashedPassword = await userServices.generateHash(password);
    const user = {name, email, password: hashedPassword};
    await userServices.createUser(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
};
