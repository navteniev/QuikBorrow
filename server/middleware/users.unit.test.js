const usersMiddleware = require('./users');
const userServices = require('../services/users');
const bcrypt = require('bcryptjs');

jest.mock('../services/users');
jest.mock('bcryptjs');

describe('Unit::middleware/users', function() {
  describe('expressValidator custom functions', function() {
    describe('emailShouldExist', function() {
      it(`throws error if email should exist but it doesn't`, function() {
        userServices.findUserByEmail.mockResolvedValueOnce();
        const func = usersMiddleware.expressValidator.emailShouldExist(true);
        return expect(func(1, {req: {}}))
            .rejects.toThrowError();
      });
      it(`throws error if email should't exist but it does`, function() {
        userServices.findUserByEmail.mockResolvedValueOnce({a: 1});
        const func = usersMiddleware.expressValidator.emailShouldExist(false);
        return expect(func(1, {req: {}}))
            .rejects.toThrowError();
      });
      it(`returns true if email should exists and it does`, function() {
        userServices.findUserByEmail.mockResolvedValueOnce({a: 1});
        const func = usersMiddleware.expressValidator.emailShouldExist(true);
        return expect(func(1, {req: {}}))
            .resolves.toEqual(true);
      });
      // eslint-disable-next-line max-len
      it(`returns true if email shouldn't exist and it doesn't`, function() {
        userServices.findUserByEmail.mockResolvedValueOnce();
        const func = usersMiddleware.expressValidator.emailShouldExist(false);
        return expect(func(1, {req: {}}))
            .resolves.toEqual(true);
      });
      it('attaches the user to the request', async function() {
        const user = {a: 1, b: 2};
        const data = {req: {}};
        userServices.findUserByEmail.mockResolvedValueOnce(user);
        const func = usersMiddleware.expressValidator.emailShouldExist(true);
        await func(1, data);
        expect(data.req.user).toEqual(user);
      });
    });
    describe('passwordMatchesHash', function() {
      it(`throws error if password is wrong`, function() {
        bcrypt.compare.mockResolvedValueOnce(false);
        return expect(usersMiddleware.expressValidator.passwordMatchesHash(1, {req: {user: {}}}))
            .rejects.toThrowError();
      });
      it(`returns true if passwords is right`, function() {
        bcrypt.compare.mockResolvedValueOnce(true);
        return expect(usersMiddleware.expressValidator.passwordMatchesHash(1, {req: {user: {}}}))
            .resolves.toEqual(true);
      });
    });
    describe('matches', function() {
      it(`throws error if passwords don't match`, function() {
        const password2 = '3r';
        const data = {req: {body: {password2: password2 + 1}}};
        expect(() => usersMiddleware.expressValidator.matches(password2, data)).toThrowError();
      });
      it(`returns true if passwords match`, function() {
        const password2 = '3r';
        const data = {req: {body: {password2}}};
        expect(usersMiddleware.expressValidator.matches(password2, data)).toEqual(true);
      });
    });
  });
});
