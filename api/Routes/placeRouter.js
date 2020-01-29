module.exports = function(app) {
  const routePlace = require('../Controllers/Place');

  //deixar
  app
    .route('/api/v1/place')
    .post(routePlace.newPlace)
    .get(routePlace.listPlace);
};
