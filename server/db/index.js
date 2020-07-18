// note: ./index.js (connection) will not be exported
module.exports = {
    ...require('./users'),
    ...require('./cart_products'),
    ...require('./categories'),
    ...require('./orders'),
    ...require('./products'),
    ...require('./reviews'),
    ...require('./sync')
}