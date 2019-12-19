module.exports = function(app) {
  const routeClient = require('../Controllers/Client');

  app.route('/api/v1/clients').get(routeClient.getClients);
  app
    .route('/api/v1/client/:id')
    .get(routeClient.getClientsById)
    .put(routeClient.updateClient);
  app.route('/api/v1/client/:id/rental').get(routeClient.getClientRentals);
};
