const jwt = require('jwt-simple');

describe('Routes Books', () => {
  const { Books } = app.datasource.models;
  const { Users } = app.datasource.models;
  const { jwtSecret } = app.config;

  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default description',
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
        Books
          .destroy({ where: {} })
          .then(() => Books.create(defaultBook))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  describe('Route GET /books', () => {
    it('shoud return a list of books', (done) => {
      request
        .get('/books')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultBook.id);
          expect(res.body[0].name).to.be.eql(defaultBook.name);
          expect(res.body[0].description).to.be.eql(defaultBook.description);

          done(err);
        });
    });
  });

  describe('Route GET /books/{id}', () => {
    it('shoud return a books', (done) => {
      request
        .get('/books/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultBook.id);
          expect(res.body.name).to.be.eql(defaultBook.name);
          expect(res.body.description).to.be.eql(defaultBook.description);

          done(err);
        });
    });
  });

  describe('Route POST /books', () => {
    it('shoud create a books', (done) => {
      const newBook = {
        id: 2,
        name: 'newBook',
        description: 'newDescription',
      };

      request
        .post('/books')
        .set('Authorization', `Bearer ${token}`)
        .send(newBook)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newBook.id);
          expect(res.body.name).to.be.eql(newBook.name);
          expect(res.body.description).to.be.eql(newBook.description);
          done(err);
        });
    });
  });

  describe('Route PUT /books/{id}', () => {
    it('should update a books', (done) => {
      const updatedBook = {
        id: 1,
        name: 'updatedBook',
        description: 'updatedDescription',
      };
      request
        .put('/books/1')
        .set('Authorization', `Bearer ${token}`)
        .send(updatedBook)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /books/{id}', () => {
    it('should delete a books', (done) => {
      request
        .delete('/books/1')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
