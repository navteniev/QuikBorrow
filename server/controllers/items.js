const itemServices = require('../services/items');

const create = async (req, res, next) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
  };
  itemServices.createItem(data)
      .then((item) => {
        console.log('Successfully created item.');
        res.json(item);
      })
      .catch(next);
};

const get = (req, res, next) => {
  itemServices.findItem(req.params.itemId)
      .then((item) => res.json(item))
      .catch(next);
};

const getAll = (req, res, next) => {
  itemServices.findAllItems()
      .then((items) => {
        console.log(items);
        res.json(items);
      })
      .catch(next);
};

const rent = async (req, res, next) => {
  itemServices.rentItem(req.params.itemId,
      req.params.borrowerId, req.params.duration)
      .then((item) => {
        console.log(item);
        res.json(item);
      })
      .catch(next);
};

module.exports = {
  create,
  get,
  getAll,
  rent,
};
