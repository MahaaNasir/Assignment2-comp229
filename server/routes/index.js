/*
  Assignment 2
  File name: index.js
  Student Name: Maha Nasir
  Student ID: 301266305
  Date: 18 June 2023
*/

var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/* GET Route to display home page. */
router.get('/', indexController.displayHomePage);

/* GET Route to display home page. */
router.get('/home', indexController.displayHomePage);

/* GET Route to display about page. */
router.get('/about', indexController.displayAboutPage);

/* GET Route to display products page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET Route to display services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Route to display contact page. */
router.get('/contact', indexController.displayContactPage);

/* Get Route to display Login Page */
router.get('/login', indexController.displayLoginPage);

/* Post Route to process Login Page */
router.post('/login', indexController.processLoginPage);

/* Get Route to display Register Page */
router.get('/register', indexController.displayRegisterPage);

/* Get Route to process Register Page */
router.post('/register', indexController.processRegisterPage);

/* Get Route to perform the User Logout */
router.get('/logout', indexController.performLogout);

module.exports = router;