module.exports = function(auth, app) {
  const routeUser = require('../Controllers/User');

  /**
   * @route GET /users
   * @group Users - Operations about users
   * @returns {Array} 200 - Returns UserSchema model
   * @returns {Error} 500
   */
  app.route('/api/v1/users').get(auth, routeUser.getUsers);

  //DEIXAR
  /**
   * @route GET /users/:id
   * @group Users - Operations about users
   * @param {string} id.param.required
   * @returns {Array} 200 - Returns UserSchema model
   * @returns {Error} 500
   */
  app.route('/api/v1/users/:id').get(routeUser.getUserById);

  //DEIXAR
  /**
   * @route GET /users/:id/validation
   * @group Users - Operations about users
   * @param {string} id.param.required
   * @returns {Array} 200 - Returns UserSchema model
   * @returns {Error} 500
   */
  app.route('/api/v1/users/:id/validation/:userId').put(routeUser.validateUser);

  /**
   * @route GET /users/admin/waitvalidation
   * @group Users - Operations about users
   * @returns {Array} 200 - Returns UserSchema model
   * @returns {Error} 500
   */
  //DEIXAR
  app
    .route('/api/v1/users/admin/waitvalidation')
    .get(routeUser.getUsersForValidation);
  //DEIXAR
  app.route('/api/v1/users/func/validUsers').get(routeUser.getValidUsers);

  //DEIXAR
  app.route('/api/v1/users/:id/balance/:balance').put(routeUser.updateBalance);
  //DEIXAR
  app.route('/api/v1/users/:id/balance').get(routeUser.getUserBalanceById);
};
