module.exports = function(app) {
  //experimental.
  const routeRental = require('../Controllers/Rental');

/**
 * @route GET /rental/start/vehicles/:lat/:lon/:min/:max
 * @group Rental - Operations about rentals
 * @param {string} lat.param.required - Latitude 
 * @param {string} lon.param.required - Longitude
 * @param {string} min.param.required - Min range 
 * @param {string} max.param.required - Max range
 * @returns {object} 200 - Returns RentalSchema model
 * @returns {Error} 500
 */
  app
    .route('/api/v1/rental/start/vehicles/:lat/:lon/:min/:max')
    .get(routeRental.getVehicleStartInRental);

  /* app
    .route('/api/v1/rental/end/vehicles/:lat/:lon/:min/:max')
    .get(routeRental.getVehicleEndInRental); */

  /**
 * @route GET /rental/date/:id/:start/:end
 * @group Rental - Operations about rentals
 * @param {string} id.param.required 
 * @param {string} start.param.required - Start date
 * @param {string} end.param.required - End date
 * @returns {array} 200 - Returns RentalSchema model
 * @returns {Error} 500
 */
  app
    .route('/api/v1/rental/:id/date/:start/:end')
    .get(routeRental.getRentalsByDateAndId);

    /**
 * @route GET /rental/date/:start/:end
 * @group Rental - Operations about rentals
 * @param {string} start.param.required - Start date
 * @param {string} end.param.required - End date
 * @returns {array} 200 - Returns RentalSchema model
 * @returns {Error} 500
 */
  app
    .route('/api/v1/rental/date/:start/:end')
    .get(routeRental.getRentalsByDate);

/**
 * @route GET /rental/date/:start
 * @group Rental - Operations about rentals
 * @param {string} start.param.required - Start date
 * @returns {array} 200 - Returns RentalSchema model
 * @returns {Error} 500
 */
  app
    .route('/api/v1/rental/date/:start')
    .get(routeRental.getRentalsStartByDate);

/**
 * @route GET /rental/date/:end
 * @group Rental - Operations about rentals
 * @param {string} end.param.required - End date
 * @returns {array} 200 - Returns RentalSchema model
 * @returns {Error} 500
 */
  app.route('/api/v1/rental/date/:end')
  .get(routeRental.getRentalsEndByDate);

/**
 * @route POST /rental/checkin/:id/:rentalMethod
 * @group Rental - Operations about rentals
 * @param {string} id.param.required 
 * @param {string} rentalMethod.param.required
 * @returns {array} 200 - Returns RentalSchema model
 * @returns {Error} 500
 */
  app
    .route('/api/v1/rental/checkin/:id/:rentalMethod')
    .post(routeRental.checkin);

/**
 * @route PUT /rental/checkout/:id/place/:place
 * @group Rental - Operations about rentals
 * @param {string} id.param.required 
 * @param {string} place.param.required
 * @returns {array} 200 - Returns RentalSchema model
 * @returns {Error} 500
 */
  app
    .route('/api/v1/rental/checkout/:id/place/:place')
    .put(routeRental.checkout);
  
 /**
 * @route PUT /rental/payment/:id
 * @group Rental - Operations about rentals
 * @param {string} id.param.required
 * @returns {object} 200 - Rental price of 12€ has been paid successfully!
 * @returns {Error} 500
 */ 
  app.route('/api/v1/rental/payment/:id')
  .put(routeRental.payment);

/**
 * @route GET /rental/consult/:id
 * @group Rental - Operations about rentals
 * @param {string} id.param.required
 * @returns {object} 200 - Returns RentalSchema model
 * @returns {Error} 500
 */ 
  app.route('/api/v1/rental/consult/:id')
  .get(routeRental.consult);
};
