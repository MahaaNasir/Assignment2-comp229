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