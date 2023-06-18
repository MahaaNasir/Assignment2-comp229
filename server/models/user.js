/*
  Assignment 2
  File name: user.js
  Student Name: Maha Nasir
  Student ID: 301266305
  Date: 18 June 2023
*/

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(
    {
        
        username:{
            type: String,
            default: "",
            require: "Username is required."
        },
        email:{
            type: String,
            default: "",
            require: "Email Address is required."
        },
        profileName:{
            type: String,
            default: "",
            require: "User Name is required."
        },
        created:{
            type: Date,
            default: Date.now,
        },
        update:{
            type: Date,
            default: Date.now,
        }
    },
    {
        collection: 'users'
    }
);

//configure the options for our User Model
let options = ({missingPasswordError: 'Wrong / Missing Password'});
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User', User);
