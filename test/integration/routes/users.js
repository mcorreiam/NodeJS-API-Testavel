const jwt = require('jwt-simple');

describe('Routes Users', () => {
  const { Users } = app.datasource.models;
  const { jwtSecret } = app.config;

  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'test@mail.com',
    password: 'test',
  };
  let token;
  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create({
        name: 'John',
        email: 'john@mail.com',
        password: '12345',
      }))
      .then((user) => {
        Users
          .create(defaultUser)
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  // request = request('http://localhost:3000');

  describe('Route GET /users', () => {
    it('shoud return a list of users', (done) => {
      request
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].email).to.be.eql(defaultUser.email);
          done(err);
        });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('shoud return a users', (done) => {
      request
        .get('/users/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultUser.id);
          expect(res.body.name).to.be.eql(defaultUser.name);
          expect(res.body.email).to.be.eql(defaultUser.email);

          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('shoud create a users', (done) => {
      const newUser = {
        id: 2,
        name: 'newUser',
        email: 'newemail@mail.com',
        password: 'teste',
      };

      request
        .post('/users')
        .set('Authorization', `Bearer ${token}`)
        .send(newUser)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newUser.id);
          expect(res.body.name).to.be.eql(newUser.name);
          expect(res.body.email).to.be.eql(newUser.email);
          done(err);
        });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('should update a users', (done) => {
      const updatedUser = {
        id: 1,
        name: 'updateduser',
        email: 'emailupdate@mail.com',
      };
      request
        .put('/users/1')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedUser)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /users/{id}', () => {
    it('should delete a users', (done) => {
      request
        .delete('/users/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
