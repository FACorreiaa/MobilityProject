'use strict';
const Pusher = require('pusher');
const dashboardService = require('../Services/DashboardService');

const pusher = new Pusher({
  appId: "936656",
  key = "da84b590e82a4f23838b",
  secret = "e6c54e507610cf2a06ed",
  cluster = "eu",
  encrypted: true
});

//Situação atual dos lugares por lugar - occupancy rate - taxa de ocupação
exports.get_occupancy_rate = async function(req, res) {
  dashboardService
    .getoccupancy(req, res)
    .then(places => {
      res.json(places);
    })
    .catch(e => {
      res.status(400).json(e);
    });
};

exports.set_occupancy_trigger = async function(req, res) {
  dashboardService
    .getoccupancy(req, res)
    .then(places => {
      let labels = [];
      let values = [];
      for (let i = 0; i < places.length; i++) {
        let place = places[i];
        labels[i] = place.street;
        values[i] = place.occupancy;
      }
      let datapointsArray = {
        labels: labels,
        data: values
      };
      pusher.trigger('occupancy', 'update-places', {
        datapointsArray
      });
    })
    .catch(e => e);
};

//checkin overtime
exports.getCheckinByDay = async function(req, res) {
  dashboardService
    .getCheckinCount(req, res)
    .then(checkins => {
      res.json(checkins);
    })
    .catch(e => {
      res.status(400).json(e);
    });
};

exports.setCheckinByDayTrigger = async function(req, res) {
  dashboardService
    .getCheckinCount(req, res)
    .then(checkins => {
      let labels = [];
      let values = [];
      for (let i = 0; i < checkins.length; i++) {
        let checkin = checkins[i];
        labels[i] = checkin._id.date;
        values[i] = checkin.count;
      }

      let datapointsArray = {
        labels: labels,
        data: values
      };
      pusher.trigger('checkinByDay', 'update-rentals', {
        datapointsArray
      });
    })
    .catch(e => {
      res.status(400).json(e);
    });
};
