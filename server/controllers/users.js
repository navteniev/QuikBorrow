const userServices = require('../services/users');

const get = (req, res, next) => {
  userServices.findUser(req.params.userId)
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

module.exports = {
  get,
  edit,
};
