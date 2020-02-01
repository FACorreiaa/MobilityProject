module.exports = function(app) {
  //experimental.
  const routeRental = require('../Controllers/Rental');


  /**
   * @route POST /rental/checkin/user/:user/vehicle/:id/:rentalMethod/lat/:lat/lon/:lon
   * @group Rental - Operations about rentals
   * @summary Processes user's checkin rental
   * @param {string} id.param.required - Id of the vehicle
   * @param {string} user.param.required - User id
   * @param {string} rentalMethod.param.required - Method of payment
   * @param {string} lat.param.required - Latitude of place
   * @param {string} lon.param.required - Longitude of place
   * @returns {array} 200 
   * @returns {Error} 500
   */
  app
    .route(
      '/api/v1/rental/checkin/user/:user/vehicle/:id/:rentalMethod/lat/:lat/lon/:lon'
    )
    .post(routeRental.checkin);


  /**
   * @route PUT /api/v1/rental/checkout/:id/vehicle/:vehicle/lat/:lat/lon/:lon/address/:address
   * @group Rental - Operations about rentals
   * @summary Processes checkout of rental
   * @param {string} id.param.required - Id of the checkin
   * @param {string} place.param.required - Id of vehicle
   * @param {string} lat.param.required - Latitude of place
   * @param {string} lon.param.required - Longitude of place
   * @param {string} address.param.required - Adress of parcking place
   * @returns {array} 200 
   * @returns {Error} 500
   */
  app
    .route(
      '/api/v1/rental/checkout/:id/vehicle/:vehicle/lat/:lat/lon/:lon/address/:address'
    )
    .put(routeRental.checkout);

  /**
   * @route PUT /rental/payment/:id
   * @group Rental - Operations about rentals
   * @summary Returns price of rental by id
   * @param {string} id.param.required
   * @returns {object} 200 - Rental price of 12€ has been paid successfully!
   * @returns {Error} 500
   */
  app.route('/api/v1/rental/payment/:id').put(routeRental.payment);

  /**
   * @route GET /rental/consult/:id
   * @group Rental - Operations about rentals
   * @summary Returns the rental by id
   * @param {string} id.param.required
   * @returns {object} 200 
   * @returns {Error} 500
   */
  app.route('/api/v1/rental/consult/:id').get(routeRental.consult);

  /**
   * @route GET /rental/check
   * @group Rental - Operations about rentals
   * @summary Returns rental data
   * @returns {object} 200 
   * @returns {Error} 500
   */
  app.route('/api/v1/rental/check').get(routeRental.getRentalData);
  
  /**
   * @route GET /notify/:id
   * @group Rental - Operations about rentals
   * @summary Notify user
   * @param {string} id.param.required
   * @returns {object} 200 
   * @returns {Error} 500
   */
  app.route('/api/v1/notify/:id').put(routeRental.notifyUser);

  /**
   * @route GET /rental/rentalMethods
   * @group Rental - Operations about rentals
   * @summary Returns rental methods
   * @param {string} id.param.required
   * @returns {object} 200 
   * @returns {Error} 500
   */
  app.route('/api/v1/rental/rentalMethods').get(routeRental.getRentalMethods);
};
