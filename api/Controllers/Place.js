'use strict';
const mongoose = require('mongoose');
const Place = mongoose.model('Places');

//GET: eventos/:lat/:lon?raio=200
exports.pesquisar_eventos = function(req, res) {
  let range = 200; //valor por omissao
  if (req.query.raio) {
    //query:queryparameters
    range = req.query.range;
  }
  Place.find({
    localation: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [req.params.long, req.params.lat] //req.params: uri params
        },
        $maxDistance: range
      }
    }
  })
    .exec()
    .then(result => {
      res.status(201).jsonp(novo);
    })
    .catch(err => {
      res.status(500).jsonp({ error: { message: err.message } });
    });
};

/* Place.save(function(err, book) {
    if (err) return console.error(err);
    console.log(book.name + ' saved to bookstore collection.');
  }); */
