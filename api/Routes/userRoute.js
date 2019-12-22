module.exports = function(app) {
  const routeUser = require('../Controllers/User');

  app.route('/api/v1/users')
    .get(routeUser.getUsers);
  
  app.route('/api/v1/users/:id')
    .put(routeUser.validateUser);

  app.route('/api/v1/users/waitValidation')
    .get(routeUser.getUsersForValidation)

};
