'use strict';
const mongoose = require('mongoose');
const Rental = mongoose.model('Rentals');
const Places = mongoose.model('Places');
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret:process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true
});
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
   
    var datapointsArray = [];
    var i;
    for (i = 0; i < places.length; i++) {
      var place = places[i];
      var street = place.street;
      var occupancy = place.occupancy;
      var datapoint = {label: street,  y: occupancy};
      //console.log(datapoint);
      datapointsArray.push(datapoint);
    }
    //pusher.trigger('client-occupancy', 'places', datapointsArray);
    pusher.trigger('my-channel', 'my-event', {
      datapointsArray
    });
    if (err) res.status(400).send(err);
    console.log(datapointsArray);
    res.json(datapointsArray);
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



