const mongoose = require('mongoose');
const Places = mongoose.model('Places');
const Rental = mongoose.model('Rentals');


exports.getoccupancy = async function (req, res) {
  try {
    return Places.aggregate([
      {
        $project: {
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

exports.getCheckinCount = async function () {
  try {
    return Rental.aggregate([
      {
        $group: {
          _id: { date: { $dateToString: { format: "%Y-%m-%d", date: "$start.date" } } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
  } catch (e) {
    return e;
  }
};
