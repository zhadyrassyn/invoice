const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log(`connected to mongoDB: ${process.env.MONGODB_URI}`);
  }).catch((error) => {
    console.log(`error on connecting to mongoDB: ${error}`);
  });

module.exports = mongoose;
