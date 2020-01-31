module.exports = function(app) {
  //experimental.
  const routeRentalMethod = require('../Controllers/RentalMethods');
  
   /**
   * @route GET /api/v1/rental/rentalMethods
   * @group Places
   * @summary Get rental methods
   * @returns {Array} 200
   * @returns {Error}  500
   */
  app
    .route('/api/v1/rental/rentalMethods')
    .get(routeRentalMethod.getRentalMethods);
};
