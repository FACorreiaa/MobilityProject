const getRandomInRange = (from, to, fixed) =>
  (Math.random() * (to - from) + from).toFixed(fixed) * 1;
// .toFixed() returns string, so ' * 1' is a trick to convert to number

exports.getRandomInRange = getRandomInRange;
