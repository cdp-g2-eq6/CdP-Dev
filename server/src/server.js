const express = require('express');
const bodyParser = require('body-parser');

const DATABASE_URL = process.env.DATABASE_URL || 'localhost';
mongoose.connect(`mongodb://${DATABASE_URL}/cdp-website`, {useNewUrlParser: true});
const db = mongoose.connection;

const app = express();
app.use(bodyParser.json());

const config = require('./config/server_config.js');

app.use('/api', require('./routes/api'));

const port = config.api_port;
app.listen(port, () => {
  console.log(`server listening on ${port}`);
});