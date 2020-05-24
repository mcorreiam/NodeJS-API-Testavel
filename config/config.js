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
};
module.exports = def;
