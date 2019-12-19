const itemServices = require('../services/items');

/** @type {import('express').RequestHandler} */
const create = async (req, res, next) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  };

  itemServices.createItem(data)
      .then((item) => {
        console.log('Successfully created item.');
        res.json(item);
      })
      .catch(next);
};

/** @type {import('express').RequestHandler} */
const get = (req, res, next) => {
  itemServices.findItem(req.params.itemId)
      .then((item) => res.json(item))
      .catch(next);
};

/** @type {import('express').RequestHandler} */
const getAll = (req, res, next) => {
  itemServices.findAllItems()
      .then((items) => {
        console.log(items);
        res.json(items);
      })
      .catch(next);
};

/** @type {import('express').RequestHandler} */
const search = (req, res, next) => {
  itemServices.searchItems(req.query['param'])
      .then((items) => {
        console.log(items);
        res.json(items);
      })
      .catch(next);
  {
    console.log(next);
  }
};

/** @type {import('express').RequestHandler} */
const endRent = async (req, res, next) => {
  itemServices.endRent(req.params.itemId)
      .then((item) => res.json(item))
      .catch(next);
};

/** @type {import('express').RequestHandler} */
const updateRating = async (req, res, next) => {
  itemServices.updateRating(req.params.itemId, req.params.rating)
      .then((item) => res.json(item))
      .catch(next);
};

module.exports = {
  create,
  get,
  getAll,
  search,
  endRent,
  updateRating,
};
