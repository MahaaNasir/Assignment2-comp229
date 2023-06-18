/*
  Assignment 2
  File name: contacts.js
  Student Name: Maha Nasir
  Student ID: 301266305
  Date: 18 June 2023
*/

let mongoose = require('mongoose');

//creating the model class - contactsModel
let contactsModel = mongoose.Schema({
    name: String,
    phone: Number,
    email: String
},
{
    collection: 'contacts'
});

module.exports = mongoose.model('Contacts', contactsModel);