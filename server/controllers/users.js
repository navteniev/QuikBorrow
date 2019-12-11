const userServices = require('../services/users');
const itemServices = require('../services/items');
const keys = require('../config/keys');

/**
 * @typedef {import('express').RequestHandler} RequestHandler
 */

/** @type {RequestHandler} */
const login = (req, res, next) => {
  const payload = {
    id: req.user.id,
    name: req.user.name,
  };

  return userServices.getJwtToken(payload)
      .then((token) => res.json({success: true, token: 'Bearer ' + token}))
      .catch(next);
};

/** @type {RequestHandler} */
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

/** @type {RequestHandler} */
const get = (req, res, next) => {
  return userServices.findUser(req.params.userId)
      .then((user) => res.json(user))
      .catch(next);
};

/** @type {RequestHandler} */
const edit = (req, res, next) => {
  const updatedUser = {
    name: req.body.name, 
    email: req.body.email, 
    rating: req.body.rating,  
    bio: req.body.bio,  
    age: req.body.age,  
    wishlist: req.body.wishlist, 
  }
  userServices.editUser(req.params.userId, updatedUser)
      .then((user) => {
        console.log(user)
         res.json(user)
      })
      .catch(next);
};

/** @type {RequestHandler} */
const getLendingList = async (req, res, next) => {
  userServices.getLendingList(req.params.userId)
      .then((lendingList) => {
        console.log(lendingList);
        res.json(lendingList);
      })
      .catch(next);
};

/** @type {RequestHandler} */
const createItem = async (req, res, next) => {
  // This is attached in the users middleware "attachDecodedToken"
  if (!req.jwtDecoded) {
    return next(new Error('Decoded JWT payload not found'));
  }
  if (req.jwtDecoded.id !== req.params.userId) {
    return res.status(401).json({
      errors: [{msg: 'Unauthorized (non-matching IDs)'}],
    });
  }
  const {name, description, price} = req.body;
  const imagePath = (req.file && req.file.filename) ?
    (keys.domain || 'http://localhost:8081/uploads/') + req.file.filename : 'none';
  const data = {
    name,
    description,
    price,
    user: req.jwtDecoded.id,
    imagePath,
    availability: true,
  };
  itemServices.createItem(data)
      .then((item) => res.json(item))
      .catch(next);
};

const deleteItem = async (req, res, next) => {
  const {itemId} = req.params;
  await itemServices.deleteItem(itemId);
  res.status(204).end();
};

module.exports = {
  login,
  register,
  get,
  edit,
  getLendingList,
  createItem,
  deleteItem,
};
