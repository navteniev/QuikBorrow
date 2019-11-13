const userController = require('./users');
const userServices = require('../services/users');

jest.mock('../services/users');

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
});
