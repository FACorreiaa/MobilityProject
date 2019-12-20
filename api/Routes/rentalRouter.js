module.exports = function(app) {
  //experimental.
  const routeVehicle = require('../Controllers/Rental');

  app
    .route('/api/v1/rental/start/vehicles/:lat/:lon')
    .get(routeVehicle.getVehicleStartInRental);

  app
    .route('/api/v1/rental/end/vehicles/:lat/:lon')
    .get(routeVehicle.getVehicleEndInRental);
};
