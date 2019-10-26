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
router.get('/testquery', (req, res, next) => {
  test.find({}).then(test_res => {
    console.log(test_res);
    res.json(test_res);
  }).catch(next)
});

module.exports = router;
  
