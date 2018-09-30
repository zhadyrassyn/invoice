const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../dist')));

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
