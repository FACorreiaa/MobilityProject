module.exports = function(app) {
  const dashRoute = require('../Controllers/Dashboard');

  /**
   * @route GET /dashboard/places/occupancy_rate
   * @group Dashboard data
   * @summary Returns occupancy rate of parking places
   * @returns {Array} 200
   * @returns {Error}  500
   */
  app
    .route('/api/v1/dashboard/places/occupancy_rate')
    .get(dashRoute.get_occupancy_rate);

  /**
   * @route GET /dashboard/rentals/date/count
   * @group Dashboard data
   * @summary Returns daily checkins count
   * @returns {Array} 200
   * @returns {Error}  500
   */
  app
    .route('/api/v1/dashboard/rentals/date/count')
    .get(dashRoute.getCheckinByDay);
};
