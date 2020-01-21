'use strict';
const mongoose = require('mongoose');
const Rental = mongoose.model('Rentals');
const Places = mongoose.model('Places');


//Situação atual dos lugares por lugar - occupancy rate - taxa de ocupação
exports.get_occupancy_rate = async function(req, res) {
  Places.aggregate([
    { $project: {
        capacity: 1, 
        quantity: 1, 
        street:1,
        _id:0,
        occupancy: { $multiply: [
          { $divide: [
              "$quantity", "$capacity"
          ]},
          100
      ]}
    }}
    ], function(err, places) {

    if (err) res.status(400).send(err);
    res.json(places);
    console.log('places:'+ places);
  });
};


//checkin overtime
exports.getCheckinByDay = async function(req, res) {

    Rental.aggregate([
    
      { $match: {} },
                { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$start.date" } }, count: { $sum: 1 } } },
               

    ], function(err, rentals) {

    if (err) res.send(err);
    res.json(rentals);
  });
  console.log('count:' + rentals);
};



