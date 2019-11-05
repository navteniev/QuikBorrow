const mongoose = require('mongoose');
const UserModel = require('./User');
const userData = {name: 'Test', email: 'test@test.com', password: 'password'};
const keys = require('../../config/keys');
const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

describe('User Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(keys.mongoURI, MONGODB_OPTIONS, (err) => {
      if (err) {
        throw err;
      }
    });
  });

  it('create & save user successfully', async () => {
    const validUser = new UserModel(userData);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.rating).toBe(0);
  });

  it('insert user successfully with correct fields', async () => {
    const user = {name: 'test', email: 'test@test.com', password: 'password'};
    const userWithInvalidField = new UserModel(user);
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.test).toBeUndefined();
  });

  it('create user without required field should fail', async () => {
    const userWithoutRequiredField = new UserModel({name: 'test'});
    let err;
    try {
      const saved = await userWithoutRequiredField.save();
       error = saved;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.name).toBeUndefined();
  });
});

afterAll( async () =>{
  await mongoose.connection.close();
});
