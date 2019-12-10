const mongoose = require('mongoose');
const ItemModel = require('./Item');
const itemData = {name: 'test',
  description: 'test description',
  user: '5dc4967ed2616e19c8eef654',
  availability: true,
  price: 1,
};
const keys = require('../config/keys');
const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

describe('Item Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(keys.mongoURI, MONGODB_OPTIONS, (err) => {
      if (err) {
        throw err;
      }
    });
  });

  it('rents a item successfully', async () => {
    const validItem = new ItemModel(itemData);
    const savedItem = await validItem.rentTo('5db9fdce1dd490177413ab0b', 7);
    expect(savedItem.borrower).toBeDefined;
    expect(savedItem.returnDate).toBeDefined;
    expect(savedItem.availability).toBe(false);
  });
  it('returns a item successfully', async () => {
    const validItem = new ItemModel(itemData);
    const savedItem = await validItem.endRent();
    expect(savedItem.availability).toBe(true);
    expect(savedItem.borrower).toBe(undefined);
  });
});

afterAll( async () =>{
  await mongoose.connection.close();
});

