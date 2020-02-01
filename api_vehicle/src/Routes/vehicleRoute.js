module.exports = function(app) {
  const routeVehicle = require('../Controllers/Vehicle');

  /**
   * @route GET /vehicle/:code
   * @group Vehicle - Operations about vehicle
   * @summary Returns all vehicles
   * @param {string} code.param.required - Code of the Vehicle
   * @returns {object} 200 - Returns VehicleSchema model
   * @returns {Error} 500
   */
  app.route('/api/v1/vehicles').get(routeVehicle.getVehicles);
};
