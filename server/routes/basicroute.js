const express = require('express');
const router = new express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {type: String, default: ''},
  description: {type: String, default: ''},
});

const test = mongoose.model('tests', schema);
// test query
router.get('/testquery', (req, res, next) => {
  test.find({}).then((docs) => {
    console.log(docs);
    res.json(docs);
  }).catch(next);
});

module.exports = router;

