// config.js
require("dotenv").config();
const env = process.env.NODE_ENV; // 'dev' or 'test'

const development = {
  app: {
    port: process.env.PORT
  },
  db: {
    host: "localhost",
    port: 27017,
    name: "db"
  }
};

const test = {
  app: {
    port: 3000
  },
  db: {
    host: "localhost",
    port: 27017,
    name: "test"
  }
};

const config = {
  development,
  test
};

module.exports = config[env];
