module.exports = function(auth, app) {
  const routeUser = require('../Controllers/User');

  /**
   * @route GET /users
   * @group Users - Operations about users
   * @returns {Array} 200 - Returns UserSchema model
   * @returns {Error} 500
   */
  app.route('/api/v1/users').get(auth, routeUser.getUsers);

  /**
   * @route GET /users/:id
   * @group Users - Operations about users
   * @param {string} id.param.required
   * @returns {Array} 200 - Returns UserSchema model
   * @returns {Error} 500
   */
  app.route('/api/v1/users/:id').get(auth, routeUser.getUserById);

  /**
   * @route GET /users/:id/validation
   * @group Users - Operations about users
   * @param {string} id.param.required
   * @returns {Array} 200 - Returns UserSchema model
   * @returns {Error} 500
   */
  app.route('/api/v1/users/:id/validation').put(auth, routeUser.validateUser);

  /**
   * @route GET /users/admin/waitvalidation
   * @group Users - Operations about users
   * @returns {Array} 200 - Returns UserSchema model
   * @returns {Error} 500
   */
  app
    .route('/api/v1/users/admin/waitvalidation')
    .get(auth, routeUser.getUsersForValidation);

  app
    .route('/api/v1/users/:id/rentals')
    .get(routeUser.getUserRentals)
    .post(routeUser.postUserRental);

  app.route('/api/v1/users/:id/balance/:balance').put(routeUser.updateBalance);
  app.route('/api/v1/users/:id/balance').get(routeUser.getUserBalanceById);
};
