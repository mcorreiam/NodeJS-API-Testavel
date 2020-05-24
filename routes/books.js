const BooksController = require('../controller/books');

const routes = (app) => {
  const booksController = new BooksController(app.datasource.models.Books);
  app.route('/books')
    .get((req, res) => {
      booksController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(() => res.status(412));
    })
    .post((req, res) => {
      booksController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(() => res.status(412));
    });

  app.route('/books/:id')
    .get((req, res) => {
      booksController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(() => res.status(412));
    })
    .put((req, res) => {
      booksController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(() => res.status(412));
    })
    .delete((req, res) => {
      booksController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        })
        .catch(() => res.status(412));
    });
};
module.exports = routes;
