const getRandomInRange = (from, to, fixed) =>
  (Math.random() * (to - from) + from).toFixed(fixed) * 1;

exports.getRandomInRange = getRandomInRange;
