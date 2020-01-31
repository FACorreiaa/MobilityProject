module.exports = function(app) {
  const dashRoute = require('../Controllers/Dashboard');
  const express = require('express');
  const router = express.Router();
  
  /**
   * @route GET /dashboard/places/occupancy_rate
   * @group Dashboard
   * @summary Get occupancy rate for parking places
   * @returns {Array} 200
   * @returns {Error}  500
   */
  app.route('/api/v1/dashboard/places/occupancy_rate')
  .get(dashRoute.get_occupancy_rate);

  /**
   * @route GET /dashboard/rentals/date/count
   * @group Dashboard - Dashboard data 
   * @summary Get count of daily rentals
   * @returns {Array} 200
   * @returns {Error}  500
   */
  app.route('/api/v1/dashboard/rentals/date/count').get(dashRoute.getCheckinByDay);
};
