module.exports = function(app) {
  const routeAuth = require('../Controllers/Authentication');

  app.route('/api/v1/register')
    .post(routeAuth.register);
  
  
};
