const usersMiddleware = require('./users');
const userServices = require('../services/users');
const bcrypt = require('bcryptjs');

jest.mock('../services/users');
jest.mock('bcryptjs');

describe('Unit::middleware/users', function() {
  describe('userIsAuthorized', function() {
    it('returns 401 if decoded id is not userId param', function() {
      const userId = 'q135r';
      const request = {
        params: {userId},
        jwtDecoded: {id: userId + 1},
      };
      const response = {status: jest.fn(() => ({json: jest.fn()}))};
      usersMiddleware.userIsAuthorized(request, response);
      expect(response.status).toHaveBeenCalledWith(401);
    });
    it('calls next on success', function() {
      const userId = 'q135r';
      const request = {params: {userId}};
      const next = jest.fn();
      request.jwtDecoded = {id: userId};
      usersMiddleware.userIsAuthorized(request, {}, next);
      expect(next).toHaveBeenCalledWith();
    });
  });
  describe('userOwnsItem', function() {
    it('returns 404 if item owner is not param userId', async function() {
      const userId = '2q3rtgre';
      const item = {get: () => userId + 1};
      const request = {
        params: {userId},
        jwtDecoded: {id: userId},
        item,
      };
      const response = {status: jest.fn(() => ({json: jest.fn()}))};
      usersMiddleware.userOwnsItem(request, response);
      expect(response.status).toHaveBeenCalledWith(404);
    });
    it('calls next on success', function() {
      const userId = '2q3rtgre';
      const item = {get: () => userId};
      const request = {
        params: {userId},
        jwtDecoded: {id: userId},
        item,
      };
      const next = jest.fn();
      usersMiddleware.userOwnsItem(request, {}, next);
      expect(next).toHaveBeenCalledWith();
    });
  });
  describe('expressValidator custom functions', function() {
    describe('attachDecodedToken', function() {
      afterEach(function() {
        userServices.verifyJwtToken.mockReset();
      });
      it('rejects for wrong length header', async function() {
        expect(usersMiddleware.expressValidator.attachDecodedToken('abc', {}))
            .rejects.toThrowError(new Error('Malformed authorization header'));
        expect(usersMiddleware.expressValidator.attachDecodedToken('A a a', {}))
            .rejects.toThrowError(new Error('Malformed authorization header'));
      });
      it('rejects for wrong type auth', function() {
        const func = usersMiddleware.expressValidator.attachDecodedToken;
        const err = new Error('Incorrect authorization type (Must be Bearer)');
        expect(func(`ITTTTTTTS JOHNNY!`, {}))
            .rejects.toThrowError(err);
      });
      it('attaches the decoded jwt token', async function() {
        const func = usersMiddleware.expressValidator.attachDecodedToken;
        const data = {req: {}};
        const decoded = {your: 'mom'};
        userServices.verifyJwtToken.mockResolvedValueOnce(decoded);
        await func(`Bearer 123`, data);
        expect(data.req.jwtDecoded).toEqual(decoded);
      });
      it('returns true on success', async function() {
        const func = usersMiddleware.expressValidator.attachDecodedToken;
        userServices.verifyJwtToken.mockResolvedValueOnce();
        expect(func(`Bearer 123`, {req: {}})).resolves.toEqual(true);
        expect(func(`bearer 123`, {req: {}})).resolves.toEqual(true);
      });
    });
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
      const {passwordMatchesHash} = usersMiddleware.expressValidator;
      it(`throws error if password is wrong`, function() {
        bcrypt.compare.mockResolvedValueOnce(false);
        const data = {req: {user: {}}};
        return expect(passwordMatchesHash(1, data))
            .rejects.toThrowError();
      });
      it(`returns true if passwords is right`, function() {
        bcrypt.compare.mockResolvedValueOnce(true);
        return expect(passwordMatchesHash(1, {req: {user: {}}}))
            .resolves.toEqual(true);
      });
    });
    describe('matches', function() {
      const {matches} = usersMiddleware.expressValidator;
      it(`throws error if passwords don't match`, function() {
        const password2 = '3r';
        const data = {req: {body: {password2: password2 + 1}}};
        expect(() => matches(password2, data)).toThrowError();
      });
      it(`returns true if passwords match`, function() {
        const password2 = '3r';
        const data = {req: {body: {password2}}};
        expect(matches(password2, data)).toEqual(true);
      });
    });
  });
});
