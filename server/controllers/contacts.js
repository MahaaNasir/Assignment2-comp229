/*
  Assignment 2
  File name: contacts.js
  Student Name: Maha Nasir
  Student ID: 301266305
  Date: 18 June 2023
*/


let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connecting to contacts Model
let Contacts = require('../models/contacts');

module.exports.displayContactsList = async (req, res, next)=>{
    try {
        let contactsList = await Contacts.find();

        res.render('contacts/list', 
            {title: 'Contacts', 
            ContactsList: contactsList,
            displayName: req.user ? req.user.displayName : ''})
    } catch (err){
        console.log(err);
    }
};

module.exports.displayAddPage = async (req, res, next)=>{
    try {
        res.render('contacts/add', 
        {title: 'Add Contact',
        displayName: req.user ? req.user.displayName : ''})
    } catch (err){
        console.log(err);
    }
};

module.exports.processAddPage = async (req, res, next) => {
    let newContacts = new Contacts({
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email
    });

    try {
        await newContacts.save();
        res.redirect('/contacts-list')
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.displayEditPage = async (req, res, next) => {
    let id = req.params.id;

    try {
        let contactsToEdit = await Contacts.findById(id);
        res.render('contacts/edit', 
        {title: 'Edit Contact', 
        contacts: contactsToEdit,
        displayName: req.user ? req.user.displayName : ''});
    } catch (err){
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.processEditPage = async (req, res, next) => {
    let id = req.params.id;

    let updatedContacts = {
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email
    };

    try {
        await Contacts.updateOne({_id: id}, updatedContacts);
        res.redirect('/contacts-list');
    } catch (err){
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.performDelete = async (req, res, next) => {
    let id = req.params.id;

    try {
        await Contacts.findByIdAndRemove(id);
        res.redirect('/contacts-list');
    }catch (err){
        console.log(err);
        res.status(500).send(err);
    }
};