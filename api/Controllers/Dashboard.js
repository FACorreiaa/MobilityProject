'use strict';
const mongoose = require('mongoose');
const Rental = mongoose.model('Rentals');
const Places = mongoose.model('Places');
const Pusher = require('pusher');
const dashboardService = require('../Services/DashboardService');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret:process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true
});


//Situação atual dos lugares por lugar - occupancy rate - taxa de ocupação
exports.get_occupancy_rate = async function(req, res) {
    dashboardService.getoccupancy(req,res)
    .then(occupancy => {
      res.json(occupancy);
    })
    .catch(e => {
      res.status(400).json(e)});
  
};

exports.set_occupancy_trigger = async function(req, res) {
  dashboardService.getoccupancy(req,res)
  .then(datapointsArray => {
    pusher.trigger('occupancy', 'update-places', {
      datapointsArray
    });
  })
  .catch(e => {
    console.log(e)});
}

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



