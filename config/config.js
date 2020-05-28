const def = {
  database: 'books',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: `${process.env.NODE_ENV}_books.sqlite'`,
    define: {
      underscore: true,
    },
  },
  jwtSecret: 'Secr3t',
  jwtSession: { session: false },
};
module.exports = def;
