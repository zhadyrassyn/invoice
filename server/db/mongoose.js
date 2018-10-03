const mongoose = require('mongoose');
const logger = require('./../config/winston');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info(`connected to mongoDB: ${process.env.MONGODB_URI}`);
  }).catch((error) => {
    logger.error(`error on connecting to mongoDB: ${error}`);
  });

module.exports = mongoose;
