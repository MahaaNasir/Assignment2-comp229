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
        displayName:{
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
