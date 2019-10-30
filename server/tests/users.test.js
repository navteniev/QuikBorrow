const app = require('../index')
const supertest = require('supertest')
const request = supertest('app')
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
  
  it('should respond with hello world', async done => {
    const res = await request.get('/')
    expect(res.status).toBe(200);
	expect(res.body.message).toBe('Hello World');
	done();
  })
  afterAll( async () =>{
      await mongoose.connection.close()
  })
})