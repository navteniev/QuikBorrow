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
  
  it('should respond with hello world', done => {
    request.get('/')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        expect(res.text).toEqual('Hello World!')
        done()
      })
  })

  afterAll( async () =>{
      await mongoose.connection.close()
  })
})