const commentServices = require('../services/comments');

/** @type {import('express').RequestHandler} */
const create = async (req, res, next) => {
  const data = {
    user: req.body.user,
    product: req.body.product,
    text: req.body.text
  };
  commentServices.createComment(data)
      .then((comment) => {
        console.log('Created comment.');
        res.json(item);
      })
      .catch(next);
};

/** @type {import('express').RequestHandler} */
const getComments = (req, res, next) => {
	commentServices.findComments()
		.then((comments) => {
			console.log(comments);
			res.json(comments);
		})
		.catch(next);
};

module.exports = {
	create,
	getComments
};