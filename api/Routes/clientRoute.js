module.exports = function(app) {
  const routeClient = require('../Controllers/Client');

  app.route('/api/v1/clients').get(routeClient.getClients);
  app.route('/api/v1/clients/:id').get(routeClient.getClientsById);
  app.route('/api/v1/clients/:id/rentals').get(routeClient.getClientRentals);
  app.route('/api/v1/clients/:id/rental').post(routeClient.postClientRental);
};
