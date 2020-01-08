module.exports = function(app) {
  const routeHistory = require('../Controllers/HistoryRental');

  app.route('/api/v1/history/:client').get(routeHistory.getHistory);

  app.route('/api/v1/history/:id').delete(routeHistory.deleteHistory);
};
