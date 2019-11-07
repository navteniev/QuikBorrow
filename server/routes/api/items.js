/**
 * @module api/items
 * */

const express = require('express');
const router = new express.Router();
const Item = require('../../database/models/Item');
const {param, validationResult} = require('express-validator');

/**
 * Object of middleware functions
 * @type {Object<string, express.RequestHandler>}
 * @private
 */
const middleware = {
  validationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }
    next();
  },
};

/**
 * Object of route handlers
 * @type {Object.<string, express.RequestHandler>}
 * @private
 */
const routes = {
  postItem(req, res, next) {
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
    });
    item.save().then(() => {
      console.log('Successfully created item.');
      res.json(item);
    }).catch(next);
  },
  getItems(req, res, next) {
    Item.find({}).then((items) => {
      console.log(items);
      res.json(items);
    }).catch(next);
  },
  getItem(req, res, next) {
    Item.findById(req.params.itemId).then((item) => {
      res.json(item);
    }).catch(next);
  },
};

/**
 * Create an item
 * @name POST /
 * @memberof module:api/items
 */
router.post('/', routes.postItem);

/**
 * Get all items
 * @name GET /
 * @memberof module:api/items
 */
router.get('/', routes.getItems);

/**
 * Get an item
 * @name GET /:itemId
 * @memberof module:api/items
 */
router.get('/:itemId', [
  param('itemId').isInt(),
  middleware.validationErrors,
], routes.getItem);

module.exports = {
  router,
  routes,
  middleware,
};
