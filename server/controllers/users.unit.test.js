const userController = require('./users');
const userServices = require('../services/users');
const itemServices = require('../services/items');

jest.mock('../services/users');
jest.mock('../services/items');

describe('Unit::controller/users', function() {
  describe('login', function() {
    it('returns auth token', async function() {
      const request = {user: {}};
      const response = {json: jest.fn()};
      const token = 'adesgfoirhe3e4iyr';
      const expected = {success: true, token: 'Bearer ' + token};
      userServices.getJwtToken.mockResolvedValueOnce(token);
      await userController.login(request, response);
      expect(response.json).toHaveBeenCalledWith(expected);
    });
    it('calls next on error', async function() {
      const next = jest.fn();
      const err = new Error('aedg');
      userServices.getJwtToken.mockRejectedValueOnce(err);
      await userController.login({user: {}}, {}, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });
  describe('register', function() {
    it('returns the registered user', async function() {
      const request = {body: {}};
      const response = {json: jest.fn()};
      const createdUser = {a: 'b', hunky: 'dory'};
      userServices.createUser.mockResolvedValueOnce(createdUser);
      await userController.register(request, response);
      expect(response.json).toHaveBeenCalledWith(createdUser);
    });
    it('calls next on error for generate hash', async function() {
      const next = jest.fn();
      const err = new Error('aedgadesg');
      userServices.generateHash.mockRejectedValueOnce(err);
      await userController.register({body: {}}, {}, next);
      expect(next).toHaveBeenCalledWith(err);
    });
    it('calls next on error for createUser', async function() {
      const next = jest.fn();
      const err = new Error('aasdefedgadesg');
      userServices.createUser.mockRejectedValueOnce(err);
      await userController.register({body: {}}, {}, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });
  describe('get', function() {
    it('returns the user', async function() {
      const request = {params: {userId: '2qw3eit8ghj1'}};
      const response = {json: jest.fn()};
      const user = {a: 'bxsfdcrgi'};
      userServices.findUser.mockResolvedValueOnce(user);
      await userController.get(request, response);
      expect(response.json).toHaveBeenCalledWith(user);
    });
    it('calls next on error', async function() {
      const next = jest.fn();
      const err = new Error('aasdefedgadesg1');
      userServices.findUser.mockRejectedValueOnce(err);
      await userController.get({params: {}}, {}, next);
      expect(next).toHaveBeenCalledWith(err);
    });
  });
  describe('createItem', function() {
    afterEach(function() {
      itemServices.createItem.mockReset();
    });
    it('passes an error to next for no jwt payload', async function() {
      const error = new TypeError('Decoded JWT payload not found');
      const next = jest.fn();
      await userController.createItem({}, {}, next);
      expect(next).toHaveBeenCalledWith(error);
    });
    it('returns 401 for nonmatching user ids', async function() {
      const userId = 'abc';
      const request = {
        body: {},
        params: {userId},
        jwtDecoded: {id: userId + 1},
      };
      const response = {status: jest.fn(() => ({json: jest.fn()}))};
      await userController.createItem(request, response);
      expect(response.status).toHaveBeenCalledWith(401);
    });
    it('returns the created item', async function() {
      const userId = 'abc';
      const request = {
        body: {},
        params: {userId},
        jwtDecoded: {id: userId},
      };
      const response = {json: jest.fn()};
      const item = {HOO: 'DUR'};
      itemServices.createItem.mockResolvedValueOnce(item);
      await userController.createItem(request, response);
      expect(response.json).toHaveBeenCalledWith(item);
    });
    it('creates the proper item to create', async function() {
      const userId = 'abc';
      const request = {
        body: {
          name: 'aadegjijrig',
          description: 'ew3r5ujies',
          productImage: 'none',
          random: 123,
          availability: true,
        },
        params: {userId},
        jwtDecoded: {id: userId},
      };
      const response = {json: jest.fn()};
      const expectedItemCreation = {
        name: request.body.name,
        description: request.body.description,
        imagePath: request.body.productImage,
        user: request.jwtDecoded.id,
        availability: request.body.availability,
      };
      itemServices.createItem.mockResolvedValueOnce();
      await userController.createItem(request, response);
      expect(itemServices.createItem)
          .toHaveBeenCalledWith(expectedItemCreation);
    });
  });
  describe('deleteItem', function() {
    afterEach(function() {
      itemServices.deleteItem.mockReset();
    });
    it('returns 204 on success', async function() {
      const userId = '2q3rtgre';
      const item = {get: () => userId};
      const request = {params: {userId}};
      const endFunction = jest.fn();
      const response = {status: jest.fn(() => ({end: endFunction}))};
      request.jwtDecoded = {id: userId};
      request.item = item;
      await userController.deleteItem(request, response);
      expect(response.status).toHaveBeenCalledWith(204);
      expect(endFunction).toHaveBeenCalled();
    });
  });
});
