module.exports = function(app) {
  const dashRoute = require('../Controllers/Dashboard');
  const express = require('express');
  const router = express.Router();
  /*const Pusher = require('pusher');
  
  var pusher = new Pusher({
    appId: '465033',
    key: '0c6e1e724fc994c33998',
    secret: '170e91139139db484d47',
    cluster: 'us2',
    encrypted: true
  });*/
  
  /**
   * @route GET /dashboard/places/:lat/:lon/occupancy_rate
   * @group Dashboard - Dashboard data
   * @returns {Array} 200
   * @returns {Error}  500
   */
  app.route('/api/v1/dashboard/places/occupancy_rate')
  .get(dashRoute.get_occupancy_rate);

  /**
   * @route GET /dashboard/rentals/:date/count
   * @group Dashboard - Dashboard data
   * @returns {Array} 200
   * @returns {Error}  500
   */
  app.route('/api/v1/dashboard/rentals/date/count').get(dashRoute.getCheckinByDay);
};
