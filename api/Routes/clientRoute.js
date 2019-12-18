module.exports = function(app) {
  const routeClient = require('../Controllers/Client');

  app.route('/api/v1/clients').get(routeClient.getClients);
};
