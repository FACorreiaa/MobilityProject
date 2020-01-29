module.exports = function(app) {
  //experimental.
  const routeRental = require('../Controllers/Rental');

  //DEIXAR
  /**
   * @route POST /rental/checkin/:id/:rentalMethod
   * @group Rental - Operations about rentals
   * @param {string} id.param.required
   * @param {string} rentalMethod.param.required
   * @returns {array} 200 - Returns RentalSchema model
   * @returns {Error} 500
   */
  //DEIXAR
  app
    .route(
      '/api/v1/rental/checkin/user/:user/vehicle/:id/:rentalMethod/lat/:lat/lon/:lon'
    )
    .post(routeRental.checkin);

  /**
   * @route PUT /rental/checkout/:id/place/:place
   * @group Rental - Operations about rentals
   * @param {string} id.param.required
   * @param {string} place.param.required
   * @returns {array} 200 - Returns RentalSchema model
   * @returns {Error} 500
   */
  //DEIXAR
  app
    .route(
      '/api/v1/rental/checkout/:id/vehicle/:vehicle/lat/:lat/lon/:lon/address/:address'
    )
    .put(routeRental.checkout);

  /**
   * @route PUT /rental/payment/:id
   * @group Rental - Operations about rentals
   * @param {string} id.param.required
   * @returns {object} 200 - Rental price of 12€ has been paid successfully!
   * @returns {Error} 500
   */
  //DEIXAR
  app.route('/api/v1/rental/payment/:id').put(routeRental.payment);

  /**
   * @route GET /rental/consult/:id
   * @group Rental - Operations about rentals
   * @param {string} id.param.required
   * @returns {object} 200 - Returns RentalSchema model
   * @returns {Error} 500
   */
  //DEIXAR
  app.route('/api/v1/rental/consult/:id').get(routeRental.consult);

  //DEIXAR
  app.route('/api/v1/rental/check').get(routeRental.getRentalData);
  //DEIXAR
  app.route('/api/v1/notify/:id').put(routeRental.notifyUser);
};
