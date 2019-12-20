module.exports = function(app) {
  const routePlace = require('../Controllers/Place');
  app.route('/api/v1/places/:lat/:lon').get(routePlace.getPlace);
};
