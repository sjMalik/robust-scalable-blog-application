// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();

const config = {
  development: {
    port: process.env.PORT || 3000,
    database: process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/myblogdb',
    redisHost: process.env.REDIS_HOST || 'localhost',
    redisPort: process.env.REDIS_PORT || 6379,
  },
  production: {
    port: process.env.PORT,
    database: process.env.MONGODB_URI,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT,
  },
};

module.exports = config;
