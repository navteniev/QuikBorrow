const Item = require('../models/items');

const createItem = (req, res) => {
  let iteminst = new Item({
    name: req.body.name,
    description: req.body.description
  });
  iteminst.save(function (err, item) {
    if (err) {
      res.status(500).json({error: "Could not create item."});
    }
    else {
      console.log("Successfully created item.");
      res.status(200).json({msg: "Item Created."});
    }
  });
}

const retrieveItemList = (req, res, next) => {
  Item.find({}).then(items => {
    console.log(items);
    res.json(items);
  }).catch(next)
};

const retrieveItem = (req, res, next) => {
  Item.findOne({_id: req.params.itemId}).then(item => {
    console.log(item);
    res.json(item);
  });
};

module.exports = {createItem, retrieveItemList, retrieveItem};
