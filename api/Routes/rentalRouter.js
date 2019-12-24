module.exports = function(app) {
  //experimental.
  const routeRental = require('../Controllers/Rental');

  app
    .route('/api/v1/rental/start/vehicles/:lat/:lon/:min/:max')
    .get(routeRental.getVehicleStartInRental);

  app
    .route('/api/v1/rental/end/vehicles/:lat/:lon/:min/:max')
    .get(routeRental.getVehicleEndInRental);

  app
    .route('/api/v1/rental/date/:id/:start/:end')
    .get(routeRental.getRentalsByDateAndId);
  app
    .route('/api/v1/rental/date/:start/:end')
    .get(routeRental.getRentalsByDate);
  app
    .route('/api/v1/rental/date/:start')
    .get(routeRental.getRentalsStartByDate);

  app.route('/api/v1/rental/date/:end').get(routeRental.getRentalsEndByDate);

  app
    .route('/api/v1/rental/checkin/:id/:rentalMethod')
    .post(routeRental.checkin);

  app
    .route('/api/v1/rental/checkout/:id/place/:place')
    .put(routeRental.checkout);
  app.route('/api/v1/rental/payment/:id').put(routeRental.payment);
  app.route('/api/v1/rental/consult/:id').put(routeRental.consult);
};
