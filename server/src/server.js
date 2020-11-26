const cors = require('cors');
const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL || 'localhost:27017';
mongoose.connect(`mongodb://${DATABASE_URL}/${config.DBHost}`,
    {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Database connected (host: ${config.DBHost})`);

  if (config.DBHost === 'cdp-test') {
    db.dropDatabase();
    console.log('Dropped test database');
  }

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/api', require('./routes/issues'));
  app.use('/api', require('./routes/tasks'));
  app.use('/api', require('./routes/sprints'));
  app.use('/api', require('./routes/tests'));

  const port = config.APIPort;
  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
});
