const mongoose = require('mongoose');
const TransactionModel = require('./Transaction');
const transactionData = {borrower: '5db9fdce1dd490177413ab0b',
  lender: '5dc4967ed2616e19c8eef654',
  msg: 'test transaction',
  duration: 1,
  item: '5dc9dba21c9d4400001b972d',
  approved: false,
  processed: false,
};
const keys = require('../config/keys');
const MONGODB_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
};

describe('Transaction Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(keys.mongoURI, MONGODB_OPTIONS, (err) => {
      if (err) {
        throw err;
      }
    });
  });

  it('create & save transaction successfully', async () => {
    const validTransaction = new TransactionModel(transactionData);
    const savedTransaction = await validTransaction.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedTransaction._id).toBeDefined();
    expect(savedTransaction.borrower).toBeDefined();
    expect(savedTransaction.lender).toBeDefined();
    expect(savedTransaction.msg).toBe(transactionData.msg);
    expect(savedTransaction.duration).toBe(transactionData.duration);
    expect(savedTransaction.item).toBeDefined();
    expect(savedTransaction.approved).toBe(transactionData.approved);
    expect(savedTransaction.processed).toBe(transactionData.processed);
  });
  it('approves a transaction successfully', async () => {
    const validTransaction = new TransactionModel(transactionData);
    const savedTransaction = await validTransaction.approve();
    expect(savedTransaction.approved).toBe(true);
    expect(savedTransaction.processed).toBe(true);
  });
  it('rejectss a transaction successfully', async () => {
    const validTransaction = new TransactionModel(transactionData);
    const savedTransaction = await validTransaction.reject();
    expect(savedTransaction.approved).toBe(false);
    expect(savedTransaction.processed).toBe(true);
  });
});

afterAll( async () =>{
  await mongoose.connection.close();
});

