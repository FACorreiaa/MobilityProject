module.exports = function(app) {
  const routeClient = require('../Controllers/Client');

  app.route('/api/v1/clients').get(routeClient.getClients);
<<<<<<< HEAD
  app.route('/api/v1/clients/:id').get(routeClient.getClientsById);
  app.route('/api/v1/clients/:id/rentals').get(routeClient.getClientRentals);
  app.route('/api/v1/clients/:id/rental').post(routeClient.postClientRental);
=======
  app
    .route('/api/v1/clients/:id')
    .get(routeClient.getClientsById)
    .put(routeClient.updateClient);
  app.route('/api/v1/clients/:id/rentals')
  .get(routeClient.getClientRentals);
  .post(routeClient.postClientRental
>>>>>>> 593348e90891a3460e485dff58bfec772c14061c
};
