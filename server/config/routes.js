var search = require('../controllers/search.js');

module.exports = function(app) {
    console.log("routes loading");

    app.get('/search/:id', search.index)

    app.get('/first/:id', search.firstVideo)

}