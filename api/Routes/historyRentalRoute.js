module.exports = function(app) {
  const routeHistory = require('../Controllers/HistoryRental');

  app.route('/api/v1/history/:user').get(routeHistory.getHistory);

  app.route('/api/v1/history/:id').delete(routeHistory.deleteHistory);
};
