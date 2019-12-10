const mongoose = require('mongoose');
const commentServices = require('../services/comments');

/** @type {import('express').RequestHandler} */
const create = async (req, res, next) => {
  const data = {
    user: req.body.user,
    id: new mongoose.Types.ObjectId(req.body.id),
    product: new mongoose.Types.ObjectId(req.body.product),
    text: req.body.text,
    rating: req.body.rating,
  };
  commentServices.createComment(data)
      .then((comment) => {
        console.log(comment);
        res.json(comment);
      })
      .catch(next);
};

/** @type {import('express').RequestHandler} */
const getComments = (req, res, next) => {
  commentServices.findComments(req.params.productId)
      .then((comments) => {
        console.log(comments);
        res.json(comments);
      })
      .catch(next);
};

module.exports = {
  create,
  getComments,
};
