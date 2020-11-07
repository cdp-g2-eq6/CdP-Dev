const express = require('express');
const bodyParser = require('body-parser');

// DB start
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';

function connectToDb() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(dbUrl, function(err, db) {
            if (err) {
                console.log("Failed to connect to DB");
                return reject(err)
            }
            console.log("Connected to DB");
            db.close();
            resolve();
          });
    })
}
// DB end

const app = express();
app.use(bodyParser.json());

const config = require('./config/server_config.js');

app.use('/api', require('./routes/api'));

const port = config.api_port;
app.listen(port, () => {
    console.log(`server listening on ${port}`);
    connectToDb();
});
