const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const config = require('./config/server_config.js');

app.use('/api', require('./routes/api'));

const port = config.api_port;
app.listen(port, () => {
    console.log(`server listening on ${port}`);
});
