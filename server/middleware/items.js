const path = require('path');
const multer = require('multer');
const itemServices = require('../services/items');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});

const imageFilter = (req, file, next) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return next(new Error('Only image files are allowed!'), false);
  }
  next(null, true);
};

const upload = multer({storage: storage, filter: imageFilter});

const expressValidator = {
  itemExistsAndAttach: async (value, {req}) => {
    const item = await itemServices.findItem(value);
    if (!item) {
      throw new Error('Unknown item');
    }
    req.item = item;
    return true;
  }
};

module.exports = {
  expressValidator, upload,
};
