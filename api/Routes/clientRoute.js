module.exports = function(app) {
  const routeClient = require('../Controllers/Client');

  /**
   * @route GET /clients
   * @group Clients - Operations about clients
   * @returns {Array} 200 - Returns array of ClientSchema model
   * @returns {Error}  500
   */
  app.route('/api/v1/clients').get(routeClient.getClients);

  /**
   * @route GET /clients/:id
   * @group Clients - Operations about clients
   * @param {string} id.param.required
   * @returns {object} 200 - Returns ClientSchema model
   * @returns {Error} 500
   */

  /**
   * @route PUT /clients/:id
   * @group Clients - Operations about clients
   * @param {string} id.param.required
   * @returns {object} 200 - Returns ClientSchema model updated
   * @returns {Error} 500
   */

  app
    .route('/api/v1/clients/:id')
    .get(routeClient.getClientsById)
    .put(routeClient.updateClient);

  /**
   * @route GET /clients/:id/rentals
   * @group Clients - Operations about clients
   * @param {string} id.param.required
   * @returns {object} 200 - Returns RentalSchema model of client
   * @returns {Error} 500
   */

  /**
   * @route POST /clients/:id/rentals
   * @group Clients - Operations about clients
   * @param {string} id.param.required
   * @returns {object} 201 - Returns RentalSchema model of client
   * @returns {Error} 500
   */

  app
    .route('/api/v1/clients/:id/rentals')
    .get(routeClient.getClientRentals)
    .post(routeClient.postClientRental);

  /**
   * @route PUT /clients/:id/balance/:balance
   * @group Clients - Operations about clients
   * @param {string} id.param.required
   * @param {string} balance.param.required
   * @returns {object} 200 - Client balance updated
   */

  app
    .route('/api/v1/clients/:id/balance/:balance')
    .put(routeClient.updateBalance);
};
