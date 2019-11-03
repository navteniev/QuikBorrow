const app = require('../index')
const supertest = require('supertest')
const request = supertest(app)
const mongoose = require('mongoose')
const keys = require("../config/keys")

describe('Post Endpoints', () => {
  beforeAll(async () => {
        await mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
  });
  
  it('should respond with hello world', async () => {
    const result = await request.get('/')
    expect(result.status).toEqual(200)
    expect(result.text).toEqual('Hello World!')
  })

  afterAll(async () => {
      await mongoose.connection.close()
  })
})