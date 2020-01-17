module.exports = function(app) {
  //experimental.
  const routeRentalMethod = require('../Controllers/RentalMethods');

  app
    .route('/api/v1/rental/rentalMethods')
    .get(routeRentalMethod.getRentalMethods);
};
