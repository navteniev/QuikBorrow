const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Test_Schema = new Schema({
  name:{type: String, default: ''},
  description:{type: String, default: ''}
});

const test = mongoose.model('tests', Test_Schema);
//test query
router.get('/testquery', (req, res) => {
  test.find({}, function(err, test_res) {
    if(err) {
      console.log('Failure to retrieve');
      return 'Fail';
    }
    else {
      console.log(test_res);
      return test_res;
    }
    res.redirect('/');
  });
});

module.exports = router;
  
