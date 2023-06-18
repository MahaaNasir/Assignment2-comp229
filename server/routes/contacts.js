let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to the contacts Model
let Contacts = require('../models/contacts');

let contactsController = require('../controllers/contacts')

// a helper function for the guard purposes
function requireAuth(req, res, next)
{
    // checking if the user is logged in now
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// Get Route to contacts List page - READ Operation
router.get('/', contactsController.displayContactsList);

// Get Route to Add page - CREATE Operation
router.get('/add', contactsController.displayAddPage);

// Post Route to process  Add page - CREATE Operation
router.post('/add', contactsController.processAddPage);

// Get Route to display Edit page - UPDATE Operation
router.get('/edit/:id', contactsController.displayEditPage);

// Post Route to process Edit page - UPDATE Operation
router.post('/edit/:id', contactsController.processEditPage);

// Get to perform Deletion - Delete Operation
router.get('/delete/:id', contactsController.performDelete);

module.exports = router;