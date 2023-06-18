/*
  Assignment 2
  File name: users.js
  Student Name: Maha Nasir
  Student ID: 301266305
  Date: 18 June 2023
*/

var express = require('express');
var router = express.Router();

/* GET Route to listen the users */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
