module.exports = {
  development: {
    client: 'mysql',
    version: '5.7',
    connection: {
      name: 'db1Connection',
      host: '127.0.0.1',
      user: 'root',
      port: 3306,
      password: 'root',
      database: 'test1',
    },
    migrations: {
      directory: './migrations/users',
      tableName: '20210808150144_users',
    },
  },
  developmentOne: {
    client: 'mysql',
    version: '5.7',
    connection: {
      name: 'db2Connection',
      host: '127.0.0.1',
      user: 'root',
      port: 3307,
      password: 'root',
      database: 'test2',
    },
    migrations: {
      directory: './migrations/posts',
      tableName: '20210902093735_posts',
    },
  },
};