module.exports = function(app) {
  const routeVehicle = require('../Controllers/Vehicle');

  app.route('/api/v1/vehicle/:code').get(routeVehicle.getVehicleById);
  app.route('/api/v1/vehicles/:lat/:lon').get(routeVehicle.getPosition); //experimental
  app.route('/api/v1/vehicle/:id/park').get(routeVehicle.getPark);
  app.route('/api/v1/vehicle/street/:id').get(routeVehicle.getVehiclePlaceById);
};
