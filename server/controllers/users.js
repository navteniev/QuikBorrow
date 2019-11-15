const userServices = require('../services/users');

// eslint-disable-next-line valid-jsdoc
/** @type {import('express').RequestHandler} */
const login = (req, res, next) => {
  const payload = {
    id: req.user.id,
    name: req.user.name,
  };

  return userServices.getJwtToken(payload)
      .then((token) => res.json({success: true, token: 'Bearer ' + token}))
      .catch(next);
};

// eslint-disable-next-line valid-jsdoc
/** @type {import('express').RequestHandler} */
const register = async (req, res, next) => {
  const {name, email, password} = req.body;
  try {
    const hashedPassword = await userServices.generateHash(password);
    const user = {name, email, password: hashedPassword};
    const createdUser = await userServices.createUser(user);
    res.json(createdUser);
  } catch (err) {
    next(err);
  }
};

const get = (req, res, next) => {
  return userServices.findUser(req.params.userId)
      .then((user) => res.json(user))
      .catch(next);
};

const edit = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  userServices.editUser(req.params.userId, {email: email, name: name})
      .then((user) => res.json(user))
      .catch(next);
};


const getLendingList = async (req, res, next) => {
  userServices.getLendingList(req.params.userId)
      .then((lendingList) => {
        console.log(lendingList);
        res.json(lendingList);
      })
      .catch(next);
};

module.exports = {
  login,
  register,
  get,
  edit,
  getLendingList,
};
