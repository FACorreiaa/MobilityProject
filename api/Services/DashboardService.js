const mongoose = require('mongoose');
const Places = mongoose.model('Places');


const getoccupancy = async function (req, res) {
  try {
    let datapointsArray = Places.aggregate([
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
    ], function (err, places) {
      var datapointsArray = [];
      var i;
      for (i = 0; i < places.length; i++) {
        var place = places[i];
        var street = place.street;
        var occupancy = place.occupancy;
        var datapoint = { label: street, y: occupancy };
        datapointsArray.push(datapoint);
      }
    })
    console.log('service output: ' + JSON.stringify(datapointsArray));
    return datapointsArray;
  }
  catch (e) {
    return e;
  }
};


module.exports.getoccupancy = getoccupancy;
