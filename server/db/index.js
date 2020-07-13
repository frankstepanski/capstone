const sync = require("./sync");

// note: ./index.js (connection) will not be exported
module.exports = {
    sync,
    ...require('./users'),
    ...require('./carts'),
    ...require('./categories'),
    ...require('./orders'),
    ...require('./products'),
    ...require('./reviews')
}