const Pet = require('../models/pet');

module.exports = (app) => {

    /* GET home page. */
    app.get('/', (req, res) => {
      const page = req.query.page || 1

      Pet.paginate({}, {page: page}).then((results) => {
          if (req.header('content-type') == 'application/json') {
         res.json({
             pets: results.docs,
             pagescount: results.pages,
             currentPage: page,
             hasPreviousPages: page > 1,
             hasNextPages: page < results.pages,
             })
         } else {
         res.render('pets-index', {
             pets: results.docs,
             pagescount: results.pages,
             currentPage: page,
             hasPreviousPages: page > 1,
             hasNextPages: page < results.pages,
             });
         }
      });
    });
}
