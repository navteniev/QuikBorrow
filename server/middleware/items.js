const itemServices = require('../services/items');

const expressValidator = {
  itemExistsAndAttach: async (value, {req}) => {
    const item = await itemServices.findItem(value);
    if (!item) {
      throw new Error('Unknown item');
    }
    req.item = item;
    return true;
  },
};

module.exports = {
  expressValidator,
};
