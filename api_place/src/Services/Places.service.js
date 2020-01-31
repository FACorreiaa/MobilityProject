const mongoose = require('mongoose');
const Place = mongoose.model('Places');


const getPlaceByRange = async function(req,res) {
  let range = 200; //default value
  if (req.query.range) {
    range = req.query.range;
  }
  try{
    let place = await Place.find(
      {
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [req.params.lat, req.params.lon] //req.params: uri params
            },
            $maxDistance: range,
            $minDistance: 0
          }
        }
      });
      return place;
  }
  catch(e) {
    return e;
  }
};



module.exports.getPlaceByRange = getPlaceByRange;
