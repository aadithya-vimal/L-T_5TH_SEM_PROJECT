const { ORDERED_TRANSITIONS } = require('./constants');
function canTransition(from, to) {
  return ORDERED_TRANSITIONS[from]?.includes(to) || false;
}
module.exports = { canTransition };
