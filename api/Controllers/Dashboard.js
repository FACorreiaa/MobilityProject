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
    .then(places => {
      var labels = [];
      var values = [];
      var i;
      for (i = 0; i < places.length; i++) {
      var place = places[i];
      labels.push(place.street);
      values.push(place.occupancy);
      }
  
    let datapointsArray = {
    "labels": labels,
     "data": values
    };
      res.json(datapointsArray);
    })
    .catch(e => {
      res.status(400).json(e)});
  
};

exports.set_occupancy_trigger = async function(req, res) {
  dashboardService.getoccupancy(req,res)
  .then(places => {
    var labels = [];
      var values = [];
      var i;
      for (i = 0; i < places.length; i++) {
      var place = places[i];
      labels.push(place.street);
      values.push(place.occupancy);
      }
  
    let datapointsArray = {
    "labels": labels,
     "data": values
    };
    pusher.trigger('occupancy', 'update-places', {
      values
    });
  })
  .catch(e => {
    console.log(e)});
}


//checkin overtime
exports.getCheckinByDay = async function (req, res) {
  dashboardService.getCheckinCount(req, res)
    .then(checkins => {
      console.log('aqui')
      console.log(checkins)

      let labels = [];
      let values = [];
      for (let i = 0; i < checkins.length; i++) {
        let checkin = checkins[i];
        labels.push(checkin._id.date);
        values.push(checkin.count);
      }

      let datapointsArray = {
        "labels": labels,
        "data": values
      };

      res.json(datapointsArray);
    })
    .catch(e => {
      res.status(400).json(e)
    });
};


