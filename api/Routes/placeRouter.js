module.exports = function(app) {
  const routePlace = require('../Controllers/Place'); /* 
  app.route('/api/v1/vehicles/:lat/:lon').get(routeVehicle.getPlace); */
  app.route('/api/v1/vehicles/place').get(routePlace.getPlace);
};
