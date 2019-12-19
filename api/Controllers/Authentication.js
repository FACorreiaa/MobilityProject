'use strict';
const mongoose = require('mongoose');
const User = mongoose.model('Users');

//add new rental
exports.register = async function (req, res){
  var newUser = new User(req.body);
    newUser.save()
        .then(result => {
           console.log(newUser)
           res.status(201).jsonp(newUser) })
        .catch(err => {
            res.status(500).jsonp({ error: { message: err.message } })
        })
}