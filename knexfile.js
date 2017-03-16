module.exports = {

  test: {
  client: 'pg',
  connection: 'postgres://localhost/cheeswhiz_test'
  },

  development: {
    client: 'pg',
    connection: 'postgres://localhost/cheeswhiz_dev'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
}
