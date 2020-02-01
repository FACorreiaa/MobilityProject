module.exports = function(app) {
  const routeVehicle = require('../Controllers/Vehicle');

  /**
   * @route GET /vehicle
   * @group Vehicle - Operations about vehicle
   * @summary Returns all vehicles
   * @returns {object} 200 - Returns VehicleSchema model
   * @returns {Error} 500
   */
  app.route('/api/v1/vehicles').get(routeVehicle.getVehicles);
};
