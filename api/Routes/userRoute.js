module.exports = function(auth, app) {
  const routeUser = require('../Controllers/User');

  app.route('/api/v1/users')
    .get(auth, routeUser.getUsers);

  app.route('/api/v1/users/:id')
    .get(auth, routeUser.getUserById);
  
  app.route('/api/v1/users/:id/validation')
    .put(auth, routeUser.validateUser);

    app.route('/api/v1/admin/users/waitvalidation')
    .get(auth, routeUser.getUsersForValidation);
};
