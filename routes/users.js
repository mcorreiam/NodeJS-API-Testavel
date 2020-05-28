const UsersController = require('../controller/users');

const routes = (app) => {
  const usersController = new UsersController(app.datasource.models.Users);
  app.route('/users')
    .all(app.auth.authenticate())
    .get((req, res) => {
      usersController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(() => res.status(412));
    })
    .post((req, res) => {
      usersController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(() => res.status(412));
    });

  app.route('/users/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      usersController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(() => res.status(412));
    })
    .put((req, res) => {
      usersController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        })
        .catch(() => res.status(412));
    })
    .delete((req, res) => {
      usersController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        })
        .catch(() => res.status(412));
    });
};
module.exports = routes;
