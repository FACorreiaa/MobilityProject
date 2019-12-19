'use strict';
const mongoose = require('mongoose');
const Place = mongoose.model('Places');

exports.getPlace = async function(req, res) {
  Place.save(function(err, book) {
    if (err) return console.error(err);
    console.log(book.name + ' saved to bookstore collection.');
  });
};
