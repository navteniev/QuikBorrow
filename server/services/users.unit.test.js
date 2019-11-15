const userServices = require('./users');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../models/User');

describe('Unit::services/users', function() {
  afterEach(function() {
    User.mockReset();
  });
  describe('createUser', function() {
    it('creates a new user with the data and saves it', async function() {
      const data = {name: 1, email: 2, password: 'wesgtr3'};
      await userServices.createUser(data);
      expect(User).toHaveBeenCalledWith(data);
      expect(User.mock.instances[0].save).toHaveBeenCalled();
    });
    it('returns the created user', async function() {
      const data = {name: 1, email: 2, password: 'wesgtr3'};
      const returned = await userServices.createUser(data);
      expect(User).toHaveBeenCalledWith(data);
      expect(User.mock.instances[0]).toEqual(returned);
    });
  });
  describe('findUser', function() {
    it('finds a user by id', async function() {
      const id = '12e';
      await userServices.findUser(id);
      expect(User.findById).toHaveBeenCalledWith(id);
    });
    it('returns the user found by id', async function() {
      const id = 'we234t';
      const user = {hugs: 'kisses'};
      User.findById.mockResolvedValueOnce(user);
      const returned = await userServices.findUser(id);
      expect(returned).toEqual(user);
    });
  });
  describe('findUserByEmail', function() {
    it('finds the user by email', async function() {
      const email = '2wr3e4';
      await userServices.findUserByEmail(email);
      expect(User.findOne).toHaveBeenCalledWith({email});
    });
    it('returns the user found', async function() {
      const user = {a: 'fe'};
      User.findOne.mockResolvedValueOnce(user);
      const returned = await userServices.findUserByEmail();
      expect(returned).toEqual(user);
    });
  });
  describe('getJwtToken', function() {
    it('resolves with the token', async function() {
      const resolved = '12q4ee';
      jwt.sign.mockImplementationOnce((g1, g2, g3, callback) => {
        callback(null, resolved);
      });
      const result = await userServices.getJwtToken();
      expect(result).toEqual(resolved);
    });
    it('rejects with the error', function() {
      const err = new Error('aqetw342tegs');
      jwt.sign.mockImplementationOnce((g1, g2, g3, callback) => {
        callback(err);
      });
      expect(userServices.getJwtToken()).rejects.toThrow(err);
    });
  });
  describe('generateHash', function() {
    it('resolves with the token', async function() {
      const hash = 'wet4';
      bcrypt.genSalt.mockResolvedValueOnce();
      bcrypt.hash.mockResolvedValueOnce(hash);
      const result = await userServices.generateHash();
      expect(result).toEqual(hash);
    });
  });
});
