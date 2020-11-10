const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const DATABASE_URL = process.env.DATABASE_URL || 'localhost:27017';
mongoose.connect(`mongodb://${DATABASE_URL}/cdp-website`, {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected');

  const app = express();
  app.use(bodyParser.json());

  const config = require('./config/server_config.js');

  app.use('/api', require('./routes/issues'));

  const port = config.api_port;
  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
});
