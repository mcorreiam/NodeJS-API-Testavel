const HttpStatus = require('http-status');
const jwt = require('jwt-simple');

const def = (app) => {
  const { config } = app;
  const { Users } = app.datasource.models;

  app.post('/token', (req, res) => {
    if (req.body.email && req.body.password) {
      const { email } = req.body;
      const { password } = req.body;

      Users.findOne({ where: { email } })
        .then((user) => {
          if (Users.isPassword(user.password, password)) {
            const payload = { id: user.id };
            res.json({
              token: jwt.encode(payload, config.jwtSecret),
            });
          } else {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
          }
        })
        .catch(() => {
          res.sendStatus(HttpStatus.UNAUTHORIZED);
        });
    } else {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
  });
};
module.exports = def;
