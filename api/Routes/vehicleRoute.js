module.exports = function(app) {
  const routeVehicle = require('../Controllers/Vehicle');

  /**
 * @route GET /vehicle/:code
 * @group Vehicle - Operations about vehicle
 * @param {string} code.param.required - Code of the Vehicle
 * @returns {object} 200 - Returns VehicleSchema model
 * @returns {Error} 500
 */ 
  app.route('/api/v1/vehicle/:code').get(routeVehicle.getVehicleById);

 /**
 * @route GET /vehicle/:lat/:lon
 * @group Vehicle - Operations about vehicle
 * @param {string} lat.param.required - latitude 
 * @param {string} lon.param.required - longitude
 * @returns {object} 200 - Returns VehicleSchema model
 * @returns {Error} 500
 */ 
  app.route('/api/v1/vehicles/:lat/:lon').get(routeVehicle.getPosition); //experimental

  /**
 * @route GET /vehicle/:id/park
 * @group Vehicle - Operations about vehicle
 * @param {string} id.param.required
 * @returns {object} 200 - Returns VehicleSchema model
 * @returns {Error} 500
 */ 
  app.route('/api/v1/vehicle/:id/park').get(routeVehicle.getPark);

   /**
 * @route GET /vehicle/street/:id
 * @group Vehicle - Operations about vehicle
 * @param {string} id.param.required
 * @returns {object} 200 - Returns VehicleSchema model
 * @returns {Error} 500
 */ 
  app.route('/api/v1/vehicle/street/:id').get(routeVehicle.getVehiclePlaceById);
};
