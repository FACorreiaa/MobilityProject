module.exports = function(app) {
  const routePlace = require('../Controllers/Place');

  /**
   * @route GET /places/:lat/:lon
   * @group Places - Operations about places
   * @param {string} lat.param.required - Latitude
   * @param {string} lon.param.required - Longitude
   * @returns {object} 200 - Returns PlaceSchema model
   * @returns {Error} 500
   */

  app.route('/api/v1/places/:lat/:lon').get(routePlace.getPlace);

  app
    .route('/api/v1/place')
    .post(routePlace.newPlace)
    .get(routePlace.listPlace);
  app
    .route('/api/v1/place/:id')
    .put(routePlace.updatePlace)
    .delete(routePlace.deletePlace);
};
