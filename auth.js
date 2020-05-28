const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');

const def = (app) => {
  const { Users } = app.datasource.models;
  const opts = {};
  opts.secretOrKey = app.config.jwtSecret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  const strategy = new Strategy(opts, (payload, done) => {
    Users.findOne(payload)
      .then((user) => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email,
          });
        }
        return done(null, false);
      })
      .catch((error) => done(error, null));
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', app.config.jwtSession),
  };
};

module.exports = def;
