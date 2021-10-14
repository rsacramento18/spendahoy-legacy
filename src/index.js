const express = require('express');
const bodyParser = require('body-parser');
const { Connection } = require('./config/database.config.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

Connection.open();

// mongoose.Promise = global.Promise;

// mongoose.connect(dbConfig.url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Successfully connected to the database');
// }).catch((err) => {
//   console.log('Could not connect to the database. Exiting now...', err);
//   process.exit();
// });

global.__basedir = __dirname;

const port = process.env.port || '3030';

require('./routes/monthExpense.routes')(app);


app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
