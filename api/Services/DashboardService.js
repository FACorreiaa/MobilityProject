const mongoose = require('mongoose');
const Places = mongoose.model('Places');
const Rental = mongoose.model('Rentals');


const getoccupancy = async function (req, res) {
  var place;
var street;
var occupancy;
var labels = [];
const values = [];
  try {
    return  Places.aggregate([
      {
        $project: {
          capacity: 1,
          quantity: 1,
          street: 1,
          _id: 0,
          occupancy: {
            $multiply: [
              {
                $divide: [
                  "$quantity", "$capacity"
                ]
              },
              100
            ]
          }
        }
      }
    ])
  }
  catch (e) {
    return e;
  }
};

const getCheckinCount = async function () {
  try {
    return Rental.aggregate([
      { $group: { _id: { date: {$dateToString: { format: "%Y-%m-%d", date: "$start.date" }} }, 
                  count: { $sum: 1 } 
                } 
      },
    ]);
  } catch (e) {
    return e;
  }
};


module.exports.getoccupancy = getoccupancy;
module.exports.getCheckinCount = getCheckinCount;
