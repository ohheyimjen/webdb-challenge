// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/sprint.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    useNullAsDefault: true
  },
  pool: {
    // runs after a connection is made to the sqlite engine
    afterCreate: (conn, done) => {
      // by default SQLite will not enforce foreign keys
      conn.run('PRAGMA foreign _keys = ON', done);
    }
  }
  

};
