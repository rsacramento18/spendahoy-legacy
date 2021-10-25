const express = require('express');
const bodyParser = require('body-parser');
const { Connection } = require('./config/database.config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

Connection.open();

global.basedir = __dirname;

const port = process.env.port || '3030';

require('./routes/monthExpense.routes')(app);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
