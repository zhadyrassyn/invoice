require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

require('mongoose');
const invoiceController = require('./controller/invoiceController');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api', invoiceController);
app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

module.exports = app;
