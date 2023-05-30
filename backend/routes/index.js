var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello')
});

module.exports = router;

