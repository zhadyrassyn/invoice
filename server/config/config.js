const env = process.env.NODE_ENV || 'development';
const logger = require('./winston');

console.log('env *********** ', env);

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/InvoicesApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/InvoicesAppTest';
}
