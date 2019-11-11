const userServices = require('../services/users');

const get = (req, res, next) => {
  userServices.findUser(req.params.userId)
      .then((user) => res.json(user))
      .catch(next);
};

module.exports = {
  get,
};
