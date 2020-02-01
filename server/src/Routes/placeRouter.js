module.exports = function(app) {
  const routePlace = require('../Controllers/Place');

    /**
   * @route POST /api/v1/place
   * @group Places
   * @summary Insert new Parking place
   * @returns {Array} 200
   * @returns {Error}  500
   */
   /**
   * @route GET /api/v1/place
   * @group Places
   * @summary List all parking places
   * @returns {Array} 200
   * @returns {Error}  500
   */
  app
    .route('/api/v1/place')
    .post(routePlace.newPlace)
    .get(routePlace.listPlace);
};
