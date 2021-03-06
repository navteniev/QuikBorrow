const itemMiddleware = require('./items');
const itemServices = require('../services/items');
const path = require('path');
jest.mock('../services/items');

describe('Unit::middleware/items', function() {
  describe('expressValidator', function() {
    describe('itemExistsAndAttach', function() {
      const {itemExistsAndAttach} = itemMiddleware.expressValidator;
      it(`throws an error if item doesn't exist`, function() {
        const error = new Error('Unknown item');
        itemServices.findItem.mockResolvedValueOnce();
        expect(itemExistsAndAttach('', {req: {}}))
            .rejects.toThrowError(error);
      });
      it('returns true if found', function() {
        itemServices.findItem.mockResolvedValueOnce({});
        return expect(itemExistsAndAttach('', {req: {}}))
            .resolves.toEqual(true);
      });
      it('attaches item document to request', async function() {
        const request = {};
        const item = {yo: 'mama so fat'};
        itemServices.findItem.mockResolvedValueOnce(item);
        await itemExistsAndAttach('', {req: request});
        expect(request.item).toEqual(item);
      });
    });
  });
  describe('imageFilter middleware', function() {
    const {imageFilter} = itemMiddleware;
    it('should call next if file has png extension', function() {
      const file = {
        originalname: 'randomPic.png',
      };
      const next = jest.fn();
      imageFilter({}, file, next);
      expect(next).toHaveBeenCalled();
    });
    it('should call next if file has jpg extension', function() {
      const file = {
        originalname: 'randomPic.jpg',
      };
      const next = jest.fn();
      imageFilter({}, file, next);
      expect(next).toHaveBeenCalled();
    });
    it('should call next if file has jpeg extension', function() {
      const file = {
        originalname: 'randomPic.jpeg',
      };
      const next = jest.fn();
      imageFilter({}, file, next);
      expect(next).toHaveBeenCalled();
    });
    it('should call next if file has gif extension', function() {
      const file = {
        originalname: 'randomPic.gif',
      };
      const next = jest.fn();
      imageFilter({}, file, next);
      expect(next).toHaveBeenCalled();
    });
    it(`throws an error if file is not an image`, function() {
      const file = {
        originalname: 'text.txt',
      };
      const error = new Error('Only image files are allowed!');
      const next = jest.fn();
      imageFilter({}, file, next);
      expect(next).toHaveBeenCalledWith(error, false);
    });
    describe('Multer', function() {
      it('should call next', function() {
        const file = {
          originalname: 'image.png',
        };
        const next = jest.fn();
        itemMiddleware.upload.storage.getFilename({}, file, next);
        expect(next).toHaveBeenCalled();
      });
      it('should return correct uploads destination', function() {
        const next = jest.fn();
        const pathOfUploads = path.join(__dirname, '..', 'uploads');
        itemMiddleware.upload.storage.getDestination({}, {}, next);
        expect(next).toHaveBeenCalledWith(null, pathOfUploads);
      });
    });
  });
});
