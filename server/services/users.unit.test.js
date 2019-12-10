const userServices = require('./users');
const transactionServices = require('./transactions');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

jest.mock('./transactions');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../models/User');

/**
 * Mock instance of a mongo ID. Mongo object IDs can't be compared with strings
 * with equality operators === if we're operating directly on the queried
 * documents, so we have to use the equals method on object ID fields
 */
class MongoID {
  /**
   * @param {string} id - ID to initialize with
   */
  constructor(id) {
    this.id = id;
  }

  /**
   * Checks to see if the value is equal to the id
   *
   * @param {string} value - Value to compare with
   * @returns {boolean} - Equality result
   */
  equals(value) {
    return value === this.id;
  }
}

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
  describe('verifyJwtToken', function() {
    it('resolves with decoded data', function() {
      const resolved = 'etr43ouj';
      jwt.verify.mockImplementationOnce((g1, g2, callback) => {
        callback(null, resolved);
      });
      expect(userServices.verifyJwtToken()).resolves.toEqual(resolved);
    });
    it('rejects with the error', function() {
      const error = new Error('aeqwt426r');
      jwt.verify.mockImplementationOnce((g1, g2, callback) => {
        callback(error);
      });
      expect(userServices.verifyJwtToken()).rejects.toThrow(error);
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
  describe('hasPendingTransaction', function() {
    it('resolves with true correctly', function() {
      const pendingTransactions = [
        {item: new MongoID(123), processed: true},
        {item: new MongoID(456), processed: true},
        {item: new MongoID(789), processed: false},
      ];
      transactionServices.getTransactions
          .mockResolvedValueOnce(pendingTransactions);
      expect(userServices.hasPendingTransaction('', 456))
          .resolves
          .toEqual(true);
    });
    it('resolves with false correctly', function() {
      const pendingTransactions = [
        {item: new MongoID(123), processed: false},
        {item: new MongoID(111), processed: true},
        {item: new MongoID(789), processed: true},
      ];
      transactionServices.getTransactions
          .mockResolvedValueOnce(pendingTransactions);
      expect(userServices.hasPendingTransaction('', 456))
          .resolves
          .toEqual(false);
    });
  });
});
